"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";
//get env vars, need to convert from undefined
let tokenExpiry;
if (process.env.REFRESH_TOKEN_EXPIRY != undefined) {
    tokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;
}
else {
    tokenExpiry = 'error';
}
let sessionExpiry;
if (process.env.SESSION_EXPIRY != undefined) {
    sessionExpiry = process.env.SESSION_EXPIRY;
}
else {
    sessionExpiry = 'error';
}
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: !dev,
    signed: true,
    maxAge: eval(tokenExpiry) * 1000,
    sameSite: "none",
};
exports.getToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: eval(sessionExpiry),
    });
};
exports.getRefreshToken = (user) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(tokenExpiry),
    });
    return refreshToken;
};
exports.verifyUser = passport_1.default.authenticate("jwt", { session: false });
