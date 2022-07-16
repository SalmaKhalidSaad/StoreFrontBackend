# Storefront Backend Project


## Installation steps
database host: 127.0.0.1
//amendment
database port:5432
server port: 3000
tables in database:
//amendment
-table name:orders columns:id SERIAL PRIMARY key,user_id bigint REFERENCES users(id),status varchar
-table name:products columns:id SERIAL PRIMARY key,name varchar,price integer,category varchar
-table name:users columns:id SERIAL PRIMARY key, firstname varchar,lastname varchar,password_digest varchar
-table name:order_product columns:order_id bigint REFERENCES orders(id),product_id bigint REFERENCES products(id),quantity number
run "npm install" in terminal ,
substitue the user im using "ssaad" with the local user you have in database.json and .env files
run the following in terminal:
"psql -U postgres"
"CREATE DATABASE project2"
run "db-migrate up"

## Instructions

Project has three tables: Users, products and orders
To start the project, run the command "npm run start"
In order to create a user using post man
a post request should be made with the url "http://localhost:3000/user"
with body containing id, firstName,lastName,password_digest
ex
{
    "id":1,
    "firstName":"laila",
    "lastName":"khaledSaad",
    "password_digest":"123"
}

The response will have a token which should be used with the rest of the endpoints so we should save it somewhere
The rest of the endpoints can be tested using the endpoints available in each route(src-handlers) also the body variables
if used would be found in the functions created in the routes classes as well.
*endpoints for user:
-POST:http://localhost:3000/user
body:{
    id,firstname,lastname,password_digest
}
-GET:http://localhost:3000/user
body:{
    token
}
to get all rows in table users
-GET:http://localhost:3000/user/:id
body:{
    token
}
to get a row in table users
-GET:http://localhost:3000/user/login
body:{
    firstname,lastname,password_digest,token
}

*endpoints for products:
-GET:http://localhost:3000/product
to get all products in table products
-GET:http://localhost:3000/product/:id
to get a product in table products
-POST:http://localhost:3000/product
body:{
    id,name,price,category,token
}

*endpoints for orders:
-GET:http://localhost:3000/order
to get all orders in table orders
-GET:http://localhost:3000/order/:id
body:{
    token
}
to get a product in table products
-POST:http://localhost:3000/order
body:{
    id,user_id,status
}
to add order to table

*endpoints for order_product:
-POST:http://localhost:3000/order/:id/product
body:{
    order_id, product_id, quantity, token
}


To run Jasmine tests, 
first change the ENV in .env to test 
create locally the test database using 
"psql -U postgres"
command "npm run test2" should be run


