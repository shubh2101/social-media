import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const apiKey = process.env.REACT_APP_apiKey;
const authDomain = process.env.REACT_APP_authDomain;
const projectId = process.env.REACT_APP_projectId;
const storageBucket = process.env.REACT_APP_storageBucket;
const messagingSenderId = process.env.REACT_APP_messagingSenderId;
const appId = process.env.REACT_APP_appId;
const measurementId = process.env.REACT_APP_measurementId;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};
// console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
