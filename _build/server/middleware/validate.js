'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var validate = {
  emptyValueSales: function emptyValueSales(req, res, next) {
    if (!req.body.productName) {
      res.status(400).send({ message: 'Product name is blank' });
      return;
    }
    if (!req.body.price) {
      res.status(400).send({ message: 'Price is blank' });
      return;
    }
    if (typeof req.body.price !== 'number') {
      res.status(400).send({ message: 'Price is not a number' });
      return;
    }
    if (!req.body.buyersName) {
      res.status(400).send({ message: 'Buyers name is blank' });
      return;
    }
    if (!req.body.amount) {
      res.status(400).send({ message: 'Amount is blank' });
      return;
    }
    if (typeof req.body.amount !== 'number') {
      res.status(400).send({ message: 'Amount is not a number' });
      return;
    }
    next();
  },
  emptyValueProduct: function emptyValueProduct(req, res, next) {
    if (!req.body.name) {
      res.status(400).send({ message: 'Name is blank' });
      return;
    }
    if (!req.body.price) {
      res.status(400).send({ message: 'Price is blank' });
      return;
    }
    if (typeof req.body.price !== 'number') {
      res.status(400).send({ message: 'Price is not a number' });
      return;
    }
    if (!req.body.quantity) {
      res.status(400).send({ message: 'Quantity is blank' });
    }
    next();
  }
};
exports.default = validate;