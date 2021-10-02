const yup = require('yup');


exports.productValidation = yup.object().shape({
    title: yup.string().required("وارد کردن نام کاربری الزامی است"),
    slug: yup.string().required("وارد کردن نام کاربری الزامی است"),
    price: yup.number().required("وارد کردن نام کاربری الزامی است"),
});