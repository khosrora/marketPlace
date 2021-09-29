const User = require('./model/User');
const Tiket = require('./model/Tiket');



const sharp = require('sharp');
const mkdirp = require('mkdirp')
const shortId = require('shortid');
const appRoot = require('app-root-path');

// * helper
const { jalaliMoment } = require('../../helper/jalali');

exports.getAccountPage = async (req, res) => {
    try {
        // ! get User && tikets
        const user = req.user;
        const tikets = await Tiket.find({ user: user.id })

        res.render("public/user/account", {
            title: "پنل کاربری",
            path: "/account",
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


exports.createTiket = async (req, res) => {
    try {
        // ! get items
        const { title, text } = req.body;
        if (!title, !text) {
            req.flash("success_msg", "پیام شما ارسال نشد لطفا تمام مقادیر را کامل کنید");
            return res.redirect("/user/myaccount")
        }
        // !get user
        const user = req.user;
        // ! create Tiket 
        Tiket.create({
            title, text, user: user.id
        })
        // ! send message
        req.flash("success_msg", "پیام شما ارسال شد");
        res.redirect("/user/myaccount")
    } catch (err) {
        console.log(err.message);

    }
}