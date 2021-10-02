const Category = require('./model/category');
const CategoryItem = require('./model/categoryItem');
const Tag = require('./model/Tag');


// ? desc ==> createCategory
// ? method ==> get
exports.getCreateCategory = async (req, res) => {
    try {

        const user = req.user;

        // ! get item
        const ctegoryItems = await CategoryItem.find()

        res.render("admin/categories/createCategory", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "ساخت دسته بندی",
            user,
            ctegoryItems,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> createCategory
// ? method ==> post
exports.createCategory = async (req, res) => {
    try {
        // ! get item
        const { name, categoryItemId } = req.body;
        const categoryItem = await CategoryItem.find({ _id: categoryItemId })

        // ! create
        await Category.create({
            name, categoryItem: categoryItem
        })
        // ! req.flash
        req.flash("success_msg", "دسته بندی مورد نظر با موفقیت  ساخته شد")
        res.redirect("/admin/createCategory")
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> allCreateCategory
// ? method ==> get
exports.allCreateCategory = async (req, res) => {
    try {
        const user = req.user;
        // ! find categories
        const categories = await Category.find()

        res.render("admin/categories/allcreateCategory", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "ساخت دسته بندی",
            user,
            message: req.flash("success_msg"),
            categories
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==>  delete Category
// ? method ==> get
exports.deleteCategory = async (req, res) => {
    try {
        // ! find categories
        const id = req.params.id;
        await Category.findByIdAndDelete(id)
        //! send message
        req.flash("success_msg", `دسته بندی با موفقیت حذف شد`);
        res.redirect("/admin/allCreateCategory")

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> createCategory
// ? method ==> get
exports.getEditCategory = async (req, res) => {
    try {

        const user = req.user;

        // ! get item
        const category = await Category.findOne({ _id: req.params.id })
        const categoryItems = await CategoryItem.find();

        res.render("admin/categories/editCategory", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "ساخت دسته بندی",
            user,
            category,
            categoryItems,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> createCategory
// ? method ==> post
exports.editCategory = async (req, res) => {
    try {
        // ! get item
        const { name, categoryItemId, id } = req.body;
        const categoryItem = await CategoryItem.find({ _id: categoryItemId })
        console.log(id);
        // ! update categories
        await Category.findByIdAndUpdate({ _id : id }, {
            name, categoryItem: categoryItem
        })
        // ! req.flash
        req.flash("success_msg", "دسته بندی مورد نظر با موفقیت  ویرایش شد")
        res.redirect("/admin/allCreateCategory")
    } catch (err) {
        console.log(err.message);
    }
}



// !category Item
// ? desc ==> category Item
// ? method ==> get
exports.getCreateCategoryItem = async (req, res) => {
    try {
        const user = req.user;
        // ! find Category parent
        const tags = await Tag.find();

        res.render("admin/categories/createCategoryItem", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "ساخت دسته بندی",
            user,
            tags,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> category Item
// ? method ==> post
exports.createCategoryItem = async (req, res) => {
    try {
        // ! get item
        const { name, tags } = req.body;
        // ! create
        await CategoryItem.create({
            name, tags
        })
        // ! req.flash
        req.flash("success_msg", "دسته بندی مورد نظر با موفقیت  ساخته شد")
        res.redirect("/admin/createCategoryitem")
    } catch (err) {
        console.log(err.message);
    }
}


// ? desc ==> allCreateCategory
// ? method ==> get
exports.allCreateCategoryItem = async (req, res) => {
    try {
        const user = req.user;
        // ! find categories
        const categoryItems = await CategoryItem.find()

        res.render("admin/categories/allcreateCategoryItem", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "ساخت دسته بندی",
            user,
            message: req.flash("success_msg"),
            categoryItems
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==>  delete category Item
// ? method ==> get
exports.deleteCategoryItem = async (req, res) => {
    try {
        // ! find categories
        const id = req.params.id;
        await CategoryItem.findByIdAndDelete(id)
        //! send message
        req.flash("success_msg", `دسته بندی با موفقیت حذف شد`);
        res.redirect("/admin/allCreateCategoryitem")

    } catch (err) {
        console.log(err.message);
    }
}



// !category tag
// ? desc ==> tag Item
// ? method ==> get
exports.getCreatetag = async (req, res) => {
    try {

        const user = req.user;
        res.render("admin/categories/createtag", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "ساخت دسته بندی",
            user,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> tag Item
// ? method ==> post
exports.createCreatetag = async (req, res) => {
    try {
        // ! get item
        const { name } = req.body;
        // ! create
        await Tag.create({
            name
        })
        // ! req.flash
        req.flash("success_msg", " برچسب مورد نظر با موفقیت  ساخته شد")
        res.redirect("/admin/createtag")
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> tag Item
// ? method ==> get
exports.alltag = async (req, res) => {
    try {
        const user = req.user;
        // ! find tags
        const tags = await Tag.find()

        res.render("admin/categories/alltag", {
            layout: "./layouts/adminLayout",
            title: "پنل مدیریت",
            breadCrumb: "ساخت دسته بندی",
            user,
            message: req.flash("success_msg"),
            tags
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==>  delete tag Item
// ? method ==> get
exports.deletetag = async (req, res) => {
    try {
        // ! find categories
        const id = req.params.id;
        await Tag.findByIdAndDelete(id)
        //! send message
        req.flash("success_msg", `برچسب  با موفقیت حذف شد`);
        res.redirect("/admin/alltag")

    } catch (err) {
        console.log(err.message);
    }
}