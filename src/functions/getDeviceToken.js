import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAUFKXQq0CU5ssPR9fvj4LKXadyZChcYTU",
  authDomain: "rtcproject-9dbb4.firebaseapp.com",
  projectId: "rtcproject-9dbb4",
  storageBucket: "rtcproject-9dbb4.appspot.com",
  messagingSenderId: "602014525356",
  appId: "1:602014525356:web:5293b0859e32359e9a3c09",
  measurementId: "G-LQN95X0WCR",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

async function getDeviceToken(toast) {
  let token = "";
  await getToken(messaging, { vapidKey: "BAJJW5rchwP76J5NHq9jei1qNhAwLryOHV5UPeRe6r20rkHoSEr-3Fulv9h0E_JKOUoX-vEEf8Q6aqj-MKR1Er8" }).then((currentToken) => {
    if (currentToken) {
      token = currentToken;
    } else {
      console.log("لا يمكن إرسال طلب التسجيل, يرجى إعطاء السماحية لقراءة رقم الجهاز من أجل استلام الإشعارات.");
      toast.error("لا يمكن إرسال طلب التسجيل, يرجى إعطاء السماحية لقراءة رقم الجهاز من أجل استلام الإشعارات.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  });
  return token;
}

export default getDeviceToken;
