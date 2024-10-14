const mongoose = require("mongoose");

let UserModel = new mongoose.Schema({
    name: {
        required: "Name is Required",
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: "Email is Required",
    },
    phone: {
        type: String,
        required: "Phone is Required",
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: "Image is Required"
    }
});

module.exports = mongoose.model('User', UserModel, "UserData");