const { Router } = require('express');
const router = new Router();


//* controller
const userController = require('./userController');

// *middleware
const { auth } = require('../../middleware/isLogged');

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

// ? desc ==> edit User
// ? method ==> post
router.post("/requestStore", auth, userController.requestStore)






module.exports = router;