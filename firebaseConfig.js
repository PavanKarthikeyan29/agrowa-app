
import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyA68pwEVV2xX1GqmNn7WZzTQ0QrJc6OjAQ",
  authDomain: "agrowa-cbepubscl.firebaseapp.com",
  projectId: "agrowa-cbepubscl",
  storageBucket: "agrowa-cbepubscl.appspot.com",
  messagingSenderId: "667597214578",
  appId: "1:667597214578:web:29c89579157d315bf3c3eb",
  measurementId: "G-PNRFRECPTB"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
