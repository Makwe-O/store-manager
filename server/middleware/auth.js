import jwt from 'jsonwebtoken';

const authenticate = {
  ensureToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      jwt.verify(bearerToken, 'secretkey', (err, decoded) => {
        // console.log(decoded)
        if (err) {
          return res.status(401).json({message: 'Please Sign in with the right token' });
        }
        req.token = decoded;
        next();
      });
    } else {
      res.status(403).send({ message: 'You do not have Permission' });
    }
  },
};
export default authenticate;
