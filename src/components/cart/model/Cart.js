const { Schema, model } = require('mongoose');


const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    seller: { type: Schema.Types.ObjectId, ref: "Seller" },
    isSuccess: { type: Boolean, default: false },
    codePayment: { type: String, default: 0 },
    titleProduct: { type: String, required: true },
    priceProduct: { type: String, required: true },
    isSend: { type: Boolean, default: false },
    uniqueCode: { type: String, unique: true, required: true },
    quantityProduct: { type: Number, required: true },
}, { timestamps: true })

module.exports = model("Cart", cartSchema)