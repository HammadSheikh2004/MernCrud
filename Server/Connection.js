const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/mernCrud")
    .then(() => {
        console.log("Database connection successful!");
    })
    .catch((err) => {
        console.error("Database connection error: ", err);
    });

module.exports =  mongoose ;
