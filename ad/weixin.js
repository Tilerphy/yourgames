var express = require("express");
var router = express.Router();
var WC = require("nodejs-wechat");
var x = require("./sql2json");
var fs = require("fs");
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
        
        fs.readFile("./data/1-151.txt", function(err, data){
                        try{
                                var text = data.toString();
                                var sp = text.split("\n");
                                var count = parseInt(session.incomingMessage.Content)-1;
                                if (count>150 || count <0) {
                                        session.replyTextMessage("还没有收录其他世代的小精灵，敬请期待");
                                }else{
                                        var line = sp[count];
                                        var cells = line.split(",");
                                        var att = "";
                                        if (cells.length == 7) {
                                            att = "["+cells[5]+","+cells[6]+"]";
                                        }else{
                                                att="["+cells[5]+"]";
                                        }
                                        session.replyTextMessage("全国编号:"+cells[1].trim()+"\n中文名称："+cells[2].trim()
                                                                +"\n英文名称："+cells[4].trim()+
                                                                "\n日文名称："+cells[3].trim()+
                                                                "\n属性："+ att +
                                                                "\n百科： http://www.pokemon.name/wiki/"+ encodeURIComponent(cells[2].trim()));
                                }
                        }catch(e){session.replyTextMessage("输入数字查询PM");}
                });
        /*if (session.incomingMessage.Content === "我要优惠码") {
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
        }*/
    });
module.exports = router;
