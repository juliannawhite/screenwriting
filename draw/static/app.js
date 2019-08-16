$(document).ready(()=>{
     
     var url = window.location.href;
     var url_large = "http://screenwriting-juliannawhite13758275.codeanyapp.com/draw/?size=large";
  
     var charList = [];
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
     var posLayers = {};
     var topLayers = {};
     var all_heads = {};
     var all_sticks = {};
  
     var front_view_play = true;
  
     var canvas = document.getElementById('myCanvas2');
     paper.setup(canvas);
  
     var playbackLayer = new paper.Layer();
     playbackLayer.visible = false;
     var topLayer = new paper.Layer();
     var frontLayer = new paper.Layer();
     frontLayer.activate();
    
     var selectedFigure;
     var stickObj;
  
     var isTopView = false;
     topLayer.visible = false;
     frontLayer.visible = true;
     var svStr = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiCgkgaWQ9InN2ZzIiIHhtbG5zOmNjPSJodHRwOi8vd2ViLnJlc291cmNlLm9yZy9jYy8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTcwIDI0MCIKCSBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNzAgMjQwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MztzdHJva2UtbWl0ZXJsaW1pdDoxMDt9Cjwvc3R5bGU+Cjxzb2RpcG9kaTpuYW1lZHZpZXcgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IiBib3JkZXJvcGFjaXR5PSIxLjAiIGdyaWR0b2xlcmFuY2U9IjEwMDAwIiBndWlkZXRvbGVyYW5jZT0iMTAiIGhlaWdodD0iMjQwcHgiIGlkPSJiYXNlIiBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjIiIGlua3NjYXBlOmN4PSI1NC42NzY0NzIiIGlua3NjYXBlOmN5PSI5Ny40OTk5OTIiIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIgaW5rc2NhcGU6Z3JpZC1wb2ludHM9ImZhbHNlIiBpbmtzY2FwZTpndWlkZS1wb2ludHM9ImZhbHNlIiBpbmtzY2FwZTpvYmplY3QtYmJveD0idHJ1ZSIgaW5rc2NhcGU6b2JqZWN0LW5vZGVzPSJ0cnVlIiBpbmtzY2FwZTpvYmplY3QtcG9pbnRzPSJ0cnVlIiBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIiBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI2OTMiIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTAyNCIgaW5rc2NhcGU6d2luZG93LXg9IjAiIGlua3NjYXBlOndpbmRvdy15PSIyNSIgaW5rc2NhcGU6em9vbT0iMi40NTY0MTA0IiBvYmplY3R0b2xlcmFuY2U9IjEwIiBwYWdlY29sb3I9IiNmZmZmZmYiIHNob3dncmlkPSJmYWxzZSIgd2lkdGg9IjE3MHB4Ij4KCTwvc29kaXBvZGk6bmFtZWR2aWV3Pgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAyLjQsMTMwLjdsMTMuNSw4NS44bC0zMS41LTQxLjdsLTI4LjYsNDEuN2w5LjgtODUuN2wtMzQuMiw2LjhsNDEuMS00OS4yYy03LjYtNi42LTEyLjctMTkuMy0xMi43LTMzLjcKCWMwLTIxLjMsMTAuOS0zMC44LDI0LjctMzAuOHMyNSw5LDI1LDMwLjRjMCwxMy43LTQuNSwyNS43LTExLjUsMzIuNWw0MS4yLDU0LjRMMTAyLjQsMTMwLjd6Ii8+Cjwvc3ZnPgo=";

  
  
  //sleep fn from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/39914235#39914235
  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
     

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

        $("#toggle_off_btn").hide();
        $("#toggle_off_btn2").hide();
        $("#toggle_on_btn2").hide();
        $("#charhelp").hide(); 
        $(".large").hide();
        //$(".real").hide();
        $(".real").show();
       // console.log("here");
        $(".starter").hide(); // here
        //$(".starter").show();
       
        $(".stageimg").hide();
        getColorsCreatePalette();
      
  
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
       $("#characters").append('<button class="colorBtn2" style="background-color:' + chosen_color + '"></button>&nbsp'+ newcharname + '<br><br>');
       document.getElementById("newcharinput").value = "";
       
       charList.push(newcharname);
       
       $(".form").append('<option value="'+ newcharname + '">' + newcharname +'</option>');
       
       $("#addchar").show(); 
       $("#charHelp").hide(); 
       
       char_color_dict[newcharname] = new paper.Color(chosen_color);
       
       $("#charchoose").append('<label class="container"><input type="checkbox" checked="checked" value="' + newcharname + '"><span class="checkmark"></span>' + newcharname + '</label> <br>')
     };
       
// playback button
     
     var play = document.getElementById("play");
     var playmodal = document.getElementById("myPlayModal");
  play.onclick = async function() {
      $("#toggle_on_btn2").show();
      $("#toggle_off_btn2").hide();
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
      var contextN = paper.project.importSVG(svStr, function(item) {
        stickObj = item._children[1];
        stickObj.visible = false;
        stickObj.remove();
    });
    var templateObj = stickObj;
    var raster;
      for (var line = 0; line <= charOrder.length; line++) { // will eventually need to make this <=
        
        if (line in Object.keys(all_interactions)) { // need to change the stick figures
          playbackLayer.removeChildren();
          playbackLayer = new paper.Layer();
          var colorSticks = all_sticks[line];
          var colorHeads = all_heads[line];
          var currLst;
          var stick;
          var num = 0;
          var position_stickmen = {};
            if (!front_view_play) {
              currLst= colorHeads;
            } else {
              currLst = colorSticks;
            }
          for (stick in colorSticks) {
            console.log("saving stick as" + stick);
            position_stickmen[num] = currLst[stick].clone();
            position_stickmen[num].visible = true;
            position_stickmen[num].selected = false;
            position_stickmen[num].addTo(playbackLayer);
            num+=1;
          }
          
        }
        
        if (line < charOrder.length) {
        
        $(".word_area").empty();
        $(".word_area").css("color", char_color_dict[charOrder[line]]);
        $(".word_area").append('<p>'+ dialOrder[line] + '</p>');
        await new Promise(resolve => setTimeout(resolve, 1500));
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

      console.log(int_count + "-enter.onclick-");
      int_count+=1;
      document.getElementById("words").value = "";
            
      charOrder.push(name);
      dialOrder.push(words);
  
      
     }
    
    
 // INTERACTIONS

    // opening the interactions modal
    

    
    function openInter(intnumber) {
        console.log("one call -openInter-");
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
        var prevLayer = paper.project.activeLayer;
        topLayer.visible = false;
        frontLayer.visible = false;
        prevLayer.visible = true;
        
        topLayer = new paper.Layer();
        frontLayer = new paper.Layer();
        console.log("-openinter- interaction button number" + most_recent_inter);
        console.log("-openinter my int number was" + intnumber);
      
         var tool = new paper.Tool();
         tool.onMouseDown = function(event) {
           var hitResult = paper.project.hitTest(event.point, {segments: true, tolerance: 15, fill: true});
           if (hitResult && hitResult.item) {
             if (selectedFigure && selectedFigure.fullySelected) {
                selectedFigure.fullySelected = false;
             }
             selectedFigure = hitResult.item;
             selectedFigure.fullySelected = true;
           }
         }
         tool.onMouseDrag = function(event) {
          var hitResult = paper.project.hitTestAll(event.point, {segments: true, tolerance: 40, fill: true});
          var hitItem;
          if (!hitResult) {
             return;
           }
          for (var i = 0; i < hitResult.length; i++) {
            if (hitResult[i] && hitResult[i].item) {
               if (hitResult[i].item.fullySelected) { 
                 hitItem = hitResult[i].item;
                 break; 
               }
            }
          }
           var scaleBy;
          if (isTopView) {
            if (hitItem) { //topview
              hitItem.position = event.lastPoint;
              
              
              frontLayer.activate();
              
              var front = hitItem.data.stickSelf;
              scaleBy = 1 + (event.delta.y/200);
              front.scale(scaleBy); //recursive refereces//at original position (midline) the scale is 250, it goes up or down
              front.data.scaling *= scaleBy;
              front.position.x = event.lastPoint.x;
              
              topLayer.activate(); 
            }   
          } else {
            if (hitItem) { //frontview
              scaleBy = 1 + (event.delta.y/200);
              hitItem.position.x = event.lastPoint.x;
              hitItem.scale(scaleBy);
              hitItem.data.scaling *= scaleBy;
              
              topLayer.activate();
              
              var top = hitItem.data.head;
              top.position.x = hitItem.position.x;
              top.position.y = hitItem.data.scaling;
              
              frontLayer.activate(); 
            }
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
      isTopView = true;
    }
    
    var toggle_on2 = document.getElementById("toggle_on_btn2");
    toggle_on2.onclick = function() { // switch to top-down
      $("#toggle_off_btn2").show();
      $("#toggle_on_btn2").hide();
      front_view_play = false;
    }
    
    var toggle_off = document.getElementById("toggle_off_btn");
     toggle_off.onclick = function() { // switch to front view
       console.log("pressed off");
       $("#toggle_off_btn").hide();
       $("#toggle_on_btn").show();
       
       topLayer.visible = false;
       frontLayer.visible = true;
       isTopView = false;
     }
     
    var toggle_off2 = document.getElementById("toggle_off_btn2");
     toggle_off2.onclick = function() { // switch to front view
       $("#toggle_off_btn2").hide();
       $("#toggle_on_btn2").show();
       front_view_play = true;
     }
  
  
  
 
  
  // choosing which characters you want
  
      var selected_chars = document.getElementById("chosenchars");
      selected_chars.onclick = function() {
      selected_chars_list = [];
      var charcheck = document.forms[0];
      for (var i = 0; i < charcheck.length; i++) {
        if (charcheck[i].checked) {
          selected_chars_list.push(charcheck[i].value);
          console.log("-selectedchars-" + selected_chars_list);
        }
      }
      charstickmodal.style.display = "none";
      drawSticks();
      
    }
      ///https://www.base64-image.de/
   // actually drawing the stick figur
  var contextN = paper.project.importSVG(svStr, function(item) {
    stickObj = item._children[1];
    stickObj.visible = false;
    stickObj.remove();
});
  function drawSticks() {
    stickmen = {};
       var current_x = 90;
       for(var j = 0; j < selected_chars_list.length; j++) { 
         frontLayer.activate(); 
         var stick = stickObj.clone();
         var scaleVar = 250;
         stick.visible = true;
         stick.addTo(frontLayer);
          stickmen['stickman' + selected_chars_list[j]] = stick;
          stickmen['stickman' + selected_chars_list[j]].position = new paper.Point(current_x, 250);
          var name = Object.keys(char_color_dict)[j];
          stickmen['stickman' + selected_chars_list[j]].fillColor = char_color_dict[name];
         stickmen['stickman' + selected_chars_list[j]].strokeColor = "black";
         stickmen['stickman' + selected_chars_list[j]].data.scaling = 0.0 + scaleVar;

          topLayer.activate();
          stick.data.head = new paper.Path.Circle( new paper.Point(current_x, scaleVar), 30); 
          stickmen['stickman' + selected_chars_list[j]].data.head.fillColor = char_color_dict[name];
         stickmen['stickman' + selected_chars_list[j]].data.head.strokeColor = "black";
         stickmen['stickman' + selected_chars_list[j]].data.head.data.stickSelf = stickmen['stickman' + selected_chars_list[j]]; //recursive lol
          current_x += 120;
       }
          frontLayer.activate();
          topLayer.visible = false;
          frontLayer.visible = true;
          isTopView = false;
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
         var colorSticks = {};
         var colorHeads = {};
         var prevLayer = paper.project.activeLayer;
         var prevVis = prevLayer.visible;
         var prevFront = frontLayer.visible;
         var prevTop = topLayer.visible;
        //playbackLayer.activate();
         //frontLayer.visible = true;
         //var currLayerClone = frontLayer.rasterize(false); //really hacky first soln for playback, will want to change most likely if there is time to get tween etc.
         //topLayer.visible = true; 
        //var currTopLayerClone = topLayer.rasterize(false); 
         //currLayerClone.visible = false;
         //currTopLayerClone.visible = false;
         //topLayers[most_recent_inter] = currLayerClone;
         //posLayers[most_recent_inter] = currTopLayerClone;
         //topLayer.visible = prevFront;
         //frontLayer.visible = prevTop;
       
         for (var char = 0; char < selected_chars_list.length; char++) {
            int_char_pos[selected_chars_list[char]] = [stickmen['stickman' + selected_chars_list[char]].position._x, stickmen['stickman' + selected_chars_list[char]].position._y];
            int_char_top[selected_chars_list[char]] = [stickmen['stickman' + selected_chars_list[char]].data.head.position._x, stickmen['stickman' + selected_chars_list[char]].data.head.position._y];
            colorSticks[selected_chars_list[char]] = stickmen['stickman' + selected_chars_list[char]].clone();
            colorHeads[selected_chars_list[char]] = stickmen['stickman' + selected_chars_list[char]].data.head.clone();
         }
          all_interactions[most_recent_inter] = int_char_pos;
          top_interactions[most_recent_inter] = int_char_top;
          all_sticks[most_recent_inter] = colorSticks;
          all_heads[most_recent_inter] = colorHeads
          intmodal.style.display = "none";
          //const context = canvas.getContext('2d');
          //context.clearRect(0, 0, canvas.width, canvas.height);
        };
     
     
     
     
     
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