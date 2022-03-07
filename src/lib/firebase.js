import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
const config = {
  apiKey: "AIzaSyAObltNbwwH2ycHJ4odxXHn9hx-8UkxjXk",
  authDomain: "instagram-project-434d0.firebaseapp.com",
  projectId: "instagram-project-434d0",
  storageBucket: "instagram-project-434d0.appspot.com",
  messagingSenderId: "795419667977",
  appId: "1:795419667977:web:693feb84871825a2bc52d8"
};

const firebase = Firebase.initializeApp(config)
const {FieldValue} = Firebase.firestore
const storage = Firebase.storage()

export {firebase,FieldValue,storage};
