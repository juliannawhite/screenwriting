$(document).ready(()=>{
     
     var url = window.location.href;
     var url_large = "http://screenwriting-juliannawhite13758275.codeanyapp.com/draw/?size=large";
     var socket = new WebSocket('wss://screenwriting-juliannawhite13758275.codeanyapp.com/ws/draw');
  
     var charList = [];
     var int_count = 0;
     var charOrder = [];
     var dialOrder = [];
     var stickmen = {};
     var char_color_dict = {};
     var chosen_color = "black";
  
     var current_interaction = 0;
     var select_char_dict = {};
    var selected_chars_list = [];
  
    var all_interactions = [];

  // COLOR PALETTE
  
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
	    for (var i = colors.length - 1; i >= 0; i--) {
	        var $swatch = $("<div>").css("background-color", colors[i])
							        .addClass("swatch");
            $swatch.click(function(){              
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

     
  // code for computer screen
     if (!(url.indexOf('?size=large') > -1)) {
        $("#charhelp").hide(); 
        $(".large").hide();
        $(".real").hide();
       //$(".starter").hide(); // here
        $(".stageimg").hide();
        getColorsCreatePalette();
      }
  
 // input dialogue
     var enter = document.getElementById("enter");
  
// new character 
     var addcharopt = document.getElementById("addchar"); // add char
     var newchar = document.getElementById("newchargo"); // finalize character
     addcharopt.onclick = function() {
       $("#addchar").hide();  
       $("#charHelp").show();  
     }
     
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
       
// playback button
     
     var play= document.getElementById("play");
     var playmodal= document.getElementById("myPlayModal");
      play.onclick = function() {
      playmodal.style.display = "block";
        
      for (var line = 0; line < charOrder.length; line++) {
        console.log(dialOrder[line]);
        console.log(all_interactions[line]);
      }
        
      
    }
  
// beginning of app 
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
  

  
  // adding dialogue
     
    enter.onclick = function() {
      dialmodal.style.display = "none";
      
      var e = document.getElementById("charnamesel");
      var name = e.options[e.selectedIndex].value;
      e.selectedIndex = -1;       
      var words = document.getElementById("words").value;
     
      $(".script").append('<div class = "row title dialogue"> <div class = "col-12">' + name + ": <a>" + words + '</a></div></div>');
      $(".script").append('<div class="interaction_actual"><button class="btn id="int' + int_count +'""> <i class="fa fa-plus"></i></button></div>').click(function(){openInter()});
      int_count+=1;
      document.getElementById("words").value = "";
      
      charOrder.push(name);
      dialOrder.push(words);
      
      console.log(charOrder);
      console.log(dialOrder);
      
     }
    
    
 // INTERACTIONS

    // opening the interactions modal
    
    function openInter() {
      intmodal.style.display = "block";
        paper.setup(canvas);
         var tool = new paper.Tool();
        tool.onMouseDrag = function(event) {
          var hitResult = paper.project.hitTest(event.point, {segments: true, tolerance: 30, fill: true});
          if (hitResult && hitResult.item) {
             hitResult.item.position = event.lastPoint;
             console.log(hitResult);
          }
       }
        
    }
 
  
  // choosing which characters you want
  
      var selected_chars = document.getElementById("chosenchars");
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
       drawSticks();
      
    }
      
   //actually drawing the stick figures
      
  function drawSticks() {
       var current_x = 90;
       for(var j = 0; j < selected_chars_list.length; j++) { 
        stickmen = {};
        stickmen['stickman' + j] = new paper.Raster('stick'); 
        stickmen['stickman' + j].position = new paper.Point(current_x, 120);
        stickmen['stickman' + j].fillColor = char_color_dict[selected_chars[j]];
        stickmen['stickman' + j].scale(0.9);
        current_x += 120;
       }
    
      tool.onMouseDrag = function(event) {
          var hitResult = paper.project.hitTest(event.point, {segments: true, tolerance: 30, fill: true});
          if (hitResult && hitResult.item) {
             hitResult.item.position = event.lastPoint;
             console.log(hitResult);
          }
       }
  }
  
  
  
// MODALS
     
     
     var dialmodal = document.getElementById("myDialModal");
     var dialbtn = document.getElementById("dialbtn");
     var span1 = document.getElementById("close1");
     
     var intmodal = document.getElementById("myInteractionModal");
//      var intbtn = document.getElementById("intbtn");
     var span2 = document.getElementById("close2");
  
     var interactions = $( "div" ).find( ".interaction_actual" );//document.getElementsByClassName("interaction_actual");
     
     var charmodal = document.getElementById("myCharModal");
     var charbtn = document.getElementById("charbtn");
     var span3 = document.getElementById("close3");
  
     var charstickmodal = document.getElementById("myCharStickModal");
     var charstick = document.getElementById("charstick");
     var span4 = document.getElementById("close4");
     var closeplay = document.getElementById("closeplay");
     
     
     dialbtn.onclick = function() {
       dialmodal.style.display = "block";
      }
     
     charstick.onclick = function() {
       charstickmodal.style.display = "block";
      }
     
     $('div.interaction_actual').click(function() {
            intmodal.style.display = "block";
       openInter();
      });
  
     var savepos = document.getElementById("savepos");
     savepos.onclick = function() {
      var int_char_pos = {};
      console.log("STICKMEN DICT IS !!!!!!!");
      console.log(stickmen);
      for (var char = 0; char < selected_chars_list.length; char++) {
        int_char_pos[selected_chars_list[char]] = [stickmen['stickman' + char.toString()].position._x, stickmen['stickman' + char.toString()].position._y];
      }
      console.log(int_char_pos);
      all_interactions.push(int_char_pos);
      intmodal.style.display = "none";
       
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      
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
    
    closeplay.onclick = function() {
      playmodal.style.display = "none";
      $("#addchar").show(); 
      $("#charHelp").hide(); 
    }
    

})