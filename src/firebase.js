import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-M5OeOgsYzBM8Jx99ErpIlAGvM0k9VOg",
  authDomain: "react-twitter-65a27.firebaseapp.com",
  projectId: "react-twitter-65a27",
  storageBucket: "react-twitter-65a27.appspot.com",
  messagingSenderId: "642044939290",
  appId: "1:642044939290:web:584e95fea8ce35a75c55a3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
