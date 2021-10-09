const Category = require('../admin/categories/model/category');
const Product = require('../seller/model/Product');
const Comment = require('../user/model/comment');
const Blog = require('../blog/model/Blog');


// ! helper
const { truncate } = require('../../helper/truncate');
const { jalaliMoment } = require('../../helper/jalali');

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
        const user = req.user;
        const categories = await Category.find();
        const product = await Product.findOne({ slug: req.params.slug });
        product.view = product.view + 1;
        await product.save();
        const category = await Category.findOne({ _id: product.productCategory });
        const comments = await Comment.find({ product: product._id }).populate("user").sort({ createdAt: -1 });

        res.render('public/pages/product.ejs', {
            title: "محصولات",
            path: '/aboutUs',
            categories,
            auth,
            product,
            truncate,
            category,
            user,
            comments,
            jalaliMoment,
            message: req.flash("success_msg")
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==>  search input
// ? method ==> get 
exports.searchUser = async (req, res) => {
    try {
        // ! get body
        const { idCatetory } = req.body;
        // ! get items
        const categories = await Category.find();
        const products = await Product.find({ productCategory: idCatetory })

        return res.render('public/pages/allProducts.ejs', {
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

// ? desc ==>  blogs
// ? method ==> get 
exports.getBlogs = async (req, res) => {
    try {

        // ! get blogs is show === true
        const blogs = await Blog.find({ isShow: true }).populate("user");
        // ! get items
        const categories = await Category.find();
        return res.render('public/pages/allBlogs.ejs', {
            title: "محصولات",
            path: '/aboutUs',
            breadCrumb: "بلاگ ها",
            categories,
            auth,
            blogs,
            truncate,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> detail blog
// ? method ==> get 
exports.detailBlog = async (req, res) => {
    try {
        // ! find blog
        const categories = await Category.find();
        const blog = await Blog.findOne({ _id: req.params.id }).populate("user")
        return res.render('public/pages/blog.ejs', {
            title: "محصولات",
            path: '/aboutUs',
            breadCrumb: "جزئیات بلاگ ",
            categories,
            auth,
            blog,
            truncate,
            jalaliMoment
        })

    } catch (err) {
        console.log(err.message);
    }
}