const pool = require('../Postgres/db.js');

const getProductList = (page = 1, count = 5, callback) => {
  const query = {
    text: 'SELECT * FROM product ORDER BY id limit $1 OFFSET $2',
    values: [count, (page * count - count)],
  }
  pool.query(query, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.rows);
    }
  });
};

const getProductFeatures = (product_id, callback) => {
  const query = {
    text: `SELECT
    json_build_object(
      'id', id,
      'name', name,
      'slogan', slogan,
      'description', description,
      'category', category,
      'default_price', default_price,
      'features', (
        SELECT coalesce(json_agg(features), '[]'::json)
        FROM (
          SELECT feature, value
          FROM features
          WHERE product_id = p.id
        ) as features
      )
    ) as product
    FROM product p WHERE id=$1`,
    values: [product_id],
  }
  pool.query(query, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.rows[0].product);
    }
  });
};

const getProductStyles = (product_id, callback) => {
  const query = {
    text: `SELECT json_build_object(
      'product_id', id,
      'results', (
        SELECT json_agg(styles)
        FROM (
          SELECT
          id AS "style_id",
          name,
          original_price,
          sale_price,
          default_style AS "default?",
          (
            SELECT json_agg(photos) AS photos
            FROM (
              SELECT
              thumbnail_url,
              url
              FROM photos WHERE styleId = styles.id
            ) AS photos
          ),
          (
            SELECT json_object_agg(
              id,
              json_build_object(
              'quantity', quantity,
              'size', size
              )
            ) FROM skus WHERE skus.styleId = styles.id
          ) AS skus
        FROM styles where styles.productId = product.id
        ) AS styles
      )
    ) AS product FROM product WHERE id = $1`,
    values: [product_id],
  }
  pool.query(query, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.rows);
    }
  });
};

const getRelatedProducts = (product_id, callback) => {
  const query = {
    text: 'SELECT json_agg(related_product_id) as related FROM related WHERE current_product_id = $1',
    values: [product_id],
  }
  pool.query(query, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.rows[0].related);
    }
  });
};

module.exports = {
  getProductList,
  getProductFeatures,
  getProductStyles,
  getRelatedProducts
};