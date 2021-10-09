const { Router } = require('express');
const router = new Router();


//* controller
const userController = require('./homeController');

// *middleware
const { auth } = require('../../middleware/isLogged');

// * Routes
// ? desc ==> home page
// ? method ==> get 
router.get("/", auth, userController.home)

// ? desc ==> contact us page
// ? method ==> get 
router.get("/contactUs", auth, userController.contactUs)

// ? desc ==> contact us page
// ? method ==> get 
router.get("/aboutUs", auth, userController.aboutUs)

// ? desc ==> all products page
// ? method ==> get 
router.get("/allProducts", auth, userController.getAllProducts)

// ? desc ==>  product page
// ? method ==> get 
router.get("/product/:slug", auth, userController.getProduct)

// ? desc ==>  search input
// ? method ==> get 
router.post("/search", auth, userController.searchUser)

// ? desc ==>  blogs
// ? method ==> get 
router.get("/blogs", auth, userController.getBlogs)

// ? desc ==> detail blog
// ? method ==> get 
router.get("/blogDetail/:id", auth, userController.detailBlog)









module.exports = router;