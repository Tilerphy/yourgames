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
var option = {
        token: "346410840",
        url:"http://ad.flyla.cn/weixin"
    };
WC.prototype.verifyRequest = function(req, res){
    
  res.write(req.query.echostr);
  res.end();
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
