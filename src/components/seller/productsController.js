const User = require('../user/model/User');
const Category = require('../admin/categories/model/category');
const Product = require('../seller/model/Product');
const Seller = require('../admin/store/model/Seller');
const Cart = require('../cart/model/Cart');
const fs = require('fs');

const appRoot = require('app-root-path');

// ! helper
const { slug } = require('../../helper/slug');
const { createId } = require('../../helper/nonoId');
const { jalaliMoment } = require('../../helper/jalali');


// ? desc ==> dashboard seller
// ? method ==> get 
exports.getDashboardSeller = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const categories = await Category.find();

        // ! get seller active
        const seller = await Seller.findOne({
            $and: [
                { user: user._id },
                { isActive: true }
            ]
        })

        return res.render("seller/dashboardStore", {
            title: "پنل فروشندگی",
            breadCrumb: "پنل فروشندگی",
            path: "/seller",
            auth,
            message: req.flash("success_msg"),
            user,
            seller,
            categories,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> all product page
// ? method ==> get 
exports.getallProduct = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const categories = await Category.find();
        // ! get seller active
        const seller = await Seller.findOne({
            $and: [
                { user: user._id },
                { isActive: true }
            ]
        })

        // ! get product
        const products = await Product.find({ seller: seller.id })
        if (products === null) {
            products = [];
        }


        return res.render("seller/products", {
            title: "پنل فروشندگی",
            breadCrumb: "پنل فروشندگی",
            path: "/seller",
            auth,
            message: req.flash("success_msg"),
            user,
            categories,
            products,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> create product page
// ? method ==> get 
exports.getCreateProduct = async (req, res) => {
    try {

        const user = req.user;
        const categories = await Category.find();

        res.render("seller/createproduct", {
            title: "پنل فروشندگی",
            breadCrumb: "ساخت محصول",
            path: "/createproduct",
            auth,
            message: req.flash("success_msg"),
            user,
            categories,
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> create product page
// ? method ==> get 
exports.createProduct = async (req, res, next) => {
    const errors = [];

    // ! get user && categories
    const user = req.user;
    const categories = await Category.find();
    let files = [];

    try {
        // ! get images
        if (req.files.image) {
            const images = req.files.image
            for (const image of images) {
                var { filename } = image;
                files.push(filename)
            }
        } else {
            console.log("not upload image");
            errors.push({
                message: "لطفا حداقل یک عکس انتخاب کنید"
            })
            return res.render("seller/createproduct", {
                title: "پنل فروشندگی",
                breadCrumb: "ساخت محصول",
                path: "/createproduct",
                auth,
                message: req.flash("success_msg"),
                user,
                errors,
                categories,
            })
        }
        // ! get items
        req.body = { ...req.body }
        // ! fiind seller
        const seller = await Seller.findOne({
            $and: [
                { user: user._id },
                { isActive: true }
            ]
        })
        // !validation
        await Product.productValidate(req.body)
        // ! create product
        await Product.create({
            ...req.body, image: files, code: createId(), seller: seller._id, slug: slug(req.body.title)
        })
        // ! redirect
        req.flash("success_msg", "اضافه کردن محصول با موفقیت به اتمام رسید")
        res.redirect("/seller")
    } catch (err) {
        console.log(err.message);
        for (let file of files) {
            fs.unlinkSync(`${appRoot}/public/uploads/images/product/` + file);
        }
        errors.push({
            message: err.message
        })
        return res.render("seller/createproduct", {
            title: "پنل فروشندگی",
            breadCrumb: "ساخت محصول",
            path: "/createproduct",
            auth,
            message: req.flash("success_msg"),
            user,
            errors,
            categories,
        })
    }
}


// ? desc ==> delete product 
// ? method ==> get 
exports.deleteProduct = async (req, res) => {
    try {
        // ! find product
        const products = await Product.findOne({ _id: req.params.id })
        // ! remove product image
        if (products) {
            for (let file of products.image) {
                fs.unlinkSync(`${appRoot}/public/uploads/images/product/` + file);
            }
        }
        await Product.findByIdAndDelete({ _id: req.params.id });

        // ! send message
        req.flash("success_msg", "محصول با موفقیت حذف شد")
        res.redirect("/seller/dashboardSeller")
    } catch (err) {
        console.log(err.message);
        res.redirect("/seller/dashboardSeller")
    }
}

// ? desc ==> edit product page
// ? method ==> get 
exports.getEditProduct = async (req, res) => {
    try {

        const user = req.user;
        const categories = await Category.find();
        const product = await Product.findOne({ _id: req.params.id })

        return res.render("seller/editProduct", {
            title: "پنل فروشندگی",
            breadCrumb: "ویرایش محصول",
            path: "/createproduct",
            auth,
            message: req.flash("success_msg"),
            user,
            categories,
            product
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> edit product page
// ? method ==> get 
exports.editProduct = async (req, res) => {
    try {
        // ! get items
        req.body = { ...req.body }

        // ! get product
        const product = await Product.findByIdAndUpdate({ _id: req.body.id }, {
            ...req.body
        })
        //! redirect
        req.flash(`ویرایش محصول ${product.title} با موفقیت انجام شد`);
        res.redirect("/seller")

    } catch (err) {
        console.log(err.message);
    }
}



// ? desc ==> order Seller 
// ? method ==> get 
exports.getOrderSeller = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const categories = await Category.find();
        const product = await Product.findOne({ _id: req.params.id })
        // ! fiind seller
        const seller = await Seller.findOne({
            $and: [
                { user: user._id },
                { isActive: true }
            ]
        })
        console.log(seller);
        //! get orders 
        const orders = await Cart.find({
            $and:
                [
                    { seller: seller._id },
                    { isSuccess: true }
                ]
        })

        return res.render("seller/order", {
            title: "پنل فروشندگی",
            breadCrumb: "ویرایش محصول",
            path: "/createproduct",
            auth,
            message: req.flash("success_msg"),
            user,
            categories,
            product,
            orders,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> edit product page
// ? method ==> get 
exports.getDetailOrder = async (req, res) => {
    try {

        const user = req.user;
        const categories = await Category.find();
        const order = await Cart.findOne({ uniqueCode: req.params.code }).populate("user");

        return res.render("seller/detailOrder", {
            title: "پنل فروشندگی",
            breadCrumb: "جزئیات سفارش",
            path: "/createproduct",
            auth,
            message: req.flash("success_msg"),
            user,
            categories,
            order,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==>is send product
// ? method ==> get 
exports.isSendProduct = async (req, res) => {
    try {
        // ! find items
        const order = await Cart.findOne({ uniqueCode: req.params.code }).populate("user");
        const seller = await Seller.findOne({ _id: order.seller })
        // ! calc total price for waller seller
        const total = order.quantityProduct * order.priceProduct;
        // ! set is send for order
        order.isSend = true;
        await order.save();
        // ! charge wallet seller
        seller.wallet = total + seller.wallet;
        await seller.save()
        // ! send sms
        //? user is find for send sms 
        console.log("سفارش شما محصول فلان پردازش و ارسال خواهد شد");
        req.flash("success_msg" , "محصول تایید و وجه محصول به حساب شما منظور گردید")
        res.redirect("/seller/orderSeller")
    } catch (err) {
        console.log(err.message);
    }
}