"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentType = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    undefined: {
        configFirebase: {
            projectId: '',
            clientEmail: '',
            privateKey: '',
        },
        port: -1000,
    },
    dev: {
        configFirebase: {
            projectId: process.env.DEV_projectId,
            clientEmail: process.env.DEV_clientEmail,
            privateKey: process.env.DEV_privateKey,
        },
        port: Number(process.env.PORT) || 3000,
    },
    test: {
        configFirebase: {
            projectId: process.env.TEST_projectId,
            clientEmail: process.env.TEST_clientEmail,
            privateKey: process.env.TEST_privateKey,
        },
        port: Number(process.env.PORT) || 3000,
    },
    production: {
        configFirebase: {
            projectId: process.env.PROD_projectId,
            clientEmail: process.env.PROD_clientEmail,
            privateKey: process.env.PROD_privateKey,
        },
        port: Number(process.env.PORT) || 3000,
    },
};
exports.environmentType = process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'test' ||
    process.env.NODE_ENV === 'production'
    ? config[process.env.NODE_ENV]
    : config.undefined;
