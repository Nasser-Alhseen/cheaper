// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCCzAly5tIoVwiBv4FwVFKrPk7_gIT418g",
  authDomain: "cheaper-notify.firebaseapp.com",
  projectId: "cheaper-notify",
  storageBucket: "cheaper-notify.appspot.com",
  messagingSenderId: "232979703880",
  appId: "1:232979703880:web:d9da67b4a95e30a172907d",
  measurementId: "G-MBD79KTP9M",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
