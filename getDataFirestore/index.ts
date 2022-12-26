// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dbAuth = getAuth(app);

async function name() {
  const user = await createUserWithEmailAndPassword(
    dbAuth,
    'test41@test.com',
    '123456'
  );
}

async function obtenerUser(email: string, password: string): Promise<string> {
  const user = await signInWithEmailAndPassword(dbAuth, email, password);
  return user.user.uid;
}

async function tokenId(): Promise<string | undefined> {
  const token = await dbAuth.currentUser?.getIdToken(true);
  return token;
}

export interface IMeta {
  uui: string;
  token: string;
}

export async function uuiAndTokenUser(
  email: string,
  password: string
): Promise<IMeta> {
  const uui: string = await obtenerUser(email, password);
  let token: string | undefined = await tokenId();

  console.log(token);

  if (!token) token = '';
  const metaUser = { uui, token };
  return metaUser;
}
