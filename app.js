var express = require('express');

var surveyController = require("./surveyController");

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

surveyController(app);

app.listen(3000);
console.log("Listening on port 3000");
