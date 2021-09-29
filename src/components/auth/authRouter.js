const { Router } = require('express');
const router = new Router();


//* controller
const userController = require('./authController');

// *middleware
const { isLogged, auth } = require('../../middleware/isLogged');


// * Routes
// ? desc ==> register page
// ? method ==> get
router.get("/register", auth, isLogged, userController.getRegisterUser)

// ? desc ==> register user
// ? method ==> post
router.post("/register", auth, isLogged, userController.RegisterUser)

// ? desc ==> active account page
// ? method ==> get
router.get("/activeAccount", auth, isLogged, userController.getActiveAccount)

// ? desc ==> active account user
// ? method ==> post
router.post("/activeAccount", isLogged, userController.ActiveAccount)

// ? desc ==> login page
// ? method ==> get
router.get("/login", auth, isLogged, userController.getLoginUser)

// ? desc ==> login page
// ? method ==> post
router.post("/login", auth, isLogged, userController.LoginUser)

// ? desc ==> forgotpass
// ? method ==> get 
router.get("/forgotpass", auth, isLogged, userController.getForgotPassword)

// ? desc ==> forgotpass
// ? method ==> post 
router.post("/forgotpass", auth, isLogged, userController.forgotPassword)

// ? desc ==> reset pass
// ? method ==> get 
router.get("/resetpass", auth, isLogged, userController.getResetPassword)

// ? desc ==> reset pass
// ? method ==> post 
router.post("/resetpass", auth, isLogged, userController.resetPassword)

// ? desc ==> send Code
// ? method ==> get 
router.get("/sendCode", auth, isLogged, userController.getSendCode)

// ? desc ==> send Code
// ? method ==> post 
router.post("/sendCode", auth, isLogged, userController.sendCode)

// ? desc ==> log out user
// ? method ==> get 
router.get("/logout", auth, userController.logout)



module.exports = router;