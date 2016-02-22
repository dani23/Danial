var app = angular.module("start");
app.controller("dashboardController",function($scope,serverRef,$http,$firebaseArray,$cordovaGeolocation,firebaseRef){
    var token =  localStorage.getItem("firebaseToken")
 $http.get(serverRef + "/getproduct/"+token).then(function(success){
     $scope.products = success.data;
     console.log(success);
 },function(err){console.log(err)
 
 
 })
 $scope.notification = $firebaseArray(new Firebase(firebaseRef))
 
 $scope.sendNotification = function(notif){
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
        console.log(position)
      var lat  = position.coords.latitude
      var long = position.coords.longitutde
    }, function(err) {
      // error
    });
 }
 
 
 
 
    
});