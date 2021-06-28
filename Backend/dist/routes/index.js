"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/user/index");
const router = express_1.Router();
router.post("/api/register", index_1.register);
router.post("/api/login", index_1.login);
exports.default = router;
