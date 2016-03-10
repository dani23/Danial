var exp = require("express");
var path = require("path");
var mongoose = require("mongoose");
var body = require("body-parser");
var expApp = exp();
mongoose.connect("mongodb://localhost:27017/salesMan");
var generalApi = require("./routes/general_routes.js");
/*expApp.use(function(req,res,next){
    res.append('Access-Control-Allow-Origin',req.headers.origin || '*');
    res.append('Access-Control-Allow-Credentials','true');
    res.append('Access-Control-Allow-Methods',['GET','OPTIONS','PUT','POST']);
    res.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    next();
});*/
expApp.use(body.json());
expApp.use("/api",generalApi);
expApp.use(exp.static(path.resolve(__dirname,"./static")));
expApp.get("*",function(req,res){
    res.sendFile(path.resolve(__dirname,"./static/index.html"))
});
expApp.listen(5013,function(){
    console.log("Server started");
});