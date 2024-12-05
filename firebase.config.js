// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: `${import.meta.env.VITE_PROJECTID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: `${import.meta.env.VITE_PROJECTID}.firebasestorage.app`,
  messagingSenderId: import.meta.env.VITE_MESSAGEID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
