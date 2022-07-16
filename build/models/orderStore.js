"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderStore {
    async show(userid) {
        try {
            const sql = 'SELECT * FROM orders where user_id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userid]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * from orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.log(err.stack);
            throw new Error(err);
        }
    }
    async create(o) {
        try {
            const sql = 'INSERT INTO orders(user_id,status) VALUES ($1,$2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.user_id, o.status]);
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async addProduct(order_id, product_id, quantity) {
        try {
            const sql = 'INSERT INTO orderproduct(order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [order_id, product_id, quantity]);
            const orderProd = result.rows[0];
            conn.release();
            return orderProd;
        }
        catch (err) {
            // console.log(err);
            throw new Error(err);
        }
    }
}
exports.orderStore = orderStore;
