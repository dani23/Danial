angular.module("ht1",[])
.controller("pohOneController",function($scope,$http,$state,$rootScope,$ionicLoading){
    $scope.tr = function(ind,opt){
      $scope.userAnswer = opt;
    };
    $scope.checkAnswer = function(){
      $rootScope.htmlPracticeAnswers.push({correctAnswer : $scope.correctAnswer1, userAnswer : $scope.userAnswer});
      $scope.ques = "";
      $scope.options = [];
      $state.go("appStart.practiceOfHtmlTwo",{check : "answered"});
    };
        $scope.htpQ1 = function(){
          $ionicLoading.show({
              template : "<p>Loading...</p><ion-spinner></ion-spinner>",
              duration : 3000
            });
            var questionNumber = Math.floor(Math.random() * (4 - 1)) + 1;
          $rootScope.htmlPracticeQuestions.push(questionNumber);
          var data = {qn : questionNumber};
            $http({
              method : "GET",
              url : "http://42.201.153.126:6078/quizOfHtml",
              params : data
            })
          .success(function(data){
                console.log("data is " + data + " and option1 is " + data.questionData.htpqo_1);
                $scope.correctAnswer1 = data.questionData.correctAnswer;
                $scope.ques = data.questionData.Question;
                $scope.options = [];
                $scope.options.push(data.questionData.htpqo_1,data.questionData.htpqo_2,data.questionData.htpqo_3);
                console.log("question is " + $scope.ques);
              $ionicLoading.hide();
            }).error(function(err){
                $ionicLoading.show({
                  template : "<p>Server not responding please try again later...</p><ion-spinner></ion-spinner>",
                  duration : 3000
                })
            })
        };
    $scope.htpQ1();
    })
