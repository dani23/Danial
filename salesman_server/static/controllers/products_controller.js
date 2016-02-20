angular.module("prod",[])
.controller("ProductsController",function($scope,$state,$mdDialog){
        $scope.products = null;
        $scope.pro = function(){
            $state.go("cpn",{productsNum : $scope.products});
            $mdDialog.hide();
        }
    })