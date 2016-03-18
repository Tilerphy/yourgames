window.onload= function(){
        $.get("/auth/access", function(result){
                if (result) {      
                    $("#sign").html($("<strong>"+result["username"]+"</strong>"));
                }else{
                                if (window.location.href.indexOf("?reply=")===-1) {
                                     $("#sign").attr("href",
                                                "/auth/signin?reply="+ encodeURIComponent(window.location));
                                }else{
                                        $("#sign").attr("href", window.location.href);
                                }
                }
            });
        
    };