"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport = require("passport");
if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    dotenv.config();
}
require("./utils/connectdb");
require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");
const userRouter = require("./routes/userRoutes");
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default(process.env.COOKIE_SECRET));
app.use(cors_1.default({ credentials: true, origin: 'http://localhost:3000' }));
app.use(passport.initialize());
app.use("/users", userRouter);
app.use(routes_1.default);
app.get('/', (req, res) => {
    res.send('Server is Running');
});
//start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
