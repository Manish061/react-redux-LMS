var express = require('express');
var app = express();
var cors = require('cors');
var adminServices = require('./src/server/adminServices');
// var userServices =require('./src/server/userServices');
var bodyParser = require('body-parser');
var env=require('./config/env');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/addBook", adminServices.newBook);
app.post("/deleteBook", adminServices.deleteBook);
app.post("/updateBook", adminServices.updateBooks);
app.post("/displayBooks", adminServices.displayBooks);

app.use(cors(), function (req, res, next) { next() });
app.use(express.static('public'));
app.listen(5555, function () {
	console.log('Listening on port 5555!');
})