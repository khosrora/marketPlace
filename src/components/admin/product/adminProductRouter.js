const { Router } = require('express');
const router = new Router();


// ! controller
const adminProductController = require('./adminProductController');

// ! middleware
const { auth } = require('../../../middleware/isLogged');


// ? desc ==> all prooducts is show 
// ? method ==> get 
router.get("/showProducts", auth, adminProductController.getShowproducts)

// ? desc ==> all prooducts is not show 
// ? method ==> get 
router.get("/notshowProducts", auth, adminProductController.getNotShowproducts)

// ? desc ==> show or not show produc 
// ? method ==> get 
router.get("/isShowProduct/:id", auth, adminProductController.isAcceptProduct)

// ? desc ==> detailProduct
// ? method ==> get 
router.get("/detailProduct/:id", auth, adminProductController.getDetailProduct)






module.exports = router;