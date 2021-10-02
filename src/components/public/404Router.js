const { Router } = require('express');
const router = new Router();
const Category = require('../admin/categories/model/category');


// *middleware
const { auth } = require('../../middleware/isLogged');

// * Routes
// ? desc ==> 404 page
// ? method ==> get 
router.get("/", auth, async (req, res) => {
    try {
        const categories = await Category.find();
        res.render("public/pages/404", {
            title: "صفحه 404",
            path: '/404',
            auth,
            categories
        })
    } catch (err) {
        console.log(err.message);
    }
})


module.exports = router;