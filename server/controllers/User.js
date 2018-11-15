import dotenv from 'dotenv';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const User = {
  login(request, response, next) {
    const { email, password } = request.body;
    pool.query('SELECT * FROM users WHERE email= $1', [email], (err, res) => {
      if (err) return next(err);
      if ((res.rowCount < 1)) {
        return response.status(401).send({ 
          success: false,
          message: 'Could not login. Wrong Email or Password' });
      }
      bcrypt.compare(request.body.password, res.rows[0].password, (err, result) => {
        if (err) {
          return response.status(401).send({
            success: false,
            message: 'Could not login. Wrong Email or Password',
          });
        }
        if (result) {
          const userDetail = res.rows[0];
          const token = jwt.sign(userDetail, 'secretkey', {
            expiresIn: '1hr',
          });
          return response.status(200).send({
            success: true,
            message: 'login. Auth Successful',
            token,
          });
        }
        response.status(401).send({
          success: false,
          message: 'Could not login. Wrong Email or password',
        });
      });
    });
  },

  signup(request, response, next) {
    const {
      name, email, role, password,
    } = request.body;

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return response.status(501).json({ error: err });
      }

      // Check if mail exists
      pool.query('SELECT * FROM users WHERE email= $1', [email], (err, res) => {
        if (err) return next(err);
        if ((res.rowCount !== 0)) {
          return response.status(409).json({
            success: false,
            message: 'Mail Exists',
          });
        }

        // Insert new user
        pool.query('INSERT INTO users(name, email, role, password) VALUES($1, $2, $3, $4)', [name, email, role, hash], (err, res) => {
          if (err) {
            console.log(next(err));
            return next(err);
          }
          response.status(201).send({
            success: true,
            message: 'User Created!' 
          });
        });
      });
    });
  },
};
export default User;
