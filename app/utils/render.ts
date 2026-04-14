import type { RemixNode } from "remix/component";
import { renderToStream } from "remix/component/server";
import type { Router } from "remix/fetch-router";

type RenderOptions = {
  request?: Request;
  router?: Router;
  init?: ResponseInit;
};

export function render(node: RemixNode, options: RenderOptions = {}): Response {
  const stream = options.request && options.router
    ? renderToStream(node, {
      resolveFrame: (src) =>
        resolveFrameViaRouter(options.router!, options.request!, src),
      onError(error) {
        console.error(error);
      },
    })
    : renderToStream(node, {
      onError(error) {
        console.error(error);
      },
    });

  const headers = new Headers(options.init?.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
  }

  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "no-store");
  }

  return new Response(stream, { ...options.init, headers });
}

async function resolveFrameViaRouter(
  router: Router,
  request: Request,
  src: string,
) {
  const url = new URL(src, request.url);
  const headers = new Headers(request.headers);

  headers.delete("accept-encoding");
  headers.set("accept", "text/html");

  const response = await router.fetch(
    new Request(url, {
      method: "GET",
      headers,
      signal: request.signal,
    }),
  );

  if (!response.ok) {
    return `<pre>Frame error: ${response.status} ${response.statusText}</pre>`;
  }

  if (response.body) {
    return response.body;
  }

  return response.text();
}
