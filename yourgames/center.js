_userlist={};
var center = {
    loaded_modules:[],
    addFeature:function(){
            for(var i in arguments){
                this.loaded_modules[this.loaded_modules.length] =
                    {
                        name:arguments[i].substr(1),
                    };
                console.log("[SOCKET CENTER: LOADED]: ", arguments[i]);
            }
            return this;
        },
    listen : function(express_app , port){
                var self =this;
                var http = require("http").Server(express_app);
                var socket = require("socket.io")(http);
                for(var i in self.loaded_modules){
                    
                    socket.of(self.loaded_modules[i].name)
                          .on("connection", function(client){
                                attach_cookie(client, function(){
                                    require("."+client.nsp.name).run(client);
                                });
                          });
                }
                http.listen(port, function(){
                        console.log("SOCKET IO LISTENING NAMESPACES:",self.loaded_modules);
                });
             
                
                function attach_cookie(client, callback) {
                    var socket_cookie = getCookie(client.client.conn.request.rawHeaders);
                    var socket_id = client.client.conn.id;
                    var cookie_auth = "";
                    var cookie_status = "";
                    var cookies;
                    if (socket_cookie) {
                        cookies = socket_cookie.split(";");
                        for(var i in cookies){
                            if (cookies[i].trim().indexOf("auth=") == 0 ) {
                                cookie_auth = cookies[i].substr("auth=".length+1);
                            }else if (cookies[i].trim().indexOf("status_id=") == 0) {
                                cookie_status = cookies[i].substr("status_id=".length+1);
                            }
                        }
                        if (cookie_auth && cookie_status) {
                            if (client.currentUser && client.currentUser.type === 1) {
                                callback();
                                return;
                            }else{
                                var validate = require("./auth").validate;
                                validate(cookie_auth, cookie_status,  function(user){
                                    console.log(user);
                                    client.currentUser = user;
                                    client.currentUser.cookie_status = cookie_status;
                                    client.currentUser.cookie_auth = cookie_auth;
                                    client.currentUser.type= 1;
                                    client.currentUser.socket_id = socket_id;
                                    _userlist[user.username] = client;
                                    callback();
                                    
                                });
                                return;
                            }
                        }
                    }
                    //The Line
                    
                    if (client.currentUser && client.currentUser.type === 0) {
                            callback();
                    }else{
                            var uuid = require("node-uuid");
                            client.currentUser = {username:uuid.v4(), icon:"/imgs/default_icon.png", type: 0};
                            callback();
                    }
            
                }

        
                function getCookie(rawheaders) {
                    var isCookie = false;
                    for(var i in rawheaders){
                        if (isCookie) {
                            return decodeURIComponent(rawheaders[i]);
                        }else{
                            isCookie = rawheaders[i] === "Cookie";
                        }
                    }
                }
    }
}

module.exports = center;