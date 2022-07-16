
import { user,usersStore } from "../models/userStore"
import * as express from 'express';
import {Request,Response} from 'express';
import * as jwt from 'jsonwebtoken'

const userS =new usersStore();

const create = async (req: Request, res: Response) => {
    try {
        const u: user = {
            id:req.body.id,
            firstname: req.body.firstname,
            lastname:req.body.lastname,
            password_digest:req.body.password_digest,
          
            
        }
        console.log( "TOKEEEN:"+ process.env.TOKEN_SECRET);
        
      

        const newUser = await userS.create(u);
       
        var token=jwt.sign({user:newUser},(process.env.TOKEN_SECRET as unknown as string));
        res.json(token )
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const authenticate=async (req:Request,res:Response)=>{
    try{
        const u:user={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            password_digest:req.body.password_digest
        }
        try{
            //amendment
            jwt.verify(req.headers.token as unknown as string,(process.env.TOKEN_SECRET as unknown as string))
       
        }catch(er){
            res.status(401)
            res.json(`invalid token ${er}`)
            return
        }
        const newUser=await userS.authenticate(u.firstname,u.lastname,u.password_digest);
        
        res.json(newUser)
    }catch(err){
        res.status(400)
        res.json(err)
    }

   
}
const index = async (_req: Request, res: Response) => {
   
    try{
        //amendment
        jwt.verify(_req.headers.token as unknown as string,(process.env.TOKEN_SECRET as unknown as string))
   
    }catch(er){
        res.status(401)
        res.json(`invalid token ${er}`)
        return
    }
    try{const u = await userS.index()
    res.json(u)}
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
   try{ const b = await userS.show(req.params.id as unknown as number)
     res.json(b)}
     catch(err){
        console.log(err);
        
      }
  }
  
const userRoutes= (app: express.Application) =>{
    app.post('/user',create)
    app.post('/user/login',authenticate)
    app.get('/user', index)
    app.get('/user/:id', show)

}
export default userRoutes;