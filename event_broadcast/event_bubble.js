var app = angular.module("event",[]);
app.controller("mc",function($scope){
    $scope.userName = "";
    $scope.num = function(){
        $scope.$broadcast("my_eve",+prompt("Enter any number"),$scope.userName);
    }
});
app.controller("child1",function($scope){
    $scope.num;
    $scope.userName;
$scope.$on("my_eve",function(e, data_num, name){
    $scope.num = data_num;
    $scope.userName = name;
})
});
app.controller("child2",function($scope){
    $scope.num;
    $scope.userName;
$scope.$on("my_eve",function(e, data_num, name){
    $scope.num = data_num;
    $scope.userName = name;
})
});
