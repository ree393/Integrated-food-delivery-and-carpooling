
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCamHSPek9J08blgjuA80L73Q76Euo5mi8",

  authDomain: "food-web-85b12.firebaseapp.com",

  projectId: "food-web-85b12",

  storageBucket: "food-web-85b12.appspot.com",

  messagingSenderId: "55125238084",

  appId: "1:55125238084:web:44afd74f6bde173778f711",
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const storage = getStorage();


export { firebaseApp, db , storage};