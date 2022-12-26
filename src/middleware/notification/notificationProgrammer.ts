import cron from 'node-cron';
import { sendMessage } from './sendNotification';
import { configurationNotification } from './configNotification';
import { IStructureTableNotification } from '../../interfaces/dataNotification.interfaces';

export function sendNow(token: any, dataTable: any) {
  const message = configurationNotification(token, dataTable);
  // const message = {
  //   configDevice: configDevice,
  //   token
  // };
  console.log(message);
  sendMessage(message);
}

export function sendProgrammer(token: any, dataTable: any) {
  const message = configurationNotification(token, dataTable);

  const dayMonth: number | string = dataTable.time.getDate() || '*';
  const dayWeek: number | string = dataTable.time.getDate() || '*';
  const minute: number | string = dataTable.time.getSeconds() || '*';
  const month: number | string = dataTable.time.getMonth() || '*';
  const hour: number | string = dataTable.time.getHours() || '*';
  cron.schedule(`${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`, () => {
    sendMessage(message);
  });
}

export function sendRecurrent(
  token: any,
  dataTable: IStructureTableNotification
) {
  const message = configurationNotification(token, dataTable);

  const days = dataTable.days.join(',');

  const dayMonth: number | string = dataTable.time.getDate() || '*';
  const minute: number | string = dataTable.time.getSeconds() || '*';
  const month: number | string = dataTable.time.getMonth() || '*';
  const hour: number | string = dataTable.time.getHours() || '*';

  cron.schedule(`${minute} ${hour} ${dayMonth} ${month} ${days}`, () => {
    sendMessage(message);
  });
}
