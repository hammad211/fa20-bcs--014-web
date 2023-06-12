function validate(){
    var username=document.getElementById("username").value;
    var username=document.getElementById("email").value;
    var password=document.getElementById("password").value;
  
  
  if(username=="hammad" && password=="123"){
  
   
    window.location="main.html";
    return false;
  }

  
else{
  alert("incorrect username and password");
  return false;
}

  }
  function validate1(){
        
        window.location="Signup1.HTML";
    }