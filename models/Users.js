const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        maxlength: 60,
        minlength: 2,
        required: true,
        unique: true

    },
    password: {
        type: String,
        minlength: 5,
        required: true

    }
});


module.exports = mongoose.model('users', UserSchema)