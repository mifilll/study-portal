// sw.js
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Обработка клика по уведомлению (открывает приложение)
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Если приложение уже открыто, фокусируемся на нем
            if (windowClients.length > 0) {
                windowClients[0].focus();
            } else {
                // Иначе открываем заново
                clients.openWindow('./');
            }
        })
    );
});
