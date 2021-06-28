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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRealTimeWsb = exports.getAllRealTimeCryptoData = void 0;
const realtimedata_1 = require("../../models/realtimedata");
const getAllRealTimeCryptoData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const realtimeList = yield realtimedata_1.realtimeCrypto.find().exec();
        res.status(200).json({ realtimeList });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.getAllRealTimeCryptoData = getAllRealTimeCryptoData;
const getAllRealTimeWsb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const realtimeList = yield realtimedata_1.realtimeWsb.find().exec();
        res.status(200).json({ realtimeList });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.getAllRealTimeWsb = getAllRealTimeWsb;
