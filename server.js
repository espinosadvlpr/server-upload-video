var express = require('express');
var fileUpload = require('express-fileupload');
var cors = require('cors');

var app = express();

app.use(fileUpload());
app.use(cors());

app.get('/new-instance', (req, res) => {
    //aqui se llamaria al bash para crear una nueva imagen de docker
    res.json({ msg: 'Se ha creado una nueva imagen de docker.' });
});

app.post('/upload', (req, res) => {
    //aqui se guarda el email en una variable
    var email = req.body.email;
    console.log(email);
    if (req.files === null) {
        return res.status(400).json({ msg: 'no file uploaded.' });
    }
    //aqui se guarda el video en una variable
    const file = req.files.file;
    console.log(file)
    //aqui se guarda el video en una carpeta en disco
    var path = `${__dirname}/uploads/${file.name}`;
    file.mv(path, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ msg: 'El video se subio correctamente al servidor.' });
    })
});


/*
Este metodo es el que obtiene la duracion del video cuando ya esta en disco

const { getVideoDurationInSeconds } = require('get-video-duration')
const fs = require('fs')
const stream = fs.createReadStream(`${__dirname}/uploads/video.mp4`)

getVideoDurationInSeconds(stream).then((duration) => {
    console.log(duration)
})*/

app.listen(3000, () => console.log('Server running on http://localhost:3000/'));