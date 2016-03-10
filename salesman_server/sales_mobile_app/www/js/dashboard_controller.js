angular.module("dashboa",[])
.controller("DashboardController",function($scope,$state,$stateParams,$http){
    $http.get("/api/getProducts?company_id=" + $stateParams.company_id).success(function(products){
      console.log("Products are " + products);
      $scope.displayProducts = products;
    });
        $scope.logout = function(){
          localStorage.removeItem("company_id");
            $state.go("login");
        };
    })
