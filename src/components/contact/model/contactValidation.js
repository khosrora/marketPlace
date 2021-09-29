const yup = require('yup');


exports.contactValidation = yup.object().shape({
    fullname: yup.string().required("وارد کردن نام  الزامی است"),
    subject: yup.string().required("وارد کردن عنوان الزامی است"),
    text: yup.string().required("وارد کردن متن الزامی است"),
    email: yup.string()
        .required("وارد کردن پست الکترونیک الزامی است")
        .email("فرمت پست الکترونیک اشتباه است")
});