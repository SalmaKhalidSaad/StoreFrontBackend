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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt = __importStar(require("bcrypt"));
// @ts-ignore
const s_salt_pepper_1 = require("s-salt-pepper");
class usersStore {
    async create(u) {
        try {
            const sql = 'INSERT INTO users(firstname,lastname,password_digest) VALUES ($1,$2,$3) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const hash = bcrypt.hashSync(u.password_digest + process.env.BCRYPT_PASSWORD, parseInt(s_salt_pepper_1.saltRounds));
            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
            const newUser = result.rows[0];
            conn.release();
            return newUser;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * from users;';
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
            const sql = 'SELECT * FROM users where id=($1)';
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
    async authenticate(firstname, lastname, password) {
        try {
            console.log("PASSWORD:" + password);
            const conn = await database_1.default.connect();
            const sql = 'SELECT password_digest FROM users WHERE firstname=($1) and lastname=($2);';
            const result = await conn.query(sql, [firstname, lastname]);
            console.log("PEPPER:" + process.env.BCRYPT_PASSWORD);
            console.log("password and pepper: " + password + process.env.BCRYPT_PASSWORD);
            console.log("length returned: " + result.rows.length);
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(user);
                if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password_digest)) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}
exports.usersStore = usersStore;
