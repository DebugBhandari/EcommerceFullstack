CREATE DATABASE backend_integrify;
--\c into backend_integrify
CREATE TABLE person(
    user_id SERIAL PRIMARY KEY,
    fullName text,
    email text,
    isAdmin BOOLEAN,
    imageUrl text
);
CREATE TABLE product(
    product_id SERIAL PRIMARY KEY,
    name text,
    brand text,
    category text,
    description text,
    price int,
    countInStock int
);
CREATE TABLE order(
    order_id SERIAL PRIMARY KEY,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES person(user_id),
    product_id int,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);