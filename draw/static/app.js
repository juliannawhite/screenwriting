   $(document).ready(()=>{
     
     var url = window.location.href;                                      
     var url_large = "http://screenwriting-juliannawhite13758275.codeanyapp.com/draw/?size=large";
     var socket = new WebSocket('wss://screenwriting-juliannawhite13758275.codeanyapp.com/ws/draw');
        
     
     // code for large display screen
     if (url.indexOf('?size=large') > -1) {
       $(".computer").hide();   
     }
     
     // code for computer screen
     if (!(url.indexOf('?size=large') > -1)) {
         $(".large").hide(); 
         
      }
     
     var enter = document.getElementById("enter");
     
    enter.onclick = function() {
      dialmodal.style.display = "none";
      var name = document.getElementById("char-name").value;
      var words = document.getElementById("words").value;
      
      $(".script").append('<div class = "row title dialogue"> <div class = "col-12">' + name + ": <a>" + words + '</a></div></div>');
      
     }
     
     
     var dialmodal = document.getElementById("myDialModal");
     var dialbtn = document.getElementById("dialbtn");
     var span1 = document.getElementById("close1");
     
     var intmodal = document.getElementById("myInteractionModal");
     var intbtn = document.getElementById("intbtn");
     var span2 = document.getElementById("close2");
     
     var charmodal = document.getElementById("myCharModal");
     var charbtn = document.getElementById("charbtn");
     var span3 = document.getElementById("close3");
     
     
     dialbtn.onclick = function() {
       dialmodal.style.display = "block";
      }
     
     intbtn.onclick = function() {
       intmodal.style.display = "block";
      }
     
     span1.onclick = function() {
      dialmodal.style.display = "none";
    }
     
    span2.onclick = function() {
      intmodal.style.display = "none";
    }
    
    span3.onclick = function() {
      intmodal.style.display = "none";
    }
     

  
   })