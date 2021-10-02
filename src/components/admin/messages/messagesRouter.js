const { Router } = require('express');
const router = new Router();


//* controller
const messagesController = require('./messagesController');

// *middleware
const { auth } = require('../../../middleware/isLogged');
const { isAdmin } = require('../../../middleware/isAdmin');

// * Routes
// ? desc ==> contact us page
// ? method ==> get
router.get("/getContactUs", auth, isAdmin, messagesController.getContactUs);

// ? desc ==> single contact us page
// ? method ==> get
router.get("/singleContactUs/:id", auth, isAdmin, messagesController.getSingleContactUs);

// ? desc ==> tiket us page
// ? method ==> get
router.get("/getTikets", auth, isAdmin, messagesController.getTikets);

// ? desc ==> single tiket us page
// ? method ==> get
router.get("/singleTikets/:id", auth, isAdmin, messagesController.getSingleTiket);

// ? desc ==> see tiket user
// ? method ==> get
router.get("/seeTiket/:id", auth, isAdmin, messagesController.seeTiket);



module.exports = router;