const express = require('express');
const router = require('./routes.js');
require('dotenv').config();

const app = express();
app.use(express.json());

// router
app.use('/products', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});