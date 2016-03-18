var express = require("express");
var router = express.Router();
//function filter(req,res) {
//    //TODO: add in if has filter
//}
//router.use("/", function (req,res,next){
//        filter(req,res);
//        
//        next();
//    });
router.get("/", function(req,res){
        res.render("home");
    });

module.exports = router;