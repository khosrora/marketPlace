const { Router } = require('express');
const router = new Router();


//* controller
const userController = require('./userController');

// *middleware
const { auth } = require('../../middleware/isLogged');
const { upload } = require('../../middleware/multerSingle');


// * Routes
// ? desc ==> dashboard user
// ? method ==> get
router.get("/myaccount", auth, userController.getAccountPage)

// ? desc ==> tikets User
// ? method ==> get
router.get("/tiketsUser", auth, userController.getTiketsUser)

// ? desc ==> address user
// ? method ==> get
router.get("/addressuser", auth, userController.getAddressUser)


// ? desc ==> edit User
// ? method ==> get
router.get("/edituser", auth, userController.getEditUser)

// ? desc ==> edit User
// ? method ==> post
router.post("/editUser", auth, userController.editUser)

// ? desc ==> create tiket
// ? method ==> get
router.get("/createTiket", auth, userController.getCreateTiket)

// ? desc ==> edit User
// ? method ==> post
router.post("/createTiket", auth, userController.createTiket)

// ? desc ==> request User
// ? method ==> get
router.get("/requestStore", auth, userController.getRequestStore)

// ? desc ==> request User
// ? method ==> post
router.post("/requestStore", auth, userController.requestStore)

// ? desc ==> comment User
// ? method ==> post
router.post("/comment", auth, userController.comment)


// ? desc ==> orders User
// ? method ==> get
router.get("/carts", auth, userController.getOrdersUser)






module.exports = router;