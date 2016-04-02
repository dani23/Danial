angular.module("dash_boa",[])
.controller("DashboardController",function($scope,$state,$rootScope,$http){
        $scope.goToComp = function(comName,com_id){
            $rootScope.comCount = 0;
            $state.go("getcpn",{comdata : {companyName : comName, company_id : com_id}});
        };
        $http.get("/api/myCompaniesList?firebasetoken=" + localStorage.getItem("firebasetoken")).success(function(data){
            var i;
            if(data){
                $scope.companyList = [];
                for(i = 0; i < data.length; i++){
                    $scope.companyList.push({companyName : data[i].company_name, company_id : data[i]._id});
                }
            }
        });
        $scope.createCompany = function(){
            $state.go("cpn");
        };
    });