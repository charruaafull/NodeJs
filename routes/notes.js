const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');



router.get('/', function (req, res, next) {

    var query = Usuario.find({});
    //query.where('name', 'br');
    query.exec(function (err, users) {
        if (users) {
            res.render('notes/add', {users: users});
        }
    });

});

router.get('/add', function (req, res, next) {
    Usuario.find().then(function (users) {
        res.render('notes/add', {users: users});
    }).catch(function (reason) {
        res.send(reason);
    });
});

router.get('/upd/:id', function (req, res, next) {
    const _id = req.params.id;
    Usuario.findOne({_id: _id}, function (err, user) {
        res.render('notes/upd', {user: user});
    });
});

router.get('/del/:id', function (req, res, next) {
    const _id = req.params.id;
    Usuario.findByIdAndRemove({_id: _id}, function (err, user) {
        if (user) {
            Usuario.find({}).then(function (users) {
                res.render('notes/add', {users: users});
            }).catch(function (reason) {
                res.send(reason);
            });
        }
    });
});

router.post('/edit-user', function (req, res, next) {
    const {_id, name, lastname, username, password} = req.body;
    Usuario.findByIdAndUpdate(_id, req.body, function (requ, user) {
        if (user) {
            Usuario.find({}).then(function (users) {
                res.render('notes/add', {users: users});
            }).catch(function (reason) {
                res.send(reason);
            });
        }
    });
});

router.post('/new-note', function (req, res, next) {
    const {name, lastname, username, password} = req.body;
    const errors = [];
    if (!name) {
        errors.push({text: 'Inserte su nombre'});
    }

    if (!lastname) {
        errors.push({text: 'Inserte su apellido'});
    }

    if (!username) {
        errors.push({text: 'Inserte su apellido'});
    }

    if (!password) {
        errors.push({text: 'Inserte su apellido'});
    }

    /*
    Si hay error lo redirecciono a la vista con errores
     */
    if (errors.length > 0) {

        Usuario.find({}).then(function (users) {
            res.render('notes/add', {users: users, errors: errors, nom: nom, ape: ape});
        }).catch(function (reason) {
            res.send(reason);
        });

    } else {
        /*var hashPass = bcrypt.hashSync(password, 5);
        console.log(hashPass);*/
        const newUsuario = new Usuario({name, lastname, username, password});
        newUsuario.save().then(function () {

            Usuario.find({}).then(function (users) {
                res.render('notes/add', {success: true, users: users});
            }).catch(function (reason) {
                res.send(reason);
            });

        }).catch(function (reason) {
            res.send(reason);
        }); //guardo el dato
    }
});


module.exports = router;
