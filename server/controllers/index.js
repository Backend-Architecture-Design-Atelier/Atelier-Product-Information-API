const db = require('../models/index.js');

const getProductList = (req, res) => {
  let { page, count } = req.query;
  db.getProductList(page, count, (err, result) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(result);
    }
  });
};

const getProductFeatures = (req, res) => {
  const { product_id } = req.params;
  db.getProductFeatures(product_id, (err, result) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(result);
    }
  });
};

const getProductStyles = (req, res) => {
  const { product_id } = req.params;
  db.getProductStyles(product_id, (err, result) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(result);
    }
  });
};

const getRelatedProducts = (req, res) => {
  const { product_id } = req.params;
  db.getRelatedProducts(product_id, (err, result) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports = {
  getProductList,
  getProductFeatures,
  getProductStyles,
  getRelatedProducts
};