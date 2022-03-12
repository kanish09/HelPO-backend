const mongoose = require('mongoose');
const databaseURL = "mongodb://localhost:27017/HelPO";
module.exports = function() {
    mongoose.connect(databaseURL)
        .then(() => console.log(`Connected to database: ${databaseURL}`))
        .catch((err) => console.log("Connection failed :- ", err))
}