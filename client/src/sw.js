function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");

  const { image, tag, url, title, text } = event.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: image,
    badge: "https://spyna.it/icons/favicon.ico",
    actions: [
      {
        action: "Detail",
        title: "View",
        icon: "https://via.placeholder.com/128/ff0000",
      },
    ],
  };
  // eslint-disable-next-line no-restricted-globals
  event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event) {
  console.log(
    "[Service Worker] Notification click Received.",
    event.notification.data
  );

  event.notification.close();
  // eslint-disable-next-line no-undef
  event.waitUntil(clients.openWindow(event.notification.data));
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener("push", receivePushNotification);
// eslint-disable-next-line no-restricted-globals
self.addEventListener("notificationclick", openPushNotification);
