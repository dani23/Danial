angular.module("resOfCssPrac",[])
.controller("cssPracResController",function($scope,$http,$rootScope,$ionicPopup,$state){
        $scope.quit = function(quiz){
            $ionicPopup.confirm({
                title: "Quit quiz",
                template: "<p>Are you sure you want to quit quiz</p>"
            }).then(function(res){
                if(res){
                    if(quiz == "css practice"){
                        $rootScope.cssPracQues.splice(0,$rootScope.cssPracQues.length);
                        $rootScope.cssPracAnswer.splice(0,$rootScope.cssPracAnswer.length);
                        $rootScope.cssPracQues = [];
                        $rootScope.cssPracAnswer = [];
                        $state.go("appStart.startPg");
                    }
                }
            });
          $scope.$emit("eve");
        };
        var i, cssObtMarks = 0;
        for(i = 0; i < $rootScope.cssPracAnswer.length; i++){
            if($rootScope.cssPracAnswer[i].correctAnswer == $rootScope.cssPracAnswer[i].userAnswer){
                ++cssObtMarks;
            }
        }
        $scope.cssPracPercentage = (cssObtMarks / 4) * 100;
        $scope.cssPracPercentage = $scope.cssPracPercentage.toFixed(2);
        if($scope.cssPracPercentage >= 0 && $scope.cssPracPercentage <= 20){
            $scope.cssPracRemarks = "You need to work very hard";
        }
        else if($scope.cssPracPercentage > 20 && $scope.cssPracPercentage <= 40){
            $scope.cssPracRemarks = "Work hard to show better progress next time";
        }
        else if($scope.cssPracPercentage > 40 && $scope.cssPracPercentage <= 60){
            $scope.cssPracRemarks = "You can get good position";
        }
        else if($scope.cssPracPercentage > 60 && $scope.cssPracPercentage <= 80){
            $scope.cssPracRemarks = "Make little effort more to get top position";
        }
        else if($scope.cssPracPercentage > 80 && $scope.cssPracPercentage <= 100){
            $scope.cssPracRemarks = "Wow that's brilliant";
        }
    })