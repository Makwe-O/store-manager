import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


const Category = {
  getAllCategory(request, response, next) {
    pool.query('SELECT * FROM categories ORDER BY category_id ', (err, res) => {
      if (err) return next(err);
      response.status(200).send({
        success: 'true',
        categories: res.rows,
      });
    });
  },
  getOneCategory(request, response, next) {
    const { id } = request.params;
    let found = false;
    pool.query('SELECT * FROM categories WHERE category_id = $1', [id], (err, res) => {
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
          message: 'No such category found',
        });
      }
    });
  },
  createCategory(request, response, next) {
    const { categoryName } = request.body;
    pool.query('SELECT * FROM categories WHERE category_name= $1', [categoryName], (err, res) => {
      if (err) return next(err);
      if ((res.rowCount !== 0)) {
        return response.status(409).json({
          success: 'false',
          message: 'Category already exists',
        });
      }
      pool.query('INSERT INTO categories(category_name) VALUES($1)', [categoryName], (err, res) => {
        if (err) return next(err);
        return response.status(201).json({
          success: 'true',
          message: 'Category Created!',
        });
      });
    });
  },
  modifyCategory(request, response, next) {
    const { id } = request.params;

    const { category_name } = request.body;
    const keys = ['category_name'];

    const feilds = [];

    keys.forEach((key) => {
      if (request.body[key]) feilds.push(key);
    });

    feilds.forEach((feild, index) => {
      pool.query(`Update categories SET ${feild}=($1) WHERE category_id=($2)`, [request.body[feild], id], (err, res) => {
        if (err) return next(err);

        if (index === feilds.length - 1) {
          response.status(200).send({
            success: 'true',
            message: 'Product Updated successfully',
          });
        }
      });
    });
  },
  deleteCategory(request, response, next) {
    const { id } = request.params;
    pool.query('DELETE FROM categories WHERE category_id=($1)', [id], (err, res) => {
      if (err) return next(err);
      response.status(200).send({
        success: 'true',
        message: 'Category Deleted Successfully',
      });
    });
  },
};
export default Category;
