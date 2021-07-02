"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const User = require("../models/user");
//Called during login/sign up.
passport_1.default.use(new passport_local_1.Strategy(User.authenticate()));
//called while after logging in / signing up to set user details in req.user
passport_1.default.serializeUser(User.serializeUser());
