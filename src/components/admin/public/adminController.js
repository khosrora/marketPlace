const Seller = require('../store/model/Seller');
const User = require('../../user/model/User');
const Blog = require('../../blog/model/Blog');



exports.index = async (req, res) => {
    try {
        const user = req.user;

        const sellers = await Seller.find({ isActive: false }).countDocuments();
        const users = await User.find().countDocuments();
        const blogs = await Blog.find({ isShow: false }).countDocuments();

        res.render("admin/index", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "پنل مدیریت",
            user,
            sellers,
            users,
            blogs
        })
    } catch (err) {
        console.log(err.message);
    }
}