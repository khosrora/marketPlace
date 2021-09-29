const User = require('./model/User');
const Tiket = require('./model/Tiket');
const Seller = require('../store/model/Seller');



const sharp = require('sharp');
const mkdirp = require('mkdirp')
const shortId = require('shortid');
const appRoot = require('app-root-path');

// * helper
const { jalaliMoment } = require('../../helper/jalali');
const { createId } = require('../../helper/nonoId');

// ? desc ==> dashboard user
// ? method ==> get
exports.getAccountPage = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;

        res.render("public/user/dashboard", {
            title: "پنل کاربری",
            breadCrumb: "پنل کاربری",
            path: "/account",
            auth,
            message: req.flash("success_msg"),
            user,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> edit User
// ? method ==> get
exports.getEditUser = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;
        res.render("public/user/editUser", {
            title: "ویرایش حساب کاربری",
            breadCrumb: "ویرایش حساب کاربری",
            path: "/account",
            auth,
            message: req.flash("success_msg"),
            user,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> edit User
// ? method ==> post
exports.editUser = async (req, res) => {
    const avatar = req.files ? req.files.avatar : {};
    const fileName = `${shortId.generate()}_${avatar.name}`;
    const uploadPath = `${appRoot}/public/uploads/images/userprofile/`
    try {
        // !get items 
        req.body = { ...req.body, avatar }
        // ! get user
        const user = req.user;
        // !create dir upload
        await mkdirp(uploadPath)
        // ! size image
        await sharp(avatar.data).jpeg({ quality: 10 }).toFile(`${uploadPath}/${fileName}`)
            .catch(err => console.log(err.message))
        // ! update user
        await User.findOneAndUpdate({ _id: user.id }, {
            ...req.body, avatar: fileName
        })
        //! send message
        req.flash("success_msg", "مشخصات شما با موفقیت ویرایش شد")
        res.redirect("/user/myaccount")

    } catch (err) {
        console.log(err.message);
    }
}



// ? desc ==> tikets User
// ? method ==> get
exports.getTiketsUser = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;
        const tikets = await Tiket.find({ user: user.id })

        res.render("public/user/tikets", {
            title: "پیام های شما",
            breadCrumb: "پیام های شما",
            path: "/tikets",
            auth,
            message: req.flash("success_msg"),
            user,
            tikets,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> address user
// ? method ==> get
exports.getAddressUser = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;
        res.render("public/user/address", {
            title: "آدرس کاربر",
            breadCrumb: "آدرس کاربر",
            path: "/addressUser",
            auth,
            message: req.flash("success_msg"),
            user,
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> create tiket
// ? method ==> get
exports.getCreateTiket = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;
        res.render("public/user/createTiket", {
            title: "ارسال پیام",
            breadCrumb: "ارسال پیام",
            path: "/createTiket",
            auth,
            message: req.flash("success_msg"),
            user,
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> create tiket
// ? method ==> post
exports.createTiket = async (req, res) => {
    try {
        // ! get items
        const { title, text } = req.body;
        if (!title, !text) {
            req.flash("success_msg", "پیام شما ارسال نشد لطفا تمام مقادیر را کامل کنید");
            return res.redirect("/user/createTiket")
        }
        // !get user
        const user = req.user;
        // ! create Tiket 
        Tiket.create({
            title, text, user: user.id
        })
        // ! send message
        req.flash("success_msg", "پیام شما ارسال شد");
        res.redirect("/user/tiketsUser")
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> request User
// ? method ==> get
exports.getRequestStore = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;
        res.render("public/user/requestStore", {
            title: "تقاضای فروشندگی",
            breadCrumb: "فرم تقاضای فروشندگی",
            path: "/requestStore",
            auth,
            message: req.flash("success_msg"),
            user,
        })
    } catch (err) {
        console.log(err.message);
    }
}

exports.requestStore = async (req, res) => {
    const errors = [];
    // ! get user
    const user = req.user;
    try {
        // !get items 
        req.body = { ...req.body }
        // ! check user
        if (user.isSeller) {
            req.flash("success_msg", "شما پیام فروشندگی را ارسال کرده اید");
            return res.redirect("/user/requestStore")
        }
        // ! validation
        await Seller.sellerValidate(req.body);

        // ! create store
        Seller.create({
            ...req.body, user: user.id , code : createId()
        })
        // ! user edti
        user.isSeller = true;
        await user.save();
        // ! send message
        req.flash("success_msg", "درخواست فروشندگی ارسال شد . تا اطلاع ثانوی شما نمیتوانید درخواست جدید ارسال کنید");
        res.redirect("/user/myaccount")
    } catch (err) {
        console.log(err.message);
        errors.push({
            message: err.message
        })
        return res.render("public/user/requestStore", {
            title: "تقاضای فروشندگی",
            breadCrumb: "فرم تقاضای فروشندگی",
            path: "/requestStore",
            auth,
            message: req.flash("success_msg"),
            user,
            errors
        })
    }
}