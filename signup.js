var toLogin=document.getElementById("toLogin");

toLogin.addEventListener("click",function(){
   window.location = "./login.html";  
});


const URL="http://restful-api-.herokuapp.com/api/aditya/users";


//const hitserver2URl="http://restful-api-.herokuapp.com/api/aditya/users"
function hitServer2()
{
    
    
    let email=$("#email").val();
       let password=$("#password").val();
        
    let fullname=$("#fullName").val();
        console.log(email);
        console.log(password);
       
       var details = {
                        email: email,
                        password: password,
                        fullname:fullname
                        
                    };
       
    
    
    var formBody = [];
        for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
    
    
    
    
    
    fetch(URL,{mode: 'cors',
              method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
              }).then(function(res){})
    .then(function(data){
       
        sessionStorage.setItem("email",email);
       window.location="./index.html";
   })
}


function hitServer()
{
    fetch(URL,{mode: 'cors'}).then(function(res){
        return res.json();
    })
    .then(function(data){
       let stringJSON=JSON.stringify(data);
       
       let jsonData=JSON.parse(stringJSON);
       let email=$("#email").val();
       let password=$("#password").val();
       console.log(jsonData);
        console.log(email);
        console.log(password);
       let flag=0;
       
       for(let i=0;i<jsonData.length;i++)
        {
            let obj=jsonData[i];
            console.log("visiting obj "+i+"---> "+obj);
            
            if(obj.email===String(email) && obj.password===String(password))
            {
                flag=1;
                break;
            }
        }
       
       if(flag===0)
        {
            hitServer2();
        }
       
       else
        {
            document.getElementById("message").style.visibility="visible";
            document.getElementById("message").innerHTML="Someone with a same email id exists.";
            return;
        }
       
   })
}


var signupButton=document.getElementById("signupButton");

signupButton.addEventListener("click",function(){
    document.getElementById("message").style.visibility="hidden";
    let email=String($("#email").val());
    let password=String($("#password").val());
    let fullName=String($("#fullName").val());
    let confirmPassword=String($("#confirmPassword").val());
    let message=document.getElementById("message");
    let myMessage=" ";
    if(email.length===0 || password.length===0 || fullName.length===0 || confirmPassword.length===0)
    {
        document.getElementById("message").style.visibility="visible";
        message.innerHTML="Please fill your credentials";
        return;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    document.getElementById("message").innerHTML=" ";
    document.getElementById("message").style.visibility="visible";
    if(!re.test(String(email).toLowerCase()))
    {
        myMessage=myMessage+"Not a valid email-id. ";
    }
    
    if(password!=confirmPassword)
    {
        myMessage=myMessage+"\n Passwords do not match."
    }
    
    if(myMessage.length>1)
    {
        message.innerHTML=myMessage;
        return;
    }
    else
    {
        hitServer();
    }
    
    
});