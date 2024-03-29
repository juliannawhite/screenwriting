$(document).ready(()=>{
     
     var url = window.location.href;
     var url_large = "http://screenwriting-juliannawhite13758275.codeanyapp.com/draw/?size=large";
  
     var charList = ["Debug Character"];
     var int_count = 1;
     var charOrder = [];
     var dialOrder = [];
     var stickmen = {};
     var char_color_dict = {};
     var chosen_color = "black";
  
     var select_char_dict = {};
     var selected_chars_list = [];
  
     var all_interactions = {};
     var top_interactions = {};
     var most_recent_inter = 0;
  
     var front_view_play = true;
  
     var canvas = document.getElementById('myCanvas2');
     paper.setup(canvas);
  
     var topLayer = new paper.Layer();
     var frontLayer = new paper.Layer();
     var selectedFigure;
  
     var playbackLayer;
  
//      var test= document.getElementById("test");
//      test.onclick = function() {
//            test.fill = "blue";
        
//         }
     

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
//      if (!(url.indexOf('?size=large') > -1)) {
//         $
        $("#toggle_off_btn").hide();
        $("#toggle_off_btn2").hide();
        $("#toggle_on_btn2").hide();
        $("#charhelp").hide(); 
        $(".large").hide();
        $(".real").hide();
        //$(".real").show();
       // console.log("here");
        //$(".starter").hide(); // here
        $(".starter").show();
       
        $(".stageimg").hide();
        getColorsCreatePalette();
       console.log("hm");
        
       //$("#myCanvas2").show();
       
//       }
  
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
       $("#characters").append('<button class="colorBtn2" style="background-color:' + chosen_color + '"></button>&nbsp'+ newcharname + '<br><br>');
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
      play.onclick = async function() {
      $("#toggle_on_btn2").show();
      $("#toggle_off_btn2").hide();
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      intmodal.style.display = "block";
      $("#myCanvas2").show();
      $('#toggle_on_btn').hide();
      $('#toggle_off_btn').hide();
      $('#charstick').hide();
      $('#savepos').hide();
      $('#dragmsg').hide();
      $('.word_area').show();
      topLayer.visible = false;
      frontLayer.visible = false;
      playbackLayer = new paper.Layer();
      playbackLayer.activate();
      playbackLayer.visble = true;
      
      if (!front_view_play) {
        alert("you want the top down view");
      } else {
        
      for (var line = 0; line <= charOrder.length; line++) { // will eventually need to make this <=
        
        if (line in Object.keys(all_interactions)) { // need to change the stick figures
          //clear
          const context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height);
          
          paper.project.activeLayer.removeChildren();
          
          var stick_list = all_interactions[line];
          var stick;
          var num = 0;
          var position_stickmen = {};
          for (stick in stick_list) {
            console.log("saving stick as" + stick);
            var saved_x_position = stick_list[stick][0];
            var saved_y_position = stick_list[stick][1];
            position_stickmen[num] = new paper.Raster('stick'); 
            position_stickmen[num].position = new paper.Point(saved_x_position, saved_y_position);
            num+=1;
            
          }
          //await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        if (line < charOrder.length) {
        
        $(".word_area").empty();
        $(".word_area").css("color", char_color_dict[charOrder[line]]);
        $(".word_area").append('<p>'+ dialOrder[line] + '</p>');
        await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
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
        var imgUrl =  document.getElementById("stage").value;
        $("#title-here").append(title);
        document.getElementById("add-blocking").style.backgroundImage = "url(" + imgUrl + ")";
        document.getElementById("add-blocking").style.backgroundPosition = "center center";
    }
  

  
  // adding dialogue
     
    enter.onclick = function() {
      dialmodal.style.display = "none";
      
      var e = document.getElementById("charnamesel");
      var name = e.options[e.selectedIndex].value;
      e.selectedIndex = -1;       
      var words = document.getElementById("words").value;
     
      $(".script").append('<div class = "row title dialogue"> <div class = "col-12">' + name + ": <a>" + words + '</a></div></div>');
      $('<div class="interaction_actual get_val" value="'+int_count+'"><button class="btn" value="' + int_count + '" id="int' + int_count +'""> <i class="fa fa-plus"></i></button></div>').appendTo(".script").click(function(){openInter($(this).attr('value'))});

      console.log(int_count)
      int_count+=1;
      document.getElementById("words").value = "";
            
      charOrder.push(name);
      dialOrder.push(words);
  
      
     }
    
    
 // INTERACTIONS

    // opening the interactions modal
    

    
    function openInter(intnumber) {
        console.log("one call");
        most_recent_inter = intnumber;

      
        intmodal.style.display = "block";
        //context.clearRect(0, 0, canvas.width, canvas.height);
        $("#myCanvas2").show();
        $('#toggle_on_btn').show();
        $('#toggle_off_btn').hide();
        $('#charstick').show();
        $('#savepos').show();
        $('#dragmsg').show();
        $('.word_area').hide();
        $("#toggle_off_btn2").hide();
        $("#toggle_on_btn2").hide();
      
        paper.setup(canvas);
        topLayer = new paper.Layer();
        frontLayer = new paper.Layer();
         
        console.log("interaction button number" + most_recent_inter);
        console.log("my int number was" + intnumber);
      
         var tool = new paper.Tool();
         tool.onMouseDown = function(event) {
           var hitResult = paper.project.hitTest(event.point, {segments: true, tolerance: 15, fill: true});
           if (hitResult && hitResult.item) {
             if (selectedFigure && selectedFigure.selected) {
                selectedFigure.selected = false;
             }
             selectedFigure = hitResult.item;
             selectedFigure.selected = true;
           }
         }
         tool.onMouseDrag = function(event) {
          //console.log("boogaloo"); // mainly happening here
          var hitResult = paper.project.hitTestAll(event.point, {segments: true, tolerance: 15, fill: true});
          var hitItem;
          if (!hitResult) {
             return;
           }
          for (var i = 0; i < hitResult.length; i++) {
            if (hitResult[i] && hitResult[i].item) {
               if (hitResult[i].item.selected) { 
                 hitItem = hitResult[i].item;
                 break; 
               }
            }
          }
          if (hitItem) {
              hitItem.position.x = event.lastPoint.x;
              hitItem.scale(1 - (event.delta.y/200)); //there may be a better way to do this but it seems to work fine
              //topLayer.visible = true; // basically all you need to do for view change is hide one of the layers, it all works identically
              topLayer.activate();
              hitItem.data.head.position = event.lastPoint;
              frontLayer.activate(); 
          }
       }
        
    }
  
   var int0 = document.getElementById("int0");
    int0.onclick = function() {
      openInter($(this).attr('value'));
   }
  
    // toggle buttons
  
    var toggle_on = document.getElementById("toggle_on_btn");
    toggle_on.onclick = function() { // switch to top-down
      $("#toggle_off_btn").show();
      $("#toggle_on_btn").hide();
      
      topLayer.visible = true;
      frontLayer.visible = false;
    }
    
    var toggle_on2 = document.getElementById("toggle_on_btn2");
    toggle_on2.onclick = function() { // switch to top-down
      $("#toggle_off_btn2").show();
      $("#toggle_on_btn2").hide();
      front_view_play = false;
      
//       topLayer.visible = true;
//       frontLayer.visible = false;
    }
    
    var toggle_off = document.getElementById("toggle_off_btn");
     toggle_off.onclick = function() { // switch to front view
       console.log("pressed off");
       $("#toggle_off_btn").hide();
       $("#toggle_on_btn").show();
       
       topLayer.visible = false;
       frontLayer.visible = true;
     }
     
    var toggle_off2 = document.getElementById("toggle_off_btn2");
     toggle_off2.onclick = function() { // switch to front view
       $("#toggle_off_btn2").hide();
       $("#toggle_on_btn2").show();
       front_view_play = true;
       //topLayer.visible = false;
       //frontLayer.visible = true;
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
      drawSticks();
      
    }
      
   // actually drawing the stick figures
      
  function drawSticks() {
       stickmen = {};
       var current_x = 90;
       for(var j = 0; j < selected_chars_list.length; j++) { 
          frontLayer.activate();
          stickmen['stickman' + selected_chars_list[j]] = new paper.Raster('stick'); 
          
          stickmen['stickman' + selected_chars_list[j]].position = new paper.Point(current_x, 250);
          var name = Object.keys(char_color_dict)[j];
          stickmen['stickman' + selected_chars_list[j]].fillColor = char_color_dict[name];
          console.log("dictionary is" + char_color_dict);
          console.log("weird color " + char_color_dict[name]);

          topLayer.activate();
          stickmen['stickman' + selected_chars_list[j]].data.head = new paper.Raster('stick'); 
          stickmen['stickman' + selected_chars_list[j]].data.head.position = new paper.Point(current_x, 250);
          stickmen['stickman' + selected_chars_list[j]].data.head.scale(0.3);
          stickmen['stickman' + selected_chars_list[j]].data.head.fillColor = char_color_dict[name];
          current_x += 120;
          topLayer.visible = false;
          frontLayer.visible = true;
          frontLayer.activate();
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
     
//      $('.interaction_actual').click(function() {
//             intmodal.style.display = "block";
//        openInter();
//       });
  
     var savepos = document.getElementById("savepos");
     savepos.onclick = function() {
     var int_char_pos = {};
     var int_char_top = {};
      
     for (var char = 0; char < selected_chars_list.length; char++) {
        int_char_pos[selected_chars_list[char]] = [stickmen['stickman' + selected_chars_list[char]].position._x, stickmen['stickman' + selected_chars_list[char]].position._y];
        int_char_top[selected_chars_list[char]] = [stickmen['stickman' + selected_chars_list[char]].data.head.position._x, stickmen['stickman' + selected_chars_list[char]].data.head.position._y];
      }
      all_interactions[most_recent_inter] = int_char_pos;
      top_interactions[most_recent_inter] = int_char_top;
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
      $("#toggle_off_btn2").hide();
      $("#toggle_on_btn2").hide();
    }
    

})