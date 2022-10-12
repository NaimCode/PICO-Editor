import { GiphyFetch } from "@giphy/js-fetch-api";
export const KEY_GIPHY = import.meta.env.VITE_APP_GIPHY_KEY;
export const gf = new GiphyFetch(KEY_GIPHY);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY, 
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID, 
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SEND_ID,
  appId: import.meta.env.VITE_APP_APP_ID, 
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID, 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db=getFirestore(app);

export { app, db };

