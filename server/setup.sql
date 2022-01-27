
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS products;


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
     product_price NUMERIC NOT NULL
);

