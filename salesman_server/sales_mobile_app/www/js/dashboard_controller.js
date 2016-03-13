angular.module("dashboa",[])
.controller("DashboardController",function($scope,$state,$stateParams,$http,$ionicPopup,$firebaseArray){
    var product_orders = new Firebase("https://salesanapp-1.firebaseio.com/productOrders");
    var userOrder = $firebaseArray(product_orders);
    $scope.customerOrder = {customerName : "", addProducts : []};
    $http.get("/api/getProducts?company_id=" + $stateParams.company_id).success(function(products){
      console.log("Products are " + products);
      $scope.displayProducts = products;
    });
        $scope.logout = function(){
          localStorage.removeItem("company_id");
            $state.go("login");
        };
    $scope.addPro = function(pro_name,pro_price,pro_id){
      var i, counter = false, ind;
      if($scope.customerOrder.addProducts.length == 0){
        $ionicPopup.confirm({
          title : "Add product",
          template : "Do you want to add this product"
        }).then(function(res){
          if(res){
            $scope.customerOrder.addProducts.push({proName : pro_name, proPrice : pro_price, proId : pro_id,customer_name : $scope.customerOrder.customerName});
          alert($scope.customerOrder.addProducts + "and length is " + $scope.customerOrder.addProducts.length);
          }
        });
      }
      else{
        for(i = 0; i < $scope.customerOrder.addProducts.length; i++){
          if($scope.customerOrder.addProducts[i].proId == pro_id){
            counter = true;
            ind = i;
            break;
          }
        }
        if(counter){
          $ionicPopup.confirm({
            title : "Remove product",
            template : "<b>Do you want to remove this product?</b>"
            }
          ).then(function(res){
              if(res){
                $scope.customerOrder.addProducts.splice(ind,1);
                console.log($scope.customerOrder.addProducts + "and length is " + $scope.customerOrder.addProducts.length);
              }
            })
        }
        else{
          $ionicPopup.confirm({
            title : "Add product",
            template : "Do you want to add this product"
          }).then(function(res){
            if(res){
              $scope.customerOrder.addProducts.push({proName : pro_name, proPrice : pro_price, proId : pro_id,customer_name : $scope.customerOrder.customerName});
            }
          })
        }
      }
    };
    $scope.finalOrder = function(){
      var od = {customerOrderProduct : $scope.customerOrder.addProducts};
      console.log(od.customer_name);
      userOrder.$add(od).then(function(ref){
        var id = ref.key();
        console.log("Data saved successfully");
      });
    }
    })
