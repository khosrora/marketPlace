const Category = require('../admin/categories/model/category');
const Product = require('../seller/model/Product');
const fs = require('fs');

const appRoot = require('app-root-path');

// ! helper
const { slug } = require('../../helper/slug');
const { createId } = require('../../helper/nonoId');
const { jalaliMoment } = require('../../helper/jalali');


// ? desc ==> all product page
// ? method ==> get 
exports.getallProduct = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const categories = await Category.find();

        // ! get product
        const products = await Product.find({ seller: user.id })
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
        // !validation
        await Product.productValidate(req.body)
        // ! create product
        await Product.create({
            ...req.body, image: files, code: createId(), seller: user._id, slug: slug(req.body.title)
        })
        // ! redirect
        req.flash("success_msg", "اضافه کردن محصول با موفقیت به اتمام رسید")
        res.redirect("/seller")
    } catch (err) {
        console.log(err.message);
        for (let file of files) {
            fs.unlinkSync(`${appRoot}/public/uploads/images/` + file);
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
                fs.unlinkSync(`${appRoot}/public/uploads/images/` + file);
            }
        }
        await Product.findByIdAndDelete({ _id: req.params.id });

        // ! send message
        req.flash("success_msg", "محصول با موفقیت حذف شد")
        res.redirect("/seller")
    } catch (err) {
        console.log(err.message);
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


