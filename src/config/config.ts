import dotenv from 'dotenv';
import { IConfigEnvironment } from '../interfaces/config.interfaces';

dotenv.config();

const config = {
  undefined: {
    configFirebase: {
      projectId: '',
      clientEmail: '',
      privateKey: '',
    },
    port: -1000,
  },
  dev: {
    configFirebase: {
      projectId: process.env.DEV_projectId,
      clientEmail: process.env.DEV_clientEmail,
      privateKey: process.env.DEV_privateKey,
    },
    port: Number(process.env.PORT) || 3000,
  },
  test: {
    configFirebase: {
      projectId: process.env.TEST_projectId,
      clientEmail: process.env.TEST_clientEmail,
      privateKey: process.env.TEST_privateKey,
    },
    port: Number(process.env.PORT) || 3000,
  },
  production: {
    configFirebase: {
      projectId: process.env.PROD_projectId,
      clientEmail: process.env.PROD_clientEmail,
      privateKey: process.env.PROD_privateKey,
    },
    port: Number(process.env.PORT) || 3000,
  },
};

export const environmentType: IConfigEnvironment =
  process.env.NODE_ENV === 'dev' ||
  process.env.NODE_ENV === 'test' ||
  process.env.NODE_ENV === 'production'
    ? config[process.env.NODE_ENV]
    : config.undefined;
