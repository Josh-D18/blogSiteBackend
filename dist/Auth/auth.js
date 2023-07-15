"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
let auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Please login!");
    }
    const authToken = req.headers.authorization.split(" ")[1];
    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send("Invalid auth token");
        }
        req.decoded = decoded;
        next();
    });
};
module.exports = auth;
