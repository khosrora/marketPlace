const { Router } = require('express');
const router = new Router();


//* controller
const settingController = require('./settingController');

// * Routes
// ? desc ==> site setting page
// ? method ==> get
router.get("/setting", settingController.getSettingPage)





module.exports = router;