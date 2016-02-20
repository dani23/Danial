angular.module("dash_boa",[])
.controller("DashboardController",function($scope,$state,$rootScope,$mdDialog,$mdMedia){
       $scope.logout = function(){
           localStorage.removeItem("firebasetoken");
           localStorage.removeItem("company_id");
           $state.go("home");
       };
        $scope.hideThree = true;
        $scope.hideOne = false;
        $rootScope.showThree = function(){
            $scope.hideThree = false;
            $scope.hideOne = true;
        };
        $scope.createCompany = function(ev){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: 'ProductsController',
                templateUrl: '../templates/howManyProducts.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: useFullScreen
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
    });