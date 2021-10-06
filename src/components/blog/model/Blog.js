const { Schema, model } = require('mongoose');
const { blogValidation } = require('./BlogValidation');



const blogSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    shortDesc: { type: String, required: true },
    desc: { type: String, required: true },
    isShow: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });


blogSchema.statics.blogValidate = function (body) {
    return blogValidation.validate(body);
}

module.exports = model("Blog", blogSchema)