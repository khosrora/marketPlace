const Category = require('../admin/categories/model/category');
const Cart = require('./model/Cart');

const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);


// ! helper
const { createId } = require('../../helper/nonoId');


exports.cart = async (req, res) => {
    try {

        // ! get items
        const user = req.user;
        const categories = await Category.find();

        return res.render('public/cart/cart.ejs', {
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

exports.payment = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const categories = await Category.find();
        if (!user) {
            req.flash("success_msg", "لطفا برای پرداخت ابتدا وارد وب سایت شوید");
            return res.render('public/cart/cart.ejs', {
                title: "صفحه پرداخت",
                path: '/cart',
                categories,
                auth,
                user,
                message: req.flash("success_msg")
            })
        }
        if (!user.address) {
            req.flash("success_msg", "لطفا برای پرداخت آدرس خود را از پنل کاربری وارد کنید");
            return res.render('public/cart/cart.ejs', {
                title: "صفحه پرداخت",
                path: '/cart',
                categories,
                auth,
                user,
                message: req.flash("success_msg")
            })
        }
        //! Get a cookie
        const cartItems = JSON.parse(req.cookies.cart___items);

        
        let totalCarts = 0;
        cartItems.forEach(async i => {
            var totalItemCarts = i.price * i.quantity;
            totalCarts += totalItemCarts++;
            await Cart.create({
                user: user._id, seller: i.idSeller, titleProduct: i.title,
                priceProduct: i.price, quantityProduct: i.quantity, codePayment: createId()
            })
        })

        zarinpal.PaymentRequest({
            Amount: totalCarts, // In Tomans
            CallbackURL: `${process.env.url}/verifyPayment?q=${createId()}`,
            Description: 'پرداخت به درگاه اینترنتی فروشگاه رابا',
            Email: user.email,
            Mobile: user.mobile
        }).then(response => {
            if (response.status === 100) {
                res.redirect(response.url);
            }
        }).catch(err => {
            console.error(err);
            req.flash("success_msg", "متاسفانه مشکلی از سمت درگاه پیش آمده است لطفا دوباره امتحان کنید");
            return res.render('public/cart/cart.ejs', {
                title: "صفحه پرداخت",
                path: '/cart',
                categories,
                auth,
                user,
                message: req.flash("success_msg")
            })
        });
    } catch (err) {
        console.log(err.message);
    }
}

exports.verifyPayment = async (req, res) => {
    try {
        // ! get query
        const paymentCode = req.query.Authority;
        const status = req.query.Status;

        if (status === "OK") {
            const carts = await Cart.find({ codePayment: req.query.q })
            carts.forEach(i => {
                i.isSuccess = true;
                i.save();
            })

            // ! send message
            req.flash("success_msg", "سفارش شما با موفقیت ثبت شد")
            res.redirect("/user/myaccount");
            //! Clearing the cookie
            res.clearCookie("cart___items");
        } else {
            req.flash("success_msg", "متاسفانه عملیات پرداخت با شکست مواجه شد");
            res.redirect("/cart")
        }
    } catch (err) {
        console.log(err.message);
    }
}