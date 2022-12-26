import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { EOrientation } from '../../enum/optionNotification';
import { IStructureTableNotification } from '../../interfaces/dataNotification.interfaces';

export function configurationNotification(
  token: any,
  dataTable: IStructureTableNotification
) {
  const { title, body, imageUrl } = dataTable;

  let config = {};

  const notification = {
    title,
    body,
    imageUrl,
  };

  if (imageUrl === '') {
    if (dataTable.orientation === EOrientation['none']) {
      config = {
        webpush: { notification },
        topic: 'admin',
      };
    } else if (dataTable.orientation === EOrientation['android']) {
      config = {
        android: { notification },
        topic: 'admin',
      };
    } else if (dataTable.orientation === EOrientation['IOS']) {
      config = {
        apns: { payload: { aps: { alert: { title, body } } } },
        topic: 'admin',
      };
    } else {
      config = { notification, topic: 'admin' };
    }
  } else {
    if (dataTable.orientation === EOrientation['none']) {
      config = {
        webpush: { notification: { title, body } },
        topic: 'admin',
      };
    } else if (dataTable.orientation === EOrientation['android']) {
      config = {
        android: { notification: { title, body } },
        topic: 'admin',
      };
    } else if (dataTable.orientation === EOrientation['IOS']) {
      config = {
        apns: { payload: { aps: { alert: { title, body } } } },
        topic: 'admin',
      };
    } else {
      config = {
        notification: { title, body },
        topic: 'admin',
      };
    }
  }

  return config;
}
