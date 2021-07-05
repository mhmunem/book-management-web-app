const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Importing routes 
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const cartRoutes = require('./api/routes/carts');

//MongoDB Atlas connection via Mongoose
const db = 'mongodb+srv://moon-store:moon-store@moon-store.zndih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));;

//Morgan setup and bodyParser setup
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Headers for Differnt purposes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'),
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  if (res.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/carts', cartRoutes);
//Not Found and 404 errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;