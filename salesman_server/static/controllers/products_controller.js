angular.module("prod",[])
.controller("ProductsController",function($scope,$state,$http,$rootScope){
        ++$rootScope.comCount;
        $scope.company_id = localStorage.getItem("company_id");
        $scope.company_name = localStorage.getItem("companyName");
        $scope.firetoken = localStorage.getItem("firebasetoken");
        $scope.product = {productName : "",
            productPrice : null,
            productStock : null,
            company_id : $scope.company_id,
            company_name : $scope.company_name,
            firebasetoken : $scope.firetoken
        };
        $scope.showAllProducts;
        $scope.gotoGetCompany = function(){
            ++$rootScope.curCom;
          $state.go("getcpn");
        };
        $scope.pro = function(){
            $http.post("/api/saveProduct",$scope.product).success(function(data){
                if(data["pro"] == "product save"){
                  alert("product saved");
                    $scope.product.productName = "";
                    $scope.product.productPrice = null;
                    $scope.product.productStock = null;
                }
                else{
                   alert("You havenot save any product");
                }
            });
        };
        $scope.displayAllProducts = function(){
            $http.get("/api/getProducts?company_id=" + localStorage.getItem("company_id")).success(function(data){
                if(data && data.length != 0) {
                    console.log("First product is " + data[0].productName);
                    $scope.showAllProducts = data;
                }
                else{
                    alert("You have not register any product");
                }
            })
        };
        console.log("Assalam-o-Alaikum");
    })