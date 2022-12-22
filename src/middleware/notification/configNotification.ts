import { EOrientation } from '../../enum/optionNotification';
import { IStructureTableNotification } from '../../interfaces/dataNotification.interfaces';

export function configurationNotification(
  dataTable: IStructureTableNotification
) {
  const { title, body,  imageUrl } = dataTable;

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
      };
    } else if (dataTable.orientation === EOrientation['android']) {
      config = {
        android: { notification },
      };
    } else if (dataTable.orientation === EOrientation['IOS']) {
      config: {
        apns: {
          payload: notification;
        }
      }
    } else {
      config = { notification };
    }
  } else {
    if (dataTable.orientation === EOrientation['none']) {
      config = {
        webpush: { notification: { title, body } },
      };
    } else if (dataTable.orientation === EOrientation['android']) {
      config = {
        android: { notification: { title, body } },
      };
    } else if (dataTable.orientation === EOrientation['IOS']) {
      config = {
        apns: { payload: { title, body } },
      };
    } else {
      config = {
        notification: { notification: { title, body } },
      };
    }
  }

  return config;
}
