"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});
exports.user = mongoose_1.model("user", userSchema);
