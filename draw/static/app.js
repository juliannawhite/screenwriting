$(document).ready(()=>{
     
     var url = window.location.href;
     var url_large = "http://screenwriting-juliannawhite13758275.codeanyapp.com/draw/?size=large";
     var socket = new WebSocket('wss://screenwriting-juliannawhite13758275.codeanyapp.com/ws/draw');
  
     var charList = [];
  
     var charOrder = [];
     var dialOrder = [];
  
     var char_color_dict = {};
  
     var chosen_color = "black";
  
     var current_interaction = 0;
     var select_char_dict = {};
  
    var selected_chars_list = [];
  
  	 var cp = {
      history: ["#000000"], // black selected by default
      options: [],
      $container: $('#colorPalette')
	   }
     
    var colorBtn = document.getElementById("colorBtn");
    var colorPalette = document.getElementById("colorPalette");
    colorBtn.onclick = function() {
        $("#popcp").fadeTo("fast", 1);
    };
     
	function createColorPalette(colors){
        // create a swatch for each color
	    for (var i = colors.length - 1; i >= 0; i--) {
	        var $swatch = $("<div>").css("background-color", colors[i])
							        .addClass("swatch");
            $swatch.click(function(){
				// add color to the color palette history
              
			          cp.history.push($(this).css("background-color"));
                colorBtn.style.backgroundColor = cp.history[cp.history.length - 1];
                chosen_color = cp.history[cp.history.length - 1];
                console.log(chosen_color);
                $("#popcp").fadeTo("fast",0);
                $("#popcp").css("display","none");
              console.log(chosen_color);
			});
            cp.$container.append($swatch);
		  }
	  }
  
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
        getColorsCreatePalette();
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
      // HERE
  
     newchar.onclick = function() {    
       var newcharname = document.getElementById("newcharinput").value;
       console.log(newcharname);
       $("#characters").append(newcharname + "<br>");
       document.getElementById("newcharinput").value = "";
       
       charList.push(newcharname);
       
       $(".form").append('<option value="'+ newcharname + '">' + newcharname +'</option>');
       
       $("#addchar").show(); 
       $("#charHelp").hide(); 
       
       char_color_dict[newcharname] = chosen_color;
       console.log(char_color_dict);
       
       $("#charchoose").append('<label class="container"><input type="checkbox" checked="checked" value="' + newcharname + '"><span class="checkmark"></span>' + newcharname + '</label> <br>')
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
    
    var selected_chars = document.getElementById("enter2");
    selected_chars.onclick = function() {
      selected_chars_list = [];
      var charcheck = document.forms[0];
      for (var i = 0; i < charcheck.length; i++) {
        if (charcheck[i].checked) {
          selected_chars_list.push(charcheck[i].value);
          console.log(selected_chars_list);
        }
      }
      charstickmodal.style.display = "none";
       var canvas = document.getElementById('myCanvas2');
       paper.setup(canvas);
      
       
       var stickmen = {};
       var current_x = 90;
       for(var j = 0; j < selected_chars_list.length; j++) { 
        stickmen['stickman' + j] = new paper.Raster('stick'); 
        stickmen['stickman' + j].position = new paper.Point(current_x, 120);
        stickmen['stickman' + j].color = char_color_dict[selected_chars[j]];
        stickmen['stickman' + j].scale(0.9);
        current_x += 120;
       }
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
  
     var charstickmodal = document.getElementById("myCharStickModal");
     var charstick = document.getElementById("charstick");
     var span4 = document.getElementById("close4");
     
     
     dialbtn.onclick = function() {
       dialmodal.style.display = "block";
      }
     
     charstick.onclick = function() {
       charstickmodal.style.display = "block";
      }
     
     intbtn.onclick = function() {
       intmodal.style.display = "block";
       
       // characters canvas to reposition stick figures
       
       var canvas = document.getElementById('myCanvas2');
       paper.setup(canvas);
       
//        var stickmen = {};
//        var current_x = 90;
//        for(var i = 0; i < selected_chars_list.length; i++){ 
//         stickmen['stickman' + i] = new paper.Raster('stick'); 
//         stickmen['stickman' + i].position = new paper.Point(current_x, 120);
//         stickmen['stickman' + i].scale(0.9);
//         current_x += 120;
//        }
                    
       var set = new Set(charOrder);
       
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
    
    span4.onclick = function() {
      charstickmodal.style.display = "none";
    }
    
    span3.onclick = function() {
      charmodal.style.display = "none";
      $("#addchar").show(); 
      $("#charHelp").hide(); 
    }
    

})