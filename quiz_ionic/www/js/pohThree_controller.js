angular.module("ht3",[])
.controller("pohThreeController",function($scope,$http,$rootScope,$state){
        $scope.counter3 = true;
    $scope.goToQuestion4 = function(){
      $rootScope.htmlPracticeAnswers.push({correctAnswer : $scope.correctAnswer3, userAnswer : $scope.userAnswer3});
      $state.go("appStart.practiceOfHtmlFour",{check : "answered"});
    };
    $scope.awe = function(answer){
      $scope.userAnswer3 = answer;
    };
        $scope.quesGenerator = function(){
            var counter = false, i, question = Math.floor(Math.random() * (4 - 1)) + 1;
            for(i = 0; i < $rootScope.htmlPracticeQuestions.length; i++){
                if(question == $rootScope.htmlPracticeQuestions[i]){
                    //$scope.counter3 = false;
                    counter = true;
                }
            }
            if(counter){
                $scope.quesGenerator();
            }
          else{
              $rootScope.htmlPracticeQuestions.push(question);
              var data = {qn : question};
              $http({
                method : "GET",
                url : "http://localhost:6078/quizOfHtml",
                params : data
              }).success(function(data){
                $scope.ques3 = data.questionData.Question;
                $scope.option3 = [data.questionData.htpqo_1,data.questionData.htpqo_2,data.questionData.htpqo_3];
                $scope.correctAnswer3 = data.questionData.correctAnswer;
              }).error(function(err){})
            }
        };
        if($scope.counter3){
            $scope.quesGenerator();
        }
    })
