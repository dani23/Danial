angular.module("ht4",[])
.controller("pohFourController",function($scope,$http,$rootScope,$state){
        $scope.finishHtmlPracQuiz = function(){
            $rootScope.htmlPracticeAnswers.push({correctAnswer : $scope.correctAnswer4, userAnswer : $scope.userAnswer4});
            $state.go("appStart.resultOfPracticeHtmlQuiz",{check : "all questions answered"});
        };
        $scope.chkAns = function(ans){
          $scope.userAnswer4 = ans;
        };
     $scope.counter4 = true;
        $scope.questionGenerator = function(){
            var counter = false, question = Math.floor(Math.random() * 4) + 1 , i;
            for(i = 0; i < $rootScope.htmlPracticeQuestions.length; i++){
              if(question == $rootScope.htmlPracticeQuestions[i]) {
                counter = true;
              }
            }
            if(counter){
                $scope.questionGenerator();
            }
            else{
                $rootScope.htmlPracticeQuestions.push(question);
                var data = {qn : question};
                $http({
                    method : "GET",
                    url : "http://localhost:6078/quizOfHtml",
                    params : data
                }).success(function(data){
                    $scope.ques4 = data.questionData.Question;
                    $scope.option4 = [data.questionData.htpqo_1,data.questionData.htpqo_2,data.questionData.htpqo_3];
                    $scope.correctAnswer4 = data.questionData.correctAnswer;
                })
            }
        };
        if($scope.counter4){
            $scope.questionGenerator();
        }
    })
