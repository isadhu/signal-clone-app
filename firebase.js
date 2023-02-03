
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB0qjZ9gBwx9zgJanMAg1TtAhw8sqLF12A",
  authDomain: "signal-clone-cbad8.firebaseapp.com",
  projectId: "signal-clone-cbad8",
  storageBucket: "signal-clone-cbad8.appspot.com",
  messagingSenderId: "536695463049",
  appId: "1:536695463049:web:9e1c1e7dec94c22ae1fa58"
};

app = initializeApp(firebaseConfig)



const db = getFirestore(app)
const auth = getAuth()

export {db, auth}
