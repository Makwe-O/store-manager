
const validate = {
  emptyValueSales(req, res, next) {
    if (!req.body.product_name) {
      res.status(400).send({ message: 'Product name cannot be blank' });
      return;
    }
    if (!req.body.price) {
      res.status(400).send({ message: 'Price cannot be blank' });
      return;
    }
    if (typeof (req.body.price) !== 'number') {
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
    if (typeof (req.body.amount) !== 'number') {
      res.status(400).send({ message: 'Amount is not a number' });
      return;
    }
    next();
  },
  emptyValueProduct(req, res, next) {
    if (!req.body.name) {
      res.status(400).send({ message: 'Name cannot be blank blank' });
      return;
    }
    if (!req.body.price) {
      res.status(400).send({ message: 'Price cannot be blank blank' });
      return;
    }
    if (typeof (req.body.price) !== 'number') {
      res.status(400).send({ message: 'Price is not a number' });
      return;
    }
    if (!req.body.quantity) {
      res.status(400).send({ message: 'Quantity cannot be blank' });
      return;
    }
    if (typeof (req.body.quantity) !== 'number') {
      res.status(400).send({ message: 'Quantity is not a number' });
      return;
    }
    next();
  },
  emptyValueCategory(req, res, next) {
    if (req.body.categoryName) {
      next();
    } else {
      res.status(400).send({ message: 'Category name cannot be blank' });
    }
  },
  checkRoleAdmin(req, res, next) {
    if (req.token.role === 'Admin') {
      next();
    } else {
      res.status(401).json({ message: 'Please sign in as admin' });
    }
  },
  checkRoleAttendant(req, res, next) {
    if (req.token.role === 'Attendant') {
      next();
    } else {
      res.status(401).json({ message: 'Please sign in as store attendnt' });
    }
  },


};
export default validate;
