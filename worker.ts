import app from 'vinext/server/fetch-handler';

const demoPath = '/media/raquel-web/demo.mp4';
const maintenancePath = '/fora-do-ar';

interface Env {
  MAINTENANCE_MODE?: string;
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

async function serveMaintenance(request: Request, env: Env): Promise<Response> {
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'Retry-After': '300',
    'X-Robots-Tag': 'noindex',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
  };
  const status = 503;
  if (request.method === 'HEAD') return new Response(null, { status, headers });

  const assetUrl = new URL('/maintenance.html', request.url);
  const asset = await env.ASSETS.fetch(new Request(assetUrl)).catch(() => null);
  return new Response(
    asset?.ok ? asset.body : '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Portfólio temporariamente indisponível</title><h1>Portfólio temporariamente indisponível</h1><p>Tente novamente em instantes.</p><a href="/">Voltar ao início</a></html>',
    { status, headers },
  );
}

const worker = {
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    const { pathname } = new URL(request.url);
    const read = request.method === 'GET' || request.method === 'HEAD';
    if (read && (pathname === maintenancePath || pathname === maintenancePath + '/')) {
      return serveMaintenance(request, env);
    }
    if (read && pathname === demoPath) return serveVideo(request, env);

    const navigation = read && request.headers.get('RSC') !== '1' && (
      request.mode === 'navigate' || request.headers.get('Accept')?.includes('text/html')
    );
    if (!navigation) return app.fetch(request, env, context);
    if (env.MAINTENANCE_MODE === 'true') return serveMaintenance(request, env);

    try {
      const response = await app.fetch(request, env, context);
      return response.status >= 500 ? serveMaintenance(request, env) : response;
    } catch (error) {
      console.error('Portfolio page rendering failed', error);
      return serveMaintenance(request, env);
    }
  },
};

export default worker;
