angular.module("dash_boa",[])
.controller("DashboardController",function($scope,$state,$rootScope,$mdDialog,$mdMedia,$firebaseArray,$http,$interval){
        var product_orders = new Firebase("https://salesanapp-1.firebaseio.com/productOrders");
        var userOrder = $firebaseArray(product_orders), i, j = 0;
        //console.log(userOrder[0].customerOrderProduct[0].customer_name);
        console.log(userOrder);
        console.log(userOrder.$getRecord("customerOrderProduct"));
        $scope.showOrders = userOrder;
        alert($scope.showOrders[0]);
        $scope.saveRecord = function(cusName,pro_name,pro_price,id){
            alert(id);
            $http.post("/saveOrderProduct",{customer_name : cusName,proName : pro_name,proPrice : pro_price,firebase_id : id}).success(function(data){
                    if(data == "Order saved"){
                        console.log("From success " + data);
                    }
                    else{
                        console.log("From success " + data);
                    }
                })
        };
        /*for(i = 0; i < userOrder.customerOrderProduct[j].length; i++){
            $scope.showOrders.push({customer_name : userOrder.customerOrderProduct});
        }*/
        //$scope.showOrders.push(userOrder[userOrder.length]);
       $rootScope.logout = function(){
           localStorage.removeItem("firebasetoken");
           localStorage.removeItem("company_id");
           localStorage.removeItem("companyName");
           $state.go("home");
       };
        $scope.createCompany = function(){
            $state.go("cpn");
        };
        $scope.removeFirebaseData = function(){
            $http.get("/getOrderProducts").success(function(data){
                var i;
                if(data){
                    for(i = 0; i < data.length; i++){
                        userOrder.$remove(data[i]);
                    }
                }
            });
        };
        $interval(function(){$scope.removeFirebaseData()},120000);
    });