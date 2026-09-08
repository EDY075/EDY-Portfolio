'use client';

import { useEffect, useRef, useState } from 'react';
import { ambientAsset, ambientAudio } from '@/lib/ambient-audio';

const preferenceKey = 'edy-audio-enabled';

export function AmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const preference = useRef(false);
  const interacted = useRef(false);
  const sessionEnabled = useRef(false);

  useEffect(() => {
    try { preference.current = localStorage.getItem(preferenceKey) === 'true'; } catch { /* Private storage can be unavailable. */ }
    const start = () => {
      interacted.current = true;
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      if (preference.current && !connection?.saveData && ambientAsset.available) {
        sessionEnabled.current = true;
        void ambientAudio.play().then(() => setEnabled(true)).catch(() => setFailed(true));
      }
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
    const visibility = () => {
      if (document.hidden) ambientAudio.pause();
      else if (preference.current && interacted.current && sessionEnabled.current && ambientAsset.available) void ambientAudio.play().catch(() => setFailed(true));
    };
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
      document.removeEventListener('visibilitychange', visibility);
      ambientAudio.dispose();
    };
  }, []);

  const toggle = async () => {
    if (!ambientAsset.available) return;
    interacted.current = true;
    const next = !enabled;
    preference.current = next;
    sessionEnabled.current = next;
    try { localStorage.setItem(preferenceKey, String(next)); } catch { /* Keep session preference. */ }
    setEnabled(next);
    setFailed(false);
    if (next) {
      try { await ambientAudio.play(); } catch { setFailed(true); setEnabled(false); }
    } else ambientAudio.pause();
  };

  return <button type="button" className="ambient-sound" onClick={toggle} disabled={!ambientAsset.available}
    aria-pressed={enabled} aria-label={!ambientAsset.available ? 'Som indisponível: faixa ambiente pendente' : enabled ? 'Desativar som ambiente' : 'Ativar som ambiente'}
    title={!ambientAsset.available ? 'AUDIO ASSET PENDING' : failed ? 'Áudio indisponível. Tente novamente.' : undefined}
    data-audio-status={!ambientAsset.available ? 'pending' : failed ? 'error' : enabled ? 'playing' : 'off'}>
    SOUND {enabled ? 'ON' : 'OFF'}
  </button>;
}
