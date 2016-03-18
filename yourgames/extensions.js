console.log("Start adding extensions.");
//format string
//reg and replace
String.prototype.format =  function(params){
    
    var reg = /{(\d+)}/gm;
    return this.replace(reg, function(match,sub){
            return params[sub];
        });
}

Number.prototype.times = function(action){
    for(var i=0; i<this; i++){
        action(i);
    }
}
console.log("Extensions were added.");
