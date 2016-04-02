angular.module("sale",["signCont",'ui.router','ngMaterial','logCont',"hom","dash_boa","compCon","getCom","comSaleman","prod","curr_salesMan","firebase"])
    .config(function($stateProvider,$urlRouterProvider){
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
            url : "/getCompn",
            templateUrl : "../templates/getCompany.html",
            controller : "GetcompanyController",
            params : {
                comdata : null
            },
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
    .controller("mainController",function($scope,$state,$rootScope){
        $rootScope.comCount = 0;
        $rootScope.compCou = 0;
        $scope.logout = function(){
            localStorage.removeItem("firebasetoken");
            localStorage.removeItem("company_id");
            localStorage.removeItem("companyName");
            $state.go("home");
        };
    })
