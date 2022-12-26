import { db } from '../../src';
import { IMeta, uuiAndTokenUser } from '../../getDataFirestore';
import { iterableObject, oneItem } from '../../src/utils/firebase/object';

interface IRegister {
  user: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  };
  response: {
    status: number;
    message: string;
  };
}

export const registerError: IRegister[] = [
  {
    user: {
      name: '',
      lastName: '',
      email: '',
      password: '',
    },
    response: {
      status: 404,
      message: 'faltan datos',
    },
  },
  {
    user: {
      name: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perezexample.com',
      password: 'MySecretPassword',
    },
    response: {
      status: 404,
      message: 'correo no valido',
    },
  },
  {
    user: {
      name: 'María',
      lastName: 'Rodríguez',
      email: 'mariarodriguez@examplecom',
      password: 'MySecurePassword',
    },
    response: { status: 404, message: 'correo no valido' },
  },
  {
    user: {
      name: 'Jorge',
      lastName: 'González',
      email: 'jorge.gonzalez@example.com',
      password: 'MyCom',
    },
    response: { status: 404, message: 'la contraseña no es valida' },
  },
  {
    user: {
      name: 'Ana',
      lastName: 'García',
      email: 'ana.garcia@example.com',
      password: 'MyStrongPassword',
    },
    response: {
      status: 404,
      message: 'The email address is already in use by another account.',
    },
  },
];

export const register: IRegister = {
  user: {
    name: 'Ana',
    lastName: 'García',
    email: 'ana.garcia@example.com',
    password: 'MyStrongPassword',
  },
  response: {
    status: 200,
    message: 'usuario creado',
  },
};

export const loginError = [
  {
    user: {
      token: '',
      userUid: '1234567890',
    },
    response: { status: 404, message: 'error al recibir el token' },
  },
  {
    user: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      userUid: '',
    },
    response: { status: 404, message: 'error recibir el uui' },
  },
];

interface IStructureUser {
  displayName: string;
  email: string;
  password: string;
}

async function getUser(): Promise<IStructureUser> {
  let user: IStructureUser = (await db!
    .collection('users')
    .where('email', '==', register.user.email)
    .get()
    .then(oneItem)) ?? { displayName: '', email: '', password: '' };

  user = iterableObject(user);

  return user;
}

export async function modifiedLogin() {
  const user = await getUser();
  const meta: IMeta = await uuiAndTokenUser(user.email, user.password);

  return {
    user: {
      token: meta.token,
      userUid: meta.uui,
    },
    response: {
      status: 200,
      message: 'bienvenido',
      header: { 'x-token-fs': meta.token, 'x-uid-fs': meta.uui },
    },
  };
}

// export const login: Promise<{
//   user: {
//     token: string;
//     userUid: string;
//   };
//   response: {
//     status: number;
//     message: string;
//     header: { 'x-token-fs': string; 'x-uid-fs': string };
//   };
// }> =  ;
