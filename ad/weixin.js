var express = require("express");
var router = express.Router();
var WC = require("nodejs-wechat");
var x = require("./sql2json");
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
router.get("/", wechat.verifyRequest.bind(wechat));
router.post("/", wechat.handleRequest.bind(wechat));
wechat.on("text", function(session){
        //for (var key in __.socket.sockets.sockets) {
        //            __.socket.sockets.sockets[key].emit("serverCall", session.incomingMessage.Content);
        //        }
        //session.replyTextMessage("OK");
       
        x.useSales(session.incomingMessage.Content, function(result){
                        if (result) {
                                session.replyTextMessage("优惠码有效！请尽情的消费吧！");
                        }else{
                                session.replyTextMessage("您输入的优惠码有问题，请检查后再试一试。或者请前往 http://ad.flyla.cn/ 重新申请一个。"); 
                        }
        });
    });
module.exports = router;
