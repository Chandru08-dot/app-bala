self.addEventListener("install", (event) => {
  console.log("Readable Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Readable Service Worker: Activated");
});

self.addEventListener("fetch", (event) => {
  // Static frontend: just pass through or cache if needed
  // For now, standard passthrough to ensure functionality
  event.respondWith(fetch(event.request));
});
