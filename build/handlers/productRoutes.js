"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productStore_1 = require("../models/productStore");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productS = new productStore_1.productStore();
const index = async (_req, res) => {
    try {
        const p = await productS.index();
        res.json(p);
    }
    catch (err) {
        console.log(err);
    }
};
const show = async (req, res) => {
    try {
        const p = await productS.show(req.params.id);
        res.json(p);
    }
    catch (err) {
        console.log(err);
    }
};
const create = async (req, res) => {
    const p = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    try {
        //amendment
        jsonwebtoken_1.default.verify(req.headers.token, process.env.TOKEN_SECRET);
    }
    catch (er) {
        res.status(401);
        res.json(`invalid token ${er}`);
        return;
    }
    try {
        const newProfuct = await productS.create(p);
        res.json(newProfuct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/product', index);
    app.get('/product/:id', show);
    app.post('/product', create);
};
exports.default = productRoutes;
