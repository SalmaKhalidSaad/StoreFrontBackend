"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const userStore_1 = require("../models/userStore");
const jwt = __importStar(require("jsonwebtoken"));
const userS = new userStore_1.usersStore();
const create = async (req, res) => {
    try {
        const u = {
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password_digest: req.body.password_digest,
        };
        console.log("TOKEEEN:" + process.env.TOKEN_SECRET);
        const newUser = await userS.create(u);
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    try {
        const u = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password_digest: req.body.password_digest
        };
        try {
            //amendment
            jwt.verify(req.headers.token, process.env.TOKEN_SECRET);
        }
        catch (er) {
            res.status(401);
            res.json(`invalid token ${er}`);
            return;
        }
        const newUser = await userS.authenticate(u.firstname, u.lastname, u.password_digest);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const index = async (_req, res) => {
    try {
        //amendment
        jwt.verify(_req.headers.token, process.env.TOKEN_SECRET);
    }
    catch (er) {
        res.status(401);
        res.json(`invalid token ${er}`);
        return;
    }
    try {
        const u = await userS.index();
        res.json(u);
    }
    catch (err) {
        console.log(err);
    }
};
const show = async (req, res) => {
    try {
        //amendment
        jwt.verify(req.headers.token, process.env.TOKEN_SECRET);
    }
    catch (er) {
        res.status(401);
        res.json(`invalid token ${er}`);
        return;
    }
    try {
        const b = await userS.show(req.params.id);
        res.json(b);
    }
    catch (err) {
        console.log(err);
    }
};
const userRoutes = (app) => {
    app.post('/user', create);
    app.post('/user/login', authenticate);
    app.get('/user', index);
    app.get('/user/:id', show);
};
exports.default = userRoutes;
