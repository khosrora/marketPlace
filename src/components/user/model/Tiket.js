const { Schema, model } = require('mongoose');



const tiketSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    text: { type: String, required: true },
    isRead: { type: Boolean, default: false }
}, { timestamps: true })




module.exports = model("Tiket", tiketSchema)