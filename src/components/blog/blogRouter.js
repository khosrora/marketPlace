const { Router } = require('express');
const router = new Router();


// ! controller
const blogController = require('./blogController');

// ! middleware
const { auth } = require('../../middleware/isLogged');
const { upload } = require('../../middleware/multerSingle');


// ? desc ==> create blog 
// ? method ==> get 
router.get("/createBlog", auth, blogController.getCreateBlog)

// ? desc ==> create blog 
// ? method ==> post 
router.post("/createBlog", auth, upload.single("image"), blogController.createBlog)




module.exports = router;