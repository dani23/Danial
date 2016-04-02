angular.module("getCom",[])
.controller("GetcompanyController",function($scope,$http,$stateParams,$mdMedia,$mdDialog,$state,$rootScope,$firebaseArray,$interval){
        console.log($rootScope.comCount + " " + typeof $stateParams.comdata);
        if(typeof $stateParams.comdata == "string") {
            localStorage.setItem("company_id", $stateParams.comdata);
            $http.get("/api/getCompany?_id=" + $stateParams.comdata).success(function (data) {
                $scope.companyName = data.company_name;
                localStorage.setItem("companyName", $scope.companyName);
            }).error(function (err) {
                console.log("Company not registered " + err);
            });
        }
        else if(typeof $stateParams.comdata == "object" && $rootScope.comCount == 0){
            if(localStorage.getItem("company_id") && localStorage.getItem("companyName")){
                localStorage.removeItem("company_id");
                localStorage.removeItem("companyName");
                localStorage.setItem("company_id",$stateParams.comdata.company_id);
                localStorage.setItem("companyName",$stateParams.comdata.companyName);
                $scope.companyName = $stateParams.comdata.companyName;
            }
            else {
                localStorage.setItem("company_id", $stateParams.comdata.company_id);
                localStorage.setItem("companyName", $stateParams.comdata.companyName);
                $scope.companyName = $stateParams.comdata.companyName;
            }
        }
        else{
            $scope.companyName = localStorage.getItem("companyName");
        }
        var product_orders = new Firebase("https://salesanapp-1.firebaseio.com/" + localStorage.getItem("company_id"));
        var userOrder = $firebaseArray(product_orders), i;
        $scope.showOrders = userOrder;
        if(userOrder.length > 0){
         alert("Save your product orders with in 5 minutes otherwise after every 2 minutes your product order will be removed from web server automatically");
        }
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
        };
        $scope.saveOrders = function(){
            console.log("userOrder is " + userOrder[0].customerOrderProduct[0].proId + "userOrder length is " + userOrder[0].customerOrderProduct.length);
            var i, j, obj;
            for(i = $rootScope.compCou; i < userOrder.length; i++){
                ++$rootScope.compCou;
                for(j = 0; j < userOrder[i].customerOrderProduct.length; j++) {
                    obj  = userOrder[i].customerOrderProduct[j];
                    obj.firebase_id = localStorage.getItem("firebasetoken");
                    obj.companyName = localStorage.getItem("companyName");
                    $http.post("/api/saveOrderProduct",obj).success(function(res){
                        if(res == "Order saved"){
                            console.log("Your product order save successfully");
                        }
                        else{
                            console.log("Your product order not save successfully");
                        }
                    });
                }
            }
        };
        $scope.removeFirebaseData = function(){
            $rootScope.compCou = 0;
            var i;
            for(i = 0; i < userOrder.length; i++){
                userOrder.$remove(userOrder[i]).then(function(status){
                    console.log("Data removed");
                });
            }
        };
        $interval(function(){
            $scope.removeFirebaseData();
        },300000);
    })