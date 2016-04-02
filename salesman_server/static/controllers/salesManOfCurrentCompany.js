angular.module("curr_salesMan",[])
.controller("salesManCurrentController",function($scope,$http,$rootScope){
        ++$rootScope.comCount;
        $scope.token = localStorage.getItem("company_id");
        $http.get("/api/getSalesman?company_id=" + $scope.token).success(function(data){
            if(data && data.length != 0) {
                $scope.showSalesMan = data;
            }
            else{
                alert("You havenot registered any salesman");
            }
        })
    })