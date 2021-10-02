const User = require('../user/model/User');
const Token = require('../user/model/Token');
const bcrypt = require('bcrypt');
const passport = require('passport');

const Category = require('../admin/categories/model/category');

// !helper
const { createId } = require('../../helper/nonoId');


// ? desc ==> register page
// ? method ==> get
exports.getRegisterUser = async (req, res) => {
    try {

        const categories = await Category.find();

        res.render('public/auth/register', {
            title: "ثبت نام",
            path: "/register",
            crumb: "ثبت نام کاربر",
            categories,
            auth,
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> register user
// ? method ==> post
exports.RegisterUser = async (req, res) => {
    const errors = [];
    const categories = await Category.find();

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
                path: "/register",
                auth,
                categories,
                errors
            })
        }
        // !hash 
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        // ! create User
        const code = createId()
        await User.create({
            firstName, lastName, email, mobile, password: hashPassword,
            mobileActiveCode: code,
        })
        // !send email

        // !send sms
        console.log(code);

        // ! send user to active page
        req.flash("success_msg", "ثبت نام موفقیت آمیز بود");
        res.redirect("/auth/activeAccount")

    } catch (err) {
        errors.push({
            message: err.message
        })
        return res.render('public/auth/register', {
            title: "ثبت نام کاربر",
            path: "/register",
            crumb: "ثبت نام کاربر",
            auth,
            categories,
            errors
        })
    }
}


// ? desc ==> active account page
// ? method ==> get
exports.getActiveAccount = async (req, res) => {
    try {
        const categories = await Category.find();

        res.render('public/auth/activeAccount', {
            title: "فعال سازی کاربر",
            path: "/activeAccount",
            crumb: "فعال سازی کاربر",
            auth,
            categories,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> active account user
// ? method ==> post
exports.ActiveAccount = async (req, res) => {
    const alerts = [];
    const categories = await Category.find();

    try {
        // ! get items
        const { mobile, code } = req.body;
        // !find user
        const user = await User.findOne({ mobile });
        if (!user) {
            alerts.push({
                alert: "شما ثبت نام نکرده اید"
            })
            return res.render('public/auth/activeAccount', {
                title: "فعال سازی کاربر",
                path: "/activeAccount",
                crumb: "فعال سازی کاربر",
                auth,
                categories,
                message: req.flash("success_msg"),
                error: req.flash("error"),
                alerts,
            })
        }
        // ! check user code with code
        if (user.mobileActiveCode == code) {
            user.isMobileActive = true;
            await user.save();
            //! redirect user
            req.flash("success_msg", "پنل کاربری شما فعال شد");
            res.redirect("/auth/login")
        } else {
            alerts.push({
                alert: "کد وارد شده اشتباه است"
            })
            return res.render('public/auth/activeAccount', {
                title: "فعال سازی کاربر",
                path: "/activeAccount",
                crumb: "فعال سازی کاربر",
                auth,
                categories,
                message: req.flash("success_msg"),
                error: req.flash("error"),
                alerts,
            })
        }
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> login page
// ? method ==> get
exports.getLoginUser = async (req, res) => {
    try {
        const categories = await Category.find();

        res.render('public/auth/login', {
            title: "ورود کاربر",
            path: "/login",
            crumb: "ورود کاربر",
            auth,
            categories,
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
    const categories = await Category.find();

    try {
        // !get items
        const { mobile, password, remember } = req.body;
        // !  !req.body
        if (!mobile || !password) {
            errors.push({
                message: "لطفا تمام مقادیر را وارد کنید"
            })
            return res.render('public/auth/login', {
                title: "ثبت نام کاربر",
                path: "/login",
                crumb: "ثبت نام کاربر",
                auth,
                categories,
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
                    path: "/login",
                    crumb: "ثبت نام کاربر",
                    auth,
                    categories,
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
        const categories = await Category.find();

        res.render('public/auth/forgotpass', {
            title: "فراموشی رمز عبور",
            path: "/forgotpass",
            crumb: "فراموشی رمز عبور",
            categories,
            auth,
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> forgot pass
// ? method ==> post
exports.forgotPassword = async (req, res) => {
    const alerts = [];
    const categories = await Category.find();

    try {
        //! get Items
        const { mobile } = req.body;
        // ! find user
        const user = await User.find({ mobile })
        if (!user) {
            alerts.push({
                alert: "شماره همراه را چک کنید"
            })
            return res.render('public/auth/forgotpass', {
                title: "فراموشی رمز عبور",
                path: "/forgotpass",
                crumb: "فراموشی رمز عبور",
                auth,
                categories,
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
        const categories = await Category.find();

        res.render('public/auth/resetpass', {
            title: "بازیابی رمز عبور",
            path: "/resetpass",
            crumb: "بازیابی رمز عبور",
            auth,
            categories,
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
    const categories = await Category.find();

    try {
        // !get items
        const { mobile, token, password } = req.body;

        // !find User 
        const user = await User.findOne({ mobile });
        if (!user) {
            alerts.push({
                alert: "شماره تماس وارد شده اشتباه است"
            })
            return res.render('public/auth/resetpass', {
                title: "بازیابی رمز عبور",
                path: "/resetpass",
                crumb: "بازیابی رمز عبور",
                auth,
                categories,
                alerts
            })
        }

        // !find token
        const getToken = await Token.findOne({ token });
        if (!getToken || getToken.active === true) {
            alerts.push({
                alert: "کد وارد شده اشتباه است"
            })
            return res.render('public/auth/resetpass', {
                title: "بازیابی رمز عبور",
                path: "/resetpass",
                crumb: "بازیابی رمز عبور",
                alerts,
                auth,
                categories,
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


// ? desc ==> send Code page
// ? method ==> get 
exports.getSendCode = async (req, res) => {
    try {
        const categories = await Category.find();

        res.render('public/auth/sendCode', {
            title: "ارسال کد",
            path: "/sendCode",
            crumb: "ارسال کد فعال سازی",
            auth,
            categories,
            message: req.flash("success_msg")
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> send Code
// ? method ==> post
exports.sendCode = async (req, res) => {
    const alerts = [];
    const categories = await Category.find();
    try {
        // ! get items
        const { mobile } = req.body;
        // ! find User
        const user = await User.findOne({ mobile })
        if (!user) {
            alerts.push({
                alert: "شما ثبت نام نکرده اید"
            })
            return res.render('public/auth/sendCode', {
                title: "ارسال کد",
                path: "/sendCode",
                crumb: "ارسال کد فعال سازی",
                auth,
                categories,
                message: req.flash("success_msg"),
                alerts
            })
        }
        // ! send code
        console.log(user.mobileActiveCode);
        // ! send user to login page
        req.flash("success_msg", "کد فعال سازی ارسال شد");
        res.redirect("/auth/activeAccount")
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> log out user
// ? method ==> get 
exports.logout = async (req, res) => {
    try {
        req.session = null;
        req.logout();
        res.redirect("/")
    } catch (err) {
        console.log(err.message);
    }
}