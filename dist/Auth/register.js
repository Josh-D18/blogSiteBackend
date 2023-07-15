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
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user_1 = __importDefault(require("../Models/User/user"));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let username = yield req.body.username;
        let password = yield req.body.password;
        let bio = yield req.body.bio;
        let user = yield user_1.default.findOne({ username });
        if ((user === null || user === void 0 ? void 0 : user.username.toLowerCase()) === username.toLowerCase()) {
            res.status(400).json({ ERROR: "Username is already taken" });
            return;
        }
        if (username === "" || password === "" || bio === "") {
            res.status(400).json({ Error: "Field Cannot be empty" });
            return;
        }
        bcrypt.hash(password, 8).then((hashpassword) => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.default({
                username: username,
                password: hashpassword,
                backgroundColor: "#149c81",
                bio: bio,
            });
            const token = yield jwt.sign({ username: user.username, password: user.password }, process.env.JWT_SECRET, {
                expiresIn: "4h",
            });
            yield user.save();
            res.json(token);
        }));
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
}));
module.exports = router;
