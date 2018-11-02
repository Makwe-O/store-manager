import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

export const insertTables = () => {
  pool.query(`INSERT INTO products(name, price, quantity) VALUES ('DELL inspiron', '2000', '1')`);
  pool.query(`INSERT INTO products(name, price, quantity) VALUES ('Sony SPS', '3000', '2')`);
  pool.query(`INSERT INTO sales_record(product_name, buyers_name, price, amount) VALUES ('DELL inspiron', 'Peter', '2000', '3')`);
  pool.query(`INSERT INTO sales_record(product_name, buyers_name, price, amount) VALUES ('Sony SPS', 'David', '30000', '4')`);
  pool.query(`INSERT INTO users(name, email, role, password) VALUES ('Ope', 'ope@yahoo.com', 'Attendant', 'qwerty123')`);
  pool.query(`INSERT INTO users(name, email, role, password) VALUES ('Mmakwe', 'jide@yahoo.com', 'Admin', 'qwerty')`);
  pool.query(`INSERT INTO categories(category_name) VALUES ('clothes')`);
};
require('make-runnable');
