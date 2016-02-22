angular.module("comSaleman",[])
.controller("SalesmanController",function($scope,$http,$mdDialog){
        $scope.saleMan = {salesmanName : "", salesmanPassword : "",company_id : localStorage.getItem("company_id"),companyName : localStorage.getItem("companyName")};
        $scope.registerSalesman = function(){
            $http.post("/api/saveSalesman",$scope.saleMan).success(function(data){
                if(data["saleman"] == "Salesman saved"){
                    console.log(data["saleman"]);
                }
                else{
                    console.log(data["saleman"]);
                }
            });
            $scope.saleMan = {salesmanName : "", salesmanPassword : "",company_id : localStorage.getItem("company_id"),companyName : localStorage.getItem("companyName")};
            $mdDialog.hide();
        }
    })