//Initial the main Framework: Express, SWIG
var express = require("express");
var cookie = require("cookie-parser");
var swig = require("swig");
var bodyParser = require("body-parser");
var center = require("./center");
//Create instance of Express
var app = express();
__app = app;
__ = {};
__.app = app;
//set cookie-parser body-parse
app.use(bodyParser());
app.use(cookie());
//set the static resources
app.use("/js", express.static("js"));
app.use("/imgs", express.static("imgs"));
app.use("/css", express.static("contents"));
app.use("/audios", express.static("audios"));
//set the view engine: swig, file type: .html
app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname+"/views");
//create areas
var areas =require("./areas");
areas(app);
//run the extensions
require("./extensions");
//run tests
//require("./tests");
//debug
app.set("view cache", false);
swig.setDefaults({cache:false});
//start server;
center.addFeature("./miner", "./games_talking")
    .listen(app, 8888);
console.log("Initialized Completed.");

