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
exports.login = exports.register = void 0;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userName = req.body.userName;
        let password = req.body.password;
        let found = yield user.findOne({ username: userName }).exec();
        //console.log(found);
        //no user found
        //so create one
        if (found == null) {
            try {
                //should hash password here probably
                //and need to send back a session
                yield user.create({ username: userName, password: password });
                res.status(200).json({ registered: true, message: 'successfully registered user' });
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        }
        else {
            res.status(200).json({ registered: false, message: 'user already registered' });
        }
        res.status(200).json({ res: req.body });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('trying to login');
    try {
        let userName = req.body.userName;
        //we dont even check password
        let password = req.body.password;
        let found = yield user.findOne({ username: userName }).exec();
        //no user found
        if (found == null) {
            res.status(400).json({ loggedIn: false, message: 'No user found' });
        }
        else {
            res.status(200).json({ loggedIn: true, message: 'successfully logged in' });
        }
        res.status(200).json({ res: req.body });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.login = login;
