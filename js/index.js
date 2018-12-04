jQuery(document).ready(function($) {
	var allMembersElements = '';
	var allDonorsElements = '';
	var allOurWork = '';
	var allScrollList = '';
	var allServices = '';
	var allPaymentType='';

	var jsonMembers = $.getJSON('json/donate.json', function (data) {
		data.donate.forEach(element => {
			//console.log(element);
			var payment = "<div class = 's-12 m-6 l-6'>"+
				"<div class='item'>" +
				"<h2>" + element.type + "</h2>" +
				"<img src='" + element.imageSrc + "' alt=''>" +
				"</div></div>";
			allPaymentType += payment

		});
		$('#paymentType').append(allPaymentType);
	});

	var jsonMembers = $.getJSON('json/services.json', function (data) {
		data.services.forEach(element => {
			//console.log(element);
			var service = "<div class='s-12 m-6 l-4 margin-bottom'>" +
				"<i class='" + element.icon + "'></i>" +
				"<div class='service-text'>" +
				"<h3>" + element.heading + "</h3>" +
				"<p>" + element.details + "</p>" +
				"</div></div>"
			allServices += service

		});
		$('#allServices').append(allServices);
	});
	
	var jsonMembers = $.getJSON('json/scrollItems.json', function (data) {
		data.scrollItems.forEach(element => {
			//console.log(element);
		var scrollItem = "<div class='item'>" +
          "<img src='" + element.imageSrc + "' alt=''>" +
          "<div class='line'>" +
          "<div class='text hide-s'>" +
          "<div class='line'>" +
          "<div class='prev-arrow hide-s hide-m'>" +
          "<i class='icon-chevron_left'></i>" +
          "</div>" +
          "<div class='next-arrow hide-s hide-m'>" +
          "<i class='icon-chevron_right'></i>"+
          "</div></div>"+
          "<h2>" + element.heading + "</h2>" +
          "<p>" + element.details + "</p>" +
            "</div></div></div>";
			allScrollList += scrollItem

		});
		//console.log(allScrollList);
		// $('#owl-demo').html(allScrollList);
	});

	var jsonMembers = $.getJSON('json/members.json',function(data){
	data.members.forEach(element => {
	//console.log(element);
	var member =  "<div class = 's-6 l-4 m-4 margin-bottom'>"+
		"<div class = 's-6 l-3 m-3 padding-right'>"+
			"<img src = '" + element.imageSrc + "'> </img> " +
			"</div> "+
			"<div class = 's-6 l-9 m-9 margin-bottom'	 style = 'padding-left: 0.3em;' >"+
		"<span> <strong > " + element.name + " </strong><br><br><p>" + element.role + "</p> </span> </div> </div>" ;
			allMembersElements += member
		
	});
	$('#membersList').append(allMembersElements);
	});

	var jsonDonors = $.getJSON('json/donor.json', function (data) {
		data.donors.forEach(element => {
		
			var member = "<div class = 's-12 l-4 m-4 margin-bottom'>" +
				"<div class = 's-12 l-3 m-3 padding-right'>" +
				"<img src = '" + element.imageSrc + "'> </img> " +
				"</div> " +
				"<div class = 's-12 l-9 m-9 margin-bottom'	 style = 'padding-left: 0.3em;' >" +
				"<span> <p> " + element.name + " </p><br><strong>" + element.rupees + "</strong> <br> "+
				"</div> </div>";
			allDonorsElements += member

		});
		$('#donorsList').append(allDonorsElements);
	});
	var jsonOurWork = $.getJSON('json/ourWork.json', function (data) {
		var header="<div class='tab-nav line'>";
		data.tabHeader.forEach(element => {
			header +="<a class='" + element.classA + "' href='" + element.href + "'>" + element.heading + "</a>" ;
		})
		header+="</div>";
		data.ourWork.forEach(element => {
			
		var work = "<div class='" + element.classDiv + "' id='" + element.id + "'>" +
		"<div class='tab-content'>"+
		"<div class='margin'>";

		element.tabContent.forEach(data => {
		work+="<div class='s-12 m-6 l-3'><a class='our-work-container lightbox margin-bottom'>"+
				"<div class='our-work-text'>"+
				"<h4>" + data.subHeading + "</h4>" +
				"<p>" + data.info + "</p>" +
				"</div><img src='" + data.imageSrc + "' alt=''></a></div>";
		});
		work += "</div></div></div>";
		allOurWork+=work;
		});
		
		//console.log(header + allOurWork);
		//$('#workList').append(header + allOurWork);
	});

	
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
				
				var regexName = /^[a-zA-Z ]*$/;
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
                  var regex =/^[a-zA-Z ]*$/;
                  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                  if (!regex.test(key)) {
                      event.preventDefault();
                      return false;
                  }
              }
          });
	
			
        }); 
function validateEmail(email) {
  var re = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return re.test(email);
}
