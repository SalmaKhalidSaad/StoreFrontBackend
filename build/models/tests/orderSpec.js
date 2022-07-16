"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderStore_1 = require("../../models/orderStore");
const productStore_1 = require("../../models/productStore");
const userStore_1 = require("../../models/userStore");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const userS = new userStore_1.usersStore();
const request = (0, supertest_1.default)(server_1.default);
let token;
const productS = new productStore_1.productStore();
const orderS = new orderStore_1.orderStore();
describe("order Model", () => {
    it('should have an index method', () => {
        expect(orderS.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(orderS.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(orderS.create).toBeDefined();
    });
    // it('create method should create a user', async () => {
    //   const result = await userS.create({
    //        firstname:"blaaa",
    //        lastname:"blabla",
    //        password_digest:"12345"
    //    });
    //    console.log(result);
    //    expect(result.firstname).toBe("blaaa");
    //  }); 
    beforeAll(async () => {
        const user = {
            firstname: "order",
            lastname: "user",
            password_digest: "12345"
        };
        const res = await request.post('/user').send(user);
        // console.log(res.body);
        token = res.body;
        expect(res.status).toBe(200);
        const product = {
            name: "puma shoes",
            price: 1002,
            category: "shoes"
        };
        const res2 = await request.post('/product').set('token', token).send(product);
        expect(res2.status).toBe(200);
        const order = {
            user_id: 1,
            status: "complete"
        };
        const res3 = await request.post('/order').set('token', token).set(order).send(order);
        expect(res3.status).toBe(200);
    });
    it('create method should create an order', async () => {
        const result = await orderS.create({
            user_id: 1,
            status: "complete"
        });
        // console.log(result);
        const order = {
            user_id: 1,
            status: "incomplete"
        };
        expect(result.status).toBe("complete");
        const res = await request.post('/order').set('token', token).send(order);
        // console.log(res.body);
        ;
        expect(res.status).toBe(200);
    });
    it('get order index', async () => {
        const result = await orderS.index();
        expect(result.length).toBeGreaterThan(0);
        const res = await request.get('/order').set('token', token);
        expect(res.status).toBe(200);
    });
    it('showw order', async () => {
        const result = await orderS.show(0);
        expect(result).not.toBeNull();
        const res = await request.get('/order/1').set('token', token);
        expect(res.status).toBe(200);
    });
    it('create method should create an order in order_product table', async () => {
        const result = await orderS.addProduct(1, 1, 3);
        // console.log(result);
    });
    afterAll(async () => {
        const orderProduct = {
            order_id: 1,
            product_id: 1,
            quantity: 3
        };
        const res = await request.post('/order/1/product').set('token', token).send(orderProduct);
        expect(res.status).toBe(200);
    });
});
