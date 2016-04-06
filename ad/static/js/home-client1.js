$(function(){

    $.get(position, function(result){
            var counter= 0;
            var ns = [$('#n1'),$('#n2'),$('#n3'),$('#n4')];
            var map = ["bounceInLeft", "bounce", "bounce", "bounceInRight"];
            var typeMap = {"food":"餐饮", "mall":"商超", "healthy":"医疗", "play":"娱乐", "teach":"教育", "live":"生活服务", "numbers":"旧版通讯录"};
            $(document).attr("title", "飞啦网-"+typeMap[type]);
            for(var key in result[type]){
                
                var data = result[type][key];
            
                var item= $('<div class="col-md-12 leaveHeader wow '+map[counter%4]+'" data-wow-delay="0.2s">');
                item.on("click", data, popUp);
                var gird1= $('<div class="grid1">');
                var imgPanel = $('<div class="view view-first">');
                var imgin = $('<div class="index_img">');
                imgin.append($('<img src="'+data.slides[0].img+'"  alt=""/>'));
                var description = $('<div class="sale" id="description">');
                
                description.text(type);
                var mask = $('<div class="mask">');
                mask.append($('<img class="col-md-12" src="'+(data.slides[1]?data.slides[1].img: data.slides[0].img)+'"/>'));
                
                
                imgPanel.append(imgin);
                imgPanel.append(description);
                if (data.slidetime==5) {
                    imgPanel.append($("<img src='/static/data/validated.png' style='top:7px;left:10px;position:absolute'/>"));
                }
                if (data.slidetime==4) {
                    imgPanel.append($("<img src='/static/data/validated.png' style='top:7px;left:10px;position:absolute'/>"));
                    imgPanel.append($("<div class='sale' style='top:40px;right:20px;position:absolute;color:#fff;background-color:crimson'>本站特惠！</div>"));
                }
                imgPanel.append(mask);
                
                var textWrapper = $(' <div class="inner_wrap">');
                var title = $('<h3 id="title">');
                title.text(data.detail.title);
                var ad_phone = $('<ul class="star1">');
                ad_phone.append($('<h4 class="green">'+data.detail.address+'</h4>'));
                ad_phone.append($('<li>联系方式: '+data.detail.phone+'</li>'));
                textWrapper.append(title);
                textWrapper.append(ad_phone);
                imgPanel.append(textWrapper);
                gird1.append(imgPanel);
                item.append(gird1);
                
                var last = $('<div class="clearfix"> </div>');
                item.append(last);
                ns[counter%4].append(item);
                counter++;
            }
            new WOW().init();
        });
    
    
        function popUp(args) {
            $('#window').modal('show');
            $('#window_title').text(args.data.detail.title);
            $('#window_phone').text("联系方式： "+args.data.detail.phone);
            $('#window_address').text("地址： "+args.data.detail.address);
            $('#window_description').html("简介： <br>"+args.data.detail.description);
            $('#window_pics').html("");
            $.get("/loadMore?owner="+args.data.id +"&rand="+Math.random(), function(result){
                    for (var i in result) {
                         $('#window_pics').append($('<div class="col-md-10 col-md-offset-1 leaveHeader">'+
                                                    '<img class="col-md-12 img-responsive" src="'+
                                                    result[i].url+'"/></div>'));
                    }
                });
            
        }
        function mock_get(str, callback) {
            callback(["/static/data/10000000-1.jpg","/static/data/10000000-1.jpg","/static/data/10000000-1.jpg","/static/data/10000000-1.jpg","/static/data/10000000-1.jpg"]);
        }
    });
