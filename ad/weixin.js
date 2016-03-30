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
router.get("/", wechat.verifyRequest.bind(wechat));
router.post("/", wechat.handleRequest.bind(wechat));
wechat.on("text", function(session){
        for (var key in __.socket.sockets.sockets) {
                    __.socket.sockets.sockets[key].emit("serverCall", req.body.message);
                }
        session.replyTextMessage("OK");
    });
module.exports = router;
