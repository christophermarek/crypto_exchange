"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/orderbooks/index");
const router = express_1.Router();
router.get("/user/getusersoders/:user_id", index_1.getUsersOrders);
exports.default = router;
