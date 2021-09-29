const { Schema, model } = require('mongoose');
const { contactValidation } = require('./contactValidation');


const contactSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
}, { timestamps: true })


contactSchema.statics.contactusValidat = function (body) {
    return contactValidation.validate(body)
}


module.exports = model("Contact", contactSchema)