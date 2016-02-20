var ex = require("express");
var fire = require("firebase");
var fireRef = new Firebase("https://salesanapp-1.firebaseio.com/users");
var adminData = require("../databases/admin_database.js");
var companyDatabase = require("../databases/company_database.js");
var salesmanDatabase = require("../databases/salesman_database.js");
var exApp = ex.Router();
exApp.post("/signup",function(req,res){
   fireRef.createUser({
       email : req.body.email,
       password : req.body.password
   },function(err,success){
       if(err){
           console.log("Error from firebase " + err);
           res.json({error : err, status : 403});
       }
       else{
           console.log("success.uid is " + success.uid);
           req.body.firebasetoken = success.uid;
           adminData.saveUser(req.body).then(function(data){
               console.log("From general_routes.js data is " + data);
               res.json({yup : "success", userData : data});
           },function(err){
               res.json({yup :"no success"});
           });
       }
   })
});
exApp.post("/login",function(req,res){
    adminData.findUser(req.body).then(function(data){
        console.log("data from find user is " + data);
        console.log("data password is from find user is " + data.password);
        res.json(data);
    },function(err){
        res.json({err : "Invalid email or password"});
    });
});
exApp.get("/getCompany",function(req,res){
    console.log("query is " + req.query.token);
    companyDatabase.findCompany(req.query.token).then(function(data){
        console.log("company name is from /getCompany" + data.company_name);
        res.json(data);
    },function(err){
        res.json(err);
    });
});
exApp.post("/saveCompany",function(req,res){
    companyDatabase.createCompany(req.body).then(function(data){
        res.json(data);
    },function(err){
        res.json({comp : err});
    })
});
exApp.post("/saveSalesman",function(req,res){
    salesmanDatabase.saveSalesman(req.body).then(function(data){
        res.json(data);
    },function(err){
        res.json(err);
    });
});
exApp.get("/getSalesman",function(req,res){
    console.log("company_id from " + req.url + " is " + req.query.company_id);
    salesmanDatabase.findSalesMan(req.query.company_id).then(function(data){
        res.json(data);
    },function(err){
        res.json(err);
    })
});
module.exports = exApp;