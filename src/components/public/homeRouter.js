const { Router } = require('express');
const router = new Router();


//* controller
const userController = require('./homeController');

// * Routes
router.get("/", userController.home)







module.exports = router;