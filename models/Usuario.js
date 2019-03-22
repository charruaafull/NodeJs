const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

var UsuarioSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

UsuarioSchema.pre('save', function (next) {
    var user = this;
    var hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);