// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic',"dashboa","logn","firebase"])
  .config(function($httpProvider,$stateProvider,$urlRouterProvider,$ionicConfigProvider){
    $httpProvider.interceptors.push(function(){
      return{
        request : function(req){
          if(req.url == "/api/salemanLogin"){
            console.log("req.url is " + req.url);
            req.url = "http://localhost:5013" + req.url;
          }
          else if(req.url == "/api/getProducts?company_id=" + localStorage.getItem("company_id")){
            console.log("req.url is " + req.url);
            req.url = "http://localhost:5013" + req.url;
          }
          return req;
        }
      }
    });
    $stateProvider.state("login",{
      url : "/log",
      templateUrl : "../templates/login.html",
      controller : "LoginController"
    }).state("ordrFrm",{
      url : "/ord/:company_id",
      templateUrl : "../templates/orderForm.html",
      controller : "DashboardController",
      resolve : {
        getcompany_id : function($q,$stateParams){
          console.log("company_id is " + $stateParams.company_id);
          var deferred = $q.defer();
          if($stateParams.company_id){
            localStorage.setItem("company_id",$stateParams.company_id);
            deferred.resolve("Access allowed");
          }
          else{
            deferred.reject("Access not allowed");
          }
          return deferred.promise;
        }
      }
    });
    $urlRouterProvider.otherwise("/log");
    $ionicConfigProvider.views.maxCache(0);
  })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
