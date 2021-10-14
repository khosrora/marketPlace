const User = require('./model/User');
const Tiket = require('./model/Tiket');
const Seller = require('../admin/store/model/Seller');
const Category = require('../admin/categories/model/category');
const Comment = require('./model/comment');
const Product = require('../seller/model/Product');
const Blog = require('../blog/model/Blog');
const Cart = require('../cart/model/Cart');


// * helper
const { jalaliMoment } = require('../../helper/jalali');
const { truncate } = require('../../helper/truncate');
const { createId } = require('../../helper/nonoId');

// ? desc ==> dashboard user
// ? method ==> get
exports.getAccountPage = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;

        const categories = await Category.find();
        const blogs = await Blog.find({ user: user._id })

        res.render("public/user/dashboard", {
            title: "پنل کاربری",
            breadCrumb: "پنل کاربری",
            path: "/account",
            auth,
            message: req.flash("success_msg"),
            user,
            categories,
            blog: blogs.length,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> edit User
// ? method ==> get
exports.getEditUser = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;
        const categories = await Category.find();

        res.render("public/user/editUser", {
            title: "ویرایش حساب کاربری",
            breadCrumb: "ویرایش حساب کاربری",
            path: "/account",
            auth,
            message: req.flash("success_msg"),
            user,
            categories,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> edit User
// ? method ==> post
exports.editUser = async (req, res) => {
    try {
        // !get items 
        req.body = { ...req.body }
        console.log(req.body);
        // ! get user
        const user = req.user;
        // ! update user
        await User.findOneAndUpdate({ _id: user.id }, {
            ...req.body
        })
        //! send message
        req.flash("success_msg", "مشخصات شما با موفقیت ویرایش شد")
        res.redirect("/user/myaccount")

    } catch (err) {
        console.log(err.message);
    }
}



// ? desc ==> tikets User
// ? method ==> get
exports.getTiketsUser = async (req, res) => {
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        // ! get User && tikets
        const user = req.user;
        const numberOftikets = await Tiket.find().countDocuments();
        const tikets = await Tiket.find({ user: user.id }).sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage);
        const categories = await Category.find()

        res.render("public/user/tikets", {
            title: "پیام های شما",
            breadCrumb: "پیام های شما",
            path: "/tikets",
            auth,
            message: req.flash("success_msg"),
            user,
            categories,
            tikets,
            jalaliMoment,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOftikets,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOftikets / postPerPage),
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> address user
// ? method ==> get
exports.getAddressUser = async (req, res) => {

    try {

        // ! get User && tikets
        const user = req.user;
        const categories = await Category.find();

        res.render("public/user/address", {
            title: "آدرس کاربر",
            breadCrumb: "آدرس کاربر",
            path: "/addressUser",
            auth,
            message: req.flash("success_msg"),
            user,
            categories
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> create tiket
// ? method ==> get
exports.getCreateTiket = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;
        const categories = await Category.find();

        res.render("public/user/createTiket", {
            title: "ارسال پیام",
            breadCrumb: "ارسال پیام",
            path: "/createTiket",
            auth,
            message: req.flash("success_msg"),
            user,
            categories
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> create tiket
// ? method ==> post
exports.createTiket = async (req, res) => {
    try {
        // ! get items
        const { title, text } = req.body;
        if (!title, !text) {
            req.flash("success_msg", "پیام شما ارسال نشد لطفا تمام مقادیر را کامل کنید");
            return res.redirect("/user/createTiket")
        }
        // !get user
        const user = req.user;
        // ! create Tiket 
        Tiket.create({
            title, text, user: user.id
        })
        // ! send message
        req.flash("success_msg", "پیام شما ارسال شد");
        res.redirect("/user/tiketsUser")
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> request User
// ? method ==> get
exports.getRequestStore = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;
        const categories = await Category.find();

        res.render("public/user/requestStore", {
            title: "تقاضای فروشندگی",
            breadCrumb: "فرم تقاضای فروشندگی",
            path: "/requestStore",
            auth,
            message: req.flash("success_msg"),
            user,
            categories
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> request User
// ? method ==> post
exports.requestStore = async (req, res) => {
    const errors = [];
    // ! get user
    const user = req.user;
    try {
        // !get items 
        req.body = { ...req.body }
        // ! check user
        if (user.isSeller) {
            req.flash("success_msg", "شما پیام فروشندگی را ارسال کرده اید");
            return res.redirect("/user/requestStore")
        }
        // ! validation
        await Seller.sellerValidate(req.body);

        // ! create store
        Seller.create({
            ...req.body, user: user.id, code: createId()
        })
        // ! user edit
        user.isSeller = true;
        await user.save();
        // ! send message
        req.flash("success_msg", "درخواست فروشندگی ارسال شد . تا اطلاع ثانوی شما نمیتوانید درخواست جدید ارسال کنید");
        res.redirect("/user/myaccount")
    } catch (err) {
        console.log(err.message);
        errors.push({
            message: err.message
        })
        return res.render("public/user/requestStore", {
            title: "تقاضای فروشندگی",
            breadCrumb: "فرم تقاضای فروشندگی",
            path: "/requestStore",
            auth,
            message: req.flash("success_msg"),
            user,
            errors
        })
    }
}

// ? desc ==> comment User
// ? method ==> post
exports.comment = async (req, res) => {
    try {
        // !get items 
        const { text, productId } = req.body;
        const product = await Product.findOne({ _id: productId })
        const user = req.user;

        // ! validation
        if (!text) {
            req.flash("success_msg", "لطفا نظر خود را بنویسید");
            return res.redirect(`/product/${product.slug}`);
        }
        // ! create comment
        await Comment.create({
            text, user: user._id, product: productId
        })

        req.flash("success_msg", "پیام شما ارسال شد");
        return res.redirect(`/product/${product.slug}`);

    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> orders User
// ? method ==> get
exports.getOrdersUser = async (req, res) => {
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        // ! get User & categories
        const user = req.user;
        const categories = await Category.find();

        // ! get orders user
        const numberOforders = await Cart.find().countDocuments();
        const orders = await Cart.find({ user: user._id }).sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage);

        res.render("public/user/ordersUser", {
            title: "سفارشات کاربر",
            breadCrumb: "سفارشات شما",
            path: "/ordersUser",
            auth,
            message: req.flash("success_msg"),
            user,
            categories,
            orders,
            jalaliMoment,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOforders,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOforders / postPerPage),
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> addToFav User
// ? method ==> get
exports.addToFav = async (req, res) => {
    try {
        // ! user
        const user = req.user;
        await User.findByIdAndUpdate({ _id: user._id }, {
            $push: { fav: req.params.id }
        })
        res.writeHead(303, { Location: req.headers.referer });
        res.end();
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> addToFav User
// ? method ==> get
exports.wishList = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const categories = await Category.find();
        var products = await Product.find({ _id: user.fav });
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