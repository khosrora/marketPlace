const Category = require('../admin/categories/model/category');



exports.cart = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const categories = await Category.find();

        res.render('public/cart/cart.ejs', {
            title: "صفحه پرداخت",
            path: '/cart',
            categories,
            auth,
            user,
            message: req.flash("success_msg")
        })



    } catch (err) {
        console.log(err.message);
    }
}