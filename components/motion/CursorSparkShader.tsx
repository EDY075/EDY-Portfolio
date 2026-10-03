'use client';

import { useEffect, useRef } from 'react';

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  born: number;
  duration: number;
  ink: number;
};

const MAX_SPARKS = 96;
const VERTEX_SHADER = `
attribute vec2 a_position;
attribute float a_size;
attribute float a_alpha;
attribute float a_angle;
attribute float a_ink;
uniform vec2 u_resolution;
uniform float u_dpr;
varying float v_alpha;
varying float v_angle;
varying float v_ink;
void main() {
  vec2 clip = a_position / u_resolution * vec2(2.0, -2.0) + vec2(-1.0, 1.0);
  gl_Position = vec4(clip, 0.0, 1.0);
  gl_PointSize = a_size * u_dpr;
  v_alpha = a_alpha;
  v_angle = a_angle;
  v_ink = a_ink;
}`;
const FRAGMENT_SHADER = `
precision mediump float;
varying float v_alpha;
varying float v_angle;
varying float v_ink;
void main() {
  vec2 point = gl_PointCoord * 2.0 - 1.0;
  float distance = length(point);
  if (distance > 1.0) discard;
  float angle = atan(point.y, point.x) + v_angle;
  float ray = pow(max(0.0, 1.0 - min(abs(sin(angle)), abs(cos(angle))) * 9.0), 3.0) * (1.0 - distance);
  float core = pow(max(0.0, 1.0 - distance), 8.0);
  float alpha = min(1.0, core * 1.05 + ray * 1.5) * v_alpha;
  vec3 gold = mix(vec3(0.58, 0.34, 0.12), vec3(1.0, 0.77, 0.32), smoothstep(0.08, 0.58, core + ray * 0.65));
  vec3 color = mix(gold, vec3(0.025, 0.03, 0.025), v_ink);
  gl_FragColor = vec4(color, alpha);
}`;

function usesInkSparks(x: number, y: number) {
  const hit = document.elementFromPoint(x, y);
  if (!hit) return false;
  if (hit.closest('.project-art, .project-wheel-face, .case-art')) return false;
  if (hit.closest('.work-page, .home-method, .values-section, .case-overview, .case-features')) return true;
  return Boolean(hit.closest('.next-chapter, .footer') && document.querySelector('.site-frame > .work-page'));
}

