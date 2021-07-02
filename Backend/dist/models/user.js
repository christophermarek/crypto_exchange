"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
});
const User = new Schema({
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    authStrategy: {
        type: String,
        default: "local",
    },
    points: {
        type: Number,
        default: 50,
    },
    refreshToken: {
        type: [Session],
    },
});
//Remove refreshToken from the response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
});
User.plugin(passportLocalMongoose);
module.exports = mongoose_1.default.model("User", User);
