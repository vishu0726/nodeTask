const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({phoneNo:[]});

const PhoneDirectory = mongoose.model('phoneDirectory',dataSchema);

module.exports = PhoneDirectory;