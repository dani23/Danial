angular.module("sale",["signCont",'ui.router','ngMaterial','logCont',"hom","dash_boa","compCon","getCom","comSaleman","prod","curr_salesMan","firebase"])
    .config(function($stateProvider,$httpProvider,$urlRouterProvider){
        $stateProvider.state("signup",{
            url : "/sign",
            templateUrl : "../templates/signup.html",
            controller : "SignupController"
        }).state("login",{
            url : "/log",
            templateUrl : "../templates/login.html",
            controller : "LoginController"
        }).state("home",{
            url : "/home",
            templateUrl : "../templates/home.html",
            controller : "HomeController"
        }).state("dashboard",{
            url : "/dash",
            templateUrl : "../templates/dashboard.html",
            controller : "DashboardController",
            resolve : {
                getToken : function($q){
                    var key = localStorage.getItem("firebasetoken");
                    var deffered = $q.defer();
                    if(key){
                        console.log("Access guranteed");
                        deffered.resolve("Access guranteed");
                    }
                    else{
                        console.log("Access not guranteed");
                        deffered.reject("Access not guranteed");
                    }
                    return deffered.promise;
                }
            }
        }).state("cpn",{
            url : "/comn",
            templateUrl : "../templates/company.html",
            controller : "CompanyController",
            resolve : {
                getKey : function($q){
                    var key = localStorage.getItem("firebasetoken");
                    var deffered = $q.defer();
                    if(key){
                        console.log("Access guranteed");
                        deffered.resolve("Access guranteed");
                    }
                    else{
                        console.log("Access not guranteed");
                        deffered.reject("Access not guranteed");
                    }
                    return deffered.promise;
                }
            }
        }).state("getcpn",{
            url : "/getCompn/:_id",
            templateUrl : "../templates/getCompany.html",
            controller : "GetcompanyController",
            resolve : {
                getToken : function($q){
                    var token = localStorage.getItem("firebasetoken");
                    var deffered = $q.defer();
                    if(token){
                        console.log("Access guranteed");
                        deffered.resolve("Access guranteed");
                    }
                    else{
                        console.log("Access not guranteed");
                        deffered.reject("Access not guranteed");
                    }
                    return deffered.promise;
                }
            }
        }).state("currentSalesman",{
            url : "/currSalesman",
            templateUrl : "../templates/salesManOfCurrentCompany.html",
            controller : "salesManCurrentController",
            resolve : {
                getToken : function($q){
                    var key = localStorage.getItem("company_id");
                    var deffered = $q.defer();
                    if(key){
                        console.log("Access guranteed");
                        deffered.resolve("Access guranteed");
                    }
                    else{
                        console.log("Access not guranteed");
                        deffered.reject("Access not guranteed");
                    }
                    return deffered.promise;
                }
            }
        }).state("products",{
            url : "/products",
            templateUrl : "../templates/products.html",
            controller : "ProductsController",
            resolve : {
                getToken : function($q){
                    var key = localStorage.getItem("company_id");
                    var deffered = $q.defer();
                    if(key){
                        console.log("Access guranteed");
                        deffered.resolve("Access guranteed");
                    }
                    else{
                        console.log("Access not guranteed");
                        deffered.reject("Access not guranteed");
                    }
                    return deffered.promise;
                }
            }
        });
        $urlRouterProvider.otherwise("/home");
        $httpProvider.interceptors.push('httpinterceptor');
    }
)
    .run(function($rootScope,$state){
        $rootScope.$on("$stateChangeStart",function(event,toState){
            var firebasetoken = localStorage.getItem("firebasetoken");
            if(toState.logincompulsory && !firebasetoken){
                event.preventDefault();
                $state.go("login");
            }
        });
    })
    .factory("httpinterceptor",function(){
        return{
            request : function(config){
                if(config.url == "/api/getCompany"){
                    var company_id = localStorage.getItem("company_id");
                    console.log("config.url is " + config.url);
                    config.url = config.url + "?token=" + company_id;
                    console.log("config.url is " + config.url);
                }
                return config;
            }
        }
    })

