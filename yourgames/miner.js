var express = require("express");
var router = express.Router();
var uuid = require("node-uuid");
router.get("/", function (req,res){
        res.render("miner");
    });
//A panel with 16*16 cells
//Every cell can be clicked to collect items[Folder: /contents/miner_items.json]
//Rules:
//0     A list of items(cannot be used) will be gived Every Day. You players must find out them in the given panels.
//      All players (maybe less than 10 players) are playing in the same panel. A ranking will be displayed in real-
//      time.
//      Record:
//          Click times, number of items' set, number of used items,  
//1.        3 cells could be clicked in 30 seconds.
//1.1           Specific item could reduce the cooldown.
//1.2           Specific item could increase the chance to click more cells.
//2.        The collections will be saved in database, the gold items are collections.
//2.1           Every item could be collected one more time.
//2.2           All items effect the player directly.
//3.        Exchange item[collection]. Buy or Give
//4.        Players market.
//5.        Trigger Cell: Good , Bad, Others
//Cell
//ID, PanelID
//Random API:
// https://www.random.org/integers/?num=10&min=0&max=200&col=10&base=10&format=plain&rnd=new
var fs = require("fs");
var path = require("path");
__.miner= {};
__.miner.items = {};
__.miner.items.files = {};
__.miner.items.files.sets = {};
__.miner.items.files.usages = {};
__.miner.items.all=[];
__.miner.dailyList = [];
__.miner.currentPanel = {};
var https = require("https");
var miner = function(client){
    init(function(){
                console.log("s");
                console.log(__.miner.items.all);
                random10();
        });
    client.on("miner_enter_in", someoneComing);
    client.on("miner_click_cell", click_cell);
    
}
function random10() {
                    
                var req = https.get("https://www.random.org/integers/?num=10&min=0&max=200&col=10&base=10&format=plain&rnd=new",
                         function (res){
                                       res.on("data", function(chunk){
                                                console.log(chunk.toString("utf-8"));
                                        });
                                });
                req.on("error", function(err){
                                console.log(err);
                                return random10();
                        });
}
function init(finished) {
        var root= path.join(__dirname, "/core/data/miner-items/")
        fs.readdir(root, function(err, files){
                for(var i in files){
                        var file = files[i];
                        console.log(files[i]);
                        try{
                                var fileFullPath = path.join(root, file);
                                var nameInfo = file.split("-");
                                var type = nameInfo[0];
                                var setId = nameInfo[1].split(".")[0];
                                loadResource(type, setId,fileFullPath);
                                console.log("[miner][loaded completed]", file);
                        }catch(ex){
                                console.log("[miner][ignore the failed:]", ex);
                        }
                }
                finished();
        });
}
function loadResource(type, setId, fileFullPath) {
        console.log("[miner][start to read set/usage resource.] ", type+"-"+setId);
        var result = fs.readFileSync(fileFullPath, "utf-8");
        var data = JSON.parse(result);
        switch(type){
                case "set":
                        __.miner.items.files.sets[setId] = data;
                         loadItems(data, __.miner.items.files.sets);
                        break;
                case "usage":
                        __.miner.items.files.usages[setId] = data;
                        loadItems(data, __.miner.items.files.usages);
                        break;
                default:
                        console.log("[Failed to load, Ignore.]", fileFullPath);
                        break;
        }
       
}

function loadItems(data, from) {
    console.log("[miner][start to load items resource.] ", data["set"]);
    for(var key in data.items){
        __.miner.items.all[__.miner.items.all.length] = {
                        "id": key,
                        "from": from,
                        "data": data.items[key]
                };
    }
    
}

function randomCell() {
    
}
//some one coming
function someoneComing(args) {
        console.log(this.currentUser);
}
//Create a new panel
//one panel one room one game
function newPanel(args) {
    
}
//Destory an old panel when the condition full
function renewPanel(args) {
    //code
}
//Join in panel
function joinPanel(args) {
    //code
}
//Broadcast the current infomation:
//Users now, Rank list of them, last time
function state(args) {
    //code
}
//Click on cell, return item info
function click_cell(args) {
    //code
}
//trigger:
//self or others, item 
function trigger(args) {
    //code
}
//save the collection goods
function save(args) {
    //code
}

module.exports = router;
module.exports.run = miner;
