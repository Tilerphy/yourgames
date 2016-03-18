function areas(app) {
    var home = require("./home");
    var login = require("./auth");
    var games = require("./games");
    var about = require("./about");
    var miner = require("./miner");
    app.all("/", function(req,res){
            res.redirect("/Home");
        });

    app.use("/Home", home);
    app.use("/Auth",login);
    app.use("/Games", games);
    app.use("/About", about);
    games.use("/miner", miner);
}
module.exports = areas;