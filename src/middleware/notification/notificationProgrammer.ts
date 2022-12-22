import cron from 'node-cron';
import { sendMessage } from './sendNotification';
import {  configurationNotification } from './configNotification';
import { IStructureTableNotification } from '../../interfaces/dataNotification.interfaces';

export function sendNow(dataTable: IStructureTableNotification) {
  const configDevice = configurationNotification(dataTable);
  const message = {
    configDevice,
  };
  sendMessage(message);
}

export function sendProgrammer(dataTable: IStructureTableNotification) {
  const message = configurationNotification(dataTable);

  const dayMonth: number | string = dataTable.time.getDate() || '*';
  const dayWeek: number | string = dataTable.time.getDate() || '*';
  const minute: number | string = dataTable.time.getSeconds() || '*';
  const month: number | string = dataTable.time.getMonth() || '*';
  const hour: number | string = dataTable.time.getHours() || '*';
  cron.schedule(`${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`, () => {
    sendMessage(message);
  });
}

export function sendRecurrent(dataTable: IStructureTableNotification) {
  const message = configurationNotification(dataTable);

  const days = dataTable.days.join(',');

  const dayMonth: number | string = dataTable.time.getDate() || '*';
  const minute: number | string = dataTable.time.getSeconds() || '*';
  const month: number | string = dataTable.time.getMonth() || '*';
  const hour: number | string = dataTable.time.getHours() || '*';

  cron.schedule(`${minute} ${hour} ${dayMonth} ${month} ${days}`, () => {
    sendMessage(message);
  });
}
