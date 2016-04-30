var mongoose = require("mongoose");
var q = require("q");
var htmlSchema = mongoose.Schema;
var html = new htmlSchema({Question : {type : String, required : true, unique : true}, correctAnswer : String, questionNumber : {type : Number, required : true, unique : true},htpqo_1 : {type : String, required : true},htpqo_2 : {type : String, required : true},htpqo_3 : {type : String, required : true}});
var htmlModel = mongoose.model("htmlMod",html);
function saveHtmlQuiz(html){
    console.log(html.htpqo_2);
    var deferred = q.defer();
    var saveHtml = new htmlModel(html);
    saveHtml.save(function(err,data){
        if(err || data == null){
            console.log("Questions not saved");
            deferred.reject("Html questions not saved");
        }
        else{
            console.log("Questions saved");
            deferred.resolve("Html questions saved");
        }
    });
    return deferred.promise;
}
exports.saveHtmlQuiz = saveHtmlQuiz;
function htmlQuiz(query){
    var deferred = q.defer();
    console.log("query is " + query);
    htmlModel.findOne({questionNumber : query},function(err,data){
        if(err || data == null){
            deferred.reject({question : "htmlQuestionNotfound",questionData : data});
        }
        else{
            deferred.resolve({question : "htmlQuestionFound",questionData : data});
        }
    });
    return deferred.promise;
}
exports.htmlQuiz = htmlQuiz;
var cssSchema = mongoose.Schema;
var css = new cssSchema({Question : {type : String, required : true, unique : true}, correctAnswer : String, questionNumber : {type : Number, required : true, unique : true}, cssOption1 : {type : String, required : true}, cssOption2 : {type : String, required : true}, cssOption3 : {type : String, required : true}});
var cssModel = mongoose.model("cssModel",css);
function saveCssQuiz(cssQuiz){
    var deferred = q.defer();
    var quiz = new cssModel(cssQuiz);
    quiz.save(function(err,data){
        if(err || data == null){
            deferred.reject("css question not saved");
        }
        else{
            deferred.resolve("css question saved");
        }
    });
    return deferred.promise;
}
exports.saveCssQuiz = saveCssQuiz;
function findCssQues(query){
    var deferred = q.defer();
    cssModel.findOne({questionNumber : query},function(err,data){
       if(err || data == null){
           deferred.reject({question : "cssQuestionNotFound",questionData : data});
       }
        else{
           deferred.resolve({question : "cssQuestionFound",questionData : data});
       }
    });
    return deferred.promise;
}
exports.findCssQues = findCssQues;