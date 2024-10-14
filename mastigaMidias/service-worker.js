// const CACHE_NAME = 'playlist-cache-v5';

// self.addEventListener('install', (event) => {
//   self.skipWaiting(); // Ativa imediatamente
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   const requestURL = new URL(event.request.url);

//   // Filtra para capturar apenas as mídias
//   if (requestURL.pathname.includes('.storage')) {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         if (response) {
//           return response; // Retorna do cache
//         }

//         return fetch(event.request).then((networkResponse) => {
//           if (networkResponse && networkResponse.status === 200) {
//             return caches.open(CACHE_NAME).then((cache) => {
//               cache.put(event.request, networkResponse.clone()); // Armazena no cache
//               return networkResponse;
//             });
//           }
//           return networkResponse;
//         });
//       })
//     );
//   } else {
//     // Para todas as outras requisições, simplesmente busca da rede ou cache
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   }
// });
