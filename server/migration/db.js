import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
export const createTables = () => {
  pool.query(
    `CREATE TABLE IF NOT EXISTS
      categories(
        category_id serial PRIMARY KEY,
        category_name character varying(100) NOT NULL
      )`,
  );

  pool.query(
    `CREATE TABLE IF NOT EXISTS
      products(
        product_id serial PRIMARY KEY,
        product_image character varying(50) NOT NULL,
        product_name character varying(50) NOT NULL,
        price INT NOT NULL,
        category_id INT REFERENCES categories(category_id),
        quantity INT NOT NULL
      )`,
  );

  pool.query(
    `CREATE TABLE IF NOT EXISTS
      users(
        user_id serial PRIMARY KEY,
        name character varying(50) NOT NULL,
        email character varying(100) NOT NULL,
        role character varying(50) NOT NULL,
        password character varying(100) NOT NULL
      )`,
  );

  pool.query(
    `CREATE TABLE IF NOT EXISTS
          sales_record(
            sales_record_id serial PRIMARY KEY,
            user_id INT REFERENCES users(user_id),
            product_id INT REFERENCES products(product_id),
            sales_amount INT NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`,
  );
};

/**
 * Drop Tables
 */
export const dropTables = () => {
  const queryTextProducts = 'DROP TABLE IF EXISTS products, sales_record, users, categories';
  pool.query(queryTextProducts)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
require('make-runnable');
