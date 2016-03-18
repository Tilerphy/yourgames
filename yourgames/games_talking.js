var https = require("https");
var talking = function (client) {
            client.on("hey_server", function(msg){
                        if (msg && msg!= "") {
                            checkMsg(client, msg, function(){
                                    client.broadcast.emit("hey_clients", "["+client.currentUser.username+"] "+ msg);
                                    client.emit("hey_client", "["+client.currentUser.username+"] "+ msg);
                                    });
                                
                            
                        };
                    });
}

function checkMsg(client,msg, then) {
                if(msg.indexOf("img:") ===0){
                    client.broadcast.emit("img", msg.substr(4));
                    client.emit("img",  msg.substr(4));
                }else if (msg.indexOf("p")===0) {
                    var item ={fileName: "/audios/1 ("+msg.substr(1)+").mp3"};
                    var itemStr = JSON.stringify(item);
                    client.broadcast.emit("beat", itemStr);
                    client.emit("beat",  itemStr);
                }else if (msg.indexOf("b")===0) {
                    var item ={fileName: "/audios/beat/1 ("+msg.substr(1)+").mp3"};
                    var itemStr = JSON.stringify(item);
                    client.broadcast.emit("beat", itemStr);
                    client.emit("beat",  itemStr);
                }else if (msg.indexOf("@") > -1) {
                    var theAtIndex = msg.indexOf("@");
                    var nextstrs = msg.substr(theAtIndex+1).split(" ");
                    if (nextstrs && nextstrs.length > 0) {
                        console.log(nextstrs[0]);
                        if (_userlist[nextstrs[0]]) {
                           _userlist[nextstrs[0]].emit("callyou");
                        }
                    }
                    then();
                }else if (msg.indexOf("test") === 0 ) {
                    console.log(client);
                    then();
                }else if (msg.indexOf("rand") ===0) {
                        var msgs = msg.split(" ");
                        var max = 100;
                        if (msgs.length === 2) {
                            max = msgs[1];
                        }
                        var x = random10(max);
                        if (then) {
                            then();
                        }
                       
                        client.broadcast.emit("hey_clients", "["+client.currentUser.username+
                                                                      "扔出随机数：] "+ x);
                        client.emit("hey_client", "["+client.currentUser.username+
                                                               "扔出随机数：] "+ x);
                }
                else{
                   then();
                }
 
}


function random10(max, callback) {
                var x = parseInt(max * Math.random());
                if (callback) {
                   callback(x);
                }
                
                return x;
}
module.exports.run = talking;