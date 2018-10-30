import { Pool } from 'pg';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const User = {
  login(request, response, next) {
    const { email, password } = request.body;
    pool.query('SELECT * FROM users WHERE email= $1', [email], (err, res) =>{
    if (err) return next(err);
    if ((res.rowCount < 1)) {
      return response.status(401).send({message: "Could not login. Wrong Email or Password"});
    }
    bcrypt.compare(request.body.password, res.rows[0].password, (err, result) =>{
      if (err) {
        return response.status(401).send({
          message: "Could not login. Wrong Email or Password"
        });
      }
      if (result) {
        return response.status(200).send({
          message: "login. Auth Successful"
        });
      }
      response.status(401).send({
        message: "Could not login. Wrong Email or password"
      });
    });
  })
    // const admin = { id: 3 };
    // const token = jwt.sign({ admin }, 'my_secret_key');
    // res.json({
    //   token,
    // });
  },

  signup(request, response, next) {
    const { name, email, password } = request.body;

    // Hash password
    bcrypt.hash( password, 10, (err, hash) =>{
      if(err){
        return response.status(501).json({error:err});
      }else{

        // Check if mail exists
        pool.query('SELECT * FROM users WHERE email= $1', [email], (err, res) =>{
          if (err) return next(err);
          if ((res.rowCount !== 0)) {
          return response.status(409).json({message: "Mail Exists"});
          } else{

            // Insert new user
            pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', [name, email, hash], (err, res) => {
            if (err) { 
              console.log(next(err))
              return next(err);
            }
            response.status(201).send({ message: 'User Created!' });
            });
          }
        })     
      }
    })   
  },
};
export default User;
