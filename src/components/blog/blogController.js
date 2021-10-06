const Category = require('../admin/categories/model/category');
const Blog = require('./model/Blog');

const fs = require('fs');
const appRoot = require('app-root-path');



// ? desc ==> create blog 
// ? method ==> get 
exports.getCreateBlog = async (req, res) => {
    try {

        // ! get user
        const user = req.user;
        const categories = await Category.find();

        res.render("public/user/createBlog", {
            title: "ساخت بلاگ",
            breadCrumb: "ساخت بلاگ",
            path: "/createBlog",
            auth,
            message: req.flash("success_msg"),
            user,
            categories
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> create blog 
// ? method ==> post 
exports.createBlog = async (req, res) => {
    const errors = [];
    const user = req.user;
    const categories = await Category.find();
    try {
        if (!req.file) {
            errors.push({
                message: "لطفا عکس را انتخاب کنید"
            })
            return res.render("public/user/createBlog", {
                title: "ساخت بلاگ",
                breadCrumb: "ساخت بلاگ",
                path: "/createBlog",
                auth,
                message: req.flash("success_msg"),
                user,
                errors,
                categories
            })
        }

        // ! get items
        req.body = { ...req.body };
        // ! validation
        await Blog.blogValidate(req.body);
        // ! create blog
        await Blog.create({
            ...req.body, image: req.file.filename, user: user._id
        })

        // ! redirect
        req.flash("success_msg", "مطلب شما برای مدیریت ارسال شد . پس از تایید در بخش بلاگ ها قرار میگیرد")
        res.redirect('/user/createBlog')

    } catch (err) {
        console.log(err.message);
        fs.unlinkSync(`${appRoot}/public/uploads/images/blog/` + req.file.filename);
        errors.push({
            message: err.message
        })
        return res.render("public/user/createBlog", {
            title: "ساخت بلاگ",
            breadCrumb: "ساخت بلاگ",
            path: "/createBlog",
            auth,
            message: req.flash("success_msg"),
            user,
            errors,
            categories
        })
    }
}