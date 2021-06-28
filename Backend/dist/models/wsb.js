"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wsbSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    //should probably define this better, but its still a WIP
    freqList: {},
    date: {
        type: Date,
        required: true,
    },
});
exports.default = mongoose_1.model("wsb", wsbSchema);
