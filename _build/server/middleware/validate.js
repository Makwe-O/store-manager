'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validate = {
  isValidEmail: function isValidEmail(req, res, next) {
    var emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ig;
    if (emailRegex.test(req.body.email).trim().toLowercase()) {
      res.status(400).send({
        success: false,
        message: 'Enter correct email'
      });
      return;
    }
    next();
  },
  isValidPassword: function isValidPassword(req, res, next) {
    if (req.body.password.trim().length < 5) {
      res.status(400).send({
        success: false,
        message: 'Password must be 5 characters long'
      });
      return;
    }
    next();
  },
  emptyValueSales: function emptyValueSales(req, res, next) {
    if (!req.body.product_name) {
      res.status(400).send({
        success: false,
        message: 'Product name cannot be blank'
      });
      return;
    }
    if (!req.body.price) {
      res.status(400).send({
        success: false,
        message: 'Price cannot be blank'
      });
      return;
    }
    if (typeof req.body.price !== 'number') {
      res.status(400).send({
        success: false,
        message: 'Price is not a number'
      });
      return;
    }
    if (!req.body.buyers_name) {
      res.status(400).send({
        success: false,
        message: 'Buyers name cannot be empty'
      });
      return;
    }
    if (!req.body.amount) {
      res.status(400).send({
        success: false,
        message: 'Amount cannot be empty'
      });
      return;
    }
    if (typeof req.body.amount !== 'number') {
      res.status(400).send({
        success: false,
        message: 'Amount is not a number'
      });
      return;
    }
    next();
  },
  emptyValueProduct: function emptyValueProduct(req, res, next) {
    if (!req.body.name) {
      res.status(400).send({
        success: false,
        message: 'Name cannot be empty'
      });
      return;
    }
    if (!req.body.price) {
      res.status(400).send({
        success: false,
        message: 'Price cannot be empty'
      });
      return;
    }
    if (!Number.isInteger(req.body.price)) {
      res.status(400).send({
        success: false,
        message: 'Price is not a number'
      });
      return;
    }
    if (req.body.price < 1) {
      res.status(400).send({
        success: false,
        message: 'Price cannot be less than 1'
      });
      return;
    }

    if (!req.body.quantity) {
      res.status(400).send({
        success: false,
        message: 'Quantity cannot be empty'
      });
      return;
    }
    if (!Number.isInteger(req.body.quantity)) {
      res.status(400).send({
        success: false,
        message: 'Quantity is not a number'
      });
      return;
    }
    if (req.body.quantity < 1) {
      res.status(400).send({
        success: false,
        message: 'Quantity cannot be less than 1'
      });
      return;
    }
    next();
  },
  emptyValueCategory: function emptyValueCategory(req, res, next) {
    if (req.body.category_name) {
      next();
    } else {
      res.status(400).send({
        success: false,
        message: 'Category name cannot be empty'
      });
    }
  },
  checkRoleAdmin: function checkRoleAdmin(req, res, next) {
    if (req.token.role === 'Admin') {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: 'Please sign in as admin'
      });
    }
  },
  checkRoleAttendant: function checkRoleAttendant(req, res, next) {
    if (req.token.role === 'Attendant') {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: 'Please sign in as store attendant'
      });
    }
  }
};
exports.default = validate;