import * as express from 'express';
import {Request,Response} from 'express';
import { product, productStore } from '../models/productStore'
import jwt from 'jsonwebtoken'

const productS = new productStore()

const index = async (_req: Request, res: Response) => {
 try{
  const p = await productS.index()
  res.json(p)}
  catch(err){
    console.log(err);
    
  }
}
const show = async (req: Request, res: Response) => {
  try{
   const p = await productS.show(req.params.id as unknown as number)
   res.json(p)}
   catch(err){
     console.log(err);
     
   }
}

const create = async (req: Request, res: Response) => {
    
        const p: product = {
            
            name:req.body.name,
            price:req.body.price,
            category:req.body.category

            
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
        const newProfuct = await productS.create(p)
        res.json(newProfuct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}



const productRoutes = (app: express.Application) => {
  app.get('/product', index)
  app.get('/product/:id', show)
  app.post('/product', create)
  
}

export default productRoutes