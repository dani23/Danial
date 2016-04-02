angular.module("fact",[])
.service("Apipoint",function($http,Apiend){
      this.getLogin = function(saleManrec){
        console.log("Apiend",Apiend);
        return $http.post(Apiend.url + "/salemanLogin",saleManrec);
      };
    this.fetchProducts = function(cp_id){
      return $http.get(Apiend.url + "/getProducts?company_id=" + cp_id);
    };
this.updateStok= function(newStok){
  return $http.post(Apiend.url + "/updateProductStock", newStok);
};
    })
