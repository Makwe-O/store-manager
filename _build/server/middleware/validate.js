'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var validate = {
  emptyValueSales: function emptyValueSales(req, res, next) {
    if (!req.body.product_name) {
      res.status(400).send({ message: 'Product name cannot be blank' });
      return;
    }
    if (!req.body.price) {
      res.status(400).send({ message: 'Price cannot be blank' });
      return;
    }
    if (typeof req.body.price !== 'number') {
      res.status(400).send({ message: 'Price is not a number' });
      return;
    }
    if (!req.body.buyers_name) {
      res.status(400).send({ message: 'Buyers name cannot be blank' });
      return;
    }
    if (!req.body.amount) {
      res.status(400).send({ message: 'Amount cannot be blank' });
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
      res.status(400).send({ message: 'Name cannot be blank blank' });
      return;
    }
    if (!req.body.price) {
      res.status(400).send({ message: 'Price cannot be blank blank' });
      return;
    }
    if (typeof req.body.price !== 'number') {
      res.status(400).send({ message: 'Price is not a number' });
      return;
    }
    if (!req.body.quantity) {
      res.status(400).send({ message: 'Quantity cannot be blank' });
      return;
    }
    if (typeof req.body.quantity !== 'number') {
      res.status(400).send({ message: 'Quantity is not a number' });
      return;
    }
    next();
  },
  emptyValueCategory: function emptyValueCategory(req, res, next) {
    if (req.body.category_name) {
      next();
    } else {
      res.status(400).send({ message: 'Category name cannot be blank' });
    }
  },

  // checkEmail(req, res, next) {
  //   if (req.body.email == `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`) {
  //     next();
  //   } else {
  //     res.status(400).json({
  //       message: 'Wrong pattern for email',
  //     });
  //   }
  // },
  checkRoleAdmin: function checkRoleAdmin(req, res, next) {
    if (req.token.role === 'Admin') {
      next();
    } else {
      res.status(401).json({ message: 'Please sign in as admin' });
    }
  },
  checkRoleAttendant: function checkRoleAttendant(req, res, next) {
    if (req.token.role === 'Attendant') {
      next();
    } else {
      res.status(401).json({ message: 'Please sign in as store attendnt' });
    }
  }
};
exports.default = validate;