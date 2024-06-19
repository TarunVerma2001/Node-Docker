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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { CustomRequest } from "../types/request_interface";
const JWT_SECRET = process.env.JWT_SECRET || "";
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth_header = req.headers["authorization"];
        if (!auth_header) {
            throw new Error("Authorization header is invalid");
        }
        const token = auth_header.split("Bearer ")[1];
        const user_data = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = user_data;
        next();
    }
    catch (err) {
        err.status = 401;
        res.status(404).json();
        next(err);
    }
});
exports.isAuthenticated = isAuthenticated;
