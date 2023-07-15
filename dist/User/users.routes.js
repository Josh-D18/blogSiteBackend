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
const user_1 = __importDefault(require("../Models/User/user"));
const auth = require("../Auth/auth");
// Get a user
router.get("/user/:id", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById({ _id: req.params.id });
        res.set("Content-Type", "application/json");
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
//Edit a user
router.put("/user/:id", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateFields = {};
        res.set("Content-Type", "application/json");
        if (req.body.profileImage) {
            updateFields.profileImage = req.body.profileImage;
        }
        if (req.body.backgroundColor) {
            updateFields.backgroundColor = req.body.backgroundColor;
        }
        if (req.body.bio) {
            updateFields.bio = req.body.bio;
        }
        const user = yield user_1.default.findOneAndUpdate({ _id: req.params.id }, updateFields, { new: true });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
module.exports = router;
