import { NextFunction, Request, Response } from 'express';
import { dbAuth } from '..';
import { createError } from './errorHandle';

export async function isAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const isAuthenticate: any = req.headers['x-token-fs'];
    const hasUidUser: any = req.headers['x-uid-fs'];

    if (!isAuthenticate)
      return next(new createError(403, 'usuario no autenticado'));

    const isAuth = await dbAuth.verifyIdToken(isAuthenticate, true);

    if (!isAuth) return next(new createError(404, 'no esta autorizado'));

    if (!hasUidUser) return next(new createError(404, 'no esta autorizado'));


    next();
  } catch (err: any) {
    next(new createError(0, err.message));
  }
}
