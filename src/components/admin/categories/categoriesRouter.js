const { Router } = require('express');
const router = new Router();


//* controller
const categoriesController = require('./categoriesController');

// *middleware
const { auth } = require('../../../middleware/isLogged');
const { isAdmin } = require('../../../middleware/isAdmin');

// * Routes
// !category 
// ? desc ==> createCategory
// ? method ==> get
router.get("/createCategory", auth, isAdmin, categoriesController.getCreateCategory);

// ? desc ==> createCategory
// ? method ==> post
router.post("/createCategory", auth, isAdmin, categoriesController.createCategory);

// ? desc ==> allCreateCategory
// ? method ==> get
router.get("/allCreateCategory", auth, isAdmin, categoriesController.allCreateCategory);

// ? desc ==>  delete Category
// ? method ==> get
router.get("/deleteCategory/:id", auth, isAdmin, categoriesController.deleteCategory);

// ? desc ==>  edit category Item
// ? method ==> get
router.get("/editCategory/:id", auth, isAdmin, categoriesController.getEditCategory);

// ? desc ==>  edit category Item
// ? method ==> post
router.post("/editCategory/:id", auth, isAdmin, categoriesController.editCategory);

// !category Item
// ? desc ==> category Item
// ? method ==> get
router.get("/createCategoryItem", auth, isAdmin, categoriesController.getCreateCategoryItem);

// ? desc ==> category Item
// ? method ==> post
router.post("/createCategoryItem", auth, isAdmin, categoriesController.createCategoryItem);

// ? desc ==> category Item
// ? method ==> get
router.get("/allCreateCategoryItem", auth, isAdmin, categoriesController.allCreateCategoryItem);

// ? desc ==>  delete category Item
// ? method ==> get
router.get("/deleteCategoryItem/:id", auth, isAdmin, categoriesController.deleteCategoryItem);



// !category tag
// ? desc ==> tag Item
// ? method ==> get
router.get("/createtag", auth, isAdmin, categoriesController.getCreatetag);

// ? desc ==> tag Item
// ? method ==> post
router.post("/createtag", auth, isAdmin, categoriesController.createCreatetag);

// ? desc ==> tag Item
// ? method ==> get
router.get("/alltag", auth, isAdmin, categoriesController.alltag);

// ? desc ==>  delete tag Item
// ? method ==> get
router.get("/deletetag/:id", auth, isAdmin, categoriesController.deletetag);



module.exports = router;