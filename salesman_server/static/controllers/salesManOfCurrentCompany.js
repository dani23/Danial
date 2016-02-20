angular.module("curr_salesMan",[])
.controller("salesManCurrentController",function($scope,$http){
        $scope.showSalesMan;
        $scope.companyToken = localStorage.getItem("company_id");
        $http.get("/api/getSalesman?company_id=" + $scope.companyToken).success(function(data){
            $scope.showSalesMan = data;
        }).error(function(err){
            alert("You have not registered any salesman");
            console.log("You have not registered any salesman");
        })
    })