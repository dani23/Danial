angular.module("ad").controller("ct1",function(){
   var vm = this;
    vm.name = name;
    vm.person = [{pname:"Danial",tall:false},
        {pname:"Ali",tall:true},
        {pname:"Inzamam",tall:true},
        {pname:"Ghani",tall:false},
        {pname:"Danial Ahmad",tall:true}
    ];
});
function clea(){
    document.getElementsByTagName("input")[0].value="";
}
