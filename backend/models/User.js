const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    gId: { type: String, require: true },
    name: {type: String, require: true},
    email: {type: String, require: true},
}, {timestamps: true})

const UserModel = mongoose.model(
    process.env.UserCollection || "User",
    UserSchema,
    process.env.UserCollection || "User"
);

module.exports = UserModel;