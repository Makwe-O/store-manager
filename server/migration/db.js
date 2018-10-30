const { Pool } = require('pg');
const dotenv = require('dotenv');

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
const createTables = () => {
  pool.query(
    `CREATE TABLE IF NOT EXISTS
      products(
        id serial PRIMARY KEY,
        name character varying(50) NOT NULL,
        price INT NOT NULL,
        quantity INT NOT NULL
      )`);
    
  pool.query(  
    `CREATE TABLE IF NOT EXISTS
      users(
        user_id serial PRIMARY KEY,
        name character varying(50) NOT NULL,
        email character varying(100) NOT NULL,
        password character varying(100) NOT NULL
      )`);

      pool.query(
        `CREATE TABLE IF NOT EXISTS
          sales_record(
            sales_record_id serial PRIMARY KEY,
            product_name character varying(100) NOT NULL,
            buyers_name character varying(100) NOT NULL,
            price INT NOT NULL,
            amount INT NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`);
  
    // pool.query(queryTextProducts)
    //   .then((res) => {
    //     console.log(res);
    //     pool.end();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     pool.end();
    //   });
    // pool.query(queryTextUsers)
    //   .then((res) => {
    //     console.log(res);
    //     pool.end();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     pool.end();
    //   });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryTextProducts = 'DROP TABLE IF EXISTS products, sales_record, users';
  pool.query(queryTextProducts)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
};

require('make-runnable');