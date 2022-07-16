import client from "../database"

export type order={
    id?: Number;
    user_id:number;
    status:string;
}
export class orderStore{
   
    async show(userid:number):Promise<order>{
        try{
            const sql='SELECT * FROM orders where user_id=($1)';
            // @ts-ignore
            const conn =await client.connect()
            const result = await conn.query(sql,[userid]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(err as unknown as string);
        }
    }

    async index():Promise<order[]>{
        try{
        const conn =await client.connect()
        const sql='SELECT * from orders;';
        const result= await conn.query(sql)
        conn.release()
        return result.rows
        }
        catch(err:any){
            console.log(err.stack);
            
            throw new Error(err as unknown as string);
        }
      }

      async create(o:order):Promise<order>{
        try{
          
            const sql='INSERT INTO orders(user_id,status) VALUES ($1,$2) RETURNING *';
            // @ts-ignore
            const conn =await client.connect()
            const result = await conn.query(sql,[o.user_id,o.status]);
            const book = result.rows[0]
            conn.release();
            return book;
        }
        catch(err){
            throw new Error(err as unknown as string);
        }
    }
   
    async addProduct(order_id:number,product_id:number,quantity:number):Promise<order>{
       try{ const sql='INSERT INTO orderproduct(order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *'
            // @ts-ignore
            const conn =await client.connect()
            const result = await conn.query(sql,[order_id,product_id,quantity]);
            const orderProd = result.rows[0]
            conn.release();
            return orderProd;
        }
        catch(err){
            // console.log(err);
            
            throw new Error(err as unknown as string)
    }
}
   
}