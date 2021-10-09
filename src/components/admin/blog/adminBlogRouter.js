const { Router } = require('express');
const router = new Router();


// ! controller
const adminBlogController = require('./adminBlogController');

// ! middleware
const { auth } = require('../../../middleware/isLogged');


// ? desc ==> all blog is show 
// ? method ==> get 
router.get("/ShowBlogs", auth, adminBlogController.getShowBlog)

// ? desc ==> not show blogs
// ? method ==> get 
router.get("/notShowBlogs", auth, adminBlogController.getNotShowBlog)

// ? desc ==> detail blog
// ? method ==> get 
router.get("/detailBlog/:id", auth, adminBlogController.getDetailBlog)

// ? desc ==> show or not show blog
// ? method ==> get 
router.get("/isShow/:id", auth, adminBlogController.isShowBlog)





module.exports = router;