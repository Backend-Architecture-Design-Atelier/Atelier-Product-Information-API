const pool = require('../Postgres/db.js');

const getProductList = (page = 1, count = 5, callback) => {
  const query = {
    text: 'SELECT * FROM product WHERE id > $1 ORDER BY id limit $2',
    values: [count * (page - 1), count],
  };
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
    text: `SELECT json_build_object(
      id,
      name,
      slogan,
      description,
      category,
      default_price,
      'features', (SELECT coalesce(json_agg(features), '[]'::json)
        FROM (SELECT feature, value FROM features WHERE product_id = $1) as features
      )
    ) as productfeatures
    FROM product WHERE id = $1`,
    values: [product_id],
  };
  pool.query(query, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.rows[0].productfeatures);
    }
  });
};

const getProductStyles = (product_id, callback) => {
  const query = {
    text: `SELECT json_build_object(
      'product_id', id,
      'results', (SELECT json_agg(styles)
        FROM (SELECT
          id AS "style_id",
          name,
          original_price,
          sale_price,
          default_style AS "default?",
          (SELECT json_agg(photos) AS photos
            FROM (SELECT thumbnail_url, url
            FROM photos WHERE styleId = styles.id) AS photos),
          (SELECT json_object_agg(
              id, json_build_object(quantity,size)
          ) FROM skus WHERE skus.styleId = styles.id
          ) AS skus FROM styles where styles.productId = $1
        ) AS styles
      )
    ) AS productstyles FROM product WHERE id = $1`,
    values: [product_id],
  };
  pool.query(query, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.rows[0].productstyles);
    }
  });
};

const getRelatedProducts = (product_id, callback) => {
  const query = {
    text: 'SELECT json_agg(related_product_id) as related FROM related WHERE current_product_id = $1',
    values: [product_id],
  };
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