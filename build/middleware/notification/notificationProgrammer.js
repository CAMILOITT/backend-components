"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRecurrent = exports.sendProgrammer = exports.sendNow = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const sendNotification_1 = require("./sendNotification");
const configNotification_1 = require("./configNotification");
function sendNow(token, dataTable) {
    const message = (0, configNotification_1.configurationNotification)(token, dataTable);
    // const message = {
    //   configDevice: configDevice,
    //   token
    // };
    console.log(message);
    (0, sendNotification_1.sendMessage)(message);
}
exports.sendNow = sendNow;
function sendProgrammer(token, dataTable) {
    const message = (0, configNotification_1.configurationNotification)(token, dataTable);
    const dayMonth = dataTable.time.getDate() || '*';
    const dayWeek = dataTable.time.getDate() || '*';
    const minute = dataTable.time.getSeconds() || '*';
    const month = dataTable.time.getMonth() || '*';
    const hour = dataTable.time.getHours() || '*';
    node_cron_1.default.schedule(`${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`, () => {
        (0, sendNotification_1.sendMessage)(message);
    });
}
exports.sendProgrammer = sendProgrammer;
function sendRecurrent(token, dataTable) {
    const message = (0, configNotification_1.configurationNotification)(token, dataTable);
    const days = dataTable.days.join(',');
    const dayMonth = dataTable.time.getDate() || '*';
    const minute = dataTable.time.getSeconds() || '*';
    const month = dataTable.time.getMonth() || '*';
    const hour = dataTable.time.getHours() || '*';
    node_cron_1.default.schedule(`${minute} ${hour} ${dayMonth} ${month} ${days}`, () => {
        (0, sendNotification_1.sendMessage)(message);
    });
}
exports.sendRecurrent = sendRecurrent;
