import app from 'vinext/server/fetch-handler';

const demoPath = '/media/raquel-web/demo.mp4';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

async function serveVideo(request: Request, env: Env): Promise<Response> {
  const assetRequest = new Request(request);
  assetRequest.headers.delete('Range');
  assetRequest.headers.delete('If-Range');

  const asset = await env.ASSETS.fetch(assetRequest);
  if (!asset.ok || asset.status !== 200) return asset;

  const headers = new Headers(asset.headers);
  headers.set('Accept-Ranges', 'bytes');

  const range = request.headers.get('Range')?.match(/^bytes=(\d*)-(\d*)$/i);
  const ifRange = request.headers.get('If-Range');
  const matchingVersion = !ifRange || (
    !ifRange.startsWith('W/') &&
    (ifRange === headers.get('ETag') || ifRange === headers.get('Last-Modified'))
  );
  if (request.method === 'HEAD' || !range || (!range[1] && !range[2]) || !matchingVersion) {
    return new Response(asset.body, { status: 200, headers });
  }

  const content = await asset.arrayBuffer();
  const size = content.byteLength;
  const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
  const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;

  headers.set('Cache-Control', 'no-store');
  if (start >= size || end < start) {
    headers.set('Content-Range', `bytes */${size}`);
    headers.set('Content-Length', '0');
    return new Response(null, { status: 416, headers });
  }

  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(content.slice(start, end + 1), { status: 206, headers });
}

const worker = {
  fetch(request: Request, env: Env, context: ExecutionContext) {
    if ((request.method === 'GET' || request.method === 'HEAD') && new URL(request.url).pathname === demoPath) {
      return serveVideo(request, env);
    }

    return app.fetch(request, env, context);
  },
};

export default worker;
