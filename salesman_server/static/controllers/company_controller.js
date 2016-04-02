angular.module("compCon",[])
.controller("CompanyController",function($scope,$mdDialog,$rootScope,$http,$state){
        $scope.company = {
            company_name : "",
            company_address : "",
            firebasetoken : localStorage.getItem("firebasetoken")
        };
        $scope.addCompany = function(){
            $http.post("/api/saveCompany",$scope.company).success(function(data){
                if(data){
                    $state.go("getcpn",{comdata : data});
                }
                else{
                    console.log("Error in registering company " + data["error"])
                }
            })
        }
    })