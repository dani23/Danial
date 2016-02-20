var mongoose = require("mongoose");
var q = require("q");
var companySchema = mongoose.Schema;
var company = new companySchema({company_name : {type : String},
company_address : {type : String},
    products : {type : Array},
    firebasetoken : {type : String}
});
var companyModel = mongoose.model("companyModel",company);
function createCompany(com){
    var deffered = q.defer();
    var company = new companyModel(com);
    company.save(function(err,data){
        if(data == null || err){
            deffered.reject("company not saved");
        }
        else{
            console.log("_id of current company is " + data._id);
            deffered.resolve(data._id);
        }
    });
    return deffered.promise;
};
exports.createCompany = createCompany;
function findCompany(query){
    var deffered = q.defer();
    companyModel.findOne({_id : query},function(err,data){
        if(err || data == null){
            console.log("company not found " + err);
            deffered.reject(err);
        }
        else{
            console.log("company name is " + data.company_name);
            deffered.resolve(data);
        }
    });
    return deffered.promise;
};
exports.findCompany = findCompany;