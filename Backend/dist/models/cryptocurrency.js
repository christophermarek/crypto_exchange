"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cryptocurrencySchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    freqList: {},
    date: {
        type: Date,
        required: true,
    },
    numComments: {
        type: Number,
        required: true,
    },
    threadId: {
        type: String,
        required: true,
    }
});
exports.default = mongoose_1.model("cryptocurrency", cryptocurrencySchema);
