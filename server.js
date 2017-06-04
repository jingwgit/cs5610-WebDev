//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

//the ip address for local server is always '127.0.0.1'.
var ipaddress = '127.0.0.1';
var port      = process.env.PORT || 3000;

//go to folder public to find html files.
app.use(express.static(__dirname+'/public/assignment'));

app.listen(port, ipaddress);

console.log("hello world!");