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

// ? desc ==> dashboard seller
// ? method ==> get
router.get("/dashboardSeller", auth, isSeller, productsController.getDashboardSeller)

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

// ? desc ==> order Seller 
// ? method ==> get 
router.get("/orderSeller", auth, isSeller, productsController.getOrderSeller)

// ? desc ==> detail Order 
// ? method ==> get 
router.get("/detailOrder/:code", auth, isSeller, productsController.getDetailOrder)

// ? desc ==>is send product
// ? method ==> get 
router.get("/isSend/:code", auth, isSeller, productsController.isSendProduct)








module.exports = router;