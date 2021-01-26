const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:String,
    googleId:String,
    name:String,
    profileUrl:String
});

mongoose.model('user',userSchema);