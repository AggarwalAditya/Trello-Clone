let toSignup=document.getElementById("toSignup");
toSignup.addEventListener("click",function(){
    window.location = "./signup.html"; 
});

function hitServer()
{
    fetch(loginURL,{mode: 'cors'}).then(function(res){
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
       
       if(flag===1)
        {
            window.location="./index.html"
        }
       
       else
        {
            document.getElementById("message").style.visibility="visible";
            document.getElementById("message").innerHTML="Wrong Credentials.";
            return;
        }
       
   })
//   .catch(function(error){
//        console.log("API ERROR");
//    })
}

let loginButton=document.getElementById("loginButton");
const loginURL="http://restful-api-.herokuapp.com/api/aditya/users"
loginButton.addEventListener("click",function(){
   
    document.getElementById("message").style.visibility="hidden";
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     document.getElementById("message").style.visibility="visible";
    if(email.length===0 || password.length===0)
    {
        document.getElementById("message").innerHTML="Please enter your credentials.";   
        return;
    }
   
    
    if(re.test(String(email).toLowerCase()))
    {
        document.getElementById("message").style.visibility="hidden";
        hitServer();
    }
    else
    {
        document.getElementById("message").innerHTML="Not a proper email id";
    }
});
