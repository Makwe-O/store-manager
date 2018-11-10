'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});

var Category = {
  getAllCategory: function getAllCategory(request, response, next) {
    pool.query('SELECT * FROM categories ORDER BY category_id ', function (err, res) {
      if (err) return next(err);
      response.status(200).send({
        success: true,
        categories: res.rows
      });
    });
  },
  getOneCategory: function getOneCategory(request, response, next) {
    var id = request.params.id;

    var found = false;
    pool.query('SELECT * FROM categories WHERE category_id = $1', [id], function (err, res) {
      if (err) return next(err);
      if (res.rowCount !== 0) {
        found = true;
        return response.status(200).json({
          success: true,
          product: res.rows[0]
        });
      }
      if (!found) {
        return response.status(404).send({
          success: false,
          message: 'No such category found'
        });
      }
    });
  },
  createCategory: function createCategory(request, response, next) {
    var category_name = request.body.category_name;

    pool.query('SELECT * FROM categories WHERE category_name= $1', [category_name], function (err, res) {
      if (err) return next(err);
      if (res.rowCount !== 0) {
        return response.status(409).json({
          success: false,
          message: 'Category already exists'
        });
      }
      pool.query('INSERT INTO categories(category_name) VALUES($1)', [category_name], function (err, res) {
        if (err) return next(err);
        return response.status(201).json({
          success: true,
          message: 'Category Created!'
        });
      });
    });
  },
  modifyCategory: function modifyCategory(request, response, next) {
    var id = request.params.id;
    var categoryName = request.body.categoryName;

    var keys = ['category_name'];

    var feilds = [];

    keys.forEach(function (key) {
      if (request.body[key]) feilds.push(key);
    });

    feilds.forEach(function (feild, index) {
      pool.query('Update categories SET ' + feild + '=($1) WHERE category_id=($2)', [request.body[feild], id], function (err, res) {
        if (err) return next(err);

        if (index === feilds.length - 1) {
          response.status(200).send({
            success: true,
            message: 'Category Updated successfully'
          });
        }
      });
    });
  },
  deleteCategory: function deleteCategory(request, response, next) {
    var id = request.params.id;

    pool.query('DELETE FROM categories WHERE category_id=($1)', [id], function (err, res) {
      if (err) return next(err);
      response.status(200).send({
        success: true,
        message: 'Category Deleted Successfully'
      });
    });
  }
};
exports.default = Category;