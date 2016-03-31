var express = require("express");
var c= require("crypto");
var helper = require("./sql");
var moment = require("moment");
var uuid = require("node-uuid");
//create router for /auth
var router = express.Router();
//extend the filter
__.app.use(function(req, res, next){
        
            validateCookie(req, function(result){
                if (result) {
                        req.islogin=true;
                        req.username=result["username"];
                        req.icon = result["icon"];
                        res.cookie("username", req.username);
                        res.cookie("icon", req.icon);
                        next();
                }else{
                        next();
                }
            });
            
        
});
router.get("/", function(req,res)
           {
               res.redirect("/auth/signin");
            });
//create /auth/signup
router.get("/signup", function(req,res){
        res.render("signup");
    });
//create /auth/access
router.get("/access", function(req,res){
        if (req.islogin) {
            res.json({username:req.username, icon:req.icon});
        }else{
            res.json("");
        }
    });
//create /auth/signin
router.get("/signin", function(req,res){
        if(req.islogin){
                console.log("redirect=====================");
                res.redirect("/add");
        }else{
                res.render("signin");
        }
    });
//create /auth/signin post endpoint
router.post("/signin", function(req,res){
            if (!req.islogin) {
                console.log("USER LOGIN: ", req.body.username);
                signin(req, res);
            }else{
                res.redirect("/add");
            }
       
    });
//create /auth/signup post endpoint
router.post("/signup", function(req, res){
        console.log("USER SIGN UP: ", req.body.username);
        register(req.body.username, req.body.password, req.body.confirm, res);
    });
//create /auth/logout
router.get("/logout", logout);

//Normal sign in
//Validate username and password then create cookie to the authenticated user.
//auth, status_id
function signin(req,res) {
    
    var username = req.body.username;
    var password = req.body.password;
    var password_hash = sha256(password);
    helper.query("users", "username=? and password=?", [username, password_hash],["id"], function(err,result){
            if (!err) {
                if (result.length>0) {
                    var cookie =createCookie(result[0]["id"], req);
                    res.cookie("auth", cookie);
                    var status_id = uuid.v4();
                    
                    helper.insert("users_state", {id:status_id, uid:result[0]["id"]}, function(err, result){
                        if (!err) {
                            res.cookie("status_id", status_id);
                            console.log(req.query.reply);
                            res.redirect(decodeURIComponent(req.query.reply));
                        }
                        else{
                            console.log(req.url);
                            res.redirect(req.url);
                        }
                    });
                   
                }else{
                     res.render("signin");
                }
            }else{
                res.render("signin");
            }
        });
}

function register(username, password, confirm, res) {
    var password_hash = sha256(password);
    var confirm_hash = sha256(confirm);
    
    if (password_hash === confirm_hash) {
        helper.exists("users","username=?", [username], function(result){
                res.json(0);
            },
            function(err){
                            if (!err) {
                                helper.insert("users", {"username":username, 
                                                        "password":password_hash,
                                                        "icon":""},
                                                        function(err,msg2){
                                                                        if (!err) {
                                                                            res.redirect("/auth/signin");
                                                                        }else{
                                                                            res.json(err);
                                                                        }
                                                                    });
                                
                            }else{
                                res.json(0);
                            }
                           
                        });
    }
}
//create sha256
function sha256(text) {
     var sha256 = c.createHash("sha256");
     sha256.update(text);
     var result =  sha256.digest("hex");
     return result;
}

function createCookie(uid) {
     var combined = {uid:uid};
     var combined_json = JSON.stringify(combined);
     var hash = sha256(combined_json);
     combined.hash =hash;
     var cookie = (new Buffer(combined_json)).toString("base64");
     return cookie;
}
function validateCookie(req, callback) {
    var cookie = req.cookies["auth"];
    var status_id = req.cookies["status_id"];
    validateAuth(cookie, status_id, callback);
}
var validateAuth = function(cookie_auth, cookie_status_id, callback){
            helper.query("users_state", "id=?", [cookie_status_id], ["uid"], function(err, result){
            if (!err && result && result.length) {
                var createdCookie = createCookie(result[0]["uid"]);
                if (cookie_auth === createdCookie) {
                    helper.query("users", "id=?", [result[0]["uid"]], ["username", "icon"], function(err, result){
                            if (!err && result && result.length) {
                                 callback(result[0]);
                            }else{
                                callback(false);
                            }
                           
                        });
                }else{
                    callback(false);
                }
            }else{
                callback(false);
            }
        });
}
var auto_validate =function(reply){
            if (reply) {
                return function (req,res,next){
                        validateCookie(req, function(islogin){
                                    if (islogin) {
                                        next();
                                    }else{
                                            res.redirect("/auth/signin?reply="+encodeURIComponent(reply));
                                            res.end();
                                    }
                            });
                        };
            }
            
}


function logout(req, res) {
            if (req.islogin) {
                var status_id = req.cookies["status_id"];
                helper.delete("users_state", "id=?", [status_id], function(err, result){
                        if (!err && result) {
                            res.clearCookie("auth");
                            res.clearCookie("status_id");
                            res.clearCookie("icon");
                            res.clearCookie("username");
                            req.islogin=false;
                            res.redirect("/auth/signin");
                        }else{
                            res.redirect("/auth/signin");
                        }
                    });
            }else{
                res.redirect("/auth/signin");
            }
    
}

module.exports = router;
module.exports.validate = validateAuth;
module.exports.autovalidate = auto_validate;
