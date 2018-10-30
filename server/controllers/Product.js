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
        message:"true",
        products: res.rows
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
        return response.status(200).json(res.rows[0]);
      }
      if (!found) return response.status(404).send({ message: 'No such record' });
    });

  },
  createProduct(request, response, next) {
    const {
      name, price, quantity,
    } = request.body;
    pool.query('INSERT INTO products(name, price, quantity) VALUES($1, $2, $3)', [name, price, quantity], (err, res) => {
      if (err) return next(err);
      response.status(201).send({ message: 'Product Created!' });
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
      pool.query( `Update products SET ${feild}=($1) WHERE id=($2)`, [request.body[feild], id], (err, res) => {
          if (err) return next(err);

          if (index === feilds.length - 1)response.status(200).send({ message: 'Product Updated successfully' });
        },
      );
    });


    // res.status(200).send({
    //   message: 'Updated product',
    // });
  },


  deleteProduct(request, response, next) {
    const { id } = request.params;
    pool.query('DELETE FROM products WHERE id=($1)', [id], (err, res) => {
      if (err) return next(err);
      response.status(200).send({ message: 'Product Deleted Successfully' });
    });
    // res.status(200).send({
    //   message: 'Product deleted',
    // });
  },
};
export default Product;
