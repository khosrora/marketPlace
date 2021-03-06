const { Schema, model } = require('mongoose');
const { userValidation } = require('./userValidation');



const userSchema = new Schema({
    email: { type: String, trim: true, required: true },
    mobile: { type: String, trim: true, unique: true, required: true },
    mobileActiveCode: { type: Number, required: true },
    isMobileActive: { type: Boolean, default: false },
    offers: { type: Number, default: 0 },
    Newsletters: { type: Number, default: 0 },
    password: { type: String, trim: true, required: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    address: { type: String, required: false },
    fav: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    isBloocked: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    role: { type: String, enum: ["User", "Admin"], default: "User" }
}, { timestamps: true })


userSchema.statics.userValidate = function (body) {
    return userValidation.validate(body)
}

module.exports = model("User", userSchema)