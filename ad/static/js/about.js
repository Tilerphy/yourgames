$(document).ready(function(){
        $.get("/about", function(result){
                for (var i in result){
                    if (result[i].indexOf("【")) {
                        $("#c").append("<h3><strong>"+result[i]+"</strong></h3><br />");
                    }else{
                        $("#c").append("<h5>"+result[i]+"</h5><br />");
                    }
                }
            });
    });