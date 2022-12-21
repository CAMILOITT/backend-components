"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbMessage = exports.dbAuth = exports.db = void 0;
const app_1 = require("./app");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config/config");
dotenv_1.default.config();
const port = Number(config_1.environmentType.port);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(config_1.environmentType.configFirebase),
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app_1.app.listen(port);
            console.log('---------------------------------------');
            console.log(`|connect in http://localhost:${port} [✔] |`);
            console.log('---------------------------------------');
            console.log('---------------------------------------------------');
            console.log(`| docs in http://localhost:${port}/api/docs [✔] |`);
            console.log('---------------------------------------------------');
        }
        catch (error) {
            console.error('---------------------------');
            console.error(error);
            console.error('---------------------------');
        }
    });
}
connect();
exports.db = firebase_admin_1.default.firestore();
exports.dbAuth = firebase_admin_1.default.auth();
exports.dbMessage = firebase_admin_1.default.messaging();
