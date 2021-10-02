const Contact = require('../../contact/model/Contact');
const Tiket = require('../../user/model/Tiket');



// ! helper
const { jalaliMoment } = require('../../../helper/jalali');

// ? desc ==> contact us page
// ? method ==> get
exports.getContactUs = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const contacts = await Contact.find()

        res.render("admin/messages/ContactUs", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "پیام های تماس با ما",
            user,
            contacts
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> single contact us page
// ? method ==> get
exports.getSingleContactUs = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const contact = await Contact.findOne({ _id: req.params.id })

        res.render("admin/messages/singleContactUs", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "جزئیات پیام",
            user,
            contact,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> tiket us page
// ? method ==> get
exports.getTikets = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const tikets = await Tiket.find().populate("user")

        res.render("admin/messages/tikets", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "پیام های کاربران",
            user,
            tikets
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> single tiket us page
// ? method ==> get
exports.getSingleTiket = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const tiket = await Tiket.findOne({ _id: req.params.id }).populate("user");

        res.render("admin/messages/singleTiket", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "پیام های کاربران",
            user,
            tiket,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> see tiket user
// ? method ==> get
exports.seeTiket = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const tiket = await Tiket.findOne({ _id: req.params.id })

        // ! change tiket
        tiket.isRead = true;
        await tiket.save();
        res.redirect("/admin/getTikets")

    } catch (err) {
        console.log(err.message);
    }
}