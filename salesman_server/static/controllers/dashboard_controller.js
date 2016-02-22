angular.module("dash_boa",[])
.controller("DashboardController",function($scope,$state,$rootScope,$mdDialog,$mdMedia){
       $rootScope.logout = function(){
           localStorage.removeItem("firebasetoken");
           localStorage.removeItem("company_id");
           localStorage.removeItem("companyName");
           $state.go("home");
       };
        $scope.createCompany = function(){
            $state.go("cpn");
        };
    });