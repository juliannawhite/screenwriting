$(document).ready(()=>{
     
     var url = window.location.href;
     var url_large = "http://screenwriting-juliannawhite13758275.codeanyapp.com/draw/?size=large";
     var socket = new WebSocket('wss://screenwriting-juliannawhite13758275.codeanyapp.com/ws/draw');
  
     var charList = [];
  
     var charOrder = [];
     var dialOrder = [];
     
     // code for large display screen
     if (url.indexOf('?size=large') > -1) {
       $(".large").show();
       $(".computer").hide();   
         var canvas = document.getElementById('myCanvas');
         paper.setup(canvas);
         canvas.width  = window.innerWidth;
         canvas.height = window.innerHeight;
       var stickman;
       //svg import example https://codepen.io/andywise/pen/MqxLVr
        paper.project.importSVG("meow.svg", function(item) {
        stickman = item;
        stickman.scale(0.5);
        stickman.position = new paper.Point(paper.project.bounds.width/2, paper.project.bounds.height/2);
        })
         //end setup
        var tool = new paper.Tool();
        // Give the stroke a color
        var colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"];
        var colorInd = 0;
        var myCircle = new paper.Path.Circle(new paper.Point(100, 70), 50);
        myCircle.fillColor = 'black';
        tool.onMouseDrag = function(event) {
          var hitResult = paper.project.hitTest(event.point, {segments: true, tolerance: 30, fill: true});
          if (hitResult && hitResult.item) {
            if (event.delta.y == 0) {
              hitResult.item = hitResult.item.scale(1.005);
            } else {
              hitResult.item.position = event.lastPoint;
              hitResult.item.fillColor = colors[Math.round(colorInd) % colors.length];
              colorInd = (colorInd + .1);
            }
          }
       }
       tool.onClick = function(event) {
         console.log("meow");
          var hitResult = paper.project.hitTest(event.point, {segments: true, tolerance: 30, fill: true});
          if (hitResult && hitResult.item) {
            hitResult.item = hitResult.item.scale(1.2);
          }
       }
     }
  
  
     
     // code for computer screen
     if (!(url.indexOf('?size=large') > -1)) {
        $("#charhelp").hide(); 
         $(".large").hide(); 
         
      }
     
     var enter = document.getElementById("enter");
     var newchar = document.getElementById("newchargo");
     var play= document.getElementById("play");
  
     var addcharopt = document.getElementById("addchar");
     
     addcharopt.onclick = function() {
       $("#addchar").hide();  
       $("#charHelp").show();  
              
     }
  
     
  // adding character
  
     newchar.onclick = function() {    
       var newcharname = document.getElementById("newcharinput").value;
       console.log(newcharname);
       $("#characters").append(newcharname + "<br>");
       document.getElementById("newcharinput").value = "";
       
       charList.push(newcharname);
       console.log(charList);
       $("#addchar").show(); 
       $("#charHelp").hide(); 
      
     };
  
  // adding dialogue
     
    enter.onclick = function() {
      dialmodal.style.display = "none";
      var name = document.getElementById("char-name").value;
      var words = document.getElementById("words").value;
      console.log(charList.includes(name));
      
      if (!charList.includes(name)) {
        alert("You appear to have given dialogue to a character who doesn't exist. Please type a valid name or add the character.");
        return;
      }
      
      $(".script").append('<div class = "row title dialogue"> <div class = "col-12">' + name + ": <a>" + words + '</a></div></div>');
      document.getElementById("char-name").value = "";
      document.getElementById("words").value = "";
      
      charOrder.push(name);
      dialOrder.push(words);
      
     }
    
    // pressing play
    
    play.onclick = function() {
      
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
     
     charbtn.onclick = function() {
       charmodal.style.display = "block";
       $("#charHelp").hide(); 
      }
     
     span1.onclick = function() {
      dialmodal.style.display = "none";
    }
     
    span2.onclick = function() {
      intmodal.style.display = "none";
    }
    
    span3.onclick = function() {
      charmodal.style.display = "none";
    }
     

  
   })