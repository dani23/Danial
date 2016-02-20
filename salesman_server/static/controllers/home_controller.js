angular.module("hom",[])
.controller("HomeController",function($scope,$state){$scope.showLogSignButton = true;
        $scope.goToSignup = function(){
            $state.go("signup");
        };
        $scope.goToLog = function(){
            $state.go("login");
        }});