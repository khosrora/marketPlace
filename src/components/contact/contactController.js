const Contact = require('./model/Contact');



exports.contactUs = async (req, res) => {
    const errors = [];
    try {
        // !get items
        const { subject, email, text, fullname } = req.body;
        // ! get validation
        await Contact.contactusValidat(req.body)
        // ! create Contact us
        await Contact.create({
            subject, email, text, fullname
        })
        req.flash("success_msg", "پیام شما با موفقیت ارسال شد")
        // !redirect user 
        return res.render('public/pages/contactUs.ejs', {
            title: "صفحه تماس با ما",
            path: "/contactUs",
            auth,
            errors,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
        errors.push({
            message: err.message
        })
        return res.render('public/pages/contactUs.ejs', {
            title: "صفحه تماس با ما",
            path: "/contactUs",
            auth,
            errors,
            message: req.flash("success_msg")
        })
    }
}