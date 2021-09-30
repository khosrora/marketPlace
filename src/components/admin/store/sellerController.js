const Seller = require('./model/Seller');



// ! controller
const { jalaliMoment } = require('../../../helper/jalali');

// ? desc ==> get sellers
// ? method ==> get
// ? ADMIN
exports.getSellers = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const sellers = await Seller.find();

        res.render("admin/sellers/allsellers", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "درخواست های فروشندگی",
            user,
            sellers,
            message: req.flash("success_msg")
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> get active sellers
// ? method ==> get
// ? ADMIN
exports.getActiveSellers = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const sellers = await Seller.find({ isActive: true });

        res.render("admin/sellers/activeSellers", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "درخواست های فروشندگی",
            user,
            sellers,
            message: req.flash("success_msg")
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==>  active seller
// ? method ==> get
// ? ADMIN
exports.ActiveSellers = async (req, res) => {
    try {
        // ! find store
        const id = req.params.id;
        const store = await Seller.findById({ _id: id });
        // ! set active store
        store.isActive = true;
        await store.save();
        // ! send sms to user
        console.log('فروشگاه شما در وب سایت فعال شد');
        // ! redirect
        req.flash("success_msg", `فروشگاه ${store.storeName} فعال شد`)
        res.redirect("/admin/sellers")
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> get Deactive sellers
// ? method ==> get
// ? ADMIN
exports.getDeActiveSellers = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const sellers = await Seller.find({ isActive: false });

        res.render("admin/sellers/deActiveSellers", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "درخواست های فروشندگی",
            user,
            sellers,
            message: req.flash("success_msg")
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==>  Deactive seller
// ? method ==> get
// ? ADMIN
exports.DeActiveSellers = async (req, res) => {
    try {
        // ! find store
        const id = req.params.id;
        const store = await Seller.findById({ _id: id });
        // ! set active store
        store.isActive = false;
        await store.save();
        // ! send sms to user
        console.log('فروشگاه شما در وب سایت غیر فعال شد');
        // ! redirect
        req.flash("success_msg", `فروشگاه ${store.storeName} غیر فعال شد`)
        res.redirect("/admin/sellers")
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==>  Deactive seller
// ? method ==> get
// ? ADMIN
exports.getSellerDetails = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const id = req.params.id;
        const store = await Seller.findOne({ _id: id }).populate("user");
        console.log(store);

        return res.render("admin/sellers/detailSeller", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "درخواست فروشنده",
            user,
            store,
            jalaliMoment,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}