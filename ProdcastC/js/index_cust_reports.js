$(document).ready(function() {
		//var baseUrl = "http://ec2-52-91-5-22.compute-1.amazonaws.com:8080";
		var baseUrl = "../..";
		
		/* Global Variable Declaration Begins*/
			var distributorId="";
			var accessId="";
			var currency = "";
			var logMap="";
			var myDateFormat = "#DD#/#MM#/#YYYY#";
			var myInputDateFormat = "DD/MM/YYYY";
			var myDateFormatDatePicker = "dd/mm/yy";
			var myDateTimeFormat = "#DD#/#MM#/#YYYY# #hh#:#mm#:#ss# #AMPM#";
			var format = "YYYY-MM-DD"
			var delimiter = "-";
			var inputDelimiter="/";
			var distMap="";
			var disFirstName="";
			var disLastName="";
			var billDetails="";
			var clicked="";
	
	
	currency=localStorage.getItem("currency");
		$(".distcurrency").html(currency);
			$("#disreportSubmit").click(function(){
				
				  $(".green-btn-style-blink").css("animation-play-state", "paused");

			});
			
			
		 $('#distributor ').on('change', function() 
			 {
				 					var allDistributor= $('#distributor ').val();
				// localStorage.getItem("customerSwitchDistributor");
				  var selectedDistributorId=localStorage.getItem("distributorId");
				 var responseString=localStorage.getItem("DistributorsList");
				 var loginMap  = JSON.parse( responseString );
					
				 
				 distributorMap=loginMap.distributors;
					distributorsPublicMap=loginMap.distributorsPublic;
					
					
				 for ( counter= 0; counter < distributorMap.length; counter++) 
					{
						if(allDistributor == distributorMap[counter].distributorId)
						{
						currency=distributorMap[counter].currencySymbol;
								$(".distcurrency").html(currency);
						}
						
					}
						for (counter = 0; counter < distributorsPublicMap.length; counter++) 
						{
							
						if(allDistributor == distributorsPublicMap[counter].distributorId)
							{
								currency=distributorsPublicMap[counter].currencySymbol;
								$(".distcurrency").html(currency);
							}
						}
						
						
                     $(".green-btn-style-blink").css("animation-play-state", "running");

				});

				 $('#disreporttype ').on('change', function() 
				{

                      $(".green-btn-style-blink").css("animation-play-state", "running");

				});
			
	
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
			
			function getdatefromstring(_date)
			{
					var formatLowerCase=myInputDateFormat.toLowerCase();
					var formatItems=formatLowerCase.split(inputDelimiter);
					var dateItems=_date.split(inputDelimiter);
					var monthIndex=formatItems.indexOf("mm");
					var dayIndex=formatItems.indexOf("dd");
					var yearIndex=formatItems.indexOf("yyyy");
					var month=parseInt(dateItems[monthIndex]);
					month-=1;
					var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
					return formatedDate;

			}

			Date.prototype.customFormat = function(formatString){
				  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
				  YY = ((YYYY=this.getFullYear())+"").slice(-2);
				  MM = (M=this.getMonth()+1)<10?('0'+M):M;
				  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
				  DD = (D=this.getDate())<10?('0'+D):D;
				  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
				  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
				  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
				  h=(hhh=this.getHours());
				  if (h==0) h=24;
				  if (h>12) h-=12;
				  hh = h<10?('0'+h):h;
				  hhhh = hhh<10?('0'+hhh):hhh;
				  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
				  mm=(m=this.getMinutes())<10?('0'+m):m;
				  ss=(s=this.getSeconds())<10?('0'+s):s;
				  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
			};
			
		/* Global Variable Declaration Ends */
		
		/* Report page Start */
		
			$("#report").on("pageinit", function()
			{
				
				
				
				$('#summaryTable').hide();
				$('#billTable').hide();
				$('#summ').hide();
				$('#billdetail').hide();
				distributorId=localStorage.getItem("distributorId");

				$("#reportTypeForCustomer").attr("disabled",true);
				
			$(report).on("pageshow",function(event)
			{
				
				distributorId=localStorage.getItem("distributorId");
					$('#distributor').val(distributorId).attr("selected", "true");
				
			});
			
				accessId=localStorage.getItem("accessId");
				
				$("#disreportstartmsg").hide();
				$("#disreportodaymsg").hide();
				$("#disreportendmsg").hide();
				$('#disreportendnullmsg').hide();
				$('#disreportnullmsg').hide();
				$('#discustomrangediv').hide();
			      
				 
					
				$('#disreport_startdate').datepicker({
                        changeYear: true,
						dateFormat: myDateFormatDatePicker
                });
				$('#disreport_enddate').datepicker({
                        changeYear: true,
						dateFormat: myDateFormatDatePicker
                });
            });
			
			$("#disreportSubmit").on("click" , function()
			{	
				var reportid=$('#reportTypeForCustomer').val();
				var reportType=$('#disreporttype').val();
				var startDate="";
				var endDate="";
				var validated = true;
				accessId=localStorage.getItem("accessId");
				distributorId=localStorage.getItem("distributorId");

				if(reportid=='SummaryReport')
				{	
					$('#summaryTable').show();
					$('#billTable').show();
					$('#summ').show();
					$('#billdetail').show();
				
				}
				else
				{
					$('#summaryTable').hide();
					$('#billTable').hide();
					$('#summ').hide();
					$('#billdetail').hide();
				}

				startDate = $('#disreport_startdate').val();
				endDate = $('#disreport_enddate').val();

				if(reportType=="custom")
				{
						if( startDate == "" )
						{
							$('#disreport_startdate').css('border', '1px solid red');
							$('#disreportnullmsg').html("Please select an start date");
							$('#disreportnullmsg').show();
							validated = false;
						}
						
						if( endDate == "" )
						{
							$('#disreport_enddate').css('border', '1px solid red');
							$('#disreportendnullmsg').html("Please select an end date");
							$('#disreportendnullmsg').show();
							validated = false;
						}

						if(getdatefromstring(startDate) > getdatefromstring(endDate))
						{
							$('#disreport_startdate').css('border', '1px solid red');
							$("#disreportstartmsg").show();
							validated = false;
						}
						
						var m=getdatefromstring(new Date().customFormat(myDateFormat));
						var s=getdatefromstring(startDate);
						var d=getdatefromstring(endDate);
						
							if(s>m)
							{
								$('#disreport_startdate').css('border', '1px solid red');
								$("#disreportodaymsg").show();
								validated = false;
							}
							if(d>m)
							{
								$('#disreport_enddate').css('border', '1px solid red');
								$("#disreportendmsg").show();
								validated = false;
							}
				}

				$("#disreport_startdate").click(function()
				{
					$("#disreportstartmsg").hide();
					//$("#reporendmsg").hide();
					$('#disreportnullmsg').hide();
					$('#disreportodaymsg').hide();
					$('disreport_startdate').css('border', '1px solid #d8e1b6');
					$('#disreport_startdate').css('border', '1px solid #d8e1b6');
				});
				
				$("#disreport_enddate").click(function()
				{
					$("#disreportodaymsg").hide();
					$("#disreportendmsg").hide();
					$('#disreportendnullmsg').hide();
					$('#disreport_enddate').css('border', '1px solid #d8e1b6');
					$('#disreport_enddate').css('border', '1px solid #d8e1b6');
				});

				if( validated )
				{
                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/customer/reportForCustomers?accessId='+accessId + '&reportType='+reportType+'&startDate='+startDate+'&endDate='+endDate+'&selectedDistributor='+distributorId+'&reportId='+reportid,
                    dataType: 'json',
                    success: function(response) 
					{
                        if (response.error == 'true') 
						{
                            alertmessage('Please refresh the page and try again');
                        } 
						else
						{
							$('#summaryTable').empty();
									
								
							$('#summaryTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">ToatalBillAmount ('+currency+')</div><div class="tbl-cols"> TotalAmountPaid ('+currency+')</div><div class="tbl-cols">OutsandingBalance ('+currency+')</div> </div>');
							
							$('#summaryTable').append('<div class="tbl-row"></div><div class="tbl-cols">' + response.amount.toFixed(2) + '</div><div class="tbl-cols" >' + response.amountPaid.toFixed(2) + '</div><div class="tbl-cols">' + response.outstandingBalance.toFixed(2) + '</div></div>');
		
							var billDetails= response.result;

							$('#billTable').empty();
								
							$('#billTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">S.No</div><div class="tbl-cols">Bill No.</div><div class="tbl-cols">Bill Date</div><div class="tbl-cols">Total ('+currency+')</div><div class="tbl-cols">Balance ('+currency+')</div> </div>');
							
							for(i=0;i<billDetails.length;i++)
							{	
                                var entry = billDetails[i];
								$('#billTable').append('<div class="tbl-row"><div class="tbl-cols">' + (i + 1) + '</div><div class="tbl-cols"><a class="billNumber"  id="' + entry.billNumber + '" data-role="button" data-mini="true" href="#billdetailspage">' + entry.billNumber + '</a></div><div class="tbl-cols">' + stringToDate(entry.billDate) + '</div><div class="tbl-cols">' + entry.totalAmount.toFixed(2) + '</div><div class="tbl-cols">' + entry.outstandingBalance.toFixed(2) + '</div></div>'); 
							}
						}
					}
					});
				}
			});
			
			 $('#disreporttype').change( function(evt) 
			 {
                evt.stopPropagation();

                var reportType = "today";

				reportType = ($(this).val())

				if( reportType == "custom") 
				{
					$('#discustomrangediv').show();
					return;
				}
				
				$('#disreport_startdate').val("");
				$('#disreport_enddate').val("");
				$('#discustomrangediv').hide();
            });
			
			$("#disreportReset").on("click" , function()
			{
				$(".green-btn-style-blink").css("animation-play-state", "running");
				$("#summaryTable").empty();
				$("#billTable").empty();
				$("#disreporttype")[0].selectedIndex[0];
				$("#distributor")[0].selectedIndex[0];
				$('#disreportodaymsg').hide();
				$('#disreportnullmsg').hide();
				$('#disreportstartmsg').hide();
				$('#disreportendmsg').hide();
				$('#disreportendnullmsg').hide();
				$('#summaryTable').hide();
				$('#billTable').hide();
				$('#summ').hide();
				$('#billdetail').hide();	
			});
			
			/* Report page Ends */
});
