const Category = require('../admin/categories/model/category');
const Product = require('../seller/model/Product');


// ! helper
const { truncate } = require('../../helper/truncate');

// ? desc ==> home page
// ? method ==> get 
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

// ? desc ==> contact us page
// ? method ==> get 
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

// ? desc ==> contact us page
// ? method ==> get 
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

// ? desc ==> all products page
// ? method ==> get 
exports.getAllProducts = async (req, res) => {
    try {

        // ! get items
        const categories = await Category.find();
        const products = await Product.find();

        res.render('public/pages/allProducts.ejs', {
            title: "محصولات",
            path: '/aboutUs',
            categories,
            auth,
            products,
            truncate
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> all products page
// ? method ==> get 
exports.getProduct = async (req, res) => {
    try {

        // ! get items
        const categories = await Category.find();
        const product = await Product.findOne({ slug: req.params.slug });
        product.view = product.view + 1;
        await product.save();
        const category = await Category.findOne({ _id: product.productCategory });

        res.render('public/pages/product.ejs', {
            title: "محصولات",
            path: '/aboutUs',
            categories,
            auth,
            product,
            truncate,
            category
        })
    } catch (err) {
        console.log(err.message);
    }
}