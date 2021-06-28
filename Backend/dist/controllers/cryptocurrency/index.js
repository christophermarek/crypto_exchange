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
exports.getCryptoCurrencyFrequencyListAtDate = exports.getAllCryptoCurrencyFrequencyLists = void 0;
const cryptocurrency_1 = __importDefault(require("../../models/cryptocurrency"));
const getAllCryptoCurrencyFrequencyLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cryptocurrencyFrequencyLists = yield cryptocurrency_1.default.find().exec();
        res.status(200).json({ cryptocurrencyFrequencyLists });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.getAllCryptoCurrencyFrequencyLists = getAllCryptoCurrencyFrequencyLists;
const getCryptoCurrencyFrequencyListAtDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dateSplit = req.params.date.split("-");
        let year = Number(dateSplit[0]);
        let month = Number(dateSplit[1]) - 1;
        let day = Number(dateSplit[2]);
        let dateObj = new Date(year, month, day);
        let foundCurrentEntry = yield cryptocurrency_1.default.find({ date: (dateObj) });
        if (foundCurrentEntry.length > 1) {
            for (let i = 0; i < foundCurrentEntry.length; i++) {
                //there are a few that exists, they need to be cleaned up
                console.log(`Db has duplicates, here are ids of all duplicates ${foundCurrentEntry[i]._id}`);
            }
            let intitialEntry = foundCurrentEntry[0];
            res.status(200).json({ intitialEntry });
        }
        else {
            res.status(200).json({ foundCurrentEntry });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Invalid Date" });
    }
});
exports.getCryptoCurrencyFrequencyListAtDate = getCryptoCurrencyFrequencyListAtDate;
