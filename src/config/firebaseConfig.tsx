import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBNGKMaNtKPegw-5Z59ghA-u2sscLGD3po",
  authDomain: "file-management-system-741d3.firebaseapp.com",
  projectId: "file-management-system-741d3",
  storageBucket: "file-management-system-741d3.appspot.com",
  messagingSenderId: "629910845660",
  appId: "1:629910845660:web:7ad68b76f5ced7f0525c19"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
