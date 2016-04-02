angular.module("dashboa",[])
.controller("DashboardController",function($scope,$state,$stateParams,$http,$ionicPopup,$firebaseArray,Apipoint){
    var product_orders = new Firebase("https://salesanapp-1.firebaseio.com/" + $stateParams.company_id);
    var userOrder = $firebaseArray(product_orders);
    $scope.quantityOfProduct = [];
    $scope.productIds = [];
    $scope.customerOrder = {customerName : "", addProducts : []};
    Apipoint.fetchProducts($stateParams.company_id).success(function(products){
      console.log("Products are " + products);
      $scope.displayProducts = products;
    });
        $scope.logout = function(){
          localStorage.removeItem("company_id");
            $state.go("login");
        };
    $scope.addPro = function(pro_name,pro_price,pro_id,pro_st){
      $scope.productQuantity = {};
      var i, counter = false, ind;
        if ($scope.customerOrder.addProducts.length == 0) {
          $ionicPopup.show({
            title: "Add product quantity",
            template: "<input type='number' ng-model='productQuantity.proQuan'/><p>{{productQuantity.proQuan}}</p>",
            scope : $scope,
            buttons : [{text : 'Cancel',type : 'button-positive'},{text : 'Save', type : 'button-positive', onTap : function(e){
              console.log($scope.productQuantity.proQuan);
              if(!$scope.productQuantity.proQuan){
                console.log($scope.productQuantity.proQuan);
                e.preventDefault();
              }
              else{
                return $scope.productQuantity.proQuan;
              }
            }}]
          }).then(function(res){
            if(res){
              $scope.quantityOfProduct.push(res);
              $scope.customerOrder.addProducts.push({customer_name : $scope.customerOrder.customerName,proName : pro_name,proPrice : pro_price,proOrderQuantity : $scope.quantityOfProduct[$scope.quantityOfProduct.length - 1]})
              $scope.productIds.push({_id : pro_id, productStock : pro_st, proOrderQuantity : $scope.quantityOfProduct[$scope.quantityOfProduct.length - 1]});
            }
          });
        }
        else {
          for (i = 0; i < $scope.productIds.length; i++) {
            if ($scope.productIds[i]._id == pro_id) {
              counter = true;
              ind = i;
              break;
            }
          }
          if (counter) {
            $ionicPopup.confirm({
                title: "Remove product",
                template: "<b>Do you want to remove this product?</b>"
              }
            ).then(function (res) {
                if (res) {
                  $scope.customerOrder.addProducts.splice(ind, 1);
                  $scope.quantityOfProduct.splice(ind,1);
                  $scope.productIds.splice(ind,1);
                  console.log($scope.customerOrder.addProducts + "and length is " + $scope.customerOrder.addProducts.length + " and length of quantityOfProduct is " + $scope.quantityOfProduct.length);
                }
              })
          }
          else {
            $ionicPopup.show({
              title : "Add product quantity",
              template : "<input type='number' ng-model='productQuantity.proQuan'/><p>{{productQuantity.proQuan}}</p>",
              scope : $scope,
              buttons : [{text : "Cancel", type : "button-positive"},{text : "Save", type : "button-positive", onTap : function(e){
                if(!$scope.productQuantity.proQuan){
                  e.preventDefault();
                }
                else{
                  return $scope.productQuantity.proQuan;
                }
              }}]
            }).then(function(res){
              if(res){
                $scope.quantityOfProduct.push(res);
                $scope.customerOrder.addProducts.push({customer_name : $scope.customerOrder.customerName,proName : pro_name,proPrice : pro_price,proOrderQuantity : $scope.quantityOfProduct[$scope.quantityOfProduct.length - 1]});
                $scope.productIds.push({_id : pro_id, productStock : pro_st, proOrderQuantity : $scope.quantityOfProduct[$scope.quantityOfProduct.length - 1]});
              }
            })
          }
        }
    };
    $scope.finalOrder = function(){
      var od = {customerOrderProduct : $scope.customerOrder.addProducts},j;
      //console.log(od.customer_name);
      userOrder.$add(od).then(function(ref){
        var id = ref.key();
        console.log("Data saved successfully");
        if($scope.productIds.length > 0) {
          for (j = 0; j < $scope.productIds.length; j++) {
            $scope.productIds[j].productStock = $scope.productIds[j].productStock - $scope.productIds[j].proOrderQuantity;
            Apipoint.updateStok($scope.productIds[j]).success(function (data) {
              if (data == "Product stock updated") {
                console.log(data);
              }
              else {
                console.log(data);
              }
            })
          }
        }
        localStorage.removeItem("company_id");
        $state.go("login");
      });
    }
    })
