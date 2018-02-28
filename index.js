$(document).ready(function(){
    fetch("http://restful-api-.herokuapp.com/api/aditya/notes",{mode:'cors'}).the(function(res){
        return res.json();
    })
    .then(function(data){
        let stringJSON=JSON.stringify(data);
        let jsonData=JSON.parse(stringJSON);
    })
});


let saveButton=document.getElementById("saveButton");
let saveURL="http://restful-api-.herokuapp.com/api/aditya/notes";
let email=sessionStorage.getItem("email");
saveButton.addEventListener("click",function(){
    let tag=document.getElementById("tag").value;
    let note=document.getElementById("note").value;
    
    console.log("email= "+email);
    console.log("tag= "+tag);
    console.log("note= "+note);
    
    let details={
                    email: email,
                    tag: tag,
                    text: note
                };
    var formBody = [];
    for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
    
    
   fetch(saveURL,{
       mode: 'cors',
              method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
                })
       .then(function(res){
       return res.json();
   }) 
    .then(function(data){
       console.log("DATA SAVED");
       
       //
        window.location="./index.html";
   })
});