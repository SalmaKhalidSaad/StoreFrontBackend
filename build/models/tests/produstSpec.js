"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productStore_1 = require("../../models/productStore");
const userStore_1 = require("../../models/userStore");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
// import {token} from '../tests/userSpec'
const request = (0, supertest_1.default)(server_1.default);
let token;
const productS = new productStore_1.productStore();
const userS = new userStore_1.usersStore();
describe("product Model", () => {
    it('should have an index method', () => {
        expect(productS.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(productS.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(productS.create).toBeDefined();
    });
    it('create method should create a user', async () => {
        const result = await userS.create({
            firstname: "blaaa",
            lastname: "blabla",
            password_digest: "12345"
        });
        console.log(result);
        expect(result.firstname).toBe("blaaa");
    });
    beforeAll(async () => {
        const user = {
            firstname: "product",
            lastname: "user",
            password_digest: "12345"
        };
        const res = await request.post('/user').send(user);
        // console.log(res.body);
        token = res.body;
        expect(res.status).toBe(200);
    });
    it('create method should create a product', async () => {
        const result = await productS.create({
            name: "nike shoes",
            price: 1002,
            category: "shoes"
        });
        // console.log(result);
        expect(result.price).toBe(1002);
        const product = {
            name: "nike shirt",
            price: 1002,
            category: "clothes"
        };
        const res = await request.post('/product').set('token', token).send(product);
        // console.log(res.body);
        ;
        expect(res.status).toBe(200);
    });
    it('showw product', async () => {
        const result = await productS.show(0);
        expect(result).not.toBeNull();
        const res = await request.get('/product/1').set('token', token);
        expect(res.status).toBe(200);
    });
    it('get product index', async () => {
        const result = await productS.index();
        expect(result.length).toBeGreaterThan(0);
        const res = await request.get('/product').set('token', token);
        expect(res.status).toBe(200);
    });
});
