import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVh3L5xxRbgAvdGICgRxffPqVEMNOCqiY",
  authDomain: "paypay-c0492.firebaseapp.com",
  projectId: "paypay-c0492",
  storageBucket: "paypay-c0492.firebasestorage.app",
  messagingSenderId: "362990965359",
  appId: "1:362990965359:web:b00a187413ed2ec123339a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);