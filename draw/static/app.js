   $(document).ready(()=>{
     
     var url = window.location.href;                                      
     var url_large = "http://screenwriting-juliannawhite13758275.codeanyapp.com/draw/?size=large";
     var socket = new WebSocket('wss://screenwriting-juliannawhite13758275.codeanyapp.com/ws/draw');
        
     
     // code for large screen
     if (url.indexOf('?size=large') > -1) {
         $(".computer").hide(1);   
     }
     
     // code for small screens
     if (!(url.indexOf('?size=large') > -1)) {
         $(".large").hide(); 
      }
  
   })