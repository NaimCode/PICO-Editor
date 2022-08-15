import { GiphyFetch } from "@giphy/js-fetch-api";
export const KEY_GIPHY = import.meta.env.VITE_APP_GIPHY_KEY;
export const gf = new GiphyFetch(KEY_GIPHY);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY, // "AIzaSyBy9Rgt16ePT52Del6rOuoq_BdUIBIPeDU",
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN, //"pico-ec9d2.firebaseapp.com",
  projectId: import.meta.env.VITE_APP_PROJECT_ID, //"pico-ec9d2",
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET, //"pico-ec9d2.appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SEND_ID, //"931319819485",
  appId: import.meta.env.VITE_APP_APP_ID, /// "1:931319819485:web:b0f787e9d6136928f9bf34",
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID, ///"G-702FZTVGPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);

export { app, analytics, db };

