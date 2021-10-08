const { Schema, model } = require('mongoose');
const { sellerValidation } = require('./sellerValidation');



const sellerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    storeName: { type: String, required: true },
    storeMobile: { type: String, required: true },
    storeEmail: { type: String, required: false },
    storeAddress: { type: String, required: true },
    storeDesc: { type: String, required: true },
    storeAdminDesc: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    wallet: { type: Number , default: 0 },
    code: { type: Number, required: true },
    isShow: { type: Boolean, default: true },
}, { timestamps: true })

sellerSchema.statics.sellerValidate = function (body) {
    return sellerValidation.validate(body)
}


module.exports = model("Seller", sellerSchema)