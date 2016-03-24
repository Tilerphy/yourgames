var express = require("express");
var home = express.Router();
home.get("/", function (req, res){
        if (req.query["position"] && req.query["type"]) {
            console.log(req.query);
                res.render("home1", {position:req.query["position"], type:req.query["type"]});
        }else{
                res.redirect("/?position=cc&type=food");
        }
        
    });
module.exports = home;