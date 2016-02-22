// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','firebase','start'])

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
  .constant('ApiEndpoint', {
  logurl: 'http://localhost:5013/api/salemanLogin'
 })
.config(function($stateProvider,$urlRouterProvider,$httpProvider){
        /*$httpProvider.interceptors.push(function(){
            return{
                request : function(config){
                    if(config.url == "/api/salemanLogin"){
                        config.url = "http://localhost:5013" + config.url;
                      console.log("config.url is " + config.url);
                    }
                    /!*else if(config.url == "/userLogin"){
                        config.url = "http://localhost:4032" + config.url;
                    }
                    else{
                        config.url = "http://localhost:4032/validateUser" + config.url;
                    }*!/
                    return config;
                }
            }
        });*/
        $stateProvider.state("login",{
     url         :"/login",
     templateUrl : "../templates/login/login.html",
     controller  : "loginController"
    })
     .state("dashboard",{
     url         :"/dashboard",
     templateUrl : "../templates/dashboard/dashboard.html",
     controller  : "dashboardController"
    });




    $urlRouterProvider.otherwise("login");
})
  .factory('Api', function($http, ApiEndpoint) {
    console.log('ApiEndpoint', ApiEndpoint);

    var logData = function() {
      return $http.post(ApiEndpoint.logurl);
    };

    return {
      logData : logData
    };
  })
