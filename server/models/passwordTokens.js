const mongoose = require('mongoose');

const passwordResetTokenSchema = new mongoose.Schema({
    value:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
}, {
    timestamps: true,
})


// methods
passwordResetTokenSchema.methods = {
}

module.exports = mongoose.model("PasswordResetTokens",passwordResetTokenSchema)