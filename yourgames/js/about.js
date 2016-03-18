function onload_completed(){
        IO = io.connect("/games_talking");
        IO.on("hey_client", function(msg){
                var m = $("<div class='well well-sm text-right col-xs-*'>"+ msg +"</div>");
                
                $("#msg").append(m);
                m.show();
                $("body,html").animate({scrollTop: m.offset().top}, 200);
        });
        IO.on("hey_clients", function(msg){
                var m = $("<div class='well well-sm text-left'>"+ msg +"</div>");
                $("#msg").append(m);
                m.show();
                 $("body,html").animate({scrollTop: m.offset().top}, 200);
        });
        IO.on("userlist", function(msg){
                        var all = JSON.parse(msg);
                        for(var i in all){
                              var m = $("<div class='well well-sm text-center text-info'>"+ all[i] +"</div>");
                              $("#msg").append(m);
                              m.show();
                               $("body,html").animate({scrollTop: m.offset().top}, 200);
                        }
                        
                });
        IO.on("img", function(msg){
                        var m = $("<div class='well well-sm text-center text-info'><img style='max-width:300px;max-height:300px' src='"+ msg+"'/></div>");
                        $("#msg").append(m);
                        m.show();
                         $("body,html").animate({scrollTop: m.offset().top}, 200);
                });
        IO.on("beat", function(msg){
                        if (mute) {
                            //code
                        }else{
                                var item = JSON.parse(msg);
                                var m = $("<audio style='display:none' src='"+item.fileName+"'></audio>");
                                $("#msg").append();
                                m[0].play(); 
                        }
                });
        IO.on("callyou", function(){
                        var m = $("<audio style='display:none' src='/audios/1%20(70).mp3'></audio>");
                        $("#msg").append();
                        m[0].play();
                });
        var i = 0;
        $("#sayBtn").click(function(){
                var msg = $("#sayMsg").val();
                var msgs =[];
                var seqs=[];
                if (msg.indexOf("seq piano:") === 0) {
                    msgs = msg.split(":");
                    seqs = msgs[1].split(" ");
                    setTimeout(function(){
                                tmp(seqs);
                        }, 100);
                }
                IO.emit("hey_server", msg);
                $("#sayMsg").val("");
        });
        
        function tmp(seqs){
                                var o = parseInt(seqs[i].trim());
                                if (o<=18) {
                                    IO.emit("hey_server", "p"+(o+80));
                                }else{
                                    IO.emit("hey_server", "p"+(o-18)); 
                                }
                                    
                                    i+=2;
                                    if (i+1 < seqs.length) {
                                        setTimeout(function(){
                                                            tmp(seqs);
                                                }, parseInt(seqs[i+1].trim()));
                                    }else{
                                        i = 0;
                                    }
                                    
        }
        var mute = false;
        $("#muteBtn").click(function(){
                        mute = !mute;
                        $("#muteBtn").removeClass(!mute?"btn-warning":"btn-primary");
                        $("#muteBtn").addClass(mute?"btn-warning":"btn-primary");
                });
        $("#sayMsg").keydown(function(e){
                        if (e.keyCode ===13) {
                            $("#sayBtn").click();
                        }else if ($("#sayMsg").val().indexOf("piano") === 0) {
                            IO.emit("hey_server", "p"+(e.keyCode - 64));
                            return false;
                        }else if ($("#sayMsg").val().indexOf("beat") === 0) {
                            IO.emit("hey_server", "b"+(e.keyCode - 64));
                            return false;
                        }
                });
}