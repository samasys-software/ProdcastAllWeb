
$(document).ready(function() 
{
	//var baseUrl = "http://ec2-52-91-5-22.compute-1.amazonaws.com:8080";
		
		var baseUrl = "../..";
		var logoutUrl="";
		
	/* Global Variable Declaration Begins*/
		
		var userUrl=window.location.href.replace(window.location.hash,'');
		var country="";
		var confirmationId="";
		var mobilePhone="";
		var registrationMap="";
		var UpdateNewCustMap="";
		var loginMap="";
		var allDistributorMap="";
		var distributorMap="";
		var distributorsPublicMap="";
		var accessId="";
		var employeeId="";
		var customerType="";   
		var selectedBill = "";
		var customerDetailsMap="";
		var allCustomerDetails="";
		var cellPhone="";
		var customerId="";
		var openCustomerId="";
		var currency = "";
		var showEditRegistration="";
		var timezoneMap="";
		var newPinnumber="";
		var productId="";
		var oldPinnumber="";
		var distributorId="";
		var userRole="";
		var format = "YYYY-MM-DD";
		var delimiter = "-";
		var myDateFormat = "#DD#/#MM#/#YYYY#";
		var customerActive=true;
		var newcustomerSmsAllow=true;
		var editcustomerSmsAllow=true;
		var cloneResponse="";
		var gid = new Array();
		var entries = [];
		gid.push("1");
		var productList=[];
		var productDisplay =[];
		var productMap=[];
		var saveNewCustMap="";
		var accessId=localStorage.getItem("accessId");

		function getLoginKey()
		{
			var loginkey=localStorage.getItem("ProdcastCustomerLogin");
			
			if(loginkey != null)
			{

				window.location.href=window.location.href.replace(window.location.hash,"#distributorScreen");

			}
			else
			{
				window.location.href = userUrl;
			}
		}
		
		/*if(  $(location).attr("href").endsWith("#distributorScreen") || $(location).attr("href").endsWith("/") )
		{
			getLoginKey();
		}*/
		
		//if(  $(location).attr("href").endsWith("#home") || $(location).attr("href").endsWith("#order") || $(location).attr("href").endsWith("#order-new") || $(location).attr("href").endsWith("#review") || $(location).attr("href").endsWith("#billdetailspage") || $(location).attr("href").endsWith("#report") || $(location).attr("href").endsWith("#editCustomerRegistrationDetails") || $(location).attr("href").endsWith("#changePinScreen") || $(location).attr("href").endsWith("#order-search") )
		
		if(  $(location).attr("href").indexOf("#") > -1)	
		{
			
			getLoginKey();
		}
		
		/*if($(location).attr("href").endsWith("#customerRegister") || $(location).attr("href").endsWith("#newCustomerRegistration") || $(location).attr("href").endsWith("#pinScreen"))
		{
			window.location.href = userUrl;
		}*/
		
		function stringToDate(_date)
		{
			var formatLowerCase=format.toLowerCase();
			var formatItems=formatLowerCase.split(delimiter);
			var dateItems=_date.split(delimiter);
			var monthIndex=formatItems.indexOf("mm");
			var dayIndex=formatItems.indexOf("dd");
			var yearIndex=formatItems.indexOf("yyyy");
			var month=parseInt(dateItems[monthIndex]);
			month-=1;
			var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
			return formatedDate.customFormat(myDateFormat);
		}
			
		$.ajax({
		type: 'GET',
		url: baseUrl+'/prodcast/global/getCountries',
		dataType: 'json',
		encode: true,
		success: function(response) 
		{

			if (response.error) 
			{
				alertmessage(response.errorMessage);
			} else 
			{
				countryMap = response.result;
				timezoneMap=response.timezones;
				for (counter = 0; counter < countryMap.length; counter++) 
				{
					$('#country').append('<option value="' + countryMap[counter].countryId + '">' + countryMap[counter].countryName.trim().toUpperCase() + '</option>');                                    
					$('#LoginCountry').append('<option value="' + countryMap[counter].countryId + '">' + countryMap[counter].countryName.trim().toUpperCase() + '</option>'); 
					$('#customer_country').append('<option value="' + countryMap[counter].countryId + '">' + countryMap[counter].countryName.trim().toUpperCase() + '</option>');
					$('#editcustomer_country').append('<option value="' + countryMap[counter].countryId + '">' + countryMap[counter].countryName.trim().toUpperCase() + '</option>');                                    			
				
				}
				$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?').done (function(location)
				{
					for (counter = 0; counter < countryMap.length; counter++)
					{
						country = countryMap[counter];
						
						if ( location.country_code == country.countryId ) 
						{ 
							$('#LoginCountry option:eq('+counter+')').attr('selected', 'selected');
							$('#country option:eq('+counter+')').attr('selected', 'selected');
							$('#customer_country option:eq('+counter+')').attr('selected', 'selected');
							$('#editcustomer_country option:eq('+counter+')').attr('selected', 'selected');
							
						}
						
					}
				});
			}
		}
		});

		function selectDistributor(customerDetailsMap)
		{
			customerId=customerDetailsMap.customerId;
			employeeId=customerDetailsMap.employeeId;
			distributorId=customerDetailsMap.distributor.distributorId;
			customerType=customerDetailsMap.customerType;
			userRole=customerDetailsMap.userRole;
			currency = customerDetailsMap.distributor.currencySymbol;
			openToPublic=customerDetailsMap.distributor.openToPublic;
			localStorage.setItem("currency",currency);
			$(".distcurrency").html(currency);
			localStorage.setItem("customerSwitchDistributor", JSON.stringify(customerDetailsMap));
			var distributorName = customerDetailsMap.distributor.companyName ;
			$('.DistributorName').html(distributorName);

			localStorage.setItem("customerId",customerId);
			localStorage.setItem("employeeId",employeeId);
			localStorage.setItem("customerType",customerType);
			localStorage.setItem("distributorId",distributorId);		
			

		}
			
		function viewDistributors(allDistributorMap)
		{		
			distributorMap=allDistributorMap.distributors;
			distributorsPublicMap=allDistributorMap.distributorsPublic;
			
			if(distributorMap!=null)
			{
				if((distributorMap== null || distributorMap.length < 1)  &&  (distributorsPublicMap == null || distributorsPublicMap.length < 1))
				{
					alertMessage("You do not have any Distributor associated in PRODCAST at the moment");
				}
				else
				{	
					$('#distributorsList').empty();
					$('#distributor').empty();

					var sno=0;
					for ( counter= 0; counter < distributorMap.length; counter++) 
					{
						sno++;	 
						newRow = '<li class="salesmenu"><a class="switchDistributors" id="'+distributorMap[counter].distributorId+'"><div class="icon-box"><img src="images/'+distributorMap[counter].logo+'" alt="" class="hvr-bounce-in"></div><label>'+distributorMap[counter].companyName+'</label></a></li>';
						 
						$('#distributorsList').append(newRow);

					}
					for (counter = 0; counter < distributorsPublicMap.length; counter++) 
					{
						sno++;
						newRow = '<li class="salesmenu"><a class="switchDistributors" id="'+distributorsPublicMap[counter].distributorId+'"><div class="icon-box"><img src="images/'+distributorsPublicMap[counter].logo+'" alt="" class="hvr-bounce-in"></div><label>'+distributorsPublicMap[counter].companyName+'</label></a></li>';
						 
						$('#distributorsList').append(newRow);
					}
				}
			}
		}
		
		function customerLogout(){
			accessId="";
			$('#LoginUserId').val("");
			$('#LoginPassword').val("");
			$('#LoginCountry').val("");
			
			if(accessId=="")
			{
				localStorage.removeItem("customerId");
				localStorage.removeItem("distributorId");
				localStorage.removeItem("employeeId");
				localStorage.removeItem("ProdcastCustomerLogin");
				localStorage.removeItem("customerSwitchDistributor");
				localStorage.removeItem("cellPhone");
			}
			
			window.location.href = userUrl;
		}

		
		function goBack() 
		{
			window.history.back();
		}
			
		function alertMessage(message)
		{
			$('#message').html( message );
			
			$("#dialog").dialog({
			   modal: true,
			   draggable: false,
			   resizable: false,
			   position: ['center'],
			   show: 'blind',
			   hide: 'blind',
			   width: 'auto',
			   height: 'auto',
			   dialogClass: 'ui-dialog-osx',
			});
		
			$(document).delegate('#ok', 'click', function(evt)
			{
				$('#dialog').dialog("close");
			});
		}

		$(".numericwithoutnegative").keydown(function(e) 
		{
			if(!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 8)) 
			{
				return false;
			}
		});
			
		$(".allownumericwithoutdecimal").on("keypress keyup blur",function (event) 
		{ 
			if ((event.which < 48 || event.which > 57)) 
			{
				event.preventDefault();
			}
		});
			
		$(".distcurrency").html(currency);
		
		$('#fillMessage').hide();
		$('#pinMatch').hide();
		$('#pinValidate').hide();
				
	/* Global Variable Declaration Ends*/
		
	//Customer Register screen starts
		
		$(document).delegate('#customerRegister', 'pageinit', function(evt)
		{
				 
			$('#fillMessage').hide();
			$('#pinMatch').hide();
			$('#pinValidate').hide();
			
			 function customerRegisterReset()
			 {				
			    $("#country")[0].selectedIndex=0;	
				$("#mobilePhone").val("");
				$("#pin").val("");
				$("#confirmPin").val("");
			 }
               
			$("#country").change(function()
			{
				country = $("#country").val();
			});
				
			$(document).delegate('#customerRegisterButton', 'click', function(evt)
			{
				validate = true;
			   
				var customerRegisterCountry="";
				if($('#country').val()=="")
				{
					validate = false;
					$('#country').css('border', '1px solid red');
				}
				else
				{
					customerRegisterCountry = ($('#country').val());
				}
								
				var mobilePhone="";
				if($('#mobilePhone').val() == "" || isNaN($('#mobilePhone').val()))
				{
					 validate = false;
					$('#mobilePhone').css('border','1px solid red');
				}
			    else
				{
					mobilePhone=$('#mobilePhone').val();
				}
			   
				var pin="";
				if($('#pin').val() == "" || isNaN($('#pin').val()))
				{
					 validate = false;
					$('#pin').css('border','1px solid red');
				}
			    else
				{
					pin=$('#pin').val();
				}
				
				var confirmPin="";
				if($('#confirmPin').val() == "" || isNaN($('#confirmPin').val()))
				{
					 validate = false;
					$('#confirmPin').css('border','1px solid red');
					
				}
			    else
				{
					confirmPin=$('#confirmPin').val();
				}
				
				var pinvalidate1=($('#pin').val());
				
				if(pinvalidate1.length<6)
				{
					validate=false;
					$('#pin').css('border', '1px solid red');
					
					alertMessage("Please enter minimum 6 digits");
				}
				
				var pinvalidate2=($('#confirmPin').val());
				
				if(pinvalidate2.length<6)
				{
					validate=false;
					$('#confirmPin').css('border', '1px solid red');
					
					alertMessage("Please enter minimum 6 digits ");
				}
				
				var validationPin="";
				if($('#pin').val() !=  $('#confirmPin').val())
				{
					 validate = false;
					$('#confirmPin').css('border','1px solid red');
					$('#pinMatch').show();
					
				}
			    else
				{
					validationPin=$('#pin').val();
				}
				
				if (validate == false)
				{
					$('#fillMessage').show();
				} 
				else
				{

					var formData = 
					{ 
						"country":customerRegisterCountry,
						"mobilePhone":mobilePhone,
						"pinNumber":validationPin,	
					};		
					 
					$.ajax({
                    type: 'POST',
                    url: baseUrl+'/prodcast/customer/customerRegistration',
                    dataType: 'json',
                    data: formData,
                    encode: true,
                    success: function(response)
					{
                        if (response.error) 
						{
                            alertMessage(response.errorMessage);
                        } 
						else 
						{
							registrationMap=response.result;
							loginMap=response;
							confirmationId=registrationMap.confirmationId;
							accessId=confirmationId;
							localStorage.setItem("accessId", accessId );
							mobilePhone=registrationMap.mobilePhone;
							cellPhone = mobilePhone;	
							$("#country").val("");
                            $("#mobilePhone").val("");
							$("#pin").val("");
							$("#confirmPin").val("");

							$('#fillMessage').hide();
							$('#pinMatch').hide();
							$('#pinValidate').hide();
							
							$("#customerRegister :input").css('border', ' 1px solid #d8e1b6');
							$.mobile.navigate('#pinScreen');
						}
					}
					});
				}
			});
			
			$(document).delegate('#customerRegisterResetButton', 'click', function(evt)
			{
				customerRegisterReset();
				$("#customerRegister :input").css('border', ' 1px solid #d8e1b6');
				$('#fillMessage').hide();
				$('#pinValidate').hide();
				$('#pinMatch').hide();
			});
			
			$(document).delegate('#customerRegister :input', 'click', function(evt)
			{
                $(this).css('border', ' 1px solid #d8e1b6');
				$('#fillMessage').hide();
				$('#pinMatch').hide();
				$('#pinValidate').hide();
			});
		});
		
	//register screen ends
	
	//DB MobileNumber Customer Register screen starts
	
		$(document).delegate("#newCustomerRegistration","pageinit",function(evt)
		{
			$("#skipregistration").on("click",function()
			{
				$.mobile.navigate('#distributorScreen');
			});
			
			$('#customer_country').attr("disabled", true);
			$("#emptyalertmsg").hide();
			
			function newcustomerreset()
			{
				$("#emptyalertmsg").hide();
				$("input[type=number], textbox").val("");																	
				$("input[type=numeric], textbox").val("");
				$("#newCustomerDetails").find('input:text').val('');
				$("input[type=email], textbox").val("");
				$('#customer_country')[0].selectedIndex=0;
				$('#customer_smsallowed').attr('checked',false);									
			}
			
			$("#customer_country").change(function()
			{
				customerCountry = $("#customer_country").val();
			});
			
			$("#newCustomerSaveButton").on("click",function()
			{
				$("#emptyalertmsg").hide();
				var cvalid = true;
				var customerFirstName="";
				if($("#customer_firstname").val()==""){
					$('#customer_firstname').css('border', '1px solid red');
					cvalid = false;
				}
				else{
					customerFirstName=$("#customer_firstname").val();
				}
				var customerLastName="";
				if($("#customer_lastname").val()==""){
					$('#customer_lastname').css('border', '1px solid red');
					cvalid = false;
					}
					else{
						customerLastName=$("#customer_lastname").val();
					}	
				var customeremail="";
			   if($("#customer_email").val()==""){
					$('#customer_email').css('border', '1px solid red');
					cvalid = false;
				   }
				else{
					customeremail=$("#customer_email").val();
				}
				
				var customerAddress1="";
				if($("#customer_Address1").val()==""){
					
					 $('#customer_Address1').css('border', '1px solid red');
						cvalid = false;
				}
				else{
					customerAddress1=$("#customer_Address1").val();
				}
				
				var customerAddress2="";
				if($("#customer_Address2").val() !=""){
					customerAddress2=$("#customer_Address2").val();
				}
				var customerAddress3="";
				if($("#customer_Address3").val()!=""){
					
					
					customerAddress3=$("#customer_Address3").val();
				}
				
				var customerPhonenumber="";
				if($("#customer_Phonenumber").val()==""){
					$('#customer_Phonenumber').css('border', '1px solid red');
						cvalid = false;
				}
				else{
					customerPhonenumber=$("#customer_Phonenumber").val();
				}
				
				var customerCity="";
				if($("#customer_city").val()==""){
					$('#customer_city').css('border', '1px solid red');
						cvalid = false;
				}
				
				else{
					customerCity=$("#customer_city").val();
				}
				
				var customerState="";
				if($("#customer_state").val()==""){
					$('#customer_state').css('border', '1px solid red');
						cvalid = false;
				}
				else{
					customerState=$("#customer_state").val();
				}
				
				var customerCountry="";
				if($("#customer_country").val()==""){
				$('#customer_country').css('border', '1px solid red');
						cvalid = false;	
				}
				else{
					customerCountry=$("#customer_country").val();
				}
				
				var customerPostalcode="";
				if($("#customer_postalcode").val()==""){
					
					$('#customer_postalcode').css('border', '1px solid red');
						cvalid = false;	
				}
				else{
					customerPostalcode=$("#customer_postalcode").val();
				}
			
				if ($('#customer_smsallowed').is(':checked'))
				{
					newcustomerSmsAllow="true";
				}
				else
				{
					newcustomerSmsAllow="false";
				}
					 
				if(!cvalid){
					$("#emptyalertmsg").show();
					return;
				}
				
				 var formDataNewCust = 
				 {
					"customerId":openCustomerId,
					"cellPhone":cellPhone ,
					"firstName": customerFirstName.toUpperCase(),
					"lastName": customerLastName.toUpperCase(),
					"emailAddress":customeremail.toUpperCase(),
					"billingAddress1": customerAddress1.toUpperCase(),
					"billingAddress2": customerAddress2.toUpperCase(),
					"billingAddress3": customerAddress3.toUpperCase(),
					"homePhoneNumber": customerPhonenumber,
					"city": customerCity.toUpperCase(),
					"state": customerState.toUpperCase(),
					"country":customerCountry,
					"postalCode": customerPostalcode,
					"smsAllowed":newcustomerSmsAllow
				};
								
				$.ajax({
				type:'POST',
				url: baseUrl+'/prodcast/customer/saveNewCustomer',
				datatype:'json',
				data:formDataNewCust,
				encode:true,
				success:function(response)
				{
					if(response.error)
					{
						alertMessage(response.errorMessage)
					}
					else
					{
						 saveNewCustMap= response;
						alertMessage("Your registration details have been saved. Thank you.");
						$("#emptyalertmsg").hide();
						newcustomerreset();
						$("#newCustomerRegistration :input").css('border', ' 1px solid #d8e1b6');
						$.mobile.navigate('#distributorScreen');
					}
				}
				});	
			});
			
			$("#newCustomerRegistration :input").on('click', function() 
			{
				$(this).css('border', ' 1px solid #d8e1b6');
				$("#emptyalertmsg").hide();
			});
			
			$('#newCustomerResetButton').on('click',function()
			{
				$("#newCustomerRegistration :input").css('border', ' 1px solid #d8e1b6');
				newcustomerreset();
			});
		});
		
	//DB MobileNumber Customer Register screen ends
	
	//Verification code Screen Start
	
		$(document).delegate('#pinScreen', 'pageinit', function(evt)
		{

			$('#smsValidationMessage').hide();
			
			$(document).delegate('#verifyButton', 'click', function(evt)
			{ 
			
				validate = true;
				var sms_code="";
				if($('#code').val() == "" || isNaN($('#code').val()))
				{
					validate = false;
					$('#code').css('border','1px solid red');
				}
				else
				{
					sms_code=$('#code').val();
				}
				
				if (validate == false)
				{
					$('#smsValidationMessage').show();
				}
				else
				{
					var formData = 
					{
						"confirmationCode":sms_code,
						"accessId":confirmationId
					};		
				 
					$.ajax({
					type: 'POST',
					url: baseUrl+'/prodcast/customer/confirmationDetails',
					dataType: 'json',
					data: formData,
					encode: true,
					success: function(response)
					{
						if (response.error) 
						{
							alertMessage(response.errorMessage);	
						} 
						else 
						{
							registrationMap=response;

							$("#code").val("");
							$('#smsValidationMessage').hide();
							$("#pinScreen :input").css('border', ' 1px solid #d8e1b6');
							$.mobile.navigate("#newCustomerRegistration");	
						}
					}
					});
				}
			});
			
			$(document).delegate('#resentCode', 'click', function(evt)
			{ 
				var formData2 = 
				{
					"accessId":confirmationId	
				};		
				 
				$.ajax({
				type: 'POST',
				url: baseUrl+'/prodcast/customer/resendConfirmationCode',
				dataType: 'json',
				data: formData2,
				encode: true,
				success: function(response)
				{
					if (response.error) 
					{
						alertMessage(response.errorMessage);
					} 
					else 
					{
						alertMessage("confirmation code has been resent successfully");	
					}
				}
				});
			});
			
			$(document).delegate('#pinScreen :input', 'click', function(evt)
			{
				$(this).css('border', ' 1px solid #d8e1b6');
				$('#smsValidationMessage').hide();
			});

		});
			
	//Verification code Screen ends
	
	//BilldetailsPage Starts//

		$(document).delegate('.billNumber', 'click', function(evt)
		{
			selectedBill=evt.target.id;
			$.mobile.navigate("#billdetailspage");
		});
		
		$("#billdetailspage").on('pageinit', function()
		{
			billDetailsOriginal= $('#billdetailspage').html();
		});
	
		$("#billdetailspage").on('pageshow', function(e) 
		{
			localStorage.getItem("selectedBillId");
			var productId = "";
			$('#billdetailspage').html( billDetailsOriginal);				
		
				 userRole="D";
		
				$.ajax({
				type: 'GET' ,
				url : baseUrl+'/prodcast/global/billdetails?billId='+selectedBill+'&employeeId='+employeeId+'&userRole='+userRole,
				dataType : 'json',
				success : function( response )
				{
							if( response.error ) 
							{
								alertMessage(response.errorMessage);
							}
							else
							{
								var orderType="";
								cloneResponse=response;
								localStorage.setItem("cloneResponse",JSON.stringify(cloneResponse));
								var order = response.order;
								
								if (order.deliveryAddress != null && order.deliveryAddress != "")
								{
								  $('#billdetailspage #deliveryAddress').text( order.deliveryAddress );
								}
								else
								{
								  $('.deliveryAddressType').hide();
								}
								
								var customer=order.customer;
								var customerAddress=(customer.billingAddress1+" "+customer.billingAddress2+" "+customer.billingAddress3);
								var custStatepost=(customer.city+","+customer.state+customer.postalCode);
								var distributor=order.distributor;
								var distAddress=(distributor.address1+" "+distributor.address2+" "+distributor.address3);
								var distCityState=(distributor.city+","+distributor.state+distributor.postalCode);
								var distPhoneNumber=("Ph:"+distributor.homePhone)	;
								var custPhoneNumber=("Ph:"+customer.phonenumber)	;
								var totalAmount=(order.totalAmount).toFixed(2);
								var outstandingBalance=(order.outstandingBalance).toFixed(2);
								 
								if( distributor.fulfillmentType!='0')
								{
									if( order.fulfillmentType == '0' )
									{
										orderType = "PICKUP";
									}
									else if( order.fulfillmentType == '1' )
									{
										orderType = "DELIVERY";
									}
								} 
								
								$('#billdetailspage #distMname').text( distributor.companyName );

								var customerName = customer.customerName;
								if( customerName == null || customerName.trim().length == 0 ) customerName = customer.firstName + " " +customer.lastName;
								
								if (distributor.openToPublic == false)
								{
									$('#billdetailspage #customerMname').text( customerName );
								}
								else
								{
									$('#billdetailspage #customerMname').html( customer.firstname+' &nbsp; '+customer.lastname );
								}
								
								$('#billdetailspage #custAddress').text(customerAddress );
								$('#billdetailspage #custCity').text(custStatepost );
								$('#billdetailspage #custPhone').text(custPhoneNumber);
								
								$('#billdetailspage #orderType').html(orderType);
								
								var  discount=$('#discountValue').val();
								if($('#discountValue').val()=="")
								{
									discount=currency+'0';
								}

								var returntype=$("#discountType").val();

								if(returntype==1)
								{
									discount=currency+(order.discount);
								}
								if(returntype==2)
								{
									discount=(order.discount)+'%';
								}
				  
								$('#billdetailspage #billNumber').text( selectedBill );
								$('#billdetailspage #billDate').text( stringToDate (order.billDate) );
								$('#billdetailspage #employeeName').text( order.employeeName );
								$('#billdetailspage #discountValue').html(order.discount.toFixed(2));
								$('#billdetailspage #totalAmount').text( totalAmount );
								$('#billdetailspage #outstandingBalance').text( outstandingBalance );
								  
							//Adding products.
								 
								var orderEntries = order.orderEntries;
								var totalTax=0;
								var subTotal=0;

								for(counter=0;counter<orderEntries.length;counter++)
								{
									var entry1 = orderEntries[counter];

									if(entry1.optionValue != null &&  entry1.flavorValue != null)
									{
										var trstr1 = '<div class="tbl-row"><div class="tbl-cols">'+entry1.productName+'<br><label>'+entry1.optionValue.trim().toUpperCase()+'</label><br><label>'+entry1.flavorValue.trim().toUpperCase()+'</label></div><div class="tbl-cols">'+entry1.quantity+'</div><div class="tbl-cols">'+entry1.unitPrice.toFixed(2)+'</div><div class="tbl-cols">'+entry1.subtotal.toFixed(2)+'</div></div>';
									}
									else if (entry1.optionValue != null)
									{	
										var trstr1 = '<div class="tbl-row"><div class="tbl-cols">'+entry1.productName+'<br><label>'+entry1.optionValue.trim().toUpperCase()+'</label></div><div class="tbl-cols">'+entry1.quantity+'</div><div class="tbl-cols">'+entry1.unitPrice.toFixed(2)+'</div><div class="tbl-cols">'+entry1.subtotal.toFixed(2)+'</div></div>';
									}
									else if(entry1.flavorValue != null)
									{
										var trstr1 = '<div class="tbl-row"><div class="tbl-cols">'+entry1.productName+'<br><label>'+entry1.flavorValue.trim().toUpperCase()+'</label></div><div class="tbl-cols">'+entry1.quantity+'</div><div class="tbl-cols">'+entry1.unitPrice.toFixed(2)+'</div><div class="tbl-cols">'+entry1.subtotal.toFixed(2)+'</div></div>';
									}
									else
									{
										var trstr1 = '<div class="tbl-row"><div class="tbl-cols">'+entry1.productName+'</div><div class="tbl-cols">'+entry1.quantity+'</div><div class="tbl-cols">'+entry1.unitPrice.toFixed(2)+'</div><div class="tbl-cols">'+entry1.subtotal.toFixed(2)+'</div></div>';
									}

									$('#billdetailspage #ordtable').append( trstr1 );
									$('#billdetailspage #ordtable').show();
									totalTax=totalTax+(entry1.salesTax+entry1.otherTax);
									subTotal=subTotal+entry1.subtotal;
								}
								
								$('#billdetailspage #subTotal').text(subTotal.toFixed(2));
								$('#billdetailspage #totalTax').html(totalTax.toFixed(2));

								orderEntries = order.collectionEntries;
							
								if(orderEntries!=null)
								{
									if(orderEntries.length < 1)
									{
										$('#billdetailspage #paytable').hide();
										$('#billdetailsheader1').hide();
										
										var paid=0.00;
										$('#billdetailspage #paid').html( paid.toFixed(2));
									}
									else
									{	
								
										var paid=0;
										
										for(counter=0;counter<orderEntries.length;counter++)
										{
											var entry1 = orderEntries[counter];

											var trstr1 = '<div class="tbl-row"><div class="tbl-cols">'+stringToDate(entry1.paymentDate)+'</div><div class="tbl-cols">'+entry1.employeeName+'</div><div class="tbl-cols">'+entry1.amountPaid.toFixed(2)+'</div></div>';
											$('#billdetailspage #paytable').append( trstr1 );
											paid=paid+entry1.amountPaid;
										}
										$('#billdetailspage #paid').html( paid.toFixed(2));
									}
								}
							}
					
				  
				  
				}
				});
						
				$("#billdetailsclosebutton").on('click', function(evt)
				{
					goBack();
				});
				
				$("#billdetailspage :input").on('click', function() 
				{
					$(this).css('border', ' 1px solid #d8e1b6');
				});
		});
				 
	//BilldetailsPage Ends//
	
	// edit custommer registration details//

		function editregistrationSubAutoComplete(getNewCustRegDetails)
		{
			openCustomerId=getNewCustRegDetails.customerId;
			$("#editcustomer_firstname").val(getNewCustRegDetails.firstName);
			$("#editcustomer_lastname").val(getNewCustRegDetails.lastName);					
			$("#editcustomer_email").val(getNewCustRegDetails.email);
			$('#editcustomer_Address1').val(getNewCustRegDetails.address1);
			$('#editcustomer_Address2').val(getNewCustRegDetails.address2);					
			$('#editcustomer_Address3').val(getNewCustRegDetails.address3);
			$('#editcustomer_Phonenumber').val(getNewCustRegDetails.workPhone);
			$('#editcustomer_city').val(getNewCustRegDetails.city);
			$('#editcustomer_state').val(getNewCustRegDetails.state);					
			$('#editcustomer_country').val(getNewCustRegDetails.country).change();
			$('#editcustomer_postalcode').val(getNewCustRegDetails.postalCode);
			$('#editcustomer_smsallowed')[0].checked=getNewCustRegDetails.smsAllowed;		
		}
							 
		$(document).delegate("#editCustomerRegistrationDetails","pageinit",function(evt)
		{

			$.ajax({
			type: 'GET',
			url: baseUrl+'/prodcast/customer/getNewCustomerRegistrationDetails?accessId='+accessId,
			dataType: 'json',
			encode: true,
			success: function(response) 
			{

				if (response.error) 
				{
					alertMessage(response.errorMessage);
				} 
				else 
				{								
				   var  getNewCustRegDetails = response.result;
				   if(getNewCustRegDetails!=null)
				   {
						editregistrationSubAutoComplete(getNewCustRegDetails);
				   }
				}
			}
			});
		});	
		
		$(document).delegate("#editCustomerRegistrationDetails","pageshow",function(evt)
		{
		
			cellPhone=localStorage.getItem("cellPhone");
			$("#editCustomerRegistrationDetails :input").css('border', ' 1px solid #d8e1b6');
			$("#editemptyalertmsg").hide();
			$.ajax({
			type: 'GET',
			url: baseUrl+'/prodcast/customer/getNewCustomerRegistrationDetails?accessId='+accessId,
			dataType: 'json',
			encode: true,
			success: function(response) 
			{
				if (response.error) 
				{
					alertMessage(response.errorMessage);
				} 
				else 
				{
				   var  getNewCustRegDetails = response.result;
				   if(getNewCustRegDetails!=null){
				   editregistrationSubAutoComplete(getNewCustRegDetails);
				   }
				   }
				}
			});
			
			function editnewcustomerreset()
			{
				$("#editemptyalertmsg").hide();
				$("input[type=number], textbox").val("");																	
				$("input[type=numeric], textbox").val("");
				$("#editCustomerDetails").find('input:text').val('');
				$("input[type=email], textbox").val("");
				$('#editcustomer_country')[0].selectedIndex=0;
				$('#editcustomer_smsallowed').attr('checked',true);									
			}
			
			$("#editcustomer_country").change(function()
			{
				editcustomerCountry = $("#editcustomer_country").val();
			});
			
			$("#newCustomerUpdateButton").on("click",function()
			{
				$("#editemptyalertmsg").hide();
				var cvalid = true;
				var editcustomerFirstName="";
				if($("#editcustomer_firstname").val()==""){
					$('#editcustomer_firstname').css('border', '1px solid red');
					cvalid = false;
				}
				else{
					editcustomerFirstName=$("#editcustomer_firstname").val();
				}
				var editcustomerLastName="";
				if($("#editcustomer_lastname").val()==""){
					$('#editcustomer_lastname').css('border', '1px solid red');
					cvalid = false;
					}
					else{
						editcustomerLastName=$("#editcustomer_lastname").val();
					}	
				var editcustomeremail="";
			   if($("#editcustomer_email").val()==""){
					$('#editcustomer_email').css('border', '1px solid red');
					cvalid = false;
				   }
				else{
					editcustomeremail=$("#editcustomer_email").val();
				}
				
				var editcustomerAddress1="";
				if($("#editcustomer_Address1").val()==""){
					
					 $('#editcustomer_Address1').css('border', '1px solid red');
						cvalid = false;
					
				}
				else{
					editcustomerAddress1=$("#editcustomer_Address1").val();
				}
				var editcustomerAddress2="";
				if($("#editcustomer_Address2").val() !=""){
					editcustomerAddress2=$("#editcustomer_Address2").val();
				}
				var editcustomerAddress3="";
				if($("#editcustomer_Address3").val()!=""){
					
					
					editcustomerAddress3=$("#editcustomer_Address3").val();
				}
				
				
						var editcustomerPhonenumber="";
				if($("#editcustomer_Phonenumber").val()==""){
					$('#editcustomer_Phonenumber').css('border', '1px solid red');
						cvalid = false;
					
				}
				else{
					editcustomerPhonenumber=$("#editcustomer_Phonenumber").val();
				}
				
				var editcustomerCity="";
				if($("#editcustomer_city").val()==""){
					$('#editcustomer_city').css('border', '1px solid red');
						cvalid = false;
					
				}
				
				else{
					editcustomerCity=$("#editcustomer_city").val();
				}
				
				
				var editcustomerState="";
				if($("#editcustomer_state").val()==""){
					$('#editcustomer_state').css('border', '1px solid red');
						cvalid = false;
				}
				else{
					editcustomerState=$("#editcustomer_state").val();
				}
				var editcustomerCountry="";
				if($("#editcustomer_country").val()==""){
				$('#editcustomer_country').css('border', '1px solid red');
						cvalid = false;	
				}
				else{
					editcustomerCountry=$("#editcustomer_country").val();
				}
				var editcustomerPostalcode="";
				if($("#editcustomer_postalcode").val()==""){
					
					$('#editcustomer_postalcode').css('border', '1px solid red');
						cvalid = false;	
					
				}
				else{
					editcustomerPostalcode=$("#editcustomer_postalcode").val();
				}
			
				if ($('#editcustomer_smsallowed').is(':checked'))
				{
					editCustomerSmsAllow="true";
				}
				else
				{
					editCustomerSmsAllow="false";
				}
					 
				if(!cvalid)
				{
					$("#editemptyalertmsg").show();
					return;
				}
				
				var formDataEditNewCust = 
				{ 
					"customerId":openCustomerId,
					"cellPhone":cellPhone ,
					"firstName": editcustomerFirstName.toUpperCase(),
					"lastName": editcustomerLastName.toUpperCase(),
					"emailAddress":editcustomeremail.toUpperCase(),
					"billingAddress1": editcustomerAddress1.toUpperCase(),
					"billingAddress2": editcustomerAddress2.toUpperCase(),
					"billingAddress3": editcustomerAddress3.toUpperCase(),
					"homePhoneNumber": editcustomerPhonenumber,                               
					"city": editcustomerCity.toUpperCase(),
					"state": editcustomerState.toUpperCase(),
					"country":editcustomerCountry,
					"postalCode": editcustomerPostalcode,                             
					"smsAllowed":editCustomerSmsAllow								
				};
								
				$.ajax({
				type:'POST',
				url: baseUrl+'/prodcast/customer/saveNewCustomer',
				datatype:'json',
				data:formDataEditNewCust,
				encode:true,
				success:function(response)
				{
					if(response.error)
					{
						alertMessage(response.errorMessage)
					}
					else
					{
						var UpdateNewCustMap = response;
						alertMessage("Your registration details have been updated successfully");
						$("#editemptyalertmsg").hide();
						$("#editCustomerRegistrationDetails :input").css('border', ' 1px solid #d8e1b6');
					}
				}
				});	
			});
			$("#editCustomerRegistrationDetails :input").on('click', function() 
			{
				$(this).css('border', ' 1px solid #d8e1b6');
				$("#emptyalertmsg").hide();
			});
			
			$('#newCustomerEditResetButton').on('click',function()
			{
				$("#editCustomerRegistrationDetails :input").css('border', ' 1px solid #d8e1b6');
				editnewcustomerreset();
			});
		});
		
	//edit customer registration details ends//
	
	//change pinscreen starts
		
		$(document).delegate("#changePinScreen","pageinit",function(evt)
		{
			
		});
		
		$(document).delegate("#changePinScreen","pageshow",function(evt)
		{
			resetChangePinnumber();
			
			function resetChangePinnumber()
			{
				$("#changePinScreen :input").css('border', ' 1px solid #d8e1b6');
				$('#newPinnumber').val("");
				$('#oldPinnumber').val("");
				$('#confirmPinnumber').val("");
				$('#oldpinnonull').hide();
				$('#oldpinnoerror').hide();
				$('#newpinnonull').hide();
				$('#newpinnosame').hide();
				$('#newpinnoerror').hide();
				$('#confirmpinnonull').hide();
				$('#confirmpinnoerror').hide();
			}
			
			$("#dialog1").show();
			$('#oldpinnonull').hide();
			$('#oldpinnoerror').hide();
			$('#newpinnonull').hide();
			$('#newpinnosame').hide();
			$('#newpinnoerror').hide();
			$('#confirmpinnonull').hide();
			$('#confirmpinnoerror').hide();
					
			$(document).delegate("#changePinScreen :input","click", function() 
			{
				$(this).css('border', ' 1px solid #abcd14');
				$('#oldpinnonull').hide();
				$('#oldpinnoerror').hide();
				$('#newpinnonull').hide();
				$('#newpinnosame').hide();
				$('#newpinnoerror').hide();
				$('#confirmpinnonull').hide();
				$('#confirmpinnoerror').hide();
			});	
			
			$(document).delegate("#changepinnumber_save","click",function(evt)
			{
				var evalid=true;
				newPinnumber=$('#newPinnumber').val();
				oldPinnumber=$('#oldPinnumber').val();
				confirmPinnumber=$('#confirmPinnumber').val();	
			
					if(oldPinnumber=="")
					{
						$('#oldPinnumber').css('border', ' 1px solid red');
						$('#oldpinnonull').show();
						evalid=false;
					}
					if(newPinnumber=="")
					{
						$('#newPinnumber').css('border', ' 1px solid red');
						$('#newpinnonull').show();
						evalid=false;
					}	
					else
					{
						if(newPinnumber==oldPinnumber)
						{
							$('#newPinnumber').css('border', ' 1px solid red');
							$('#newpinnosame').show();
							evalid=false;
						}
						if(newPinnumber.length<6)
						{
							$('#newPinnumber').css('border', ' 1px solid red');
							$('#newpinnoerror').show();
							evalid=false;
						}
					}
				   
					if(confirmPinnumber=="")
					{
						$('#confirmPinnumber').css('border', ' 1px solid red');
						$('#confirmpinnonull').show();
						evalid=false;
					}
					else
					{
						if(newPinnumber!=confirmPinnumber)
						{
							$('#confirmPinnumber').css('border', ' 1px solid red');
							$('#confirmpinnoerror').show();
							evalid=false;
						}
					}
					
					if(!evalid)
					{
						return;
					}
					
					var formDataChangePinnumber=
					{
						"accessId":accessId,
						"oldPinNumber":oldPinnumber,
						"newPinNumber":newPinnumber
					};
					
				
					$.ajax({
					type: 'POST',
					url: baseUrl+'/prodcast/customer/changePinNumber',
					dataType: 'json',
					data: formDataChangePinnumber,
					encode: true,
					success: function(response)
					{
						if(response.error)
						{
							alertMessage(response.errorMessage);
						}
						else
						{
						  alertMessage("PIN Number Has Been Changed Successfully");
						  resetChangePinnumber();	
						}
					}
					});
			
			});
		   
			$(document).delegate('#changepinnumber_reset','click',function(evt)
			{
				resetChangePinnumber();
			});
		});
		
	//change pinscreen ends
	
	//View Distributor Screen start
	
		$('#distributorScreen').on('pageinit', function(evt)
		{   	
			 //localStorage.removeItem("distributorId");
		});
		
		$('#distributorScreen').on('pageshow', function(evt)
		{   	
			localStorage.removeItem("distributorId");
	        
			$.ajax({
			type: 'GET',
			url: baseUrl+'/prodcast/customer/getDistributorList?accessId='+accessId,
			dataType: 'json',
			encode: true,
			success: function(response) 
			{

				if (response.error) 
				{
					alertMessage(response.errorMessage);
				} 
				else 
				{
					allDistributorMap = response;
					viewDistributors(allDistributorMap);
					localStorage.setItem("DistributorsList", JSON.stringify(allDistributorMap));
				}
			}
			});

		});
		
		$(document).delegate('.switchDistributors','click',function(evt)
		{
							
			distributorId=evt.currentTarget.id;
			var formData=
			{
				"accessId":accessId,
				"distributorId":distributorId
			}
											
			$.ajax({
			type: 'POST',
			url: baseUrl+'/prodcast/customer/getCustomerDetails',
			dataType: 'json',
			encode: true,
			data:formData,
			success: function(response) 
			{

				if (response.error) 
				{
					alertMessage(response.errorMessage);
				} 
				else 
				{

					customerDetailsMap = response.result;

					$('#distributor').append('<option value="' + customerDetailsMap.distributor.distributorId + '">' + customerDetailsMap.distributor.companyName + '</option>');   

					selectDistributor(customerDetailsMap);
					$.mobile.navigate("#home");
					
				}
			}
			});
		});
				    
	//View Distributor Screen ends
	       
    /* Login Screen Begin */
	
		$(document).delegate('#LoginButton', 'click', function(evt)
		{	

            if ($('#LoginUserId').val() != "" && $('#LoginPassword').val() != "") 
			{

		       var formDataLogin= 
				{
					
                    "userid": $('#LoginUserId').val(),
					"password":$('#LoginPassword').val(),
					"country":$('#LoginCountry').val()
					
				};
					$.ajax({
                        type: 'POST',						
                        url: baseUrl+'/prodcast/customer/login',     
                        timeout : 10000,
                        dataType: 'json',
						data:formDataLogin,
                        success: function(response) 
						{
							if(response.error)
							{
								$('#validationMessage').show();  
							}
							else
							{	
								loginMap=response;
								accessId=loginMap.result.accessId;
								
								cellPhone = loginMap.result.username;
								localStorage.setItem("ProdcastCustomerLogin", JSON.stringify(loginMap));
								localStorage.setItem("accessId", accessId );
								localStorage.setItem("cellPhone", cellPhone );
								confirmationId=accessId;
								if (response.verified) 
								{
									$.mobile.navigate('#distributorScreen');
								} 
								else 
								{
									$.mobile.navigate('#pinScreen');
								}
							}
						},
                    });
            } 
			else 
			{
				alertMessage("Please check your Username and Password");
			}
        });
        
		$(document).delegate('#clearButton', 'click', function(evt)
		{		

			$('#LoginUserId').val("");
			$('#LoginPassword').val("");
			$('#validationMessage').hide();
			 
		});
		
		$(document).delegate('#retrievePin', 'click', function(evt)
		{	
		
			$('#validationMessage').hide();		
		
			if($('#LoginUserId').val() != ""  && $('#LoginCountry').val() != "")
			{
				var formData= 
				{
					"mobilePhone": $('#LoginUserId').val(),
					"country":$('#LoginCountry').val()
				};

				$.ajax({
				type: 'POST',
				url: baseUrl+'/prodcast/customer/retrievePin',
				dataType: 'json',
				data:formData,
				success: function(response) 
				{
					var message = "Message has been sent to the Mobile Number with the pin";
					if (response.error) 
					{
						message = response.errorMessage;
					} 
					else 
					{
						$('#validationMessage').hide();
					}
					
					alertMessage(message);
				}
				});
			}
			else
			{
				$('#validationMessage').show();
			}
		});
		
		$(document).delegate('.logout', 'click', function(evt)
		{	
		
			customerLogout();
		
		});

	/* Login Screen End*/	

});	 