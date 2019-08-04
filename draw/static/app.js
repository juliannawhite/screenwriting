   $(document).ready(()=>{
     
     var url = window.location.href;     
    
     var catgories = ["Food", "Activities", "Transportation", "Misc."];
     // list of users
     // creates a  random user 
     var users = ["Alice","Bob", "Eve", "Jack", "Jill", "Carl", "Josh"];
     var user = users[Math.trunc(Math.random()*users.length)];
                                 
     var url_large = "http://sharedFinances-juliannawhite13758275.codeanyapp.com/draw/?size=large";
     var socket = new WebSocket('wss://sharedFinances-juliannawhite13758275.codeanyapp.com/ws/draw');
     var total_budget, food_amt, act_amt, tra_amt, misc_amt;
     
     // adding ability to get username
     
     var username;
     var homedone = document.getElementById("homedone");
     homedone.onclick = function() {
        // hide intro
        $('.hello').hide();
        username = document.getElementById("username").value;
        console.log(username);
       // show other elements
        //$(".title").show(); 
       // $("hr").show(); 
        //$('.flex-container').show();
        $('#submitForm').show();
        $('.hello1').show();
        $('.new-box').hide();
    }
     
     
     document.getElementById("submit").onclick = function() {sendInfo()};

    function sendInfo() {
      //amount
      var amt = document.getElementById("amount").value;
      
      //category
      var e = document.getElementById("category");
      var value = e.options[e.selectedIndex].value;
      var text = e.options[e.selectedIndex].text;
      
      console.log(value);
      console.log(amt);
      
      //send Info
      var info = {"user": user, "amount": amt, "category":value, "username": username};
      var infoJSON = JSON.stringify(info);
      socket.send(infoJSON);
      
      //confirmation of action                 
      alert("You have submitted your purchase!");                 
    }
     
     // displays log on large screen and adjusts budget likewise
     socket.onmessage = function(message) {
       info = JSON.parse(message.data);
       if (url.indexOf('?size=large') > -1) {
         var new_amt;
         $("#log").append("<div class='row log-box'><div class='col-12'>" + info.username + " spent $" + info.amount + " on "+ info.category + "<hr></div></div>");
         console.log(info.amount);
         console.log(info.category);
         if (info.category === 'Food'){
           new_amt = food_amt - info.amount;
           $(".food-div").text(function () {
             return $(this).text().replace(food_amt, new_amt); 
           });
           $(".food-div").prepend('<i class="fa fa-cutlery" aria-hidden="true"></i>');  // don't know why replace is removing this anyway adding this manually then
         }
         else if (info.category === 'Activities'){
           new_amt = act_amt - info.amount;
           $(".act-div").text(function () {
             return $(this).text().replace(act_amt, new_amt); 
           });
           $(".act-div").prepend('<i class="fa fa-bicycle" aria-hidden="true"></i>');
         }
         else if (info.category === 'Transportation'){
           new_amt = tra_amt - info.amount;
           $(".tra-div").text(function () {
             return $(this).text().replace(tra_amt, new_amt); 
           });
           $(".tra-div").prepend('<i class="fa fa-subway" aria-hidden="true"></i>');
         }
         else {
           new_amt = misc_amt - info.amount;
           $(".misc-div").text(function () {
             return $(this).text().replace(misc_amt, new_amt); 
           });
           $(".misc-div").prepend('<i class="fa fa-ellipsis-h" aria-hidden="true"></i>');
         }
         
       }  
    }
     
     // code for large screen
     if (url.indexOf('?size=large') > -1) {
         $("#submitForm").hide(1);
         $(".finalize-btn").hide(1);
         $('.input-for-amounts').hide(1); 
         $('.screen').hide(1); 
         $('.hello').hide(1);
         $('.hello1').hide(1);
       
         var info;
          
         $(".plan-btn").on('click', () => {
           // show input fields
           $('.input-for-amounts').toggle();
           // show finalize button 
           $('.finalize-btn').toggle();
         });
       
          
         // finalize button functionality
         $('.finalize-btn').on('click', () =>{
           food_amt = $('#food-amount').val();
           act_amt = $('#act-amount').val();
           tra_amt = $('#tra-amount').val();
           misc_amt = $('#misc-amount').val();
           total_budget = food_amt + act_amt + tra_amt + misc_amt;
           console.log("recognized click");
           $('.input-for-amounts').hide();
           $('.finalize-btn').hide();
           $('.food-div').append(food_amt);
           $('.act-div').append(act_amt);
           $('.tra-div').append(tra_amt);
           $('.misc-div').append(misc_amt);
           
         });

          
     }
     
     // code for small screens
     if (!(url.indexOf('?size=large') > -1)) {
         $(".userBtn").hide(1);
         $(".plan-btn").hide(1);
         $('.input-for-amounts').hide(1); 
       
//          css("font-size","150px");
         $(".title").hide(); 
         $(".title1").hide(); 
         $("hr").hide(); 
         $('.finalize-btn').hide();
         $('.flex-container').hide(); 
         $('#submitForm').hide();
         $('.hello1').hide();
         $('.new-box').hide();
         $('.container-fluid').hide();
        
     }
     
      var instmodal = document.getElementById("myInstModal");
      var instbtn = document.getElementById("inst");
      var span1 = document.getElementById("close1");
     
      var usermodal = document.getElementById("myUserModal");
      var userbtn = document.getElementById("userbtn");
      var span2 = document.getElementById("close2");
     
      span1.onclick = function() {
      instmodal.style.display = "none";
    }
      
      span2.onclick = function() {
      usermodal.style.display = "none";
    }
     
      instbtn.onclick = function() {
       instmodal.style.display = "block";
      }
      userbtn.onclick = function() {
        usermodal.style.display = "block";
      }
      
      window.onclick = function(event) {
        if (event.target === instmodal) {
          instmodal.style.display = "none";

        }
        if (event.target === usermodal) {
          usermodal.style.display = "none";

        }
      }
  
  
   })