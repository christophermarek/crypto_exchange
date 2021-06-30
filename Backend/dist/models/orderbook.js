"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderBookEntry = void 0;
const mongoose_1 = require("mongoose");
const orderBookSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    status: { type: String, required: true },
    main: { type: String, required: true },
    pair: { type: String, required: true },
    limit: { type: String, required: true },
    units: { type: String, required: true },
    direction: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});
exports.orderBookEntry = mongoose_1.model("orderbook", orderBookSchema);
