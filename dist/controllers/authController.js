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
exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
const auth_1 = require("../schema/auth");
const JWT_SECRET = process.env.JWT_SECRET || "";
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password, name } = req.body;
        const isValid = auth_1.signupSchema.safeParse(req.body);
        if (isValid.error) {
            return res.status(400).json({
                error: "Provided input are not valid",
            });
        }
        email = email.toLowerCase();
        name = name.toLowerCase();
        const userAlreadyExist = yield prisma_1.default.user.findFirst({ where: { email } });
        if (userAlreadyExist) {
            return res.status(400).json({
                error: "email already exist, please login instead",
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, JWT_SECRET);
        return res.status(200).json({
            message: "Successfully signed up",
            token,
        });
    }
    catch (err) {
        err.status = err.status || 403;
        next(err);
    }
});
exports.signUp = signUp;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        const isValid = auth_1.signInSchema.safeParse(req.body);
        if (isValid.error) {
            return res.status(400).json({
                error: "Provided input are not valid",
            });
        }
        const user = yield prisma_1.default.user.findFirst({ where: { email } });
        if (!user) {
            return res.status(404).json({
                error: "User does not exist",
            });
        }
        const isMatched = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatched) {
            return res.status(403).json({
                error: "Invalid password",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, JWT_SECRET);
        return res.status(200).json({
            message: "Successfuly signed in",
            token,
        });
    }
    catch (err) {
        err.status = err.status || 403;
        next(err);
    }
});
exports.signIn = signIn;
