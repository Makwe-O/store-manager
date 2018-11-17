import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const Product = {
  getAllProduct(request, response, next) {
    pool.query('SELECT product_id, product_image, product_name, price, category_name, quantity FROM products INNER JOIN categories USING (category_id) ORDER BY product_id ', (err, res) => {
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
    pool.query('SELECT product_id, product_image, product_name, price, category_name, quantity FROM products INNER JOIN categories USING (category_id) WHERE product_id = $1', [id], (err, res) => {
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
      image, name, price, category, quantity,
    } = request.body;
    pool.query('SELECT * FROM products WHERE product_name= $1', [name], (err, res) => {
      if (err) return next(err);
      if ((res.rowCount !== 0)) {
        return response.status(409).json({
          success: false,
          message: 'Product already exists',
        });
      }
      pool.query('INSERT INTO products(product_image, product_name, price, category_id, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *', [image, name, price, category, quantity], (err, res) => {
        if (err) return next(err);
        response.status(201).json({
          success: true,
          message: 'Product Created!',
          products: res.rows[0],
        });
      });
    });
  },
  modifyProduct(request, response, next) {
    const { id } = request.params;

    const {
 image, name, price, category, quantity 
} = request.body;

    const keys = ['product_image', 'product_name', 'price', 'category_id', 'quantity'];

    const feilds = [];

    keys.forEach((key) => {
      if (request.body[key]) feilds.push(key);
    });

    feilds.forEach((feild, index) => {
      pool.query(`Update products SET ${feild}=($1) WHERE product_id=($2)`, [request.body[feild], id], (err, res) => {
        if (err) return next(err);

        if (index === feilds.length - 1)response.status(200).send({ message: 'Product Updated successfully' });
      });
    });
  },


  deleteProduct(request, response, next) {
    const { id } = request.params;
    pool.query('DELETE FROM products WHERE product_id=($1)', [id], (err, res) => {
      if (err) return next(err);
      response.status(200).send({ message: 'Product Deleted Successfully' });
    });
  },
};
export default Product;
