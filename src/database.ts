import dotenv  from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    ENV,
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env 

var client:any;
console.log(ENV);

if(ENV=='dev'){
    client = new Pool({
        host: POSTGRES_HOST,
        database: POTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port:5432
        
    })
}
else{
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port:5432
    })
}
// else{client = new Pool({
//     host: POSTGRES_HOST,
//     database: POTGRES_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//     port:5432
    
// })}

export default client