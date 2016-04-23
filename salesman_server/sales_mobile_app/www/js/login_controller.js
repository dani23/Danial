angular.module("logn",[])
.controller("LoginController",function($scope,$http,$state,Apipoint,Apiend){
        $scope.salemanData = {
            salemanName : "",
            salemanPassword : ""
        };
        $scope.login = function(){
           var income = Apipoint.getLogin($scope.salemanData);
          console.log("Income is " + income);
          income.success(function(companyData){
            console.log("companyData is " + companyData);
             if(companyData.success == "yes") {
               console.log("data is " + companyData.comData);
               console.log("company_id is " + companyData.comData.company_id);
               $state.go("ordrFrm",{company_id : companyData.comData.company_id})
             }
             else{
               alert("You are not registered");
             }
           });
        };
    $scope.ogp = function(){
      $http.get(Apiend.url + "useful").success(function(data){
        $scope.tex = data;
      })
    }
    })
