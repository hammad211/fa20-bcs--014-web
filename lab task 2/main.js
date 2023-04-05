function validate(){
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
  
  
  if(username=="hammad" && password=="123"){
  
    alert("login successfully");
    window.location="main.html";
  }

 
else{
  alert("incorrect username and password");
  document.getElementById("demo").innerHTML="plz fill the fields"
  return false;
}

  }
  function validate1(){
        
        window.location="Signup1.HTML";
    }