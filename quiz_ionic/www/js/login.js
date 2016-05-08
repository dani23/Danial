angular.module("log",[])
  .controller("LoginController",function($scope,$state,$firebaseAuth){
    var ref = new Firebase("https://testquiz.firebaseio.com/");
    var auth = $firebaseAuth(ref);
    $scope.logi = function(){
      auth.$authWithOAuthRedirect("facebook").then(function(authdata){
        console.log("authdata is " + authdata);
      }).catch(function(error){
        if(error.code == "TRANSPORT_UNAVAILABLE"){
          console.log("error is " + error);
          auth.$authWithOAuthPopup("facebook").then(function(authData) {
            // User successfully logged in. We can log to the console
            // since we’re using a popup here
            console.log(authData);
          });

        }
        else{
          console.log("It's another error " + error);
        }
      });
      /*$cordovaOauth.facebook("1174579315906661",["email"]).then(function(result){
        auth.$authWithOAuthToken("facebook",result.access_token).then(function(authData){
          console.log(JSON.stringify(authData));
          $state.go("appStart.startPg");
        },function(err){
          console.log("error is " + err);
        });
      },function(mainError){
        console.log("mainError is " + mainError);
      });*/
    };
    auth.$onAuth(function(authData){
      if(authData == null){
        console.log("You are not logged in");
      }
      else{
        console.log("authdata is " + authdata);
        $state.go("appStart.startPg");
      }
    });
  })
