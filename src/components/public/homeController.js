



exports.home = async (req, res) => {
    try {

        res.render('public/index.ejs', {
            title: "صفحه اصلی"
        })

    } catch (err) {
        console.log(err.message);
    }
}