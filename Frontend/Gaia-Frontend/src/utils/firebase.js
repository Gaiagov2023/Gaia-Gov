import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const RecaptchaVerify = (btnId) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    btnId,
    { size: "invisible" },
    auth
  );
  return recaptchaVerifier;
};

export const SendCode = (phoneNumber, reCaptchaVerifier) =>
  new Promise(async (resolve, reject) => {
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        reCaptchaVerifier
      );
      resolve(confirmationResult);
    } catch (err) {
      reCaptchaVerifier?.render()?.then((widgetId) => {
        window?.grecaptcha?.reset(widgetId);
      });
      reject(err);
    }
  });

export const VerifyCode = (confirmationResult, code) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await confirmationResult.confirm(code);
      const user = result.user;
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
