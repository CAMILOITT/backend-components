import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { createError } from '../middleware/errorHandle';
import { db, dbAuth, dbMessage } from '..';
import { IUser } from '../interfaces/dataNotification.interfaces';
import { sendNow } from '../middleware/notification/notificationProgrammer';

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, lastName, email, password }: IUser = req.body;

    if (!name || !lastName || !email || !password)
      return next(new createError(404, 'faltan datos'));

    if (!email.includes('@') || !email.includes('.'))
      return next(new createError(404, 'correo no valido'));

    if (password.length < 6)
      return next(new createError(404, 'la contraseña no es valida'));

    // const salt: string = await bcrypt.genSalt(10);
    const newPassword: string = await bcrypt.hash(password, 10);

    const information = {
      displayName: `${name} ${lastName}`,
      email,
      password: newPassword,
    };

    const newUser = await dbAuth.createUser(information);

    const newUserTable = db.collection('users').doc(newUser.uid);

    await newUserTable.set(information);

    return res.status(200).json('usuario creado');
  } catch (err: any) {
    console.log(err.message);
    next(new createError(404, err.message));
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, userUid } = req.body;

    if (!token) return next(new createError(404, 'error al recibir el token'));

    if (!userUid) return next(new createError(404, 'error recibir el uui'));

    await dbMessage.subscribeToTopic(token, 'admin');

    sendNow(token,{title:'asdfasdf',body:'asdfsadf'})

    return res
      .status(200)
      .header({ 'x-token-fs': token, 'x-uid-fs': userUid })
      .json(`bienvenido`);
  } catch (err: any) {
    next(new createError(404, err.message));
  }
}
