angular.module("rohp",[])
.controller("resultOfPracticeHtmlController",function($scope,$rootScope){
    var i;
    $scope.obtMarks = 0;
    for(i = 0; i < $rootScope.htmlPracticeAnswers.length; i++){
      if($rootScope.htmlPracticeAnswers[i].correctAnswer == $rootScope.htmlPracticeAnswers[i].userAnswer){
        ++$scope.obtMarks;
      }
        //$scope.$emit("delhtmlPrac",i);
    }
    $scope.percentage = ($scope.obtMarks / 4) * 100;
    $scope.percentage = $scope.percentage.toFixed(2);
    if($scope.percentage >= 0 && $scope.percentage <= 20){
      $scope.workhard = "You have to work very hard";
    }
   else if($scope.percentage > 20 && $scope.percentage <= 40){
      $scope.workhard = "Work hard to show better progress next time";
    }
   else if($scope.percentage > 40 && $scope.percentage <= 60){
      $scope.workhard = "You can get good position";
    }
    else if($scope.percentage > 60 && $scope.percentage <= 80){
      $scope.workhard = "Make little effort more to get top position";
    }
    else if($scope.percentage > 80 && $scope.percentage <= 100){
      $scope.workhard = "Wow that's brilliant";
    }
  })