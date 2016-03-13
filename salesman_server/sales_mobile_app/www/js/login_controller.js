angular.module("logn",[])
.controller("LoginController",function($scope,$http,$state){
        $scope.salemanData = {
            salemanName : "",
            salemanPassword : ""
        };
        $scope.login = function(){
            $http.post("/api/salemanLogin",$scope.salemanData).success(function(companyData){
              if(companyData.success == "yes") {
                console.log("data is " + companyData.comData);
                console.log("company_id is " + companyData.comData.company_id);
                $state.go("ordrFrm",{company_id : companyData.comData.company_id});
              }
              else{
                alert("You are not registered");
              }
            })
        }
    })