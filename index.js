$(document).ready(function(){ 

	if(!sessionStorage.getItem("email"))
    {
        window.location="./login.html";
    }

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
        let userEmail=sessionStorage.getItem("email");
      
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
        console.log('Looping');
        
//        let templ="<ul id='myTagList'>{{#.}}<li class='singleTag' id={{i}}><p class='fa fa-hashtag'></p>{{i}}</li>{{/.}}</ul>"
        
        
        
        let tagTemplate="<ul id='myTagList'>";
        
        if(Object.keys(map).length>0)
        {
            tagTemplate=tagTemplate+"<li class='singleTag allTags' id='all'><p class='fa fa-hashtag'></p><span> </span>All</li>"
        }
        for(let i in map)
        {
            console.log("key= "+i+" value= "+map[i]);
            tagTemplate=tagTemplate+"<li class='singleTag allTags' id="+i+"><p class='fa fa-hashtag'></p><span> </span>"+ i+"</li>"
        }
        
        tagTemplate+tagTemplate+"</ul>";
       
//         let template="<ul id='myTagList'>{{#.}}<li class='singleTag' id={{tag}}><p class='fa fa-hashtag'></p>{{tag}}</li>{{/.}}</ul>"
//    let html=Mustache.render(template,jsonData);
//    let html2=Mustache.render(templ,map["random"]);
    $(".tagContainer").append(tagTemplate);
        
    let allSingleTags=document.getElementsByClassName("allTags");
            
        for(let i=1;i<allSingleTags.length;i++)
            {
                allSingleTags[i].addEventListener("click",function(){
                   $(".tagRelatedNotes").html("");
                   console.log(allSingleTags[i].id);
                   
                    let tagName=allSingleTags[i].id;
                    let arr=map[String(tagName)];
                    for(let j=0;j<arr.length;j++)
                    {
                        let card="<div class='card myCard'><img class='card-img-top' src='img.jpg' alt='Card image'><div class='card-body'><h4 class='card-title'>"+tagName+"</h4><p class='card-text'>"+arr[j]+"</p></div></div>";
                        $(".tagRelatedNotes").append(card);
                        
                    }
                    for(let r=0;r<allSingleTags.length;r++)
                    {
                    allSingleTags[r].classList.remove("singleTag2");
                    allSingleTags[r].classList.add("singleTag");
                    }
                    
                    allSingleTags[i].classList.remove("singleTag");
                    allSingleTags[i].classList.add("singleTag2");
                    
                });
            }
        
        document.getElementById("all").addEventListener("click",function(){
            $(".tagRelatedNotes").html("");
           for(let k in map)
            {
                 
                let arr=map[k];
                for(let g=0;g<arr.length;g++)
                {
                    let card="<div class='card myCard'><img class='card-img-top' src='img.jpg' alt='Card image'><div class='card-body'><h4 class='card-title'>"+k+"</h4><p class='card-text'>"+arr[g]+"</p></div></div>";
                    $(".tagRelatedNotes").append(card);
                }
                
                
            }
            
            for(let r=0;r<allSingleTags.length;r++)
            {
                allSingleTags[r].classList.remove("singleTag2");
                allSingleTags[r].classList.add("singleTag");
            }
            
            allSingleTags[0].classList.remove("singleTag");
            allSingleTags[0].classList.add("singleTag2");
        });
    })
    var allbtn=$("#all");
     allbtn.click();
    
   

    
});

//window.onload=function(){
//    
//};


let saveButton=document.getElementById("saveButton");
let saveURL="http://restful-api-.herokuapp.com/api/aditya/notes";
let email=sessionStorage.getItem("email");
saveButton.addEventListener("click",function(){
    let tag=document.getElementById("tag").value;
    let note=document.getElementById("note").value;
    
    console.log("email= "+email);
    console.log("tag= "+tag);
    console.log("note= "+note);
    if(tag.length===0 || note.length===0)
    {
        document.getElementById("myMessage").innerHTML="Please fill up the fields first.";
        return;
    }
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




