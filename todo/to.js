function ca(){
    var inp = document.getElementsByName("val")[0].value;
    var create = document.createElement("label"), textnode, createLabelChild;
    create.setAttribute("style","display:block");
    createLabelChild = document.createElement("input");
    createLabelChild.setAttribute("type","checkbox");
    createLabelChild.setAttribute("name","data");
    textnode = document.createTextNode(inp);
    create.appendChild(createLabelChild);
    create.appendChild(textnode);
    document.getElementById("m1").appendChild(create);
    document.getElementsByName("val")[0].value="";
    document.getElementsByName("val")[0].focus();
    console.log(document.getElementsByName("data").length);
}
function de(){
    var i, par, grand =  document.getElementById("m1");
    for(i = 0; i < document.getElementsByName("data").length ; i++){
        if(document.getElementsByName("data")[i].checked){
          par = document.getElementsByTagName("label")[i];
            grand.removeChild(par);
        }
    }
}