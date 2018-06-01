var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (request, Response) => Response.render('index'));

app.get('/Clases', (request, Response) => Response.render('Clases'));

app.get('/Armas', (request, Response) => Response.render('Armas'));

app.get('/Victimas', (request, Response) => Response.render('Victimas'));

/*
app.post('/Victimas', (request, Response) => {
    if (!request.body.title || !request.body.body) {
        Response.status(400).send('las entradas deben trner un titulo y un nombre');
        return;
    }
    entries.push({
        title: request.body.title,
        body: request.body.body,
        created: new Date()
    });

    http.createServer(app).listen(3000, () =>
        console.log('la aplicacon Guestbook esta corriendo en el puerto 3000')
});*/
app.post('/Victimas', (request, Response) => {
    if (!request.body.title || !request.body.body) {
        Response.status(400).send('');
        return;
    }
    entries.push({
        title: request.body.title,
        body: request.body.body,
        created: new Date()
    });
    Response.redirect('/');
});
app.use((request, Response) => Response.status(404).render('404'));
http.createServer(app).listen(3000, () =>
    console.log('la aplicacon Guestbook esta corriendo en el puerto 3000')
);