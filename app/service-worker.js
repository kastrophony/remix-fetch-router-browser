import { router } from "./router.ts";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Handle all other requests via router
  event.respondWith(
    (async () => {
      const response = await router.fetch(request);

      if (response.ok) {
        return response;
      }

      // Fallback to network
      return fetch(request);
    })(),
  );
});
