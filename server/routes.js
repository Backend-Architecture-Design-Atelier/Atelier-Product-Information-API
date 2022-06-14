const controller = require('./controllers/index.js');
const router = require('express').Router();
require('dotenv').config();

// connect controllers to their corresponding routes
router.get('', controller.getProductList);

router.get('/:product_id', controller.getProductFeatures);

router.get('/:product_id/styles', controller.getProductStyles);

router.get('/:product_id/related', controller.getRelatedProducts);

router.get(`/${process.env.LOADER}`, (req, res) => {
  res.send(`${process.env.LOADER}`)
})

module.exports = router;