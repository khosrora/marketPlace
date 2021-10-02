const { Router } = require('express');
const router = new Router();


//* controller
const sellerController = require('./sellerController');

// *middleware
const { auth } = require('../../../middleware/isLogged');

// * Routes
// ? desc ==> get sellers
// ? method ==> get
// ? ADMIN
router.get("/sellers", auth, sellerController.getSellers)

// ? desc ==> get active sellers
// ? method ==> get
// ? ADMIN
router.get("/activeSellers", auth, sellerController.getActiveSellers)

// ? desc ==>  active seller
// ? method ==> get
// ? ADMIN
router.get("/activeSellers/:id", auth, sellerController.ActiveSellers)

// ? desc ==> get Deactive sellers
// ? method ==> get
// ? ADMIN
router.get("/deActveSellers", auth, sellerController.getDeActiveSellers)

// ? desc ==>  Deactive seller
// ? method ==> get
// ? ADMIN
router.post("/deActveSellers/:id", auth, sellerController.DeActiveSellers)

// ? desc ==>  detail seller
// ? method ==> get
// ? ADMIN
router.get("/sellerDetails/:id", auth, sellerController.getSellerDetails)




module.exports = router;