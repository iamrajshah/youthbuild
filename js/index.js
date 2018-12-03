jQuery(document).ready(function($) {
		 
		  $("#sendEmailButton").prop('disabled', true);
		  
		 
            var theme_slider = $("#owl-demo");
             $("#owl-demo").owlCarousel({
                 navigation: false,
                 slideSpeed: 300,
                 paginationSpeed: 400,
                 autoPlay: 6000,
                 addClassActive: true,
             //  transitionStyle: "fade",
                 singleItem: true
             });
             $("#owl-demo2").owlCarousel({
                slideSpeed: 300,
                autoPlay: true,
                navigation: true,
                navigationText: ["&#xf007","&#xf006"],
                pagination: false,
                singleItem: true
             });
        
             // Custom Navigation Events
             $(".next-arrow").click(function() {
                 theme_slider.trigger('owl.next');
             });
             $(".prev-arrow").click(function() {
                 theme_slider.trigger('owl.prev');
             }); 
			
			$("#sendEmailButton").click(function(){
				var email = $("#email").val();
				var name=$("#Name").val();
				var message=$("#message").val();
				
				
				if(email=="" || name=="" || message=="")
				{
					swal("Oops...", "Please fill all the fields !!!", "error");
					$("#sendEmailButton").prop('disabled', true);
					$("#sendEmailButton").addClass('enabledButton');
					return false;
				}
				
				var regexName = new RegExp("^[a-zA-Z]+$");
                if (!regexName.test(name)) {
                     swal("Oops...", "Number or special character not allowed in name !!!", "error");
					 $("#sendEmailButton").prop('disabled', true);
					$("#sendEmailButton").addClass('enabledButton');
                      return false;
                  }
				var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				 if (!regexEmail.test(email)) {
                     swal("Oops...", "Email is invalid !!!", "error");
					 $("#sendEmailButton").prop('disabled', true);
					$("#sendEmailButton").addClass('enabledButton');
                      return false;
                  }
				 //Call to php function			
				$.ajax({
					url:"SendEmail.php",
					type:"POST",
					data:{email:email,senderName:name,message:message},
					
					success: function(response){
						if(response=="Message sent!")
						{
								swal("Yeah...",name+" , Thanks your request submitted succesfully!!","success");
								$("#email").val("");
								$("#Name").val("");
								$("#message").val("");
						}
						else{
							swal("Oops...",name+" , Sorry!!  something went wrong!!","error");
								// $("#email").val("");
								// $("#Name").val("");
								// $("#message").val("");
						}
					}	
					
				})
				
				
			});
			
			$("#email").on("keydown", function(){
				
				var email = $("#email").val();
				  if (validateEmail(email)) {
					 $("#result").html("<i class='icon-check'></i>");
					 $("#result i").css("color", "green");
					$("#sendEmailButton").prop('disabled', false);
					$("#sendEmailButton").removeClass('enabledButton');
					// $("#result").focus();
					//call to php code
				  } else {
					$("#result").html("<i class='icon-cross_mark'></i>");
					$("#result i").css("color", "red");
					$("#sendEmailButton").prop('disabled', true);
					$("#sendEmailButton").addClass('enabledButton');
					//$("#contact").focus();
				  }
			});
			$("#email").on("change", function(){
				
				var email = $("#email").val();
				  if (validateEmail(email)) {
					 $("#result").html("<i class='icon-check'></i>");
					 $("#result i").css("color", "green");
					$("#sendEmailButton").prop('disabled', false);
					$("#sendEmailButton").removeClass('enabledButton');
					// $("#result").focus();
					//call to php code
				  } else {
					$("#result").html("<i class='icon-cross_mark'></i>");
					$("#result i").css("color", "red");
					
					$("#sendEmailButton").prop('disabled', true);
					$("#sendEmailButton").addClass('enabledButton');
					//$("#contact").focus();
				  }
			});
			
			   $("#Name").bind("keypress", function (event) {
              if (event.charCode!=0) {
                  var regex = new RegExp("^[a-zA-Z]+$");
                  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                  if (!regex.test(key)) {
                      event.preventDefault();
                      return false;
                  }
              }
          });
			
			// $("#Name").bind("keypress", function () {
             // var name=$("#Name").val();
			 // if(!validateName(name)){
				 // return false;
			 // }
         // });
			
			
        }); 
function validateEmail(email) {
  var re = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return re.test(email);
}
function validateName(name){
	var re=/^[A-Za-z]+$/;
	return re.test(name);
}