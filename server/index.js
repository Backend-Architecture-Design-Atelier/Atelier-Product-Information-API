const express = require('express');
const router = require('./routes.js');
require('dotenv').config();

const app = express();
app.use(express.json());

// router
app.use('/products', router);

app.get(`/${process.env.LOADER}`, (req, res) => {
  res.send(`${process.env.LOADER}`);
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
});