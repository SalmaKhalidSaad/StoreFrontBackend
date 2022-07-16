import client from "../database"

export type product={
    id?: Number;
    name:string;
    price:number;
    category:string;
    
}
export class productStore{
    async index():Promise<product[]>{
        try{
        const conn =await client.connect()
        const sql='SELECT * from products;';
        const result= await conn.query(sql)
        conn.release()
        return result.rows
        }
        catch(err:any){
            console.log(err.stack);
            
            throw new Error(err as unknown as string);
        }
    }
    async show(id:number):Promise<product>{
        try{
            const sql='SELECT * FROM products where id=($1)';
            // @ts-ignore
            const conn =await client.connect()
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(err as unknown as string);
        }
    }

    async create(p:product):Promise<product>{
        try{
           
            const sql='INSERT INTO products(name,price,category) VALUES ($1,$2,$3) RETURNING *';
            // @ts-ignore
            const conn =await client.connect()
            const result = await conn.query(sql,[p.name,p.price,p.category]);
            const newProduct = result.rows[0]
            conn.release();
            return newProduct;
        }
        catch(err){
            console.log(err);
            
            throw new Error(err as unknown as string);
        }
    }
   
}