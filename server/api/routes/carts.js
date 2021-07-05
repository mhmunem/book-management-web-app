const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cart = require('../models/cart');
const Product = require('../models/product');

//Cart GET
router.get('/', (req, res, next) => {
  Cart
    .find()
    .select('productId productName qty price _id')
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


//Carts POST
router.post('/', (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'Product not Found'
        });
      }
      const cart = new Cart({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        productId: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Order stored',
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


//cartId GET
router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .select('product quantity _id')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          messsage: 'Order Not Found'
        });
      }
      res.status(200).json({
        order: order
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//cartId DELETE
router.delete('/:orderId', (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        messsge: 'Order deleted'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;