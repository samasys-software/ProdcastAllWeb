
$(document).ready(function() {
		//var baseUrl = "http://ec2-52-91-5-22.compute-1.amazonaws.com:8080";
		var baseUrl = "../..";
		/* Global Variable Declaration Begins*/
		
		var originalBills="";
		var distributorId="";
	    var outstandingBills = "";
		var customerId="";
		var employeeId="";
		var customerType="";
		//var outstandingBillsParam=[];
		//var openToPublic=false;
		var format = "YYYY-MM-DD";
		var delimiter = "-";
		var myDateFormat = "#DD#/#MM#/#YYYY#";
		var gid = new Array();
		var currency = "";
		var originalOrderDetailsTable="";
		
		var productDisplay =[];
		var productMap=[];
		var entries = [];
		gid.push("1");
		var cloneResponse="";
		var i=null;
		var deliveryType=null;
		var deliveryAddress=null;
	
			 
		
		$('#outstandingDiv .tbl').empty();
					 
        /* Global Variable Declaration Ends*/
				
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
			
			
			
		
			function writeOutstandingBills(response, gotoNewOrder,customerId){
					//outstandingBill = response.outstandingBills;

					$('#outstandingdiv').html(originalBills);
					$('#outstandingDiv .tbl').empty();
					var billNotFound = true;
					/*if (outstandingBills.length == 0)
					{
						billNotFound=false;
					}*/
						for (var counter = 0; counter < outstandingBills.length; counter++) {
							
							if(customerId==outstandingBills[counter].customerId){
							if( billNotFound ){
								billNotFound = false;
								$('#paymentdiv').show();
								$('#ordmsg').hide();
								currency=localStorage.getItem("currency");
								$('#outstandingDiv .tbl').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">Bill No.</div><div class="tbl-cols">Status</div><div class="tbl-cols">Bill Date</div><div class="tbl-cols">Total ('+currency+')</div><div class="tbl-cols">Balance ('+currency+')</div> </div>');
								

								
							}
							var orderStatus = "NEW";
			                if( outstandingBills[counter].orderStatus == "F"){
				               orderStatus="READY";
			                         }
							billAmount=outstandingBills[counter].billAmount.toFixed(2);
							outstandingBalance=outstandingBills[counter].outstandingBalance.toFixed(2);	 		
							
							$('#outstandingDiv .tbl').append('<div class="tbl-row"><div class="tbl-cols"><a class="billNumber"  id="' + outstandingBills[counter].billNumber + '" data-role="button" data-mini="true" href="#billdetailspage">' + outstandingBills[counter].billNumber + '</a></div><div class="tbl-cols" >'+orderStatus+'</div><div class="tbl-cols" >' + stringToDate( outstandingBills[counter].billDate) + '</div><div class="tbl-cols">' + billAmount + '</div><div class="tbl-cols">' + outstandingBalance + '</div></div>');
							}
								

						}

					if(billNotFound) {
						$('#paymentdiv').hide();
						if( gotoNewOrder ){
							$.mobile.navigate('#order-new');

						}
					}

			}
							
			function alertMessage(message)
			{
				  $('#notificationMessage').html( message );
					  $("#saveDialog").dialog({
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
			
			$(document).delegate('#okMessage', 'click', function(evt)
			{

					$('#saveDialog').dialog("close");

				});
			}
			
				$('#fillmsg').hide();
				$('#pinmatch').hide();
			function calculateTotal(id) {
                    if ($('#hproductvalue' + id).val() != "" && !isNaN($('#hproductvalue' + id).val())) {
						var selectedProduct = productList[productMap[$('#hproductvalue' + id).val()]];
                        var unitPrice = selectedProduct.unitPrice;
						var retailPrice=selectedProduct.retailPrice;
						var salesTax = selectedProduct.salesTax;
						var otherTax = selectedProduct.otherTax;
                        var qtytext = $('#quantityvalue' + id);
                        var quantity = qtytext.val();
							
                        var subtotal ="";
						if(customerType=='R')
							subtotal=(Number(retailPrice) * Number(quantity)*( 1+(Number(salesTax)+Number(otherTax))/100  )).toFixed(2);
						else
							subtotal=(Number(unitPrice) * Number(quantity)*( 1+(Number(salesTax)+Number(otherTax))/100  )).toFixed(2);
						$('#subtotal' + id).text(subtotal);
                    }

                    var totalVal = 0;
					var newtotal=0;
					var discount=0;
					
                    for (var k = 0; k < gid.length; k++) {
                        var ind = gid[k];
                        if (!isNaN($('#subtotal' + ind).text()))
						{


							 newtotal +=Number($('#subtotal' + ind).text());
							 		totalVal=newtotal;
						}
                    }
					totalVal=totalVal.toFixed(2);
                    $('#totalvalue').text(totalVal);

                }
			function cloneOrder( )
			{
				var responseString = localStorage.getItem("cloneResponse");
					cloneResponse = JSON.parse( responseString );
					//=localStorage.getItem("cloneResponse");
					if(originalOrderDetailsTable=="")
					originalOrderDetailsTable = $('#odtbl').html();
				
				$('#productvalue1').val("");
					$('#quantityvalue1').val("");
					$("#subtotal1").text("0.00");
                    $('#totalvalue').text('0.00');
					$('.productvalue_all').on("click",function(){	
					
						$('#productvalue1').autocomplete("search" , " ");
				});
					
                    $.mobile.navigate('#order-new');	
				//$.mobile.navigate('#order-new');
				
				var order=cloneResponse.order;
				
				var orderEntries=order.orderEntries;
			
				i=1;
				for(var counter=0;counter<orderEntries.length;counter++)
				{
					var entry1 = orderEntries[counter];
					
					 $('#productvalue'+i).val(entry1.productName);
					 $('#quantityvalue'+i).val(entry1.quantity);
					  $("#hproductvalue" + i).val(entry1.productId);
					  //calculateTotal(i);
					$('#subtotal'+i).text((entry1.subtotal).toFixed(2));
					
					
					i++;
					gid.push(i);
					
					
                           
							
					$('#odtbl').append('<div class="tbl-row" id="rowid' + i+ '"><div class="tbl-cols"><a href="#" class="remove" id="' + i + '">X</a></div><div class="tbl-cols"><div class="drop-set"><input class="input-feild-style" type="text" id="productvalue' +i + '"/><input type="hidden" id="hproductvalue' + i + '"/><a href="#" id="productvaluenew" class="productvalue_all' + i + '"><span class="ui-icon ui-icon-triangle-1-s"></span></a></div></div><div class="tbl-cols"><input class="input-feild-style qty" id="quantityvalue' + i + '" type="number" min="0"/></div><div class="tbl-cols"><label style="text-align:center" id="subtotal' + i + '">0.00</label></div></div>').trigger('create');
							 
					
						  var temp = i;
					$('.productvalue_all'+temp).on("click",function(){
						$('#productvalue'+temp).autocomplete("search" , " ");
					});

                    $("#productvalue" + i).autocomplete({
                        source: productDisplay,
						minLength: 0 ,
                        select: function(event, ui) {
                            // prevent autocomplete from updating the textbox

                            var clicked = event.target;
                            currentID = clicked.id || "No ID!";
                            id = currentID.replace(/[^\d.]/g, '');
                            // selected product is tracked for validation for at least one product selected before save order event fire.

                            event.preventDefault();
                            // manually update the textbox
                            $(this).val(ui.item.label);
                            $("#hproductvalue" + id).val(ui.item.value);
                            $("#quantityvalue" + id).val();
                            var unitPrice = productList[productMap[ui.item.value]].unitPrice;
                            $('#unitprice' + id).text(unitPrice);
                            $('#subtotal' + id).text(0);
                            calculateTotal(i);
                            selectproduct = ui.item.value;
                            minqtyvalue = $("#quantityvalue" + id).val();
                        },
												 change: function (event, ui) {
											if (!ui.item) {
												this.value = '';
												
											}
												if($("#productvalue"+id).val() == "")
											{
												alertMessage("Please Enter A Valid Product");
												return;
												
												
											}
											
											
										
										}
						
                    }); 

			
					
				}
				$('#totalvalue').text((order.totalAmount).toFixed(2));
				
			
				
			}
	/*orderScreen starts*/

	
	 $(document).delegate('#order', 'pageinit', function(evt)
	 		{
		//$('#payalert').hide();

		$("#order :input").on('click', function()
           {
                 $(this).css('border', ' 1px solid #d8e1b6');
				 
           });	
			});
			
				
		$('#order').on('pageshow',function(){
		
								//$('#outstandingDiv .tbl').empty();
	
	 		customerId=localStorage.getItem("customerId");	
				employeeId=localStorage.getItem("employeeId");
				customerType=localStorage.getItem("customerType");
				

				//$('#payalert').hide();
				outstandingBills="";

				originalBills = $('#outstandingDiv').html();
                
                var billId = "";

			   $.ajax({
               type: 'GET',
               url: baseUrl+'/prodcast/global/customer?id='+customerId+'&employeeId='+employeeId,
               dataType: 'json',
               success: function(response) {
				if(response.error){
					alertMessage(response.errorMessage);
				}
				else{
					outstandingBills = (response.customer.outstandingBill);
					writeOutstandingBills ( outstandingBills , true,customerId);
				
					
				}
              }
			});			

          });
		 $('#neworder').on('click', function() {
                   
					$('#productvalue1').val("");
					$('#quantityvalue1').val("");
					$("#subtotal1").text("0.00");
                    $('#totalvalue').text('0.00');
					
					
					 $('.qty').one('click', function()
						{
								$('#quantityvalue1').focus();
						});
				   
					
					$('.productvalue_all').on("click",function(){	
					
						$('#productvalue1').autocomplete("search" , " ");
				});
					
                    $.mobile.navigate('#order-new');
				
		});
		
     /*order end*/
	 $(document).delegate('#billdetailsCloneOrder','click', function(evt)
			{
				cloneOrder();
			});
	/*neworder pge starts*/
		
	$("#order-new").on("pageinit", function() {
		
	

				if(originalOrderDetailsTable=="")
					originalOrderDetailsTable = $('#odtbl').html();
				
				originalReviewTable=$('#odrtbl').html();
				
				$('#savedialog').hide();
				$('#savedialog1').hide();
				$('#minbalance2').hide();
								
                /*div hide end*/
             /* local variable declaration begins */
                var unitPrice = "";
                var qtytext = "";
                var quantity = "";
                var subtotal = "";
                var totalVal = 0;
                var currentID = "";
                var id = "";
                var total = "";
				//var productDisplay=[];
				//var productMap = [];
				//var entries = [];
			//	 originalOrderDetailsTable = $('#odtbl').html();

				//$(".discount").hide();
			
				function saveOrdersForCustomer()
				{
					//$('#savedialog').dialog("close");
								while(gid.length>1)
								{
									gid.pop();
								}
								while( entries.length>0){
									entries.pop();
								}
								i=1;
								//gid.push(1);
								$("input[id=sopayment], textbox").val("");
								$("input[id=chequesavenumber], textbox").val("");
								$("input[id=commentsaveorder], textbox").val("");
                                $('#totalvalue').text("0.00");
                                $('#rtotalvalue').text("0.00");
                                 $('#discountValue').val("");
									
								$('#odtbl').html(originalOrderDetailsTable);

							


								$("#productvalue1").autocomplete({
										source: productDisplay,
										select: function(event, ui)
										{
											// prevent autocomplete from updating the textbox
											event.preventDefault();
											// manually update the textbox and hidden field
											$(this).val(ui.item.label);
											$("#hproductvalue1").val(ui.item.value);
											$("#quantityvalue1").val();
											var unitPrice = productList[productMap[ui.item.value]].unitPrice;


											//$('#unitprice1').text( unitPrice);
											//$('#subtotal1').text( 0.00 );

											calculateTotal(1);
										},
										 change: function (event, ui) {
											if (!ui.item) {
												this.value = '';
												 $("#quantityvalue1").val("");
												 
												 
												 
											}
											if($("#productvalue1").val() == "")
											{
												alertMessage("Please Enter A Valid Product");
												
												$("#hproductvalue1").val("");
												
												$('#subtotal1').text( 0.00 );
												
												return;
												
											}
											
											
											
										}
										
								});
								$('.qty').one('click', function()
								{
									
									
									 if($("#productvalue"+i).val() == "")
									     {
							               return;
						                 }
					                 else{
									i++;
									gid.push(i);
									$('#odtbl').append('<div class="tbl-row" id="rowid' + i + '"><div class="tbl-cols"><a href="#" class="remove" id="' + i + '">X</a></div><div class="tbl-cols"><div class="drop-set"><input class="input-feild-style" type="text" id="productvalue' + i + '"/><input type="hidden" id="hproductvalue' + i + '"/><a href="#" id="productvaluenew" class="productvalue_all' + i + '"><span class="ui-icon ui-icon-triangle-1-s"></span></a></div></div><div class="tbl-cols"><input class="input-feild-style qty" id="quantityvalue' + i + '" type="number" min="0"/></div><div class="tbl-cols"><label style="text-align:center" id="subtotal' + i + '">0.00</label></div></div>').trigger('create');
									 }
									$("#productvalue" + i).autocomplete({
										source: productDisplay,
										select: function(event, ui) {
											// prevent autocomplete from updating the textbox


											var clicked = event.target;
											currentID = clicked.id || "No ID!";
											id = currentID.replace(/[^\d.]/g, '');
											// selected product is tracked for validation for at least one product selected before save order event fire.

											event.preventDefault();
											// manually update the textbox
											$(this).val(ui.item.label);
											$("#hproductvalue" + id).val(ui.item.value);
											$("#quantityvalue" + id).val();
											var unitPrice = productList[productMap[ui.item.value]].unitPrice;
											$('#unitprice' + id).text(unitPrice);
											$('#subtotal' + id).text(0);

											calculateTotal(i);
											selectproduct = ui.item.value;
											minqtyvalue = $("#quantityvalue" + id).val();
									},
									
									 change: function (event, ui) {
											if (!ui.item) {
												this.value = '';
												 $("#quantityvalue"+id).val("");
												
											}
											if($("#productvalue"+ id).val() == "")
											{
												alertMessage("Please Enter A Valid Product");
												$("#hproductvalue"+ id).val("");
													$('#subtotal' + id).text(0.00);
												return;
											}
											
											
											
										}
									
									
									
									
									
								});
								});
				}
                function accordionEffect(id) {

                    var totalVal = 0;
                    for (var k = 0; k < gid.length; k++) {
                        var ind = gid[k];
                        if (ind == id) {
                            $('#secondRow' + ind).show();
                        } else {
                            $('#secondRow' + ind).hide();
                        }
                    }

                }
                //add new row
				//$('#productvaluenew').on("click",function(){
				$('.productvalue_all').on("click",function(){	
					
						$('#productvalue1').autocomplete("search" , " ");
				});

				i = gid[gid.length - 1];
               var content = "";
               $('.qty').one('click', function() {
				
				  
				   if($("#productvalue"+i).val() == ""){
							return;
						}
					else{	
                    i++;
                    gid.push(i);
                    $('#odtbl').append('<div class="tbl-row" id="rowid' + i + '"><div class="tbl-cols"><a href="#" class="remove" id="' + i + '">X</a></div><div class="tbl-cols"><div class="drop-set"><input class="input-feild-style" type="text" id="productvalue' + i + '"/><input type="hidden" id="hproductvalue' + i + '"/><a href="#" id="productvaluenew" class="productvalue_all' + i + '"><span class="ui-icon ui-icon-triangle-1-s"></span></a></div></div><div class="tbl-cols"><input class="input-feild-style qty" id="quantityvalue' + i + '" type="number" min="0"/></div><div class="tbl-cols"><label style="text-align:center" id="subtotal' + i + '">0.00</label></div></div>').trigger('create');
					}
					var temp = i;
					$('.productvalue_all'+temp).on("click",function(){
						$('#productvalue'+temp).autocomplete("search" , " ");
					});

                    $("#productvalue" + i).autocomplete({
                        source: productDisplay,
						minLength: 0 ,
                        select: function(event, ui) {
                            // prevent autocomplete from updating the textbox

                            var clicked = event.target;
                            currentID = clicked.id || "No ID!";
                            id = currentID.replace(/[^\d.]/g, '');
                            // selected product is tracked for validation for at least one product selected before save order event fire.

                            event.preventDefault();
                            // manually update the textbox
                            $(this).val(ui.item.label);
                            $("#hproductvalue" + id).val(ui.item.value);
                            $("#quantityvalue" + id).val();
                            var unitPrice = productList[productMap[ui.item.value]].unitPrice;
                            $('#unitprice' + id).text(unitPrice);
                            $('#subtotal' + id).text(0);
                            calculateTotal(i);
                            selectproduct = ui.item.value;
                            minqtyvalue = $("#quantityvalue" + id).val();
                        },
						 change: function (event, ui) {
											if (!ui.item) {
												this.value = '';
													 $("#quantityvalue"+id).val("");
												
											}
											if($("#productvalue"+ id).val() == "")
											{
												alertMessage("Please Enter A Valid Product");
												
												$("#hproductvalue"+id).val("");
													$('#subtotal' + id).text(0.00);
												return;
												
											}
											
											
										}
									
                    });
					//}
                });
				
                $(document).delegate('.qty', 'keyup', function(evt) {

                    var clicked = evt.target;
                    currentID = clicked.id || "No ID!";
                    id = currentID.replace(/[^\d.]/g, '');
                    calculateTotal(id);
                });
				
				$('.productvalue_all').on("click",function(){
						$('#productvalue1').autocomplete("search" , " ");
				});
				
                $(document).delegate('.qty', 'click', function(evt) {
                    //$('.qty').click(function(evt) {
						
						
                        var clicked = evt.target;
                        currentID = clicked.id || "No ID!";
                        id = currentID.replace(/[^\d.]/g, '');
                        //alert(id);
                        lastvalue = gid[gid.length - 1];
						
                        if (id != lastvalue) {
							return;
						}
						if($("#productvalue"+id).val() == ""){
							return;
						}
						else{
                            i++;
                            gid.push(i);
							
							$('#odtbl').append('<div class="tbl-row" id="rowid' + i + '"><div class="tbl-cols"><a href="#" class="remove" id="' + i + '">X</a></div><div class="tbl-cols"><div class="drop-set"><input class="input-feild-style" type="text" id="productvalue' + i + '"/><input type="hidden" id="hproductvalue' + i + '"/><a href="#" id="productvaluenew" class="productvalue_all' + i + '"><span class="ui-icon ui-icon-triangle-1-s"></span></a></div></div><div class="tbl-cols"><input class="input-feild-style qty" id="quantityvalue' + i + '" type="number" min="0"/></div><div class="tbl-cols"><label style="text-align:center" id="subtotal' + i + '">0.00</label></div></div>').trigger('create');
						}
							
							var id = i;
							$('.productvalue_all'+id).on("click",function(){
							$('#productvalue'+id).autocomplete("search" , " ");
							});
                            $("#productvalue" + i).autocomplete({
                                source: productDisplay,
								minLength: 0 ,
                                select: function(event, ui) {
                                    // prevent autocomplete from updating the textbox
                                    selectedProduct = ui.item.value;

                                    var clicked = event.target;
                                    currentID = clicked.id || "No ID!";
                                    id = currentID.replace(/[^\d.]/g, '');
                                    event.preventDefault();
                                    // manually update the textbox
                                    $(this).val(ui.item.label);
                                    $("#hproductvalue" + id).val(ui.item.value);
                                    $("#quantityvalue" + id).val();
                                    var unitPrice = productList[productMap[ui.item.value]].unitPrice;
                                    $('#unitprice' + id).text(unitPrice);
                                    $('#subtotal' + id).text(0);
                                    calculateTotal(i);
                                    // selected product is tracked for validation for at least one product selected before save order event fire.
                                    minqtyvalue = $("#quantityvalue" + id).val();
                                },
									change: function (event, ui) {
											if (!ui.item) {
												this.value = '';
													 $("#quantityvalue"+id).val("");
											}
											
											
											if($("#productvalue"+ id).val() == "")
											{
												alertMessage("Please Enter A Valid Product");
												$("#hproductvalue"+id).val("");
													$('#subtotal' + id).text(0.00);
												return;


											}
											
										}
                            });

                        accordionEffect(id);

					//}
				
                });
				
				function submitOrder(shippingType,deliveryAddress){
					
					var so = {};
                    so.customerId = customerId;
                    so.employeeId = employeeId;
                    so.entries = entries;
					so.paymentType=null;
					so.refNO=null;
					so.refDetail=null;
                    so.paymentAmount = 0;
                    so.discountValue=0;
					so.discountType=null;
					so.orderStatus="S";
					so.shippingType=shippingType;
					so.deliveryAddress=deliveryAddress;

				
                    for (var i = 0; i < gid.length; i++) {
                        var proId = $('#hproductvalue' + gid[i]).val();
                        if (proId == '') {
							if(i==gid.length-1){
                            break;
							}
						else{
							alertMessage("Please select a product");
							$('#okMessage').on('click', function(){
							$('#hproductvalue'+gid[i]).focus();
							
							});
							
							return;
						}
							
                        }
                        var qtyVal = $('#quantityvalue' + gid[i]).val();
                        if (qtyVal == '') {
							alertMessage("Please Enter a Quantity");
							
							$('#okMessage').on('click', function(){
							$('#quantityvalue'+gid[i]).focus();
							});
							so.entries.length=0;
							
								
                            return;
                        }
                        //alert(qtyVal);
                        var entry = {};
                        entry.productId = proId;
                        entry.quantity = qtyVal;
                        so.entries.push(entry);
                    }

                    $.ajax({
                        type: 'POST',
                        url: baseUrl+'/prodcast/global/saveOrder',
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(so),

                        success: function(response) {

                            if (response.error) {
                                alertMessage(response.errorMessage);
                            } else {
                               saveOrdersForCustomer();
						outstandingBills = response.customer.outstandingBill;
						writeOutstandingBills( response , false,customerId );
	
						alertMessage("Your Order has been Placed successfully");
                        $.mobile.navigate('#order');
							}
                        }                  
						});
					
				}
				
				function showPanel(display){
					
						var responseString = localStorage.getItem("customerSwitchDistributor");
						 
								var customer= JSON.parse( responseString ).customer;
								$('#dialogAddress1').val(customer.billingAddress1);
								$('#dialogAddress2').val(customer.billingAddress2+" "+customer.billingAddress3);
								$('#dialogCity').val(customer.city)
								$('#dialogPincode').val(customer.postalCode);
								$('#dialogState').val(customer.state);
									
					
						if(display){
							
                           						
							 $("#addressValidationMsg").hide();
							$('#dialogShippingMethod').show();
							deliveryType=$('#dialogShippingMethod').val();
							if(deliveryType="0"){
								$(".confirmAddress").hide();
								
							}
							else{
								$(".confirmAddress").show();
							}
							
							if(deliveryType=="1"){
								$('#addressDetails').show();						
							}
							else{
								$('#addressDetails').hide();						
								
							}
						
							
							
						}
						else{
							$('#addressDetails').show();						
							$('#dialogShippingMethod').hide();
							deliveryType="1"
							
							
						}
				}
				$("#dialogShippingMethod").change(function() {
					
					if($("#dialogShippingMethod").val() == "0"){
						$(".confirmAddress").hide();
					}
					else{
						$(".confirmAddress").show();
						
					}
						
					
					
                    if ($("#dialogShippingMethod").val() == "1") {
						 $("#addressDetails :input").css('border', ' 1px solid #d8e1b6');
						$('#addressDetails').show();                       
						 $("#addressValidationMsg").hide();		
						deliveryType=$('#dialogShippingMethod').val();
						
                    } 
					else{
                        $('#addressDetails').hide();                         
						 $("#addressValidationMsg").hide();		
						deliveryType=$('#dialogShippingMethod').val();							
                      }

                });

				$(document).delegate('.confirmAddress', 'click', function(evt) {
					//alert($('#dialogShippingMethod').val()+""+$('#dialogAddress').val()+""+$('#dialogCity').val()+""+$('#dialogState').val());
					$("#selectOrderType").hide();
					 $("#addressValidationMsg").hide();
					var validate=true;
					
					/*(if(deliveryType=="0"){
		     			validate=false;
						$('#dialogShippingMethod').css('border', ' 1px solid red');
						$("#selectOrderType").show();
						}
						else{
						deliveryType=$("#dialogShippingMethod").val();
						$("#selectOrderType").hide();
						}*/
					if(deliveryType=="2"){
						submitOrder(deliveryType,null);
					}		
						
					
					if(deliveryType=="1"){
						var responseString = localStorage.getItem("customerSwitchDistributor");
						 
								var distributor= JSON.parse( responseString ).distributor;							
							if(parseFloat($("#totalvalue").text())>=distributor.minimumDeliveryAmount){ 
				      			if($('#dialogAddress1').val()=="" ){
								 $('#dialogAddress1').css('border', '1px solid red');
								 validate=false;
							      }
							    if($('#dialogAddress2').val()==""){
								$('#dialogAddress2').css('border', '1px solid red');
								 validate=false;
							     }
							    if( $('#dialogCity').val()==""){
								$('#dialogCity').css('border', '1px solid red');
								 validate=false;
							     }
							    if($('#dialogState').val()==""){
								$('#dialogState').css('border', '1px solid red');
								 validate=false;
							    }
						        if($('#dialogPincode').val()==""){							 
							    $('#dialogPincode').css('border', '1px solid red');
							    validate=false;												  
						        }
								if($('#dialogAddress1').val()!="" && $('#dialogAddress2').val()!="" && $('#dialogCity').val()!="" && $('#dialogState').val()!="" && $('#dialogPincode').val()!=""){									
								submitOrder(deliveryType,$('#dialogAddress1').val()+" "+$('#dialogAddress2').val()+","+$('#dialogCity').val()+","+$('#dialogState').val()+"-"+$('#dialogPincode').val());
								}
							}
							else{
								alertMessage("Your totalvalue should be greaterthan or equalto MinimumDeliveryAmount");
							}
						//}
					}
					if(!validate)
						 $("#addressValidationMsg").show();						
					else
					$('#savedialog').dialog("close");
					
				});		

				

                $('.saveorder').on('click', function() {
				//alert(gid.length);
				if($('#productvalue1').val() != "" && $('#quantityvalue1').val() == 0)
				{
					alertMessage("Please Enter a Quantity");
					return;
				}
				
				else if ($('#productvalue1').val() != "" && $('#quantityvalue1').val() != "")
				{
					
						var responseString = localStorage.getItem("customerSwitchDistributor");
						 
						var distType= JSON.parse( responseString ).distributor.fulfillmentType;
						
						if(distType=="0" || distType=="2"){
							submitOrder(distType,null);
							
						}
						else 
						{
							$("#savedialog").dialog({
							modal: true,
							draggable: false,
							resizable: false,
							position: ['center'],
							show: 'blind',
							hide: 'blind',
							height: 'auto',
							dialogClass: 'ui-dialog-osx',
							});
							
							$('.ui-dialog-osx').css('width', '0px !important');
							
							if(distType=="1"){
								$('#dialogShippingMethod').hide();
								showPanel(false);
							}
							else
							{	
								$('#dialogShippingMethod').empty();
								$('#dialogShippingMethod').append('<option value="0">Select Order Type</option>');
								$('#dialogShippingMethod').append('<option value="1">Delivery</option>');
								$('#dialogShippingMethod').append('<option value="2">Pickup</option>');
										
								showPanel(true)
							}
						}
						
						
						
                                  
				}

				else 
				{
					alertMessage("Please select at least one Product.");
					return;
				}
					
				/*	*/

                });
				
				
				
                
        /* local variable declaration begins */


                $("#productvalue1").autocomplete({
                    source: productDisplay,
                    select: function(event, ui) {
                        // prevent autocomplete from updating the textbox
                        event.preventDefault();
                        // manually update the textbox and hidden field
                        $(this).val(ui.item.label);
                        $("#hproductvalue1").val(ui.item.value);
                        $("#quantityvalue1").val();
						
                        var unitPrice = productList[productMap[ui.item.value]].unitPrice;

                        //$('#unitprice1').text( unitPrice);
                        //$('#subtotal1').text( 0.00 );

                        calculateTotal(1);


                    },
					change: function (event, ui) {
											if (!ui.item) {
												this.value = '';
												  $("#quantityvalue1").val("");
												
											}
											if($("#productvalue1").val() == "")
											{
												alertMessage("Please Enter A Valid Product");
												$('#subtotal1').text( 0.00 );
												return;

												
											}
											
											
											
										}
						
                });

                

       /* so dialog close begins */
	   
                

                $(document).delegate('.remove', 'click', function(evt) {
                    var clicked = evt.target;
                    var rowID = clicked.id || "No ID!";
                    $('#rowid' + rowID).remove();
                    var ind = gid.indexOf(parseInt( rowID));
				                       gid.splice( ind , 1);
		    calculateTotal(id);
                });

				$("#order-new :input").on('click', function()
                        {
                            $(this).css('border', ' 1px solid #d8e1b6');
                            $('#payval').hide();
							$('#minbalance2').hide();
							$('#chequesave').hide();
							$('#commentsave').hide();
							$("#selectOrderType").hide();
					        $("#addressValidationMsg").hide();
							

                        });
						$('#reviewbtn').on('click', function() {
								$.mobile.navigate("#review");
								
								$('#odrtbl').html(originalReviewTable);
								//$('#odrtbl').empty();
										var stax = 0.00;
										var otax = 0.00;
								for (var counter = 0; counter < gid.length; counter++) {
									if ($('#productvalue' + gid[counter]).val() != "" && $('#quantityvalue' + gid[counter]).val() != "") {

										var selectedProduct = productList[productMap[$('#hproductvalue' + gid[counter]).val()]];
										var unitPrice = selectedProduct.unitPrice;
										var salesTax = selectedProduct.salesTax;
										var otherTax = selectedProduct.otherTax;

										// $("#review").css("display", "block");

										var productvalue = $('#productvalue' + gid[counter]).val();

										var qtyvalue = $('#quantityvalue' + gid[counter]).val();

										var stotal = $('#subtotal' + gid[counter]).text();
										var salesTaxValue = ((Number(salesTax)/100)*unitPrice*Number(qtyvalue)).toFixed(2);
										var otherTaxValue = ((Number(otherTax)/100)*unitPrice*Number(qtyvalue)).toFixed(2);
										
										/*var stv = 0.00;
										var otv = 0.00;
										
										stv = (parseFloat(stv) + salesTaxValue);
										otv = (parseFloat(otv) + otherTaxValue);
										
										var tax = (parseFloat(stv) + parseFloat(otv));*/

										if (stotal != "0.00") {
											//$('#reviewtable').append('<tbody id="tablebody" style="color:#FFFFFF"><tr><td align="center">'+productvalue+'</td><td align="right">'+qtyvalue+'</td><td align="right">'+uprice+'</td><td align="right">'+stotal+'</td></tr></tbody>');
											$('#odrtbl').append('<div class="tbl-row" id="rowid' + counter + '"><div class="tbl-cols"><label>' + productvalue + '</label></div><div class="tbl-cols" style="text-align:right"><label>' + qtyvalue + '</label></div><div class="tbl-cols" style="text-align:right"><label>' + unitPrice + '</label></div><div class="tbl-cols" style="text-align: right">'+ salesTaxValue +' </div><div class="tbl-cols" style="text-align: right">'+ otherTaxValue +' </div><div class="tbl-cols" style="text-align:center;"><label>' + stotal + '</label></div></div>');
										}
										
										stax = (Number(stax) + Number(salesTaxValue));
										otax = (Number(otax) + Number(otherTaxValue));
									}

								}
									var disValue=$('#discountValue').val(0);
									var disType=$('#discountType').val("");
									var tax = (Number(stax) + Number(otax));
									var totalTax = tax; 
									total = $('#totalvalue').text();
									$('#rdiscountValue').text(disValue);
									$('#rtotalTax').html(totalTax.toFixed(2));
									$('#rtotalvalue').text(total);
					});

     $('#co').on('click', function() {
                $.mobile.navigate("#order-new");
            });
				
		
	});
	$('#order-new').on('pageshow',function(){  
	  $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/global/products?employeeId=' + employeeId,
                    timeout : 10000,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error) {
                            //$('#selectError').html('Please refresh the page and try again');
                            alertMessage("response.errorMessage");
                        } else {

							
							productList = response.productList;
							while(productDisplay.length > 0 ){
								productDisplay.pop();
							}
                            for (var counter = 0; counter < productList.length; counter++) {
                                productMap[productList[counter].id] = counter;
                                productDisplay.push({
                                    label: productList[counter].productDisplayName+" ",
                                    value: productList[counter].id
                                });
                            }
				


                        }

                    }
               });
				
				
				
				
				
            });
		
	/*new Orderpage ends*/
});