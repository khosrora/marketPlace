const { Router } = require('express');
const router = new Router();


//* controller
const adminController = require('./adminController');

// *middleware
const { auth } = require('../../../middleware/isLogged');
const { isAdmin } = require('../../../middleware/isAdmin');

// * Routes
// ? desc ==> dashboard user
// ? method ==> get
router.get("/index", auth, isAdmin, adminController.index);






module.exports = router;