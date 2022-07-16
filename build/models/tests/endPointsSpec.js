"use strict";
// import { user,usersStore } from "../userStore";
// import supertest from 'supertest';
// import app from '../../server'
// import { productStore } from "../productStore";
// import { response } from "express";
// import { orderStore } from "../orderStore";
// const userS=new usersStore();
// const request=supertest(app);
//  let token:string;
// const productS=new productStore();
// const orderS=new orderStore();
// describe("user Model", () => {
//     it('should have an index method', () => {
//       expect(userS.index).toBeDefined();
//     });
//     it('should have a show method', () => {
//       expect(userS.index).toBeDefined();
//     });
//     it('should have a create method', () => {
//         expect(userS.create).toBeDefined();
//       });
//      it('create method should create a user', async () => {
//        const result = await userS.create({
//             firstname:"blaaa",
//             lastname:"blabla",
//             password_digest:"12345"
//         });
//         console.log(result);
//         expect(result.firstname).toBe("blaaa");
//       }); 
//       beforeAll(async()=>{
//         const res = await request.post('/user')
//         // console.log(res.body);
//         token=res.body;
//           expect(res.status).toBe(200);
//       })
//      it('get user index', async () => {
//         const result = await userS.index();         
//          expect(result.length).toBeGreaterThan(0);
//          const res = await request.get('/user').set('token',token);
//           expect(res.status).toBe(200);
//        }); 
//        it('login ', async () => {
//         const result = await userS.authenticate('blaaa','blabla','12345');         
//          expect(result).not.toBeNull();
//          const res = await request.post('/user/login').set('token',token);
//           expect(res.status).toBe(200);
//        }); 
//        it('showw user', async () => {
//         const result = await userS.show(0);         
//          expect(result).not.toBeNull();
//          const res = await request.get('/user/0').set('token',token);
//           expect(res.status).toBe(200);
//        }); 
//        it('create method should create a product', async () => {
//         const result = await productS.create({
//              name:"nike shirt",
//              price:1002,
//              category:"clothes"
//          });
//          // console.log(result);
//          expect(result.price).toBe(1002);
//          const res = await request.post('/product').set('token',token);
//          // console.log(res.body);
//          ;
//            expect(res.status).toBe(200);
//        }); 
//        it('showw product', async () => {
//         const result = await productS.show(0);         
//          expect(result).not.toBeNull();
//          const res = await request.get('/product/1').set('token',token);
//           expect(res.status).toBe(200);
//        }); 
//        it('get product index', async () => {
//         const result = await productS.index();         
//          expect(result.length).toBeGreaterThan(0);
//          const res = await request.get('/product').set('token',token);
//           expect(res.status).toBe(200);
//        }); 
//        it('create method should create an order', async () => {
//         const result = await orderS.create({
//              user_id:1,
//              status:"complete"
//          });
//          // console.log(result);
//          expect(result.status).toBe("complete");
//          const res = await request.post('/product').set('token',token);
//          // console.log(res.body);
//          ;
//            expect(res.status).toBe(200);
//        }); 
//       it('get order index', async () => {
//         const result = await orderS.index();         
//          expect(result.length).toBeGreaterThan(0);
//          const res = await request.get('/order').set('token',token);
//           expect(res.status).toBe(200);
//        }); 
//        it('showw order', async () => {
//         const result = await orderS.show(0);         
//          expect(result).not.toBeNull();
//          const res = await request.get('/order/1').set('token',token);
//           expect(res.status).toBe(200);
//        }); 
//        it('create method should create an order in order_product table', async () => {
//         const result = await orderS.addProduct(1,1,3);
//          // console.log(result);
//        }); 
//        afterAll(async()=>{
//          const res = await request.post('/order/1/product').set('token',token);
//            expect(res.status).toBe(200);
//        })
//       });
