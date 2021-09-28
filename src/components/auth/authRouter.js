const { Router } = require('express');
const router = new Router();


//* controller
const userController = require('./authController');

// * Routes
// ? desc ==> register page
// ? method ==> get
router.get("/register", userController.getRegisterUser)

// ? desc ==> register user
// ? method ==> post
router.post("/register", userController.RegisterUser)


// ? desc ==> login page
// ? method ==> get
router.get("/login", userController.getLoginUser)

// ? desc ==> login page
// ? method ==> post
router.post("/login", userController.LoginUser)

// ? desc ==> forgotpass
// ? method ==> get 
router.get("/forgotpass", userController.getForgotPassword)

// ? desc ==> forgotpass
// ? method ==> post 
router.post("/forgotpass", userController.forgotPassword)

// ? desc ==> reset pass
// ? method ==> get 
router.get("/resetpass", userController.getResetPassword)

// ? desc ==> reset pass
// ? method ==> post 
router.post("/resetpass", userController.resetPassword)



module.exports = router;