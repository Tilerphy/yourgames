var sql = require("mysql");
var moment = require("moment");
var uuid= require("node-uuid");
//var events = require("events");
//var emitter = new events.Emitter();
var pool = sql.createPool({
        "host":"homeserver",
        "user":"root",
        "password":"sunzongbao2007",
        "database":"ad",
    });
pool.on("connection", function(connection)
        {
           console.log("A mysql connection is started.");     
        });
//emitter.on("insert", function(insertId, insertData, next){
//                _insert("baseinfo", );
//        });
function _insert(table, fields, callback){
            if (!fields.id) {
                fields.id= uuid.v4();
            }
           
            pool.getConnection(function(err,connection){
                    if (!err) {
                        var keys=Object.keys(fields);
                        var vals = [];
                        var insteads = [];
                        for(var i in keys){
                            vals[vals.length]=fields[keys[i]];
                            insteads[insteads.length]="?";
                        }
                        var command = "insert into {0} ({1}) values ({2})"
                            .format([
                                     table,
                                     keys.join(","),
                                     insteads.join(",")
                                     ]);
                        console.log("insert sql template: ", command);
                        
                        connection.query(command, vals, function(err, result){
                                        connection.release();
                                        callback(err, result);
                                });
                    }else{
                        var message = "CONNECTION ERROR: "+ err.message;
                        console.log(message);
                        callback(message);
                    }
                });
        }

function _update(table, fields, filter, params, callback){
            pool.getConnection(function(err,connection){
                    if (!err) {
                        var keys=Object.keys(fields);
                        var vals = [];
                        var insteads = [];
                        for(var i in keys){
                            vals[vals.length]=fields[keys[i]];
                            insteads[insteads.length]=keys[i]+"=?";
                        }
                        var command = "update {0} set {1} where {2}"
                            .format([
                                     table,
                                     insteads.join(","),
                                     filter
                                     ]);
                        console.log("update sql template: ", command);
                        for(var p in params){
                                vals[vals.length] = params[p];
                        }
                        connection.query(command, vals, function(err, result){
                                        connection.release();
                                        callback(err, result);
                                });
                    }else{
                        var message = "CONNECTION ERROR: " + err.message;
                        console.log(message);
                        callback(message);
                    }
                });
        }
        
function _query(table, filter, params,  fields, callback){
            pool.getConnection(function(err, connection){
                    if (!err) {
                        var command =
                        "select {0} from {1} where {2}".format(
                                        [
                                            fields.join(","),
                                            table,
                                            filter
                                         ]                                            
                                    );
                        console.log("QUERY: ", command);
                        connection.query(command, params, function(err, result){
                                        connection.release();
                                        callback(err, result);
                                });
                    }else{
                        var message = "CONNECTION ERROR: " + err.message;
                        console.log(message);
                        callback(message);
                    }
                });
        }
        
function _delete(table,filter, params, callback){
            pool.getConnection(function(err,connection){
                    if(!err){
                        var command = "delete from {0} where {1}".format([
                                    table,
                                    filter
                                ]);
                        connection.query(command, params,function(err, result){
                                        connection.release();
                                        callback(err, result);
                                });
                    }else{
                        var message = "CONNECTION ERROR: " + err.message;
                        console.log(message);
                        callback(message);
                    }
                });
        }
        
var helper = {
        //Insert an object into table and then callback
        insert:_insert,
         //Query a table with the filter, and then callback the result with the fields
        query:_query,
        execute: function(sql, params, callback){
                        pool.getConnection(function(err, connection){
                                        if (!err) {
                                            connection.query(sql, params, function(err, result){
                                                        connection.release();
                                                        callback(err, result);
                                                });
                                        }else{
                                                connection.release();
                                                callback(err);
                                        }
                                });
                },
        //Update a table with the filter and the specific object then callback
        update:_update,
        //Delete objects with filter from table then call back
        delete:_delete,
        remove:_delete,
        exists:function(table, filter, params, yes, no){
                pool.getConnection(function(err, connection){
                                if (!err) {
                                    var command = "select id from {0} where {1}".format([
                                                table,
                                                filter
                                        ]);
                                    connection.query(command, params, function(err, result){
                                                console.log("result", result);
                                                if (result && result.length>0) {
                                                    yes(result);
                                                }else{
                                                        no();
                                                }
                                        });
                                }else{
                                        no(err);     
                                }
                        });
        },
       
    };
    
module.exports = helper;
