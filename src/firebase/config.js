import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyD0Fmn1RWWFbko4JwI_S0I0OtDnQdVDUoY",
  authDomain: "ecommerce-vf.firebaseapp.com",
  projectId: "ecommerce-vf",
  storageBucket: "ecommerce-vf.appspot.com",
  messagingSenderId: "68230451769",
  appId: "1:68230451769:web:cd79805253b4c5f38273e8"
}

const app = initializeApp(firebaseConfig)

export const inicializarFirebase = () => app