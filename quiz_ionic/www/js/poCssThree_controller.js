angular.module("cssThree",[])
    .controller("poCssThreeController",function($scope,$http,$rootScope,$ionicLoading,$state){
        var cssThreeCount = true;
        $scope.subtAns = function(ans){
            $scope.yourAnswer3 = ans;
        };
        $scope.goToQuesFour = function(){
            $rootScope.cssPracAnswer.push({correctAnswer : $scope.cssQues3CorrectAnswer, userAnswer : $scope.yourAnswer3});
            $state.go("appStart.pracOfCssFour",{check : "answered"});
        };
        $scope.cssQuesThreeGenerator = function(){
            var question = Math.floor(Math.random() * (4 - 1)) + 1, i, count = false;
            for(i = 0; i < $rootScope.cssPracQues.length; i++){
                if(question == $rootScope.cssPracQues[i]){
                    count = true;
                }
            }
            if(count){
                $scope.cssQuesThreeGenerator();
            }
            else{
                $rootScope.cssPracQues.push(question);
                $http({
                    method : "GET",
                    url : "http://localhost:6078/quizOfCss",
                    params : {qn : question}
                }).success(function(data){
                    $scope.cssQues3 = data.questionData.Question;
                    $scope.cssQues3Options = [data.questionData.cssOption1,data.questionData.cssOption2,data.questionData.cssOption3];
                    $scope.cssQues3CorrectAnswer = data.questionData.correctAnswer;
                }).error(function(err){
                    $ionicLoading.show({
                        template : "<p>Some thing went wrong try again later...</p><ion-spinner></ion-spinner>",
                        duration : 3000
                    })
                })
            }
        };
        if(cssThreeCount){
            $scope.cssQuesThreeGenerator();
        }
    })
