const { Schema, model } = require('mongoose');



const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    text: { type: String, required: true },
}, { timestamps: true })




module.exports = model("Comment", commentSchema)