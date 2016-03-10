angular.module("logCont",[])
.controller("LoginController",function($scope,$http,$state){
        $scope.userlog = {
          email : "",
            pass : ""
        };
        $scope.log = function(){
              $http.post("/api/login",$scope.userlog).success(function(data){
                  if(data['firebasetoken']){
                 localStorage.setItem("firebasetoken",data['firebasetoken']);
                      $scope.userlog.email  = "";
                         $scope.userlog.pass  = "";
                  $state.go("dashboard");
                  }
                  else{
                      alert(data['err']);
                  }
              });
        }
    })