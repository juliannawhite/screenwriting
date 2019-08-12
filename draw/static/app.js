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
       $(".real").hide();
       
         var canvas = document.getElementById('myCanvas');
         paper.setup(canvas);
         canvas.width  = window.innerWidth;
         canvas.height = window.innerHeight;
       //svg import example https://codepen.io/andywise/pen/MqxLVr
       var stickman = new paper.Raster('stick');
       stickman.position = new paper.Point(100, 70);
       stickman.scale(0.5); 
       // paper.project.importSVG("meow.svg", function(item) {
        //stickman = item;
       /// stickman.scale(0.5);
       // stickman.position = new paper.Point(paper.project.bounds.width/2, paper.project.bounds.height/2);
       // })
         //end setup
        var tool = new paper.Tool();
        // Give the stroke a color
        var colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"];
        var colorInd = 0;
        //var myCircle = new paper.Path.Circle(new paper.Point(100, 70), 50);
       
        //myCircle.fillColor = 'black';
        tool.onMouseDrag = function(event) {
          var hitResult = paper.project.hitTest(event.point, {segments: true, tolerance: 30, fill: true});
          if (hitResult && hitResult.item) {
            if (event.delta.y == 0) {
              hitResult.item = hitResult.item.scale(1.005);
            } else {
              hitResult.item.position = event.lastPoint;
              hitResult.item.strokeColor = colors[Math.round(colorInd) % colors.length];
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
        $(".real").hide();
        $(".stageimg").hide();
      }
     
     var enter = document.getElementById("enter");
     var newchar = document.getElementById("newchargo");
     var play= document.getElementById("play");
  
     var addcharopt = document.getElementById("addchar");
     
     addcharopt.onclick = function() {
       $("#addchar").hide();  
       $("#charHelp").show();  
              
     }
     
      var nextdone = document.getElementById("next");
      nextdone.onclick = function() {
        $(".stageimg").show();
        $(".nameplay").hide();
    }
      
      var homedone = document.getElementById("homedone");
      homedone.onclick = function() {
        $(".stageimg").hide();
        $(".starter").hide();
        $(".real").show();
        var title = document.getElementById("title-name").value;
        $("#title-here").append(title);
    }
  
     
  // adding character
  
     newchar.onclick = function() {    
       var newcharname = document.getElementById("newcharinput").value;
       console.log(newcharname);
       $("#characters").append(newcharname + "<br>");
       document.getElementById("newcharinput").value = "";
       
       charList.push(newcharname);
       
       $(".form").append('<option value="'+ newcharname + '">' + newcharname +'</option>');
       
       console.log('<option value="'+ newcharname + '">' + newcharname +'</option>');
       $("#addchar").show(); 
       $("#charHelp").hide(); 
      
     };
  
  // adding dialogue
     
    enter.onclick = function() {
      dialmodal.style.display = "none";
      
      var e = document.getElementById("charnamesel");
      var name = e.options[e.selectedIndex].value;
      e.selectedIndex = -1; 
      
      //var name = document.getElementById("char-name").value;
      
      var words = document.getElementById("words").value;
//       console.log(charList.includes(name));
      
//       if (!charList.includes(name)) {
//         alert("You appear to have given dialogue to a character who doesn't exist. Please type a valid name or add the character.");
//         return;
//       }
      
      $(".script").append('<div class = "row title dialogue"> <div class = "col-12">' + name + ": <a>" + words + '</a></div></div>');
      //document.getElementById("char-name").value = "";
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
       
       // characters canvas to reposition stick figures
       
       var canvas = document.getElementById('myCanvas2');
       paper.setup(canvas);
       
       var stickman = new paper.Raster('stick');
         
       stickman.position = new paper.Point(90, 80);
       stickman.scale(0.9); 
       //x += 30;
             
       var set = new Set(charOrder);
       
//        var curr = 0;
//        var x = 100;
//        var y = 30;
//        while (curr < set.size) {
         
          
//          var stickman = new paper.Raster('stick');
         
//          stickman.position = new paper.Point(x, y);
//          stickman.scale(0.9); 
//          x += 30;
         
//        }
       
       
        var tool = new paper.Tool();
        var colors = ["black"];
        tool.onMouseDrag = function(event) {
          var hitResult = paper.project.hitTest(event.point, {segments: true, tolerance: 30, fill: true});
          if (hitResult && hitResult.item) {
            if (event.delta.y == 0) {
              hitResult.item = hitResult.item.scale(1.005);
            } else {
              hitResult.item.position = event.lastPoint;
              hitResult.item.strokeColor = colors[Math.round(colorInd) % colors.length];
              hitResult.item.fillColor = colors[Math.round(colorInd) % colors.length];
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
      $("#addchar").show(); 
      $("#charHelp").hide(); 
    }
    
    var colorBtn = document.getElementById("colorBtn");
    var colorPalette = document.getElementById("colorPalette");
    colorBtn.onclick = function() {
        $("#popcp").fadeTo("fast", 1);
    };
})

window.onload = function() {
    // color palette
	var cp = {
		history: ["#000000"], // black selected by default
		options: [],
		$container: $('#colorPalette')
	}
    
    // create a color palette with the given colors
	function createColorPalette(colors){
        // create a swatch for each color
	    for (var i = colors.length - 1; i >= 0; i--) {
	        var $swatch = $("<div>").css("background-color", colors[i])
							        .addClass("swatch");
            $swatch.click(function(){
				// add color to the color palette history
			    cp.history.push($(this).css("background-color"));
                colorBtn.style.backgroundColor = cp.history[cp.history.length - 1];
                $("#popcp").fadeTo("fast",0);
                $("#popcp").css("display","none");
			});
            cp.$container.append($swatch);
		}
	}

	// loads a set of colors from a json to create a color palette
	function getColorsCreatePalette(){
		cp.$container.html(" ");
		$.getJSON('/static/draw/vendor/material/material-colors.json', function(colors){
			var keys = Object.keys(colors);
			for (var i = keys.length - 1; i >= 0; i--) {
            cp.options.push(colors[keys[i]][500]);
		    }
			createColorPalette(cp.options);
		});
	}
    getColorsCreatePalette();
}