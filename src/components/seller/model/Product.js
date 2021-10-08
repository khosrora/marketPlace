const { Schema, model } = require('mongoose');
const { productValidation } = require('./productValidation');


const productSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: String, default: "On" },
    desc: { type: String, required: true },
    technical: { type: String, required: true },
    image: [{ type: String, required: true }],
    isActive: { type: Boolean, default: true },
    isAccept: { type: Boolean, default: false },
    code: { type: Number, required: true },
    view: { type: Number, default: 0 },
    productCategory: { type: Schema.Types.ObjectId, ref: "Category" },
    seller: { type: Schema.Types.ObjectId, ref: "Seller" }
}, { timestamps: true })


productSchema.statics.productValidate = function (body) {
    return productValidation.validate(body);
}

module.exports = model("Product", productSchema)