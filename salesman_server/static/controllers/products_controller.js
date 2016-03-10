angular.module("prod",[])
.controller("ProductsController",function($scope,$state,$http){
        $scope.company_id = localStorage.getItem("company_id");
        $scope.company_name = localStorage.getItem("companyName");
        $scope.product = {productName : "",
            productPrice : null,
            productStock : null,
            company_id : $scope.company_id,
            company_name : $scope.company_name
        };
        $scope.showAllProducts;
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
            $scope.displayAllProducts = function(){
                $http.get("/api/getProducts?company_id=" + $scope.product.company_id).success(function(data){
                    console.log("First product is " + data[0].productName);
                    $scope.showAllProducts = data;
                }).error(function(err){
                    console.log("Error in finding product " + err);
                });
            };
        };
        console.log("Assalam-o-Alaikum");
    })