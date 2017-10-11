    // $(document).ready(function() {  

    //   var id = '#dialog';
        
    //   //Get the screen height and width
    //   var maskHeight = $(document).height();
    //   var maskWidth = $(window).width();
        
    //   //Set heigth and width to mask to fill up the whole screen
    //   $('#mask').css({'width':maskWidth,'height':maskHeight});

    //   //transition effect
    //   $('#mask').fadeIn(500); 
    //   $('#mask').fadeTo("slow",0.9);  
        
    //   //Get the window height and width
    //   var winH = $(window).height();
    //   var winW = $(window).width();
                    
    //   //Set the popup window to center
    //   $(id).css('top',  100);
    //   $(id).css('left', 0);
    //   $(id).css('right', 0);
        
    //   //transition effect
    //   $(id).fadeIn(2000);   
        
    //   //if close button is clicked
    //   $('.window .close').click(function (e) {
    //   //Cancel the link behavior
    //     e.preventDefault();

    //     $('#mask').hide();
    //     $('.window').hide();
    //     // confirmAge();
    //   });

    //   //if mask is clicked
    //   $('#mask').click(function () {
    //     $(this).hide();
    //     $('.window').hide();
    //   });

    //    });
      //  function confirmAge() {
      //     var id = '#ageConfirm';
        
      // //Get the screen height and width
      // var maskHeight = $(document).height();
      // var maskWidth = $(window).width();
        
      // //Set heigth and width to mask to fill up the whole screen
      // $('#mask').css({'width':maskWidth,'height':maskHeight});

      // //transition effect
      // $('#mask').fadeIn(500); 
      // $('#mask').fadeTo("slow",0.9);  
        
      // //Get the window height and width
      // var winH = $(window).height();
      // var winW = $(window).width();
                    
      // //Set the popup window to center
      // $(id).css('top',  winH/2-$(id).height());
      // $(id).css('left', 0);
      // $(id).css('right', 0);
        
      // //transition effect
      // $(id).fadeIn(2000);   
        
      // //if close button is clicked
      // // $('.window .close').click(function (e) {
      // // //Cancel the link behavior
      // //   e.preventDefault();

      // //   $('#mask').hide();
      // //   $('.window').hide();
        
      // // });

      // //if mask is clicked
      // // $('#mask').click(function () {
      // //   $(this).hide();
      // //   $('.window').hide();
      // // });
      //   } 
     
    // function ageConfirmation() {
    //   var userDob = document.getElementById("age").value;
    //   var dob = Date.parse(new Date(userDob));
      
    //   var age = ~~((Date.now() - dob) / (31557600000));
    //   console.log(age);
    //   if (age >= 21) {
    //     $('#mask').hide();
    //     $('.window').hide();
    //   }else{
    //     var warning = document.getElementById("ageWarning");
    //     warning.style.display = warning.style.display === 'none' ? '' : 'none';
    //   }
      // var year = Number(dob.substr(0, 4));
      // var month = Number(dob.substr(5, 2)) - 1;
      // var day = Number(dob.substr(7, 2));
      // var today = new Date();
      // var age = today.getFullYear() - year;
      // // console.log(month);
      // // console.log(Date.parse(dob));
      // if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      //   console.log(age);
      // }
    // }

function closePop() {
      // body...
      // console.log("shit again")
      // document.getElementById('#fadeformodal').css({opacity:none});
          angular.element('#ourstoryModal').removeClass('in');
          angular.element('#ourstoryModal').modal('hide');
    }
    function openNav() {
        document.getElementById("mySidenav").style.width = "260px";
        // document.getElementById("header").style.opacity = "0";
        // document.getElementById("main").style.marginLeft = "200px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
         // document.getElementById("header").style.opacity = "1";
         // document.getElementById("main").style.marginLeft = "0";
         document.body.style.backgroundColor = "#fff";
    }

    function goBack() {
    window.history.back();
}