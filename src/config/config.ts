import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    configFirebase: {
      projectId: process.env.DEV_projectId,
      clientEmail: process.env.DEV_clientEmail,
      privateKey: process.env.DEV_privateKey,
    },
    port: process.env.PORT || 3000,
  },
  test: {
    configFirebase: {
      projectId: process.env.TEST_projectId,
      clientEmail: process.env.TEST_clientEmail,
      privateKey: process.env.TEST_privateKey,
    },
    port: process.env.PORT || 3000,
  },
  production: {
    configFirebase: {
      projectId: process.env.PROD_projectId,
      clientEmail: process.env.PROD_clientEmail,
      privateKey: process.env.PROD_privateKey,
    },
    port: process.env.PORT || 3000,
  },
};

const statusCode = process.env.NODE_DEV;

let configCredential: {};

if (statusCode === 'development') configCredential = config.development;

if (statusCode === 'production') configCredential = config.production;

if (statusCode === 'test') configCredential = config.test;

export { configCredential };
