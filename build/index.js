"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.dbMessage = exports.dbAuth = exports.db = void 0;
const app_1 = require("./app");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config/config");
dotenv_1.default.config();
const port = Number(config_1.environmentType.port);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(config_1.environmentType.configFirebase),
});
const server = app_1.app.listen(3000);
exports.server = server;
if (process.env.NODE_ENV !== 'production') {
    console.log('---------------------------------------');
    console.log(`|connect in http://localhost:${config_1.environmentType.port} [✔] |`);
    console.log('---------------------------------------');
    console.log('---------------------------------------------------');
    console.log(`| docs in http://localhost:${config_1.environmentType.port}/api/docs [✔] |`);
    console.log('---------------------------------------------------');
}
exports.db = firebase_admin_1.default.firestore();
exports.dbAuth = firebase_admin_1.default.auth();
exports.dbMessage = firebase_admin_1.default.messaging();
