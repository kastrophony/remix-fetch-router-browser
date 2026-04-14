import { router } from "./router.ts";

const CACHE_NAME = "offline-v1";
const STATIC_ASSETS = [
  "/index.html",
  "/assets/app.js",
];

self.addEventListener("install", (event) => {
  // Open cache and add static assets, then skip waiting
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  // Clean up old caches and take control immediately
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) =>
          caches.delete(key)
        ),
      )
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache-first for static assets
  if (
    request.destination === "script" || request.destination === "style" ||
    request.destination === "image"
  ) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request)),
    );
    return;
  }

  // Serve cached index.html for navigation requests
  if (request.mode === "navigate" || url.pathname === "/") {
    event.respondWith(
      caches.match("/index.html").then((cached) => cached || fetch(request)),
    );
    return;
  }

  // Use fetch router for app routes
  event.respondWith(
    (async () => {
      const response = await router.fetch(request);

      if (response.ok) {
        return response;
      }

      return fetch(request);
    })(),
  );
});
