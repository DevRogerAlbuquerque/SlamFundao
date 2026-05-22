// src/firebase.js  ← coloque na raiz do src e importe de lá
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpRd7dMzdRe2kGxmkjY5F0f-xlN8LtFiU",
  authDomain: "slamfundao-6e465.firebaseapp.com",
  projectId: "slamfundao-6e465",
  storageBucket: "slamfundao-6e465.firebasestorage.app",
  messagingSenderId: "630236696871",
  appId: "1:630236696871:web:0527806354a8e6fd05d902",
  measurementId: "G-CETV2EKTQC"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db   = getFirestore(app);
export default app;