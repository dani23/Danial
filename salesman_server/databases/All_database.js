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
var companySchema = mongoose.Schema;
var company = new companySchema({company_name : {type : String},
    company_address : {type : String},
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
var salesmanSchema = mongoose.Schema;
var salesman = new salesmanSchema({salesmanName : {type : String},salesmanPassword : {type : String, required : true, unique : true}, company_id : {type : String, required : true}, companyName : {type : String}});
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
function findOneSaleMan(query){
    var deffered = q.defer();
    salesmanModel.findOne({salesmanName : query.salemanName,salesmanPassword : query.salemanPassword},function(err,data){
        if(err || data == null){
            deffered.reject(data);
        }
        else{
            deffered.resolve(data);
        }
    });
    return deffered.promise;
};
exports.findOneSaleMan = findOneSaleMan;
var productOrderSchema = mongoose.Schema;
var productsOrder = new productOrderSchema({customer_name : {type : String, required : true},proName : {type : String, required : true},proPrice :{type : Number, required : true}, firebase_id : {type : String, required : true, unique : true}});
var productsOrderModel = mongoose.model("productsOrderModel",productsOrder);
function saveProductsOrder(order){
    var prod = new productsOrderModel(order);
    var defferred = q.defer();
    prod.save(function(err,data){
        if(err || data == null){
            defferred.reject("Order not saved");
        }
        else{
            defferred.resolve("Order saved");
        }
    });
    return defferred.promise;
}
exports.saveProductsOrder = saveProductsOrder;
function findProductOrder(){
    var deffered = q.defer();
    salesmanModel.find({},function(err,data){
        if(err || data == null){
            deffered.reject(data);
        }
        else{
            deffered.resolve(data);
        }
    });
    return deffered.promise;
};
exports.findProductOrder = findProductOrder;