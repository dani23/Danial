var mongoose = require("mongoose");
var q = require("q");
var salesmanSchema = mongoose.Schema;
var salesman = new salesmanSchema({salesmanName : {type : String},salesmanPassword : {type : String, required : true, unique : true}, company_id : {type : String, required : true}});
var salesmanModel = mongoose.model("salesmanModel",salesman);
function saveSalesman(salesman){
    var deffered = q.defer();
    var sale = new salesmanModel(salesman);
    sale.save(function(err,data){
        if(err || data == null){
            console.log("Error in saving salesman");
            deffered.reject({saleman : "Error in saving salesman"});
        }
        else{
            console.log("Salesman saved");
            deffered.resolve({saleman : "Salesman saved"});
        }
    });
    return deffered.promise;
};
exports.saveSalesman = saveSalesman;
function findSalesMan(query){
    var deffered = q.defer();
    salesmanModel.find({company_id : query},function(err,docs){
        if(err || docs == null){
            deffered.reject(docs);
        }
        else{
            deffered.resolve(docs);
        }
    });
    return deffered.promise;
};
exports.findSalesMan = findSalesMan;