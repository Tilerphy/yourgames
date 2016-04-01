var data = {};
function reload() {
       $.get("/data?p="+load_position+"&t="+load_typename, function(result){
            var items = result[load_typename];
            data= {};
            $("#owner").html("");
            for(var key in items){
                $("#owner").append($("<option value='"+items[key].id+"'>"+items[key].detail.title+"</option>"));
                data[items[key].id] = {description: items[key].detail.description, slidetime: items[key].slidetime};
            }
       });
}
function ownerChanged(args) {
    $("#slidetime").val(data[args.value].slidetime);
    $("#description").text(data[args.value].description);
}
function typenameChanged(args) {
    load_typename= args.value;
    reload();
}

function positionChanged(args) {
    load_position=args.value;
    reload();
}
reload();

