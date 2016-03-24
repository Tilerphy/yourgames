var express = require("express");
var real = express.Router();
real.get("/", function(req,res){
        res.render("real");
    });

module.exports = real;