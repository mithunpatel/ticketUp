	// Add business form data submission
		function submitAddbusinessdata(){
		 var bname=document.getElementById( "business_Name" ).value;
		 var email=document.getElementById( "businessUser_email" ).value;
		 var mobile=document.getElementById( "businessUser_mobile" ).value;
		 var name=document.getElementById( "businessUser_name" ).value;
		 var submitData={
		 	value:1,
		   businessname:bname,
		   email:email,
		   mobile:mobile,
		   name:name
		  };
		  // console.log(submitData);
		 $.post({
		  type: 'post',
		  crossDomain: true,
		  url: 'https://www.receptio.in/ticketup',
		  // contentType: "application/json; charset=utf-8",
		  data:submitData,
		  success: function (response) {

		   $('#postAddSubmit').html("Thank You! We will contact you shortly.");
		   // document.getElementById('addBusinessform').reset();
		   document.getElementById("addBusinessform").style.display = 'none';
		   // console.log(response);
		   // console.log(JSON.stringify(submitData));
		  }
		 }); 
		};
// Get business name after clicking claim business button and autofill businessName fild
		function display(argument) {
			// body...
			// debugger;
			var c=argument.parentNode.id;
			// console.log(c);
			document.getElementById("businessName").value=c;
		};
// Claim business form data submission
		function submitbusinessdata(){
		 var bname=document.getElementById( "businessName" ).value;
		 var email=document.getElementById( "businessUseremail" ).value;
		 var mobile=document.getElementById( "businessUsermobile" ).value;
		 var name=document.getElementById( "businessUsername" ).value;
		 var submitData={
		 	value:2,
		   businessname:bname,
		   email:email,
		   mobile:mobile,
		   name:name
		  };
		  // console.log(submitData);
		 $.post({
		  type: 'post',
		  crossDomain: true,
		  // contentType: "application/json; charset=utf-8",
		  // headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
    //         'Content-Type': 'application/json;charset=UTF-8',
    //         'access-control-allow-credentials' :true
			
    //     },
		  url: 'https://www.receptio.in/ticketup',
		  data:submitData,
		  success: function (response) {

		   $('#postClaimSubmit').html("Thank You! We will contact you shortly.");
		   // document.getElementById('clainBusinessform').reset();
		   document.getElementById("clainBusinessform").style.display = 'none';
		   // console.log(response);
		   // console.log(JSON.stringify(submitData));
		  }
		 }); 
		}
	