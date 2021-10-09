const Product = require('../../seller/model/Product');


// ! helper
const { jalaliMoment } = require('../../../helper/jalali');

// ? desc ==> all prooducts is show 
// ? method ==> get 
exports.getShowproducts = async (req, res) => {
    try {

        // ! find show Products  
        const user = req.user;
        const products = await Product.find({ isAccept: true }).populate("seller")

        return res.render("admin/products/showProducts", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "محصولات تایید شده",
            user,
            products,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> all prooducts is not show 
// ? method ==> get 
exports.getNotShowproducts = async (req, res) => {
    try {

        // ! find show Products  
        const user = req.user;
        const products = await Product.find({ isAccept: false }).populate("seller")

        return res.render("admin/products/notShowProducts", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "محصولات تایید نشده",
            user,
            products,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> show or not show produc 
// ? method ==> get 
exports.isAcceptProduct = async (req, res) => {
    try {
        // ! find show Products  
        const product = await Product.findOne({ _id: req.params.id });

        if (product.isAccept) {
            product.isAccept = false;
            await product.save();
            req.flash("success_msg", "محصول غیر قابل مشاهده شد")
            res.redirect('/admin/notShowproducts')
        } else {
            product.isAccept = true;
            await product.save();
            req.flash("success_msg", "محصول  قابل مشاهده شد")
            res.redirect('/admin/showProducts')
        }

    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> detailProduct
// ? method ==> get 
exports.getDetailProduct = async (req, res) => {
    try {
        // ! find show Products  
        const user = req.user;
        const product = await Product.findOne({ _id: req.params.id }).populate("seller");


        return res.render("admin/products/detailProducts", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "جزئیات محصول",
            user,
            product,
            jalaliMoment,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}