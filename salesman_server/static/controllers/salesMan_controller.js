angular.module("comSaleman",[])
.controller("SalesmanController",function($scope,$http,$mdDialog){
        $scope.company_id = localStorage.getItem("company_id");
        $scope.company_name = localStorage.getItem("companyName");
        $scope.saleMan = {salesmanName : "", salesmanPassword : "",company_id : $scope.company_id,companyName : $scope.company_name};
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