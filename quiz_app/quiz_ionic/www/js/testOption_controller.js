angular.module("testCo",[])
.controller("testController",function($scope,$state,$stateParams){
        $scope.html = function(){
            console.log("option is " + $stateParams.options);
            if($stateParams.options == "practice"){
                $state.go("appStart.practiceOfHtmlOne",{whichQuiz : "htmlpractice"});
            }
        };
        $scope.css = function(){
            if($stateParams.options == "practice"){
                $state.go("appStart.pracOfCssOne",{whichQuiz : "csspractice"});
            }
        };
        $scope.javascript = function(){};
    })