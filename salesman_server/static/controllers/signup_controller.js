angular.module("signCont",[])
.controller("SignupController",function($scope,$http,$state){
        $scope.user = {
            Firstname : "",
            Lastname : "",
            email : "",
            password : ""
        };
        $scope.submitForm = function(){
            $http.post("/api/signup",$scope.user).success(function(data){
                console.log("data is " + data);
                console.log(data['yup']);
                if(data['yup'] == 'success'){
                    console.log("Successfully signed up");
                    console.log("token is " + data["userData"].firebasetoken);
                    localStorage.setItem("firebasetoken",data["userData"].firebasetoken);
                    $state.go("dashboard");
                }
                else{
                    console.log("Not successfully signed up");
                    alert("This user already exist");
                }
            })
        };
    })