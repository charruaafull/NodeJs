const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log('error al conectar'));