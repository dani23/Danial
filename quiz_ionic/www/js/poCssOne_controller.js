angular.module("cssOne",[])
.controller("poCssOneController",function($scope,$http,$rootScope,$ionicLoading,$state){
        $scope.goToCssQues2 = function(){
          $rootScope.cssPracAnswer.push({correctAnswer : $scope.cssCorrectAnswer1, userAnswer : $scope.yourAnswer1});
            $state.go("appStart.pracOfCssTwo",{check : "answered"});
        };
        var question = Math.floor(Math.random() * (4 - 1)) + 1;
        $scope.submitAnswer = function(ans){
          $scope.yourAnswer1 = ans;
        };
        $rootScope.cssPracQues.push(question);
        $http({
            method : "GET",
            url : "http://localhost:6078/quizOfCss",
            params : {qn : question}
        }).success(function(data){
            $scope.cssQues1 = data.questionData.Question;
            $scope.cssQues1Options = [data.questionData.cssOption1,data.questionData.cssOption2,data.questionData.cssOption3];
            $scope.cssCorrectAnswer1 = data.questionData.correctAnswer;
        }).error(function(err){
            $ionicLoading.show({
                template : "<p>Some thing went wrong try again later...</p><ion-spinner></ion-spinner>",
                duration : 3000
            })
        })
    })
