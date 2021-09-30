const yup = require('yup');


exports.sellerValidation = yup.object().shape({
    storeName: yup.string().required("وارد کردن نام فروشگاه الزامی است"),
    storeAddress: yup.string().required("وارد کردن نام کاربری الزامی است"),
    storeDesc: yup.string().required("وارد کردن توضیحات فروشگاه الزامی است"),
    storeAdminDesc: yup.string().required("وارد کردن توضیحات فروشنده الزامی است"),
    storeMobile: yup.string().required("وارد کردن شماره همراه الزامی است")
        .matches("09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}", "شماره همراه خود را چک کنید"),

});