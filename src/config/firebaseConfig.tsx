import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database"


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.Auth_Domain,
  projectId: process.env.Project_Id,
  storageBucket: process.env.Storage_Bucket,
  messagingSenderId: process.env.Messaging_SenderId,
  appId: process.env.App_Id
};

const firebaseApp = initializeApp(firebaseConfig);

export const database = getDatabase(firebaseApp)
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
