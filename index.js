$(document).ready(function(){
    fetch("http://restful-api-.herokuapp.com/api/aditya/notes",{mode:'cors'}).then(function(res){
        return res.json();
    })
    .then(function(data){
        let stringJSON=JSON.stringify(data);
        localStorage.setItem("notesJSON",stringJSON);
        let jsonData=JSON.parse(stringJSON);
        console.log(jsonData);
        console.log("LETS PARSE THE JSON");
        
        
        
        //MAKE THE DATA STRUCTURE
        
        let map = {};
        let userEmail=sessionStorage.getItem("email");;
        for(let i=0;i<jsonData.length;i++)
        {
            let obj=jsonData[i];
            console.log(obj);
            if(obj.email===userEmail)
            {
                console.log("THIS OBJ IS FOR THE LOGGED IN USER");
                console.log(obj);
                
                if(String(obj.tag) in map)
                {
                    map[String(obj.tag)].push(String(obj.text));
                }
                else
                {
                    let arr=[];
                    arr.push(String(obj.text));
                    map[String(obj.tag)]=arr;
                }
            }
        }
        
        console.log("MY DS is:");
        console.log(map);
        
       
         let template="<ul id='myTagList'>{{#.}}<li class='singleTag' id={{tag}}><p class='fa fa-hashtag'></p>{{tag}}</li>{{/.}}</ul>"
    let html=Mustache.render(template,jsonData);
    $(".tagContainer").append(html);
         let allSingleTags=document.getElementsByClassName("singleTag");
            
        for(let i=0;i<allSingleTags.length;i++)
            {
                allSingleTags[i].addEventListener("click",function(){
                   console.log(allSingleTags[i].id);
                   
                });
            }
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


let logout=document.getElementById("logout");
logout.addEventListener("click",function(){
   sessionStorage.removeItem("email");
    window.location="./login.html";
});



