var exp = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/quiz_ionic");
var quiz = require("./quiz_database.js");
var body = require("body-parser");
var path = require("path");
var file = path.resolve(__dirname,"static");
var expApp = exp();
expApp.use(function(req,res,next){
    res.append('Access-Control-Allow-Origin',req.headers.origin || '*');
    res.append('Access-Control-Allow-Credentials','true');
    res.append('Access-Control-Allow-Methods',['GET','OPTIONS','PUT','POST']);
    res.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    next();
});
expApp.use(body.urlencoded({extended : false}));
expApp.get("/quizOfHtml",function(req,res){
    console.log("cross request is coming and data is " + req.query.qn);
    quiz.htmlQuiz(req.query.qn).then(function(data){
        res.send(data);
    },function(err){
        res.send(err.question);
    });
});
expApp.post("/saveHtmlQuiz",function(req,res){
    console.log("html data is " + req.body + " and question no is " + req.body.questionNumber + " and question option2 is " + req.body.htpqo_2);
   quiz.saveHtmlQuiz(req.body).then(function(data){
       res.send(data);
   },function(err){
       res.send(err);
   });
});
expApp.get("/html",function(req,res){
    res.sendFile(file + "/index.html");
});
expApp.get("/css",function(req,res){
   res.sendFile(file + "/css.html");
});
expApp.post("/saveCssQuiz",function(req,res){
    console.log("html data is " + req.body + " and question no is " + req.body.questionNumber + " and question option2 is " + req.body.cssOption2);
    quiz.saveCssQuiz(req.body).then(function(data){
        res.send(data);
    },function(err){
        res.send(err);
    });
});
expApp.get("/quizOfCss",function(req,res){
    console.log("cross request is coming and data is " + req.query.qn);
    quiz.findCssQues(req.query.qn).then(function(data){
        res.send(data);
    },function(err){
        res.send(err.question);
    });
});
expApp.listen(6078,function(){
    console.log("Server started");
});