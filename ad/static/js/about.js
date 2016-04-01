$(document).ready(function(){
        $.get("/about?data=data", function(result){
                for (var i in result){
                    if (result[i].indexOf("【")) {
                        $("#c").append("<h5><strong style='color:black'>"+result[i]+"</strong></h5><br />");
                    }else{
                        $("#c").append("<h3>"+result[i]+"</h3><br />");
                    }
                }
            });
    });