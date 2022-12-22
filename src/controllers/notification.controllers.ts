import { NextFunction, Request, Response } from 'express';
import { db, dbMessage } from '..';
import { createError } from '../middleware/errorHandle';
import { exist, listItem } from '../utils/firebase/object';
import { EOrientation, EState } from '../enum/optionNotification';
import { IStructureTableNotification } from '../interfaces/dataNotification.interfaces';
import { sendNow } from '../middleware/notification/notificationProgrammer';
import { escape } from 'querystring';

export async function getNotifications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notificationRef = db
      .collection('users')
      .doc(`${req.headers['x-uid-fs']}`)
      .collection('notification');

    const listNotification = await notificationRef.get().then(listItem);

    if (!listNotification)
      return next(new createError(202, 'no hay notificación'));

    return res.status(200).send({ data: { listNotification } });
  } catch (error) {
    return next(new createError());
  }
}

export async function createNotifications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let {
      title,
      body,
      imageUrl,
      orientation,
      state,
      time,
      days,
    }: IStructureTableNotification = req.body;

    console.log(title, body, imageUrl, orientation, state, time, days);

    if (!title)
      return next(new createError(404, 'el campo title es obligatorio'));

    if (!body)
      return next(new createError(404, 'el campo body es obligatorio'));

    if (!imageUrl) imageUrl = '';

    const dataNotification = {
      title,
      body,
      imageUrl,
      orientation: EOrientation[orientation || 'none'],
      state: EState[state|| 'complete'],
      time: time || new Date(),
      days: days || '*',
    };

    console.log(req.headers['x-uid-fs']);

    const notificationRef = db
      .collection('users')
      .doc(`${req.headers['x-uid-fs']}`)
      .collection('notification')
      .doc();

    await notificationRef.set(dataNotification);

    // if (dataNotification.state === EState['complete']) {
    //   sendNow(dataNotification);
    // }

    res.status(200).json('notificación creada correctamente');
  } catch (err: any) {
    return next(new createError(0, err.message));
  }
}

export async function updateNotifications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notificationRef = db
      .collection('users')
      .doc(`${req.headers['name']}`)
      .collection('notification');

    const notificationExist = notificationRef
      .where('id', '==', req.params.id)
      .get()
      .then(exist);

    if (!notificationExist)
      return next(new createError(404, 'notificación no  existe'));

    await notificationRef.doc(req.params.id).update({ ...req.body });

    return res.status(200).json('notificación modificada');
  } catch (error) {
    return next(new createError());
  }
}

export async function deleteNotifications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notificationRef = db
      .collection('user')
      .doc(`${req.headers['name']}`)
      .collection('notification');

    const notificationExist = notificationRef
      .where('id', '==', req.params.id)
      .get()
      .then(exist);

    if (!notificationExist)
      return next(new createError(404, 'notificación no  existe'));

    await notificationRef.doc(req.params.id).delete();

    return res.status(404).send({ message: 'user deleted' });
  } catch (err: any) {
    next(new createError(0, err.message));
  }
}

export async function subscribeNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { topic } = req.body;
    const token = req.header['name'];
    if (!topic) {
      return next(
        new createError(404, 'ingrese el tema al cual quiere subscribirse')
      );
    }

    if (!token) {
      return next(new createError(404, 'no tiene permisos para inscribirse'));
    }

    dbMessage.subscribeToTopic(token, topic);

    return res.status(400).json('subscripción exitosa');
  } catch (err: any) {
    next(new createError(0, err.message));
  }
}

export async function unsubscribeNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { topic } = req.body;
    const token = req.header['name'];
    if (!topic) {
      return next(
        new createError(404, 'ingrese el tema al cual quiere desuscribirse')
      );
    }

    if (!token) {
      return next(new createError(404, 'no tiene permisos para desuscribirse'));
    }

    await dbMessage.unsubscribeFromTopic(token, topic);

    return res.status(400).json('subscripción cancelada');
  } catch (err: any) {
    next(new createError(0, err.message));
  }
}
