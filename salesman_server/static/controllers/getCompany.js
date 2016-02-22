angular.module("getCom",[])
.controller("GetcompanyController",function($scope,$http,$stateParams,$mdMedia,$mdDialog,$state){
        $scope.companyName;
        console.log("company _id is from GetcompanyController " + $stateParams._id);
        localStorage.setItem("company_id",$stateParams._id);
        $http.get("/api/getCompany").success(function(data){
               $scope.companyName = data.company_name;
            localStorage.setItem("companyName",$scope.companyName);
        }).error(function(err){
            console.log("Company not registered " + err);
        });
        $scope.goToProducts = function(){
            $state.go("products");
        };
        $scope.goToSalesman = function(ev){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: 'SalesmanController',
                templateUrl: '../templates/salesMan.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
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
        $scope.getCurrSalesMan = function(){
           $state.go("currentSalesman");
        }
    })