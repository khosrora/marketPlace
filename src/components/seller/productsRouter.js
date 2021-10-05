const { Router } = require('express');
const router = new Router();



//* controller
const productsController = require('./productsController');

// *middleware
const { auth } = require('../../middleware/isLogged');
const { isSeller } = require('../../middleware/isSeller');
const { uploadMultiple } = require('../../middleware/multer');







// * Routes
// ? desc ==> all product page
// ? method ==> get 
router.get("/", auth, isSeller, productsController.getallProduct)

// ? desc ==> create product page
// ? method ==> get 
router.get("/createProduct", auth, isSeller, productsController.getCreateProduct)

// ? desc ==> create product page
// ? method ==> post 
router.post("/createProduct", auth, isSeller, uploadMultiple, productsController.createProduct)

// ? desc ==> delete product 
// ? method ==> get 
router.get("/deleteProduct/:id", auth, isSeller, productsController.deleteProduct)

// ? desc ==> edit product 
// ? method ==> get 
router.get("/editProduct/:id", auth, isSeller, productsController.getEditProduct)

// ? desc ==> edit product 
// ? method ==> get 
router.post("/editProduct", auth, isSeller, productsController.editProduct)








module.exports = router;