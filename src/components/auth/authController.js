const User = require('../user/model/User');
const Token = require('../user/model/Token');
const bcrypt = require('bcrypt');
const passport = require('passport');

// !helper
const { createId } = require('../../helper/nonoId');


// ? desc ==> register page
// ? method ==> get
exports.getRegisterUser = async (req, res) => {
    try {
        res.render('public/register', {
            title: "ثبت نام",
            crumb: "ثبت نام کاربر"
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> register user
// ? method ==> post
exports.RegisterUser = async (req, res) => {
    const errors = [];
    try {
        // !get Items 
        const { firstName, lastName, email, mobile, password } = req.body;
        //!validation
        await User.userValidate(req.body);
        // !find User?
        const oldUser = await User.findOne({ mobile });
        if (oldUser) {
            errors.push({
                message: "شما قبلا ثبت نام کرده اید"
            })
            return res.render('public/register', {
                title: "ثبت نام",
                crumb: "ثبت نام کاربر",
                errors
            })
        }
        // !hash 
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        // ! create User
        await User.create({
            firstName, lastName, email, mobile, password: hashPassword,
            emailActiveCode: createId(),
            mobileActiveCode: createId(),

        })
        // !send email

        // !send sms

        // ! send user to login page
        req.flash("success_msg", "ثبت نام موفقیت آمیز بود");
        res.redirect("/auth/login")

    } catch (err) {
        errors.push({
            message: err.message
        })
        return res.render('public/register', {
            title: "ثبت نام کاربر",
            crumb: "ثبت نام کاربر",
            errors
        })
    }
}


// ? desc ==> login page
// ? method ==> get
exports.getLoginUser = async (req, res) => {
    try {
        res.render('public/login', {
            title: "ورود کاربر",
            crumb: "ورود کاربر",
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> login page
// ? method ==> post
exports.LoginUser = async (req, res, next) => {
    const errors = [];
    try {
        // !get items
        const { mobile, password, remember } = req.body;
        // !  !req.body
        if (!mobile || !password) {
            errors.push({
                message: "لطفا تمام مقادیر را وارد کنید"
            })
            return res.render('public/login', {
                title: "ثبت نام کاربر",
                crumb: "ثبت نام کاربر",
                errors,
                message: req.flash("success_msg"),
                error: req.flash("error"),
            })
        }
        // !find User
        const user = await User.findOne({ mobile });

        // !if is not active
        if (user) {
            if (!user.isMobileActive) {
                errors.push({
                    message: "لطفا  شماره همراه خود را فعال کنید"
                })
                return res.render('public/login', {
                    title: "ثبت نام کاربر",
                    crumb: "ثبت نام کاربر",
                    errors,
                    message: req.flash("success_msg"),
                    error: req.flash("success_msg")
                })
            }
        }
        // ! set session
        if (remember == "on") {
            req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000 * 30;
        } else {
            req.session.cookie.expire = null;
        }

        // ! user login
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/auth/login",
            failureFlash: true
        })(req, res, next);

    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> forgot pass
// ? method ==> get
exports.getForgotPassword = async (req, res) => {
    try {
        res.render('public/forgotpass', {
            title: "فراموشی رمز عبور",
            crumb: "فراموشی رمز عبور",
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> forgot pass
// ? method ==> post
exports.forgotPassword = async (req, res) => {
    const alerts = [];
    try {
        //! get Items
        const { mobile } = req.body;
        // ! find user
        const user = await User.find({ mobile })
        if (!user) {
            alerts.push({
                alert: "شماره همراه را چک کنید"
            })
            return res.render('public/forgotpass', {
                title: "فراموشی رمز عبور",
                crumb: "فراموشی رمز عبور",
                alerts
            })
        }
        // ! send sms code 
        await Token.create({
            token: createId()
        })

        // !redirect user 
        req.flash("success_msg", "کد بازیابی رمز عبور ارسال شد ")
        res.redirect("/auth/resetpass")

    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> reset pass
// ? method ==> get 
exports.getResetPassword = async (req, res) => {
    try {
        res.render('public/resetpass', {
            title: "بازیابی رمز عبور",
            crumb: "بازیابی رمز عبور",
            message: req.flash("success_msg")
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> reset pass
// ? method ==> post 
exports.resetPassword = async (req, res) => {
    const alerts = [];
    try {
        // !get items
        const { mobile, token, password } = req.body;

        // !find User 
        const user = await User.findOne({ mobile });
        if (!user) {
            alerts.push({
                alert: "شماره تماس وارد شده اشتباه است"
            })
            return res.render('public/resetpass', {
                title: "بازیابی رمز عبور",
                crumb: "بازیابی رمز عبور",
                alerts
            })
        }

        // !find token
        const getToken = await Token.findOne({ token });
        if (!getToken || getToken.active === true) {
            alerts.push({
                alert: "کد وارد شده اشتباه است"
            })
            return res.render('public/resetpass', {
                title: "بازیابی رمز عبور",
                crumb: "بازیابی رمز عبور",
                alerts,
                message: req.flash("success_msg")
            })
        }
        // !change password
        // *hash 
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        // *user new password
        user.password = hashPassword;
        getToken.active = true;

        // !save User
        await user.save();
        await getToken.save();
        req.flash("success_msg", "کلمه عبور شما با موفقیت تغییر کرد")
        res.redirect("/auth/login")


    } catch (err) {
        console.log(err.message);
    }
}