function getPortraitExclusion() {
  const portrait = document.querySelector<HTMLElement>('.portrait-wrap');
  if (!portrait) return null;
  const bounds = portrait.getBoundingClientRect();
  return {
    left: bounds.left + (portrait.classList.contains('home-portrait') ? bounds.width * 0.3 : 0),
    right: bounds.right,
    top: bounds.top,
    bottom: bounds.bottom,
  };
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

export function CursorSparkShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const touchMode = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;
    const maxSparks = touchMode ? 48 : MAX_SPARKS;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let motionAllowed = !motionQuery.matches;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return;
    }
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    if (!program || !buffer) {
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
    const attributes = [
      gl.getAttribLocation(program, 'a_position'),
      gl.getAttribLocation(program, 'a_size'),
      gl.getAttribLocation(program, 'a_alpha'),
      gl.getAttribLocation(program, 'a_angle'),
      gl.getAttribLocation(program, 'a_ink'),
    ];
    const resolution = gl.getUniformLocation(program, 'u_resolution');
    const dprUniform = gl.getUniformLocation(program, 'u_dpr');
    const vertices = new Float32Array(MAX_SPARKS * 6);
    const sparks: Spark[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let previousFrame = 0;
    let lastPointer: { x: number; y: number } | null = null;
    let activeTouchId: number | null = null;
    let lastTouchBurst = 0;
    let counter = 0;

    const activateProgram = gl.useProgram.bind(gl);
    activateProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices.byteLength, gl.DYNAMIC_DRAW);
    attributes.forEach((location, index) => {
      if (location < 0) return;
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, index === 0 ? 2 : 1, gl.FLOAT, false, stride, (index === 0 ? 0 : index + 1) * 4);
    });
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, touchMode ? 1.25 : 1.5, Math.sqrt(4_500_000 / Math.max(1, width * height)));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(dprUniform, dpr);
    };

    const draw = (time: number) => {
      if (document.hidden) { frame = 0; return; }
      const elapsed = previousFrame ? Math.min(time - previousFrame, 50) : 0;
      previousFrame = time;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const portrait = getPortraitExclusion();
      let used = 0;
      for (let index = sparks.length - 1; index >= 0; index--) {
        const spark = sparks[index];
        const life = (time - spark.born) / spark.duration;
        if (life >= 1) { sparks.splice(index, 1); continue; }
        spark.x += spark.vx * elapsed;
        spark.y += spark.vy * elapsed;
        spark.vy += elapsed * 0.0005;
        if (portrait && spark.x >= portrait.left - 16 && spark.x <= portrait.right + 16 && spark.y >= portrait.top - 16 && spark.y <= portrait.bottom + 16) continue;
        const offset = used * 6;
        vertices[offset] = spark.x;
        vertices[offset + 1] = spark.y;
        vertices[offset + 2] = spark.size * (0.75 + life * 0.5);
        vertices[offset + 3] = Math.min(1, Math.pow(1 - life, 0.9) * 1.15);
        vertices[offset + 4] = spark.angle;
        vertices[offset + 5] = spark.ink;
        used++;
      }
      if (used) {
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices.subarray(0, used * 6));
        gl.drawArrays(gl.POINTS, 0, used);
        frame = window.requestAnimationFrame(draw);
      } else { frame = 0; previousFrame = 0; }
    };

    const emitSparks = (next: { x: number; y: number }, amount: number, dx: number, dy: number) => {
      const portrait = getPortraitExclusion();
      if (portrait && next.x >= portrait.left - 16 && next.x <= portrait.right + 16 && next.y >= portrait.top - 16 && next.y <= portrait.bottom + 16) {
        sparks.length = 0;
        lastPointer = null;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }
      const ink = Number(usesInkSparks(next.x, next.y));
      canvas.dataset.sparkPalette = ink ? 'ink' : 'gold';
      for (let index = 0; index < amount; index++) {
        const seed = counter++;
        const spread = (Math.sin(seed * 78.233) * 43758.5453) % 1;
        const angle = seed * 2.39996;
        sparks.push({
          x: next.x + Math.cos(angle) * 5 * spread,
          y: next.y + Math.sin(angle) * 5 * spread,
          vx: Math.cos(angle) * (0.018 + Math.abs(spread) * 0.045) - dx * 0.00025,
          vy: Math.sin(angle) * (0.018 + Math.abs(spread) * 0.045) - dy * 0.00025,
          size: (9 + (seed % 4) * 2) * 1.2,
          angle,
          born: performance.now(),
          duration: 360 + (seed % 5) * 65,
          ink,
        });
      }
      if (sparks.length > maxSparks) sparks.splice(0, sparks.length - maxSparks);
      lastPointer = next;
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!touchMode || !motionAllowed || activeTouchId !== null) return;
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
      activeTouchId = event.pointerId;
      lastTouchBurst = performance.now();
      emitSparks({ x: event.clientX, y: event.clientY }, 9, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!motionAllowed) return;
      const next = { x: event.clientX, y: event.clientY };
      const dx = lastPointer ? next.x - lastPointer.x : 0;
      const dy = lastPointer ? next.y - lastPointer.y : 0;
      const distance = Math.hypot(dx, dy);
      if (touchMode) {
        if (event.pointerId !== activeTouchId) return;
        const now = performance.now();
        if (lastPointer && (distance < 12 || now - lastTouchBurst < 42)) return;
        lastTouchBurst = now;
        emitSparks(next, Math.min(7, Math.max(4, Math.round(distance / 12))), dx, dy);
        return;
      }
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      if (lastPointer && distance < 1.5) return;
      emitSparks(next, Math.min(8, Math.max(4, Math.round(distance / 10))), dx, dy);
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== activeTouchId) return;
      activeTouchId = null;
      lastPointer = null;
    };
    const handlePointerLeave = () => { lastPointer = null; activeTouchId = null; };
    const handleVisibility = () => {
      if (document.hidden) { window.cancelAnimationFrame(frame); frame = 0; }
      else if (motionAllowed && sparks.length && !frame) frame = window.requestAnimationFrame(draw);
    };

    const handleMotionChange = () => {
      motionAllowed = !motionQuery.matches;
      if (!motionAllowed) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        sparks.length = 0;
        lastPointer = null;
        activeTouchId = null;
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerEnd, { passive: true });
    window.addEventListener('pointercancel', handlePointerEnd, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    motionQuery.addEventListener('change', handleMotionChange);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery.removeEventListener('change', handleMotionChange);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-spark-shader" aria-hidden="true" />;
}
