const { Schema, model } = require('mongoose');



const settingSchema = new Schema({
    mobile: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    footerText: { type: String, required: false },
    copyRight: { type: String, required: false },
    mapScript: { type: String, required: false },
    address: { type: String, required: false },
    isDefault: { type: Boolean, default: false }
})


module.exports = model("Setting", settingSchema)