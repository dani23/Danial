// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionic_quiz', ['ionic','ngCordova',"testCo","ht1","ht2","ht3","ht4","rohp","cssOne","cssTwo","cssThree","cssFour","resOfCssPrac","str","log","firebase"])
    .config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
    $ionicConfigProvider.views.maxCache(0);
      $stateProvider.state("appStart", {
        url: "/apStart",
          templateUrl: "templates/appStart.html",
          controller: "startController",
          abstract : true
      }).state("appStart.startPg",{
        url : "/sart",
        views : {
          'menu' : {
            templateUrl: "templates/startPage.html"
          }
        }
      }).state("appStart.testOpt",{
          url : "/testOp/:options",
        views : {
          'menu' : {
            templateUrl: "templates/test_options.html",
            controller: "testController"
          }
        }
      }).state("appStart.practiceOfHtmlOne",{
          url : "/poh1/:whichQuiz",
        views : {
          'menu': {
            templateUrl: "templates/pohOne.html",
            controller: "pohOneController",
            resolve: {
              checkPre: function ($stateParams, $q, $state) {
                var defferred = $q.defer();
                console.log("$stateParams is " + $stateParams.whichQuiz);
                if ($stateParams.whichQuiz == "htmlpractice") {
                  defferred.resolve("Access allowed");
                }
                else {
                  console.log("Access not allowed");
                  defferred.reject("Access not allowed");
                  $state.go("appStart.startPg");
                }
              }
            }
          }
        }
      }).state("appStart.practiceOfHtmlTwo",{
        url : "/poh2/:check",
        views : {
          'menu': {
            templateUrl: "templates/pohTwo.html",
            controller: "pohTwoController",
            resolve: {
              checkPre: function ($stateParams, $q, $state) {
                var defferred = $q.defer();
                console.log("$stateParams is " + $stateParams.check);
                if ($stateParams.check) {
                  defferred.resolve("Access allowed");
                }
                else {
                  console.log("Access not allowed");
                  defferred.reject("Access not allowed");
                  $state.go("appStart.startPg");
                }
              }
            }
          }
        }
      }).state("appStart.practiceOfHtmlThree",{
        url : "/poh3/:check",
        views : {
          'menu': {
            templateUrl: "templates/pohThree.html",
            controller: "pohThreeController",
            resolve: {
              checkPre: function ($stateParams, $q, $state) {
                var defferred = $q.defer();
                if ($stateParams.check) {
                  defferred.resolve("Access allowed");
                }
                else {
                  defferred.reject("Access not allowed");
                  $state.go("appStart.startPg");
                }
              }
            }
          }
        }
      }).state("appStart.practiceOfHtmlFour", {
        url: "/poh4/:check",
        views: {
          'menu' : {
          templateUrl: "templates/pohFour.html",
          controller: "pohFourController",
          resolve: {
            checkPre: function ($stateParams, $q, $state) {
              var defferred = $q.defer();
              if ($stateParams.check) {
                defferred.resolve("Access allowed");
              }
              else {
                defferred.reject("Access not allowed");
                $state.go("appStart.startPg");
              }
            }
          }
        }
      }
      }).state("appStart.resultOfPracticeHtmlQuiz", {
        url: "/rophq/:check",
        views: {
          'menu' : {
          templateUrl: "templates/resultOfPracticeHtml.html",
          controller: "resultOfPracticeHtmlController",
          resolve: {
            checkPre: function ($stateParams, $q, $state) {
              var defferred = $q.defer();
              if ($stateParams.check) {
                defferred.resolve("Access allowed");
              }
              else {
                defferred.reject("Access not allowed");
                $state.go("appStart.startPg");
              }
            }
          }
        }
      }
      }).state("appStart.pracOfCssOne", {
        url: "/cssOne/:whichQuiz",
        views: {
          'menu' : {
          templateUrl: "templates/pocssOne.html",
          controller: "poCssOneController",
          resolve: {
            checkPre: function ($stateParams, $q, $state) {
              var defferred = $q.defer();
              console.log("$stateParams is " + $stateParams.whichQuiz);
              if ($stateParams.whichQuiz == "csspractice") {
                defferred.resolve("Access allowed");
              }
              else {
                console.log("Access not allowed");
                defferred.reject("Access not allowed");
                $state.go("appStart.startPg");
              }
            }
          }
        }
      }
      }).state("appStart.pracOfCssTwo", {
        url: "/cssTwo/:check",
        views: {
          'menu' : {
          templateUrl: "templates/pocssTwo.html",
          controller: "poCssTwoController",
          resolve: {
            checkPre: function ($stateParams, $q, $state) {
              var defferred = $q.defer();
              if ($stateParams.check) {
                defferred.resolve("Access allowed");
              }
              else {
                defferred.reject("Access not allowed");
                $state.go("appStart.startPg");
              }
            }
          }
        }
      }
      }).state("appStart.pracOfCssThree", {
        url: "/cssThree/:check",
        views: {
          'menu' : {
          templateUrl: "templates/pocssThree.html",
          controller: "poCssThreeController",
          resolve: {
            checkPre: function ($stateParams, $q, $state) {
              var defferred = $q.defer();
              if ($stateParams.check) {
                defferred.resolve("Access allowed");
              }
              else {
                defferred.reject("Access not allowed");
                $state.go("appStart.startPg");
              }
            }
          }
        }
      }
      }).state("appStart.pracOfCssFour", {
        url: "/cssFour/:check",
        views: {
          'menu' : {
          templateUrl: "templates/pocssFour.html",
          controller: "poCssFourController",
          resolve: {
            checkPre: function ($stateParams, $q, $state) {
              var defferred = $q.defer();
              if ($stateParams.check) {
                defferred.resolve("Access allowed");
              }
              else {
                defferred.reject("Access not allowed");
                $state.go("appStart.startPg");
              }
            }
          }
        }
      }
      }).state("appStart.resultOfPracticeCssQuiz", {
        url: "/ropcssq/:check",
        views: {
          'menu' : {
          templateUrl: "templates/resultOfCssPractice.html",
          controller: "cssPracResController",
          resolve: {
            checkPre: function ($stateParams, $q, $state) {
              var defferred = $q.defer();
              if ($stateParams.check) {
                defferred.resolve("Access allowed");
              }
              else {
                defferred.reject("Access not allowed");
                $state.go("appStart.startPg");
              }
            }
          }
        }
      }
      }).state("lg",{
        url : "/login",
        templateUrl : "templates/login.html",
        controller : "LoginController"
      });
      $urlRouterProvider.otherwise("/login");
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
    .controller("MainController",function($scope,$ionicSideMenuDelegate,$rootScope,$ionicPopup,$state){
        /*$scope.slid = function(){
            $ionicSideMenuDelegate.toggleLeft();
        };*/
    $rootScope.cssPracQues = [];
    $rootScope.cssPracAnswer = [];
    $rootScope.htmlPracticeAnswers = [];
    $rootScope.htmlPracticeQuestions = [];
    $rootScope.quit = function(quiz){
      if(quiz == 'css practice') {
        $ionicPopup.confirm({
          title: "Quit quiz",
          template: "<p>Are you sure you want to quit quiz</p>"
        }).then(function (res) {
          if (res) {
            if (quiz == 'css practice') {
              $rootScope.cssPracQues = [];
              $rootScope.cssPracAnswer = [];
              $state.go("appStart.startPg");
            }
          }
        });
      }
      else if(quiz == 'html_practice'){
        $ionicPopup.confirm({
          title : "Quit quiz",
          template : "<p>Are you sure you want to quit quiz</p>"
        }).then(function(res){
          if(res){
            $rootScope.htmlPracticeQuestions = [];
            $rootScope.htmlPracticeAnswers = [];
            $state.go("appStart.startPg");
          }
        })
      }
    };
    })
