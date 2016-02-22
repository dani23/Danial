angular.module("prod",[])
.controller("ProductsController",function($scope,$state,$http){

        $scope.product = {productName : "",
            productPrice : null,
            productStock : null,
            company_id : localStorage.getItem("company_id"),
            company_name : localStorage.getItem("companyName")
        };
        $scope.showAllProducts;
        $scope.pro = function(){
            $http.post("/api/saveProduct",$scope.product).success(function(data){
                if(data["pro"] == "product save"){
                  alert("product saved");
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
            $scope.product = {productName : "",
                productPrice : null,
                productStock : null,
                company_id : localStorage.getItem("company_id"),
                company_name : localStorage.getItem("company_name")
            };
        }
    })