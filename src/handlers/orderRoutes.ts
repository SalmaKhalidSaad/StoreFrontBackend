import * as express from 'express';
import {Request,Response} from 'express';
import { order, orderStore } from '../models/orderStore'
import jwt from 'jsonwebtoken';

const orderS = new orderStore();
const index = async (_req: Request, res: Response) => {
  try{
    try{
      //amendment
      jwt.verify(_req.headers.token as unknown as string,(process.env.TOKEN_SECRET as unknown as string))
  
  }catch(er){
      res.status(401)
      res.json(`invalid token ${er}`)
      return
  }
    const p = await orderS.index()
    res.json(p)}
    catch(err){
      console.log(err);
      
    }
  }
  const show = async (req: Request, res: Response) => {
    try{
      //amendment
      jwt.verify(req.headers.token as unknown as string,(process.env.TOKEN_SECRET as unknown as string))
 
  }catch(er){
      res.status(401)
      res.json(`invalid token ${er}`)
      return
  }
     try{const p = await orderS.show(req.params.id as unknown as number)
     res.json(p)}
     catch(err){
      console.log(err);
      
    }
  }
  const create = async (req: Request, res: Response) => {
    const o: order = {
        
        user_id:req.body.user_id,
        status:req.body.status

        
    }
    try{
      //amendment
      jwt.verify(req.headers.token as unknown as string,(process.env.TOKEN_SECRET as unknown as string))
 
  }catch(er){
      res.status(401)
      res.json(`invalid token ${er}`)
      return
  }
  try {
    const newProfuct = await orderS.create(o)
    res.json(newProfuct)
} catch(err) {
    res.status(400)
    res.json(err)
}
}

const addProduct = async (req: Request, res: Response) => {
  const order_id:number=req.params.id as unknown as number;
  const product_id:number=req.body.product_id as unknown as number
  const quantity:number=(req.body.quantity as unknown as number)
  try{
    //amendment
    jwt.verify(req.headers.token as unknown as string,(process.env.TOKEN_SECRET as unknown as string))

}catch(er){
    res.status(401)
    res.json(`invalid token ${er}`)
    return
}
try {
  const addedProduct = await orderS.addProduct(order_id,product_id,quantity)
  res.json(addedProduct)
} catch(err) {
  res.status(400)
  res.json(err)
}
}

const orderRoutes = (app: express.Application) => {
    app.get('/order', index)
    app.get('/order/:id', show)
    app.post('/order', create)
    app.post('/order/:id/product',addProduct)
    
  }
  
  export default orderRoutes