var express = require("express");
var home = express.Router();
var x = require("./sql2json");
var fs = require("fs");
home.get("/", function (req, res){
        if (req.query["position"] && req.query["type"]) {
            console.log(req.query);
                res.render("home1", {position:req.query["position"], type:req.query["type"]});
        }else{
                res.redirect("/?position=by&type=food");
        }
        
    });
home.get("/loadmore", function(req, res){
                
                x.loadmore(req.query.owner, function(results){
                                res.json(results);
                        });
        });
home.get("/data", function(req, res){
                x.find(req.query.p, req.query.t, function(data){
                        if (data) {
                            res.json(data);
                        }else{
                                res.end("{}");
                        }
                        
                });
        });
home.get("/getSales", function(req, res){
                x.getSales(function(result){
                                if (result) {
                                    res.json(result);
                                }else{
                                        res.json({});
                                }
                        }); 
        });
home.get("/about", function(req, res){
                if (req.query.type && req.query.position) {
                    res.render("about", {position:req.query["position"], type:req.query["type"]});
                }else{
                        fs.readFile("./static/data/wanlonglishuiwan.txt", "utf-8", function(err, data){
                                if (!err) {
                                    res.json(data.split("\n"));
                                }else{
                                        res.write(err);
                                        res.end();
                                }
                        });
                }
                
        });
module.exports = home;