const { Router } = require('express');
const router = new Router();


//* controller
const cartController = require('./cartController.js');

// *middleware
const { auth } = require('../../middleware/isLogged');

// * Routes
// ? desc ==> cart  page
// ? method ==> get 
router.get("/cart", auth, cartController.cart);

// ? desc ==> payment user
// ? method ==> get 
router.get("/payment", auth, cartController.payment);

// ? desc ==> payment user
// ? method ==> get 
router.get("/verifyPayment", auth, cartController.verifyPayment);







module.exports = router;