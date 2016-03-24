$(function(){
    $.get(position, function(result){
            var counter= 0;
            for(var key in result[type]){
                
                var c = $("<div id='c"+counter+"' class='col-xs-3 col-sm-3 col-md-3 col-lg-3 carousel slide'>");
                var inner = $("<div class='carousel-inner'>");
                var slides = result[type][key]["slides"];
                var items = [];
                for(var slide in slides){
                    var item = $("<div class='item center'>");
                    var img = $(" <img src='"+slides[slide]["img"]+"'>");
                    img.on("click", result[type][key], popUp);
                    var title = $("<div class='runin'>");
                    title.text(slides[slide]["title"]);
                    items[items.length] = item;
                    item.append(img);
                    item.append(title);
                    inner.append(item);
                }
                items[0].addClass("active");
                c.append(inner);
                $("#container").append(c);
                c.carousel({
                        interval: result[type][key]["slidetime"] * 1000
                    });
                counter++;
            }
        });
    
            //<div id="c1" class="col-xs-3 col-sm-3 col-md-3 col-lg-3 carousel slide">
            //      <div class="carousel-inner">
            //         <div class="item active center">
            //            <img src="http://y1.ifengimg.com/cmpp/2016/03/21/13/86273ffa-9920-4450-b9f4-55eb5140c972_size38_w580_h387.jpg">
            //            <div class="runin">第一章</div>
            //         </div>
            //         <div class="item center">
            //            <img src="http://7te8bu.com1.z0.glb.clouddn.com/uploads/new/article/740_740/201507/55bb01d0c9234.jpg?imageMogr2/format/jpg/quality/80">
            //            <div class="runin">第2章</div>
            //         </div>
            //      </div>
            //</div>
    
        function popUp(args) {
            $('#window').modal('show');
            $('#title').text(args.data.detail.title);
            $('#phone').text("联系方式： "+args.data.detail.phone);
            $('#address').text("地址： "+args.data.detail.address);
            $('#description').html("简介： <br>"+args.data.detail.description);
        }
    });
