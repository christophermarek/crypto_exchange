"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = process.env.MONGO_DB_CONNECTION_STRING;
const uri = `mongodb+srv://chris:${process.env.MONGO_PASSWORD}@cluster0.vgjbs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const connect = mongoose_1.default.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
connect
    .then((db) => {
    console.log("connected to db");
})
    .catch((err) => {
    console.log(err);
});
