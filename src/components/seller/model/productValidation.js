const yup = require('yup');



exports.productValidation = yup.object().shape({
    title: yup.string().required("وارد کردن  عنوان الزامی است"),
    desc: yup.string().required("وارد کردن  توضیحات الزامی است"),
    technical: yup.string().required("وارد کردن  مشخصات فنی الزامی است"),
    price: yup.number().required("وارد کردن قیمت الزامی است").typeError('وارد کردن قیمت الزامی است'),
});