CREATE TABLE orderproduct(

order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id),
quantity INTEGER
);