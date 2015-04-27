var app = angular.module("enb",[]);
app.controller("mc",function($scope){
    $scope.cn;
$scope.$on("my_eve",function(e, data){
    $scope.cn = data;
})
});
app.controller("child1",function($scope){
   $scope.childName = "";
    $scope.ch = function()
    {
        $scope.$emit("my_eve", $scope.childName);
    }
});
app.controller("child2",function($scope){
});
