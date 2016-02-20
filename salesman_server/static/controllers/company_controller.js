angular.module("compCon",[])
.controller("CompanyController",function($scope,$mdDialog,$rootScope,$http,$state,$stateParams){
        $scope.company = {
            company_name : "",
            company_address : "",
            products : [],
            firebasetoken : localStorage.getItem("firebasetoken")
        };
        console.log("no of products are " + $stateParams.productsNum);
        $scope.howManyPro = $stateParams.productsNum;
        $scope.roughArr = [];
        var i;
        for(i = 0; i < $scope.howManyPro; i++){
          $scope.roughArr.push(i);
        };
        $scope.comArr = [];
        $scope.addCompany = function(){
            $http.post("/api/saveCompany",$scope.company).success(function(data){
                if(data){
                    $state.go("getcpn",{_id : data});
                }
                else{
                    console.log("Error in registering company " + data["error"])
                }
            })
            $mdDialog.hide();
        }
    })