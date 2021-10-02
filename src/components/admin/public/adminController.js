const Seller = require('../store/model/Seller');
const User = require('../../user/model/User');



exports.index = async (req, res) => {
    try {
        const user = req.user;

        const sellers = await Seller.find({ isActive: false }).countDocuments();
        const users = await User.find().countDocuments();
        

        res.render("admin/index", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "پنل مدیریت",
            user,
            sellers,
            users
        })
    } catch (err) {
        console.log(err.message);
    }
}