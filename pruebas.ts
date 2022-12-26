import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const jwtClient = new google.auth.JWT(
      process.env.DEV_clientEmail,
      undefined,
      process.env.DEV_privateKey,
      [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/firebase.database',
      ],
      undefined
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens);
    });
  });
}

getAccessToken().then(res => console.log(res));

console.log(getAccessToken().then(res => res));

