angular.module("start",[])

//app.constant("serverRef","http://localhost:5013")
//.constant("firebaseRef","https://salesanapp-1.firebaseio.com/")
.controller("loginController",function($state,$scope,$http,Api){
    $scope.required = true;
 $scope.saleman = {salemanName : "",
     salemanPassword : ""
 };
    $scope.doLogin = function(saleman){
        console.log(saleman);
        Api.logData().then(function(data){
            console.log(data.company_id);
            localStorage.setItem("company_id",data.company_id);
            $state.go("dashboard");
            
        })
    }

});