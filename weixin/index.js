var express = require("express");
var mid = require("express-middlewares-js");
var app = express();
var http =require("http");
var querystring = require("querystring");
__ = {};
__.app = app;
app.use("/weixin", mid.xmlBodyParser({
        type:"text/xml"
    }));
var WC = require("nodejs-wechat");
WC.prototype.verifyRequest = function(req, res){
    if (res) {
        res.write(req.query.echostr);
        res.end();
    }
    return true;
  
};
var wechat = new WC(option);
app.get("/weixin", wechat.verifyRequest.bind(wechat));
app.post("/weixin", wechat.handleRequest.bind(wechat));
wechat.on("text", function(session){
        console.log(session.incomingMessage.Content);
        session.replyTextMessage("OK");
    });
//require("./json2sql");

app.listen(80);
console.log("Completed.");
