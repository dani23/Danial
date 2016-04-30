angular.module("log",[])
.controller("LoginController",function($scope,$state,$firebaseAuth,$cordovaInAppBrowser){
var ref = new Firebase("https://testquiz.firebaseio.com/");
    $scope.logi = function(){
      var auth = $firebaseAuth(ref);
      auth.$authWithOAuthRedirect("facebook").then(function(authdata){
        console.log("authdata is " + authdata);
        $state.go("appStart.startPg");
      }).catch(function(error){
        if(error.code == "TRANSPORT_UNAVAILABLE"){
          auth.$authWithOAuthPopup("facebook").then(function(authData){
            console.log("authData is " + authData);
            $state.go("appStart.startPg");
          })
        }
        else{
          console.log("It's another error " + error);
        }
      });
    };
  })
