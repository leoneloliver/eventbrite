import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// added latest
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// added latest


const firebaseConfig = {
  apiKey: "AIzaSyB8wVHgLQgjvBMxt3ygl4Bo5pCrHi5x-7w",
  authDomain: "firestone-ba6ce.firebaseapp.com",
  projectId: "firestone-ba6ce",
  storageBucket: "firestone-ba6ce.appspot.com",
  messagingSenderId: "787273247968",
  appId: "1:787273247968:web:de36bd66295947f000f485"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// added latest
const provider = new GoogleAuthProvider()
const auth = getAuth(app);
// added latest


export{ app, db, provider, auth }