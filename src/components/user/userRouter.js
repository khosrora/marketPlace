const { Router } = require('express');
const router = new Router();


//* controller
const userController = require('./userController');

// *middleware
const { auth } = require('../../middleware/isLogged');

// * Routes
// ? desc ==> site setting page
// ? method ==> get
router.get("/myaccount", auth, userController.getAccountPage)

// ? desc ==> edit User
// ? method ==> post
router.post("/editUser", auth, userController.editUser)

// ? desc ==> edit User
// ? method ==> post
router.post("/createTiket", auth, userController.createTiket)






module.exports = router;