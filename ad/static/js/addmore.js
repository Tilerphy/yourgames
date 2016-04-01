function reload() {
       $.get("/data?p="+load_position+"&t="+load_typename, function(result){
            var items = result[load_typename];
            $("#owner").html("");
            for(var key in items){
                $("#owner").append($("<option value='"+items[key].id+"'>"+items[key].detail.title+"</option>"));
            }
            $("#description").text(items[key].detail.description);
       });
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

