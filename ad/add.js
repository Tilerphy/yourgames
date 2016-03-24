var express= require("express");
var multiparty = require("multiparty");
var fs = require("fs");
var router = express.Router();
var uuid = require("node-uuid");
router.get("/", function(req,res){
        res.render("add", {key:uuid.v4()});
    });
router.post("/", function(req,res){
        var form = new multiparty.Form();
        form.encoding="utf-8";
        form.uploadDir="./static/data";
        form.maxFilesSize=2*1024*1024*1024;
        form.parse(req, function(err, fields, files){
                for(var i in files.files){
                    var file = files.files[i];
                    console.log(file);
                    fs.renameSync(file.path, "./static/data/"+(uuid.v4())+".jpg");
                }
                res.render("add");
            });

    });
module.exports = router;