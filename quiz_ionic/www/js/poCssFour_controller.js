angular.module("cssFour",[])
    .controller("poCssFourController",function($scope,$http,$rootScope,$ionicLoading,$state){
        var cssThreeCount = true;
        $scope.sumbAns = function(ans){
            $scope.yourAnswer4 = ans;
        };
        $scope.cssPracTestFinish = function(){
            $rootScope.cssPracAnswer.push({correctAnswer : $scope.cssQues4CorrectAnswer, userAnswer : $scope.yourAnswer4});
          $state.go("appStart.resultOfPracticeCssQuiz",{check : "all question answered"});
        };
        $scope.cssQuesFourGenerator = function(){
            var question = Math.floor(Math.random() * 4) + 1, i, count = false;
            for(i = 0; i < $rootScope.cssPracQues.length; i++){
                if(question == $rootScope.cssPracQues[i]){
                    count = true;
                }
            }
            if(count){
                $scope.cssQuesFourGenerator();
            }
            else{
                $rootScope.cssPracQues.push(question);
                $http({
                    method : "GET",
                    url : "http://localhost:6078/quizOfCss",
                    params : {qn : question}
                }).success(function(data){
                    $scope.cssQues4 = data.questionData.Question;
                    $scope.cssQues4Options = [data.questionData.cssOption1,data.questionData.cssOption2,data.questionData.cssOption3];
                    $scope.cssQues4CorrectAnswer = data.questionData.correctAnswer;
                }).error(function(err){
                    $ionicLoading.show({
                        template : "<p>Some thing went wrong try again later...</p><ion-spinner></ion-spinner>",
                        duration : 3000
                    })
                })
            }
        };
        if(cssThreeCount){
            $scope.cssQuesFourGenerator();
        }
    })
