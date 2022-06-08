DROP DATABASE IF EXISTS AtelierProducts;
CREATE DATABASE AtelierProducts;

DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR NOT NULL,
  product_slogan VARCHAR NOT NULL,
  product_description TEXT NOT NULL,
  product_category VARCHAR NOT NULL,
  default_price VARCHAR NOT NULL
);

DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  product_feature VARCHAR NOT NULL,
  product_value VARCHAR NOT NULL
);

DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  product_name VARCHAR NOT NULL,
  sale_price VARCHAR,
  original_price VARCHAR NULL,
  default_style BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS images CASCADE;
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles(id),
  image_url TEXT,
  thumbnail_url TEXT
);

DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles(id),
  sku_size TEXT,
  sku_quantity TEXT
);

DROP TABLE IF EXISTS related CASCADE;
CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INT REFERENCES products(id),
  related_product_id INT NOT NULL
);