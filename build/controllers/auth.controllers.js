"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const errorHandle_1 = require("../middleware/errorHandle");
const __1 = require("..");
const notificationProgrammer_1 = require("../middleware/notification/notificationProgrammer");
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, lastName, email, password } = req.body;
            if (!name || !lastName || !email || !password)
                return next(new errorHandle_1.createError(404, 'faltan datos'));
            if (!email.includes('@') || !email.includes('.'))
                return next(new errorHandle_1.createError(404, 'correo no valido'));
            if (password.length < 6)
                return next(new errorHandle_1.createError(404, 'la contraseña no es valida'));
            // const salt: string = await bcrypt.genSalt(10);
            const newPassword = yield bcrypt.hash(password, 10);
            const information = {
                displayName: `${name} ${lastName}`,
                email,
                password: newPassword,
            };
            const newUser = yield __1.dbAuth.createUser(information);
            const newUserTable = __1.db.collection('users').doc(newUser.uid);
            yield newUserTable.set(information);
            return res.status(200).json('usuario creado');
        }
        catch (err) {
            console.log(err.message);
            next(new errorHandle_1.createError(404, err.message));
        }
    });
}
exports.register = register;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token, userUid } = req.body;
            if (!token)
                return next(new errorHandle_1.createError(404, 'error al recibir el token'));
            if (!userUid)
                return next(new errorHandle_1.createError(404, 'error recibir el uui'));
            yield __1.dbMessage.subscribeToTopic(token, 'admin');
            (0, notificationProgrammer_1.sendNow)(token, { title: 'asdfasdf', body: 'asdfsadf' });
            return res
                .status(200)
                .header({ 'x-token-fs': token, 'x-uid-fs': userUid })
                .json(`bienvenido`);
        }
        catch (err) {
            next(new errorHandle_1.createError(404, err.message));
        }
    });
}
exports.login = login;
