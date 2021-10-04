exports.isSeller = (req, res, next) => {
    if (req.user.isSeller) {
        next();
    } else {
        res.redirect("/404")
    }
}