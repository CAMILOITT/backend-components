// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import {
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getIdToken,
} from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCJh5kzCFaYzIHDurdqN5PL1UprqGBCjBY',
  authDomain: 'my-second-project-3113f.firebaseapp.com',
  projectId: 'my-second-project-3113f',
  storageBucket: 'my-second-project-3113f.appspot.com',
  messagingSenderId: '194028667076',
  appId: '1:194028667076:web:3e4a264d2aaeac0d56c991',
  measurementId: 'G-7EKPZGJZ92',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dbAuth = getAuth(app);

async function traerDatos() {
  const querySnapshot = await getDocs(collection(db, 'user'));
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

// traerDatos();

async function obtenerToken() {
  // const userCredentials = await createUserWithEmailAndPassword(
  //   dbAuth,
  //   'test@test.com',
  //   '12345678'
  // );
  // console.log(userCredentials);
  const user = await signInWithEmailAndPassword(
    dbAuth,
    'test@test.com',
    '$2a$10$5yoHEDJP7lm3SETgc4YNQ.NTUWH2myp3azv6N6pq2BZ3FCp46O54i'
  );
  console.log(user);
  tokenId()
}

async function tokenId() {
  const token = await dbAuth.currentUser?.getIdToken();
  console.log(token);
}

obtenerToken();
