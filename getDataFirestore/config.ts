import dotenv from 'dotenv';

dotenv.config();

const config = {
  undefined: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
  test: {
    apiKey: process.env.TEST_apiKey,
    authDomain: process.env.TEST_authDomain,
    projectId: process.env.TEST_projectId,
    storageBucket: process.env.TEST_storageBucket,
    messagingSenderId: process.env.TEST_messagingSenderId,
    appId: process.env.TEST_appId,
    measurementId: process.env.TEST_measurementId,
  },
};

export const firebaseConfig =
  process.env.NODE_ENV === 'test'
    ? config[process.env.NODE_ENV]
    : config.undefined;
