DROP DATABASE IF EXISTS atelierproducts WITH (FORCE);
CREATE DATABASE atelierproducts;

\c atelierproducts;

DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR(250) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  default_price VARCHAR(30) NOT NULL
);

CREATE INDEX product_id_index ON product USING HASH (id);

DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id),
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50)
);

CREATE INDEX features_product_id_index ON features USING HASH (product_id);

DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  productId INT REFERENCES product(id),
  name VARCHAR(50) NOT NULL,
  sale_price VARCHAR(20),
  original_price VARCHAR(30) NOT NULL,
  default_style BOOLEAN NOT NULL
);

CREATE INDEX styles_productId_index ON styles USING HASH (productId);

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  styleId INT REFERENCES styles(id),
  url TEXT,
  thumbnail_url TEXT
);

CREATE INDEX photos_styleId_index ON photos USING HASH (styleId);

DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  styleId INT REFERENCES styles(id),
  size VARCHAR NOT NULL,
  quantity VARCHAR NOT NULL
);

CREATE INDEX skus_styleId_index ON skus USING HASH (styleId);

DROP TABLE IF EXISTS related CASCADE;
CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INT REFERENCES product(id),
  related_product_id INT NOT NULL
);

CREATE INDEX related_current_product_id_index ON related USING HASH (current_product_id);

COPY product FROM '/Users/hansolo/HackReactor 2204/SDC/SDC-Products/Data/product.csv' DELIMITER ',' CSV Header;
COPY features FROM '/Users/hansolo/HackReactor 2204/SDC/SDC-Products/Data/features.csv' DELIMITER ',' CSV Header;
COPY styles FROM '/Users/hansolo/HackReactor 2204/SDC/SDC-Products/Data/styles.csv' DELIMITER ',' CSV Header;
COPY photos FROM '/Users/hansolo/HackReactor 2204/SDC/SDC-Products/Data/photos.csv' DELIMITER ',' CSV Header;
COPY skus FROM '/Users/hansolo/HackReactor 2204/SDC/SDC-Products/Data/skus.csv' DELIMITER ',' CSV Header;
COPY related FROM '/Users/hansolo/HackReactor 2204/SDC/SDC-Products/Data/related.csv' DELIMITER ',' CSV Header;
