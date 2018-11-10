import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const Product = {
  getAllProduct(request, response, next) {
    pool.query('SELECT * FROM products ORDER BY id ', (err, res) => {
      if (err) return next(err);
      response.status(200).send({
        success: true,
        products: res.rows,
      });
    });
  },
  getOneProduct(request, response, next) {
    const { id } = request.params;
    let found = false;
    pool.query('SELECT * FROM products WHERE id = $1', [id], (err, res) => {
      if (err) return next(err);
      if ((res.rowCount !== 0)) {
        found = true;
        return response.status(200).json({
          success: 'true',
          product: res.rows[0],
        });
      }
      if (!found) {
        return response.status(404).send({
          success: 'False',
          message: 'No such record',
        });
      }
    });
  },
  createProduct(request, response, next) {
    const {
      name, price, quantity,
    } = request.body;
    pool.query('SELECT * FROM products WHERE name= $1', [name], (err, res) => {
      if (err) return next(err);
      if ((res.rowCount !== 0)) {
        return response.status(409).json({
          success: false,
          message: 'Product already exists',
        });
      }
      pool.query('INSERT INTO products(name, price, quantity) VALUES($1, $2, $3)', [name, price, quantity], (err, res) => {
        if (err) return next(err);
        response.status(201).json({
          success: true,
          message: 'Product Created!',
          products: res.rows,
        });
      });
    });
  },
  modifyProduct(request, response, next) {
    const { id } = request.params;

    const { name, price, quantity } = request.body;

    const keys = ['name', 'price', 'quantity'];

    const feilds = [];

    keys.forEach((key) => {
      if (request.body[key]) feilds.push(key);
    });

    feilds.forEach((feild, index) => {
      pool.query(`Update products SET ${feild}=($1) WHERE id=($2)`, [request.body[feild], id], (err, res) => {
        if (err) return next(err);

        if (index === feilds.length - 1)response.status(200).send({ message: 'Product Updated successfully' });
      });
    });
  },


  deleteProduct(request, response, next) {
    const { id } = request.params;
    pool.query('DELETE FROM products WHERE id=($1)', [id], (err, res) => {
      if (err) return next(err);
      response.status(200).send({ message: 'Product Deleted Successfully' });
    });
  },
};
export default Product;
