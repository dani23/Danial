angular.module("fact",[])
.service("Apipoint",function($http,Apiend){
      this.getLogin = function(saleManrec){
        console.log("Saleman is " + saleManrec.salemanName);
        console.log("Apiend",Apiend);
        return $http.post(Apiend.url + "api/salemanLogin",saleManrec);
      };
    this.fetchProducts = function(cp_id){
      return $http.get(Apiend.url + "api/getProducts?company_id=" + cp_id);
    };
this.updateStok= function(newStok){
  return $http.post(Apiend.url + "api/updateProductStock", newStok);
};
    })
