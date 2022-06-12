const controller = require('./controllers/index.js');
const router = require('express').Router();

// connect controllers to their corresponding routes
router.get('', controller.getProductList);

router.get('/:product_id', controller.getProductFeatures);

router.get('/:product_id/styles', controller.getProductStyles);

router.get('/:product_id/related', controller.getRelatedProducts);

module.exports = router;