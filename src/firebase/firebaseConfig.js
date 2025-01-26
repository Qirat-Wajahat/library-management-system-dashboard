import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3zT8JXnJZikPj_Sq4d_KmUPJT_j_4S_M",
  authDomain: "face-attendace2024.firebaseapp.com",
  databaseURL: "https://face-attendace2024-default-rtdb.firebaseio.com",
  projectId: "face-attendace2024",
  storageBucket: "face-attendace2024.appspot.com",
  messagingSenderId: "335991974709",
  appId: "1:335991974709:web:9102b22ac9eb277d4afa7c",
  measurementId: "G-3ZQXNV166L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);   

export default db;

