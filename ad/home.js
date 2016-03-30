var express = require("express");
var home = express.Router();
home.get("/", function (req, res){
        if (req.query["position"] && req.query["type"]) {
            console.log(req.query);
                res.render("home1", {position:req.query["position"], type:req.query["type"]});
        }else{
                res.redirect("/?position=by&type=food");
        }
        
    });
home.get("/loadmore", function(req, res){
                var x = require("./sql2json");
                x.loadmore(req.query.owner, function(results){
                                res.json(results);
                        });
        });
home.get("/data", function(req, res){
                var x = require("./sql2json");
                x.find(req.query.p, req.query.t, function(data){
                        if (data) {
                            res.json(data);
                        }else{
                                res.end("{}");
                        }
                        
                });
        });
module.exports = home;