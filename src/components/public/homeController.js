const Category = require('../admin/categories/model/category');


exports.home = async (req, res) => {
    try {


        const categories = await Category.find();

        res.render('public/pages/index.ejs', {
            title: "صفحه اصلی",
            path: '/',
            auth,
            categories
        })

    } catch (err) {
        console.log(err.message);
    }
}

exports.contactUs = async (req, res) => {

    try {

        const categories = await Category.find();

        res.render('public/pages/contactUs.ejs', {
            title: "صفحه تماس با ما",
            path: '/contactUs',
            auth,
            categories,
            message: req.flash("success_msg"),
        })

    } catch (err) {
        console.log(err.message);
    }
}

exports.aboutUs = async (req, res) => {
    try {

        const categories = await Category.find();

        res.render('public/pages/aboutUs.ejs', {
            title: "صفحه درباره ما",
            path: '/aboutUs',
            categories,
            auth,
        })
    } catch (err) {
        console.log(err.message);
    }
}