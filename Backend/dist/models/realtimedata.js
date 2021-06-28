"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realtimeWsb = exports.realtimeCrypto = void 0;
const mongoose_1 = require("mongoose");
const realtimedataSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    frequencyList: {},
    sentimentList: {},
    createdAt: { type: Date },
    updatedAt: { type: Date }
});
const realtimeCrypto = mongoose_1.model("cryptorealtime", realtimedataSchema);
exports.realtimeCrypto = realtimeCrypto;
const realtimeWsb = mongoose_1.model("wsbrealtime", realtimedataSchema);
exports.realtimeWsb = realtimeWsb;
