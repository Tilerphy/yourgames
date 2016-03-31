$(document).ready(function(){
    IO = io.connect();
    IO.on("serverCall", function(msg){
            alert(msg);
        });
    $("#getSales").on("click", function(){
            $.get("/getSales", function(result){
                    if (result.salescode) {
                        $("#dialog_content").html("");
                        $("#dialog_content").append($("<h4>请记住您的优惠码，并交给商家： "+result.salescode+"</h4>"));
                        $("#dialog").modal("show");
                    }
                });
        });
});