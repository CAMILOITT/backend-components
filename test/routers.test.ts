import request from 'supertest';
import { server } from '../src';
import {
  loginError,
  modifiedLogin,
  register,
  registerError,
} from './data/users';
import { deleteUserAuth } from './utils/deleteUser';
import {
  incompleteNotifications,
  notification,
  notificationError,
} from './data/notification';
import { clearIndexedDbPersistence } from 'firebase/firestore';
import { deleteDocsCollection } from './utils/deleteDB';

describe.skip('AUTHENTICATION', () => {
  test('creating user', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send(register.user);

    expect(res.body).toBe(register.response.message),
      expect(res.status).toBe(register.response.status);
  });

  registerError.forEach(userE => {
    test('checking path errors to register', async () => {
      const res = await request(server).post('/auth/register').send(userE.user);
      expect(res.body.error.message).toBe(userE.response.message),
        expect(res.status).toBe(userE.response.status);
    });
  });

  loginError.forEach(loginE => {
    test('checking path errors to login', async () => {
      const res = await request(server).post('/auth/login').send(loginE.user);
      expect(res.body.error.message).toBe(loginE.response.message),
        expect(res.status).toBe(loginE.response.status);
    });
  });

  test('login user', async () => {
    const dataUser = await modifiedLogin();
    const res = await request(server).post('/auth/login').send(dataUser.user);

    expect(res.body).toBe('bienvenido'),
      expect(res.status).toBe(200),
      expect(res.header['x-token-fs']).toBe(
        dataUser.response.header['x-token-fs']
      ),
      expect(res.header['x-uid-fs']).toBe(dataUser.response.header['x-uid-fs']);
  });
});

describe('VERIFICATION TOKEN', () => {
  test('token not found', async () => {
    const dataUser = await modifiedLogin();
    const res = await request(server)
      .post('/notification')
      .set('x-uid-fs', dataUser.user.userUid);
    expect(res.body.error.message).toBe('usuario no autenticado'),
      expect(res.status).toBe(403);
  });

  test('user not authorized', async () => {
    const dataUser = await modifiedLogin();
    const res = await request(server)
      .post('/notification')
      .set('x-token-fs', dataUser.response.header['x-token-fs'])
      .send();

    expect(res.body.error.message).toBe('no esta autorizado'),
      expect(res.status).toBe(404);
  });
});

describe('notification', () => {
  notificationError.forEach(notificationE => {
    test('checking path errors to create notification', async () => {
      const dataUser = await modifiedLogin();
      const res = await request(server)
        .post('/notification')
        .set('x-token-fs', dataUser.response.header['x-token-fs'])
        .set('x-uid-fs', dataUser.response.header['x-uid-fs'])
        .send(notificationE.structure);

      expect(res.body.error.message).toBe(notificationE.response.message),
        expect(res.status).toBe(notificationE.response.status);
    });
  });

  incompleteNotifications.forEach(notificationE => {
    test('notification incomplete', async () => {
      const dataUser = await modifiedLogin();
      const res = await request(server)
        .post('/notification')
        .set('x-token-fs', dataUser.response.header['x-token-fs'])
        .set('x-uid-fs', dataUser.response.header['x-uid-fs'])
        .send(notificationE.structure);
      expect(res.body).toBe(notificationE.response.message),
        expect(res.status).toBe(notificationE.response.status);
    });
  });

  test('creating notification', async () => {
    const dataUser = await modifiedLogin();
    const res = await request(server)
      .post('/notification')
      .set('x-token-fs', dataUser.response.header['x-token-fs'])
      .set('x-uid-fs', dataUser.response.header['x-uid-fs'])
      .send(notification.structure);

    expect(res.body).toBe('notificación creada correctamente'),
      expect(res.status).toBe(200);
  });

  // get notification
  test('', async () => {});
  // delete notification
  test('', async () => {});
  // update notification
  test('', async () => {});
});

afterAll(() => {
  // console.log('limpiando DB');
  // deleteDocsCollection('users');
  // console.log('eliminando el usuario de la autenticación');
  // deleteUserAuth(register.user.email);
  console.log('cerrando server');
  server.close();
});
