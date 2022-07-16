import client from '../database'
import * as bcrypt from 'bcrypt';
// @ts-ignore
import {pepper,saltRounds} from 's-salt-pepper';
 export type user={
id?: number;
firstname:string;
lastname:string;
password_digest:string;

}

export class usersStore{
  async create(u:user):Promise<user>{
    try{
     
        const sql='INSERT INTO users(firstname,lastname,password_digest) VALUES ($1,$2,$3) RETURNING *';
        // @ts-ignore
        const conn =await client.connect()
         const hash = bcrypt.hashSync(
          u.password_digest +  process.env.BCRYPT_PASSWORD, 
             parseInt(saltRounds)
          );
        const result = await conn.query(sql,[u.firstname,u.lastname,hash]);
        const newUser = result.rows[0]
        conn.release();
        return newUser;
    }
    catch(err){
        throw new Error(err as unknown as string);
    }
}
async index():Promise<user[]>{
  try{
  const conn =await client.connect()
  const sql='SELECT * from users;';
  const result= await conn.query(sql)
  conn.release()
  return result.rows
  }
  catch(err:any){
      console.log(err.stack);
      
      throw new Error(err as unknown as string);
  }
}
async show(id:number):Promise<user>{
  try{
      const sql='SELECT * FROM users where id=($1)';
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
     
      async authenticate(firstname: string,lastname:string, password: string): Promise<user | null> {
      try{
        console.log("PASSWORD:"+password);
        const conn = await client.connect()
        const sql = 'SELECT password_digest FROM users WHERE firstname=($1) and lastname=($2);'
    
        const result = await conn.query(sql, [firstname,lastname])
   
    console.log("PEPPER:"+ process.env.BCRYPT_PASSWORD);
    
        console.log("password and pepper: "+password+ process.env.BCRYPT_PASSWORD)
        console.log("length returned: "+result.rows.length);
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+ process.env.BCRYPT_PASSWORD, user.password_digest)) {
           
            
            return user
          }
        }
    
        return null
      
      }
      catch(err){
        console.log(err as unknown as string);
        return null;
        
      }
      }

}