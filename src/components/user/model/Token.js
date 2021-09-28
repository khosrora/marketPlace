const { Schema, model } = require('mongoose');



const tokenSchema = new Schema({
    token: { type: String, required: true },
    active: { type: Boolean, default: false }
}, { timestamps: true })


module.exports = model("Token", tokenSchema)