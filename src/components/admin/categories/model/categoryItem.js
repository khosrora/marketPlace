const { Schema, model } = require('mongoose');


const categoryItemSchema = new Schema({
    name: { type: String, required: true },
    tags: [{ type: String, required: false }]
})

module.exports = model("CategoryItem", categoryItemSchema)