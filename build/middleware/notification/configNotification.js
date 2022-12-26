"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationNotification = void 0;
const optionNotification_1 = require("../../enum/optionNotification");
function configurationNotification(token, dataTable) {
    const { title, body, imageUrl } = dataTable;
    let config = {};
    const notification = {
        title,
        body,
        imageUrl,
    };
    if (imageUrl === '') {
        if (dataTable.orientation === optionNotification_1.EOrientation['none']) {
            config = {
                webpush: { notification },
                topic: 'admin',
            };
        }
        else if (dataTable.orientation === optionNotification_1.EOrientation['android']) {
            config = {
                android: { notification },
                topic: 'admin',
            };
        }
        else if (dataTable.orientation === optionNotification_1.EOrientation['IOS']) {
            config = {
                apns: { payload: { aps: { alert: { title, body } } } },
                topic: 'admin',
            };
        }
        else {
            config = { notification, topic: 'admin' };
        }
    }
    else {
        if (dataTable.orientation === optionNotification_1.EOrientation['none']) {
            config = {
                webpush: { notification: { title, body } },
                topic: 'admin',
            };
        }
        else if (dataTable.orientation === optionNotification_1.EOrientation['android']) {
            config = {
                android: { notification: { title, body } },
                topic: 'admin',
            };
        }
        else if (dataTable.orientation === optionNotification_1.EOrientation['IOS']) {
            config = {
                apns: { payload: { aps: { alert: { title, body } } } },
                topic: 'admin',
            };
        }
        else {
            config = {
                notification: { title, body },
                topic: 'admin',
            };
        }
    }
    return config;
}
exports.configurationNotification = configurationNotification;
