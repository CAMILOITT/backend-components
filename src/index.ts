import { app } from './app';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { environmentType } from './config/config';

dotenv.config();

const port: number = Number(environmentType.port);

admin.initializeApp({
  credential: admin.credential.cert(environmentType.configFirebase),
});

const server = app.listen(3000);

if (process.env.NODE_ENV !== 'production') {
  console.log('---------------------------------------');
  console.log(`|connect in http://localhost:${environmentType.port} [✔] |`);
  console.log('---------------------------------------');
  console.log('---------------------------------------------------');
  console.log(
    `| docs in http://localhost:${environmentType.port}/api/docs [✔] |`
  );
  console.log('---------------------------------------------------');
}

export const db = admin.firestore();
export const dbAuth = admin.auth();
export const dbMessage = admin.messaging();
export { server };
