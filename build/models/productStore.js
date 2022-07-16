"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * from products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.log(err.stack);
            throw new Error(err);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products where id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async create(p) {
        try {
            const sql = 'INSERT INTO products(name,price,category) VALUES ($1,$2,$3) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const newProduct = result.rows[0];
            conn.release();
            return newProduct;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
}
exports.productStore = productStore;
