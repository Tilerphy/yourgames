var http = require("http");
var express = require("express");
var app = express();
app.get("/", function(req,res){

	res.send("Hi");
});

var server = app.listen(8888,function(){
	console.log("OK");
});

