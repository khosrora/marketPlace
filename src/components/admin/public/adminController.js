



exports.index = async (req, res) => {
    try {
        const user = req.user;
        res.render("admin/index", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "پنل مدیریت",
            user
        })
    } catch (err) {
        console.log(err.message);
    }
}