$(function(){
    $.get(position, function(result){
            var counter= 0;
            var map = ["Right", "Left",""];
            for(var key in result[type]){
                
                var data = result[type][key];
                var item= $('<div class="none col-md-3 wow bounceIn'+map[counter%3]+'" data-wow-delay="0.4s">');
                var gird1= $('<div class="grid1">');
                var imgPanel = $('<div class="view view-first">');
                var imgin = $('<div class="index_img">');
                imgin.append($('<img src="'+data.slides[0].img+'" class="img-responsive" alt=""/>'));
                var description = $('<div class="sale" id="description">');
                description.text(type);
                var mask = $('<div class="mask">');
                mask.append($('<img class="col-md-12" src="'+(data.slides[1]?data.slides[1].img: data.slides[0].img)+'"/>'));

                
                imgPanel.append(imgin);
                imgPanel.append(description);
                imgPanel.append(mask);
                
                var textWrapper = $(' <div class="inner_wrap">');
                var title = $('<h3 id="title">');
                title.text(data.detail.title);
                var ad_phone = $('<ul class="star1">');
                ad_phone.append($('<h4 class="green">地址：'+data.detail.address+'</h4>'));
                ad_phone.append($('<li>联系方式: '+data.detail.phone+'</li>'));
                textWrapper.append(title);
                textWrapper.append(ad_phone);
                imgPanel.append(textWrapper);
                gird1.append(imgPanel);
                item.append(gird1);
                
                var last = $('<div class="clearfix"> </div>');
                item.append(last);
                $("#main").append(item);
                counter++;
            }
            new WOW().init();
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
