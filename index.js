const express = require('express');
const app = express();
const cors = require('cors');
const adminServices = require('./src/server/adminServices');
// const userServices =require('./src/server/userServices');
const bodyParser = require('body-parser');
const env = require('./config/env');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/addBook", adminServices.newBook);
app.post("/deleteBook", adminServices.deleteBook);
app.post("/updateBook", adminServices.updateBooks);
app.post("/displayBooks", adminServices.displayBooks);

app.use(cors(), function (req, res, next) { next() });
app.use(express.static('public'));
app.listen(3000, function () {
	console.log('Listening on port 3000!');
})