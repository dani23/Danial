angular.module("ht2",[])
.controller("pohTwoController",function($scope,$http,$stateParams,$rootScope,$state){
    $scope.counter1 = true;
    $scope.answer = function(ans){
      $scope.userAnswer2 = ans;
    };
    $scope.goToNextQuestion = function(){
      $rootScope.htmlPracticeAnswers.push({correctAnswer : $scope.correctAnswer2, userAnswer : $scope.userAnswer2});
      $state.go("appStart.practiceOfHtmlThree",{check : "answered"});
    };
    $scope.questionNoGenerator = function(){
          var counter = false;
            var questionNo = Math.floor(Math.random() * (4 - 1)) + 1, i;
            for(i = 0; i < $rootScope.htmlPracticeQuestions.length; i++){
                if(questionNo == $rootScope.htmlPracticeQuestions[i]){
                    counter = true;
                }
            }
          if(counter){
            $scope.questionNoGenerator();
          }
      else {
            $rootScope.htmlPracticeQuestions.push(questionNo);
            var data = {qn: questionNo};
            $http({
              method: "GET",
              url: "http://localhost:6078/quizOfHtml",
              params: data
            }).success(function (data) {
              console.log("data is from poh2 " + data + " and option1 is " + data.questionData.htpqo_1);
              $scope.correctAnswer2 = data.questionData.correctAnswer;
              $scope.ques2 = data.questionData.Question;
              $scope.options2 = [data.questionData.htpqo_1, data.questionData.htpqo_2, data.questionData.htpqo_3];
              console.log("question is " + $scope.ques);
            }).error(function (err) {
              alert(err);
            });
          }
        };
      if($scope.counter1) {
        $scope.questionNoGenerator();
      }
    })
