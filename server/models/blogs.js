const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
        unique: false,
    },
    tag:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    imgSrc:{
        type: String,
        required: false,
        trim: false,
        unique: false,
        lowercase: false,
    }
}, {
    timestamps: true,
})


// methods
blogSchema.methods = {
}

module.exports = mongoose.model("Blogs",blogSchema)