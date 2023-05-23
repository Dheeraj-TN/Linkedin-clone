// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDCNBz66hgN_swYaELk0yCECXVJKi3czzA",
  authDomain: "linkedin-clone-418d3.firebaseapp.com",
  projectId: "linkedin-clone-418d3",
  storageBucket: "linkedin-clone-418d3.appspot.com",
  messagingSenderId: "628533112591",
  appId: "1:628533112591:web:33967654a1c6af0309187a",
  measurementId: "G-DG5X4LTCQ5",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      const name = res.user.displayName;
      const email = res.user.email;
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      return true;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export const storage = getStorage(app);
