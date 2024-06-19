"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = require("dotenv");
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
app.listen(4000, () => {
    console.log("App is running on 4000");
});
