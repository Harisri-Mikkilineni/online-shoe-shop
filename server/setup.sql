
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS checkout;


 CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      mobile_number VARCHAR(15),
      address VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

 CREATE TABLE password_reset_codes(
     id SERIAL PRIMARY KEY,
      code VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );     

CREATE TABLE products(
     id SERIAL PRIMARY KEY,
     product_name VARCHAR(255) NOT NULL,
     product_price NUMERIC NOT NULL,
     product_image_url VARCHAR(255),
     product_description VARCHAR(255)
);

 CREATE TABLE checkout(
      id SERIAL PRIMARY KEY,
      cardholder_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      card_number VARCHAR(255) NOT NULL,
      billing_address VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

INSERT INTO products (product_name, product_price, product_image_url, product_description)
VALUES('Flying shoes', 50, 'https://images.unsplash.com/photo-1593892992762-4f2450d24f73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80', 'Butterfly Heels');
