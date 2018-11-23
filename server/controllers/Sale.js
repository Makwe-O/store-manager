import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const Sale = {
  getAllSalesRecord(request, response, next) {
    pool.query('SELECT sales_record_id, name, product_name, price, sales_amount, date FROM sales_record INNER JOIN users USING (user_id) INNER JOIN products USING (product_id) ORDER BY sales_record_id ', (err, res) => {
      if (err) return next(err);
      response.status(200).send({
        success: true,
        sales_record: res.rows,
      });
    });
  },

  getOneSalesRecord(request, response, next) {
    const { id } = request.params;
    let found = false;
    pool.query('SELECT * FROM sales_record WHERE sales_record_id = $1', [id], (err, res) => {
      if (err) return next(err);
      if ((res.rowCount !== 0)) {
        found = true;
        return response.status(200).json({
          success: true,
          sale_record: res.rows[0],
        });
      }
      if (!found) {
        return response.status(404).send({
          success: false,
          message: 'No such record',
        });
      }
    });
  },
  createSalesRecord(request, response, next) {
    const {
      user_id, product_id, sales_amount,
    } = request.body;
    pool.query('INSERT INTO sales_record(user_id, product_id, sales_amount) VALUES($1, $2, $3)', [user_id, product_id, sales_amount], (err, res) => {
      if (err) return next(err);
      response.status(201).send({
        success: true,
        message: 'Sales Record Created!',
        sale_record: res.rows[0],
      });
    });
  },
};
export default Sale;
