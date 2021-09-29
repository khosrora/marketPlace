const { Router } = require('express');
const router = new Router();


//* controller
const contactController = require('./contactController.js');

// *middleware
const { auth } = require('../../middleware/isLogged');

// * Routes
// ? desc ==> contact us page
// ? method ==> post 
router.post("/contactUs", auth, contactController.contactUs)







module.exports = router;