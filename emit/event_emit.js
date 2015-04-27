var aap = angular.module("emt",[]);
aap.controller("mc",function($scope){
    $scope.childName;
   $scope.$on("my_eve",function(e, data){
       $scope.childName = data;
   })
});
aap.controller("child1",function($scope){
    $scope.name1 = "";
    $scope.ch1 = function(){
        $scope.$emit("my_eve", $scope.name1);
    }
    });
aap.controller("child2",function($scope){
    $scope.name2 = "";
    $scope.ch2 = function(){
        $scope.$emit("my_eve", $scope.name2);
    }
});
