import { Pool } from 'pg';
import dotenv from 'dotenv';



dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});



const Sale = {
  getAllSalesRecord(request, response, next) {
    pool.query('SELECT * FROM sales_record ORDER BY sales_record_id ', (err, res) => {
      if (err) return next(err);
      response.status(200).send(res.rows);
    });
  },

  getOneSalesRecord(request, response, next) {
    const { id } = request.params;
    let found = false;
    pool.query('SELECT * FROM sales_record WHERE sales_record_id = $1', [id], (err, res) => {
      if (err) return next(err);
      if ((res.rowCount !== 0)) {
        found = true;
        return response.status(200).json(res.rows[0]);
      }
      if (!found) return response.status(404).send({ message: 'No such record' });
    });
  },
  createSalesRecord(request, response, next) {
    const {product_name, buyers_name, price, amount} = request.body;
      pool.query('INSERT INTO sales_record(product_name, buyers_name, price, amount) VALUES($1, $2, $3, $4)', [product_name, buyers_name, price, amount], (err, res) => {
        if (err) return next(err);
        response.status(201).send({ message: 'Sales Record Created!' });
      });
     
    },
};
export default Sale;
