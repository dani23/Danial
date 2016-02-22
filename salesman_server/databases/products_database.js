var mongoose = require("mongoose");
var q = require("q");
var productsSchema = mongoose.Schema;
var products = new productsSchema({productName : {type : String}, productPrice : {type : Number}, productStock : {type : Number}, company_id : {type : String, required : true},company_name : {type : String}});
var productsModel = mongoose.model("productsModel",products);
function saveProduct(product){
    var pro = new productsModel(product);
    var deferred = q.defer();
    pro.save(function(err,data){
        if(err || data == null){
            deferred.reject({pro : "product not save"});
        }
        else{
            deferred.resolve({pro : "product save"});
        }
    });
    return deferred.promise;
};
exports.saveProduct = saveProduct;
function findProducts(query){
    var deferred = q.defer();
    productsModel.find({company_id : query},function(err,docs){
        console.log("query is " + query);
        if(err || docs == null){
            deferred.reject(err);
        }
        else{
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
};
exports.findProducts = findProducts;