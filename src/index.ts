import { app } from './app';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { environmentType } from './config/config';

dotenv.config();

const port: number = Number(environmentType.port);

admin.initializeApp({
  credential: admin.credential.cert(environmentType.configFirebase),
});

async function connect() {
  try {
    app.listen(port);
    console.log('---------------------------------------');
    console.log(`|connect in http://localhost:${port} [✔] |`);
    console.log('---------------------------------------');
    console.log('---------------------------------------------------');
    console.log(`| docs in http://localhost:${port}/api/docs [✔] |`);
    console.log('---------------------------------------------------');
  } catch (error) {
    console.error('---------------------------');
    console.error(error);
    console.error('---------------------------');
  }
}
connect();

export const db = admin.firestore();
export const dbAuth = admin.auth();
export const dbMessage = admin.messaging();
