"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userStore_1 = require("../userStore");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const productStore_1 = require("../productStore");
const userS = new userStore_1.usersStore();
const request = (0, supertest_1.default)(server_1.default);
let token;
const productS = new productStore_1.productStore();
describe("user Model", () => {
    it('should have an index method', () => {
        expect(userS.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(userS.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(userS.create).toBeDefined();
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
            firstname: "salma",
            lastname: "khaled",
            password_digest: "12345"
        };
        const res = await request.post('/user').send(user);
        // console.log(res.body);
        token = res.body;
        expect(res.status).toBe(200);
    });
    it('get user index', async () => {
        const result = await userS.index();
        expect(result.length).toBeGreaterThan(0);
        const res = await request.get('/user').set('token', token);
        expect(res.status).toBe(200);
    });
    it('login ', async () => {
        const result = await userS.authenticate('blaaa', 'blabla', '12345');
        expect(result).not.toBeNull();
        const res = await request.post('/user/login').set('token', token);
        expect(res.status).toBe(200);
    });
    it('showw user', async () => {
        const result = await userS.show(0);
        expect(result).not.toBeNull();
        const res = await request.get('/user/0').set('token', token);
        expect(res.status).toBe(200);
    });
});
