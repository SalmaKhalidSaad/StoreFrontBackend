"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderStore_1 = require("../models/orderStore");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orderS = new orderStore_1.orderStore();
const index = async (_req, res) => {
    try {
        try {
            //amendment
            jsonwebtoken_1.default.verify(_req.headers.token, process.env.TOKEN_SECRET);
        }
        catch (er) {
            res.status(401);
            res.json(`invalid token ${er}`);
            return;
        }
        const p = await orderS.index();
        res.json(p);
    }
    catch (err) {
        console.log(err);
    }
};
const show = async (req, res) => {
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
        const p = await orderS.show(req.params.id);
        res.json(p);
    }
    catch (err) {
        console.log(err);
    }
};
const create = async (req, res) => {
    const o = {
        user_id: req.body.user_id,
        status: req.body.status
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
        const newProfuct = await orderS.create(o);
        res.json(newProfuct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    const order_id = req.params.id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
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
        const addedProduct = await orderS.addProduct(order_id, product_id, quantity);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/order', index);
    app.get('/order/:id', show);
    app.post('/order', create);
    app.post('/order/:id/product', addProduct);
};
exports.default = orderRoutes;
