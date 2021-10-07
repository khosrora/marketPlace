const { Router } = require('express');
const router = new Router();


//* controller
const cartController = require('./cartController.js');

// *middleware
const { auth } = require('../../middleware/isLogged');

// * Routes
// ? desc ==> cart  page
// ? method ==> get 
router.get("/cart", auth, cartController.cart)







module.exports = router;