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
        if (session.incomingMessage.Content.indexOf("HEYSERVER:") === 0) {
            for (var key in __.socket.sockets.sockets) {
                            __.socket.sockets.sockets[key].emit("serverCall", session.incomingMessage.Content);
                        }
             session.replyTextMessage("OK");
                return ;
        }
        
        if (session.incomingMessage.Content === "我要优惠码") {
                x.getSales(function(result){
                                if (result) {
                                    session.replyTextMessage("您的“飞啦优惠码”是： "+result.salescode +" , 请妥善保管，每个优惠吗只能使用一次哟～ 获取您身边的商家通讯录请访问 http://ad.flyla.cn ");
                                }else{
                                    session.replyTextMessage("通过威信获取“飞啦优惠码”失败。请直接访问 http://ad.flyla.cn ，在页面的右上角获取～");  
                                }
                        });
        }else{
                x.useSales(session.incomingMessage.Content, function(result){
                                if (result) {
                                        session.replyTextMessage("优惠码有效！请尽情的消费吧！");
                                }else{
                                        session.replyTextMessage("您输入的优惠码有问题，请检查后再试一试。或者请前往 http://ad.flyla.cn/ 重新申请一个。"); 
                                }
                });
        }
    });
module.exports = router;
