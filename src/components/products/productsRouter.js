const { Router } = require('express');
const router = new Router();


//* controller
const productsController = require('./productsController');

// *middleware
const { auth } = require('../../middleware/isLogged');

// * Routes
// ? desc ==> create product page
// ? method ==> get 
router.get("/", auth, userController.home)







module.exports = router;