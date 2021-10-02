const { Schema, model } = require('mongoose');
const { productValidation } = require('./productValidation');


const productSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    disCountPrice: { type: Number, required: false },
    offer: { type: Boolean, default: false },
    Desc: { type: String, required: true },
    Technical: { type: String, required: true },
    Review: { type: String, required: true },
    colors: [{ type: String, required: false }],
    image: [{ type: String, required: true }],
    isActive: { type: Boolean, default: true },
    isAccept: { type: Boolean, default: false },
    productCategory: { type: Schema.Types.ObjectId, ref: "Category" },
    seller: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })


productSchema.statics.productValidate = function (body) {
    return productValidation.validate(body);
}

module.exports = model("Product", productSchema)