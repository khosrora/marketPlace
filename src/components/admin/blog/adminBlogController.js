const Blog = require('../../blog/model/Blog');


// ! helper
const { jalaliMoment } = require('../../../helper/jalali');

// ? desc ==> all blog is show 
// ? method ==> get 
exports.getShowBlog = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const blogs = await Blog.find({ isShow: true }).populate("user")
        return res.render("admin/blogs/acceptBlogs", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "بلاگ های تایید شده",
            user,
            blogs,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> not show blogs
// ? method ==> get 
exports.getNotShowBlog = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const blogs = await Blog.find({ isShow: false }).populate("user")
        return res.render("admin/blogs/notAcceptBlogs", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "بلاگ های تایید شده",
            user,
            blogs,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> detail blog
// ? method ==> get 
exports.getDetailBlog = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const blog = await Blog.findOne({ _id: req.params.id }).populate("user");
        return res.render("admin/blogs/detailBlog", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "بلاگ های تایید شده",
            user,
            blog,
            jalaliMoment,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> show or not show blog
// ? method ==> get 
exports.isShowBlog = async (req, res) => {
    try {
        // ! get items
        const blog = await Blog.findOne({ _id: req.params.id });

        if (blog.isShow) {
            blog.isShow = false;
            await blog.save();
            req.flash("success_msg", "بلاگ غیر فعال شد");
            return res.redirect("/admin/notShowBlogs")
        } else {
            blog.isShow = true;
            await blog.save();
            req.flash("success_msg", "بلاگ فعال شد");
            return res.redirect("/admin/ShowBlogs")
        }

    } catch (err) {
        console.log(err.message);
    }
}
