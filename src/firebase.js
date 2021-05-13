import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2wJJ3VOaAd0iXJsh0qG0rENO3Bp0wZCg",
  authDomain: "auth-app-d04a5.firebaseapp.com",
  projectId: "auth-app-d04a5",
  storageBucket: "auth-app-d04a5.appspot.com",
  messagingSenderId: "27995268307",
  appId: "1:27995268307:web:fff9991448bc22b3bc2026",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
