var express = require("express");
var router = express.Router();
var WC = require("nodejs-wechat");
var option={
        url:"",
        token:""
    };
WC.prototype.verifyRequest = function(req, res){
    if (res) {
        res.write(req.query.echostr);
        res.end();
    }
    return true;
  
};
var wechat = new WC(option);
router.get("/weixin", wechat.verifyRequest.bind(wechat));
router.post("/weixin", wechat.handleRequest.bind(wechat));
wechat.on("text", function(session){
        request.post("http://ad.flyla.cn:8888/message", {form:{"message":session.incomingMessage.Content}});
        session.replyTextMessage("OK");
    });
module.exports = router;
