import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxiXDtrnPwodGUHYbhaf6rbV8_t6UPvPU",
  authDomain: "concept34-firebase-email-pass.firebaseapp.com",
  projectId: "concept34-firebase-email-pass",
  storageBucket: "concept34-firebase-email-pass.appspot.com",
  messagingSenderId: "992490359369",
  appId: "1:992490359369:web:b43dd40a11363a28890d98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;