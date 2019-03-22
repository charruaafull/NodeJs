var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
var bcrypt = require('bcrypt');

router.post('/signin', function (req, res, next) {

    const errors = [];

    const {username, password} = req.body;

    if (!username) {
        errors.push({text: 'Ingrese un usuario'});
    }

    if (!password) {
        errors.push({text: 'Ingrese una contraseña'});
    }

    if (errors.length > 0) {
        res.render('index', {errors: errors});
    } else {
        var query = Usuario.findOne();
        query.where('username', username);
        query.exec(function (err, user) {
            if (user) {
                var passDB = user.password;
                bcrypt.compare(password, passDB, function (err, doesMatch) {
                    if (doesMatch) {
                        res.render('notes/add');
                    } else {
                        errors.push({text: 'Contraseña incorrecta'});
                        res.render('index', {errors: errors, username:username});
                    }
                });
            } else {
                errors.push({text: 'El usuario no existe'});
                res.render('index', {errors: errors, username:username});
            }
        })
    }

});

router.get('/signup', function (req, res, next) {
    res.send('Formulario de Registro');
});

module.exports = router;
