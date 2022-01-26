const { Schema, model } = require('mongoose');


const userSchema = Schema({

    userName: {
        type: String,
        require: true
    },

    userEmail: {
        type: String,
        require: true,
        unique: true
    },

    userPass: {
        type: String,
        require: true
    },

    userStatus: {
        type: Boolean,
        default: false
    }

});

userSchema.method('toJSON', function () {
    const { __v, _id, userPass, ...object } = this.toObject();
    object.userId = _id;
    return object;
});

module.exports = model('User', userSchema);