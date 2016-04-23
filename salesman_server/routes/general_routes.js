var ex = require("express");
var fire = require("firebase");
var fireRef = new Firebase("https://salesanapp-1.firebaseio.com/users");
var allDatabase = require("../databases/All_database.js");
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
           allDatabase.saveUser(req.body).then(function(data){
               console.log("From general_routes.js data is " + data);
               res.json({yup : "success", userData : data});
           },function(err){
               res.json({yup :"no success"});
           });
       }
   })
});
exApp.post("/login",function(req,res){
    allDatabase.findUser(req.body).then(function(data){
        console.log("data from find user is " + data);
        console.log("data password is from find user is " + data.password);
        res.json(data);
    },function(err){
        res.json({err : "Invalid email or password"});
    });
});
exApp.get("/getCompany",function(req,res){
    console.log("query is " + req.query._id);
    allDatabase.findCompany(req.query._id).then(function(data){
        console.log("company name is from /getCompany" + data.company_name);
        res.json(data);
    },function(err){
        res.json(err);
    });
});
exApp.post("/saveCompany",function(req,res){
    allDatabase.createCompany(req.body).then(function(data){
        res.json(data);
    },function(err){
        res.json({comp : err});
    })
});
exApp.post("/saveSalesman",function(req,res){
    allDatabase.saveSalesman(req.body).then(function(data){
        res.json(data);
    },function(err){
        res.json(err);
    });
});
exApp.get("/getSalesman",function(req,res){
    console.log("company_id from " + req.url + " is " + req.query.company_id);
    allDatabase.findSalesMan(req.query.company_id).then(function(data){
        res.json(data);
    },function(err){
        res.json(err);
    })
});
exApp.post("/saveProduct",function(req,res){
    console.log("req.body from /saveProduct " + req.body);
    allDatabase.saveProduct(req.body).then(function(data){
        res.json(data);
    },function(err){
        res.json(err);
    });
});
exApp.get("/getProducts",function(req,res){
    console.log("cross request is coming from " + req.url);
    allDatabase.findProducts(req.query.company_id).then(function(data){
        res.json(data);
    },function(err){
        res.json(err);
    })
});
exApp.post("/salemanLogin",function(req,res){
    console.log("cross req is coming from " + req.url + " and the data is " + req.body);
    console.log("saleman name is " + req.body.salemanName);
    allDatabase.findOneSaleMan(req.body).then(function(data){
        res.json({success : "yes", comData : data});
    },function(err){
        res.json({success : "no"});
    });
});
exApp.post("/saveOrderProduct",function(req,res){
    console.log("req.body from /saveOrderProduct 1 " + req.body);
    allDatabase.saveProductsOrder(req.body).then(function(data){
        res.json(data);
    },function(err){
        res.json(err);
    });
});
exApp.get("/getOrderProducts",function(req,res){
    console.log("cross request is coming from " + req.url);
    allDatabase.findProductOrder(req.query.firebase_id).then(function(data){
        res.json(data);
    },function(err){
        res.json(err);
    })
});
exApp.get("/myCompaniesList",function(req,res){
allDatabase.giveAllCompanyNames(req.query.firebasetoken).then(function(data){
    res.send(data);
},function(err){
    res.send(err);
})
});
exApp.post("/updateProductStock",function(req,res){
    console.log("From /updateProductStock " + req.body.productStock);
   allDatabase.updateProStock(req.body).then(function(data){
       res.send(data);
   },function(err){
       res.send(err);
   })
});
exApp.get("*",function(req,res){
    res.send("This request is not valid");
});
module.exports = exApp;