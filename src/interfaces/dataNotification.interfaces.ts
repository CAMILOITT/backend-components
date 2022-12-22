import { EOrientation, EState } from '../enum/optionNotification';

export interface IStructureTableNotification {
  title: string;
  body: string;
  imageUrl: string;
  orientation: EOrientation;
  state: EState;
  time: Date;
  days: number[];
}

export interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
