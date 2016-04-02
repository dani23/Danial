angular.module("comSaleman",[])
.controller("SalesmanController",function($scope,$http,$mdDialog,$rootScope){
        ++$rootScope.comCount;
        $scope.company_id = localStorage.getItem("company_id");
        $scope.company_name = localStorage.getItem("companyName");
        $scope.firebasetoken = localStorage.getItem("firebasetoken");
        $scope.saleMan = {salesmanName : "", salesmanPassword : "",company_id : $scope.company_id,companyName : $scope.company_name, firebasetoken : $scope.firebasetoken};
        $scope.registerSalesman = function(){
            $http.post("/api/saveSalesman",$scope.saleMan).success(function(data){
                if(data["saleman"] == "Salesman saved"){
                    console.log(data["saleman"]);
                    $scope.saleMan.salesmanName = "";
                    $scope.saleMan.salesmanPassword = "";
                }
                else{
                    console.log(data["saleman"]);
                }
            });
            $scope.saleMan = {salesmanName : "", salesmanPassword : "",company_id : localStorage.getItem("company_id"),companyName : localStorage.getItem("companyName")};
            $mdDialog.hide();
        }
    })