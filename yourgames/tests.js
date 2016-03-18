//test module, test_this(func);
// the functions will be run.
var test_list = [];
var events = require("events");
var moment = require("moment");
var uuid = require("node-uuid");
var emitter = new events.EventEmitter();
emitter.on("test_register_completed", function(){
        for(var test in test_list){
                console.log("TEST module: ######"+ test+"######");
                test_list[test]();
            }
        });
function test_this(name,args) {
    test_list[name] = args;
    
}
test_this("dbhelper", function (args) {
    var helper = require("./core/sql");
    var uid = uuid.v4();
helper.insert("test", {"id":uid, "val":Number(moment())}, function(err, result){
        if (err) {
            console.log("INSERT ERROR: ", err.message);
        }else{
            console.log("INSERT  AFFECTED: ", result.affectedRows);
        }
    });
helper.update("test", {"val":"adsa"}, "val like ?", ["%"], function(err,result){
        if (err) {
            console.log("UPDATE ERROR: ", err.message);
        }else{
            console.log("UPDATE  AFFECTED: ", result);
        }
    });
helper.query("test","val=?",["baozi"],["id","val"], function(err,result){
        if (err) {
             console.log("QUERY ERROR: ", err.message);
        }else{
            console.log(result);
        }
    });
//helper.delete("test","val like ?",["%"],function(err,result){
//    if (err) {
//             console.log("DELETE ERROR: ", err.message);
//        }else{
//            console.log(result);
//        }
//    });
for(var i =0;i<20;i++){
helper.query("test","val=?", ["baozi"],["id"], function(err,result){
        if (err) {
             console.log("QUERY ERROR: ", err.message);
        }else{
            console.log(result);
        }
    });
}
console.log(typeof(1));
});
//TODO: ADD TEST METHODS HERE
//
//
//
//TODO: END
emitter.emit("test_register_completed");