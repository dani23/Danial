angular.module("cssTwo",[])
.controller("poCssTwoController",function($scope,$http,$rootScope,$ionicLoading,$state){
    var cssTwoCount = true;
    $scope.subAns = function(ans){
      $scope.yourAnswer2 = ans;
    };
    $scope.goToQuesThree = function(){
      $rootScope.cssPracAnswer.push({correctAnswer : $scope.cssQues2CorrectAnswer, userAnswer : $scope.yourAnswer2});
      $state.go("appStart.pracOfCssThree",{check : "answered"});
    };
    $scope.cssQuesTwoGenerator = function(){
      var question = Math.floor(Math.random() * (4 - 1)) + 1, i, count = false;
      for(i = 0; i < $rootScope.cssPracQues.length; i++){
        if(question == $rootScope.cssPracQues[i]){
          count = true;
        }
      }
      if(count){
        $scope.cssQuesTwoGenerator();
      }
      else{
        $rootScope.cssPracQues.push(question);
        $http({
          method : "GET",
          url : "http://localhost:6078/quizOfCss",
          params : {qn : question}
        }).success(function(data){
          $scope.cssQues2 = data.questionData.Question;
          $scope.cssQues2Options = [data.questionData.cssOption1,data.questionData.cssOption2,data.questionData.cssOption3];
          $scope.cssQues2CorrectAnswer = data.questionData.correctAnswer;
        }).error(function(err){
          $ionicLoading.show({
            template : "<p>Some thing went wrong try again later...</p><ion-spinner></ion-spinner>",
            duration : 3000
          })
        })
      }
    };
    if(cssTwoCount){
      $scope.cssQuesTwoGenerator();
    }
  })
