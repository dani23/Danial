var mongoose = require("mongoose");
var q = require("q");
var adminSchema = mongoose.Schema;
var admin = new adminSchema({Firstname : String,
Lastname : String,
    email : {type : String, unique : true, required : true},
    password : String,
    firebasetoken : String
});
var adminModel = mongoose.model("adminModel",admin);
function saveUser(person){
    var deferred = q.defer();
    var user = new adminModel(person);
    user.save(function(err,data){
        if(err){
            console.log("Error in saving user " + err);
            deferred.reject("Error in saving user");
        }
        else{
            console.log("Data successfully saved " + data);
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};
exports.saveUser = saveUser;
function findUser(query){
    var deferred = q.defer();
    adminModel.findOne({email : query.email, password: query.pass},function(err,data){
        if(err || data == null){
            console.log("Email not found " + err);
            deferred.reject(err);
        }
        else{
            console.log("Email found " + data);
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};
exports.findUser = findUser;