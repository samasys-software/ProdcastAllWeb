
$(document).ready(function() 
{
	//var baseUrl = "http://ec2-52-91-5-22.compute-1.amazonaws.com:8080";
	var baseUrl = "../..";
		
	/* Global Variable Declaration Begins*/
		
	var originalBills="";
	var distributorId="";
	var outstandingBills = "";
	var customerId="";
	var employeeId="";
	var customerType="";
	var format = "YYYY-MM-DD";
	var delimiter = "-";
	var myDateFormat = "#DD#/#MM#/#YYYY#";
	var currency = "";
	var originalOrderDetailsTable="";
	var productDisplay =[];
	var productCategoryDisplay =[];
	var productOptionsDisplay=[];
	var productFlavorsDisplay=[];
	var productMap=[];
	var productCategoryMap=[];
	var productOptionMap=[];
	var productFlavorMap=[];
	var entries = [];
	var productEntries=[];
	var cloneResponse="";
	var optionId=null;
	var deliveryType=null;
	var deliveryAddress=null;
	
	originalReviewTable=$('#odrtbl').html();
	
	$('#outstandingDiv .tbl').empty();
	$('#fillmsg').hide();
	$('#pinmatch').hide();
	$('.checkoutdialog').hide();
	$('.carddialog').hide();
	//$('.saveorder').hide();
	
	function writeOutstandingBills(response, gotoNewOrder,customerId)
	{
		$('#outstandingdiv').html(originalBills);
		$('#outstandingDiv .tbl').empty();
		var billNotFound = true;
			
		for (var counter = 0; counter < outstandingBills.length; counter++) 
		{				
			if(customerId==outstandingBills[counter].customerId)
			{
				if( billNotFound )
				{
					billNotFound = false;
					$('#paymentdiv').show();
					$('#ordmsg').hide();
					currency=localStorage.getItem("currency");
					$('#outstandingDiv .tbl').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">Bill No.</div><div class="tbl-cols">Status</div><div class="tbl-cols">Bill Date</div><div class="tbl-cols">Total ('+currency+')</div><div class="tbl-cols">Balance ('+currency+')</div> </div>');
				}
				
				var orderStatus = "NEW";
				if( outstandingBills[counter].orderStatus == "F")
				{
					orderStatus="READY";
				}
				
				billAmount=outstandingBills[counter].billAmount.toFixed(2);
				outstandingBalance=outstandingBills[counter].outstandingBalance.toFixed(2);	 		
				$('#outstandingDiv .tbl').append('<div class="tbl-row"><div class="tbl-cols"><a class="billNumber"  id="' + outstandingBills[counter].billNumber + '" data-role="button" data-mini="true" href="#billdetailspage">' + outstandingBills[counter].billNumber + '</a></div><div class="tbl-cols" >'+orderStatus+'</div><div class="tbl-cols" >' + stringToDate( outstandingBills[counter].billDate) + '</div><div class="tbl-cols">' + billAmount + '</div><div class="tbl-cols">' + outstandingBalance + '</div></div>');
			}
		}

		if(billNotFound) 
		{
			$('#paymentdiv').hide();
			if( gotoNewOrder )
			{
				$.mobile.navigate('#order-new');
			}
		}
	}
	
	function getReviewProducts(productEntries)
	{
		if(productEntries.length == 0)
		{
			$('.saveorder').hide();
		}
		else
		{
			$('.saveorder').show();
		}
		
		$('#odrtbl').empty();
		currency=localStorage.getItem("currency");
		$('#odrtbl').append('<div class="tbl-row tbl-hed-bill"><div class="tbl-cols-hed"></div><div class="tbl-cols-hed">Product</div><div class="tbl-cols-hed">Qty</div><div class="tbl-cols-hed">Unit Price ('+currency+')</div><div class="tbl-cols-hed">Sub Total ('+currency+')</div></div>');
		
		//$('#odrtbl').html(originalReviewTable);
		var stax = 0.00;
		var otax = 0.00;
		
		for (var counter = 0; counter < productEntries.length; counter++) 
		{
			var selectedProducts = productEntries[counter];
			var qtyvalue = selectedProducts.qty;
			var product= selectedProducts.product;
			var optionId=selectedProducts.optionId;
			var flavorId=selectedProducts.flavorId;
			var unitPrice=selectedProducts.unitPrice;
			var optionvalue;
			
			if(optionId!=null)
			{
				var selectedOption = productOptionsList[productOptionMap[optionId]];
				 optionvalue=selectedOption.optionValue;
			}
			else
			{
				optionvalue='-';
			}	

			var flavorvalue;
			if(flavorId!=null )
			{
				var selectedFlavor = productFlavorsList[productFlavorMap[flavorId]];
				flavorvalue=selectedFlavor.flavorValue;
			}
			else
			{
				flavorvalue='-';
			}	
			
			var salesTax = product.salesTax;
			var otherTax = product.otherTax;
			var productvalue = product.productName;
			var stotal = calculateTotal(product.id,optionId,qtyvalue);
			
			var salesTaxValue = ((Number(salesTax)/100)*unitPrice*Number(qtyvalue)).toFixed(2);
			var otherTaxValue = ((Number(otherTax)/100)*unitPrice*Number(qtyvalue)).toFixed(2);
			
			if(optionvalue != '-' && flavorvalue != '-')
			{
				$('#odrtbl').append('<div class="tbl-row" id="rowid' + counter + '"><div class="tbl-cols" style=" text-align: center;"><a href="#" class="removeRow" id="' + counter + '">X</a></div><div class="tbl-cols"><label>' + productvalue + '</label><br><label>' + optionvalue.trim().toUpperCase() + '</label><br><label>' + flavorvalue.trim().toUpperCase() + '</label></div><div class="tbl-cols" style="text-align:center;width: 75px;"><input class="input-feild-style qty"  id="qty'+counter+'"value="'+qtyvalue+'" style="text-align: center;border: none;"/></div><div class="tbl-cols" style="text-align:center"><label>' + unitPrice + '</label></div><div class="tbl-cols" style="text-align:center;"><label id="subTotal'+counter+'"class="subTotal">' + stotal.toFixed(2) + '</label></div></div>');
			}
			else if(optionvalue != '-')
			{
				$('#odrtbl').append('<div class="tbl-row" id="rowid' + counter + '"><div class="tbl-cols" style=" text-align: center;"><a href="#" class="removeRow" id="' + counter + '">X</a></div><div class="tbl-cols"><label>' + productvalue + '</label><br><label>' + optionvalue.trim().toUpperCase() + '</label></div><div class="tbl-cols" style="text-align:center;width: 75px;"><input class="input-feild-style qty"  id="qty'+counter+'"value="'+qtyvalue+'" style="text-align: center;border: none;"/></div><div class="tbl-cols" style="text-align:center"><label>' + unitPrice + '</label></div><div class="tbl-cols" style="text-align:center;"><label id="subTotal'+counter+'"class="subTotal">' + stotal.toFixed(2) + '</label></div></div>');
			}
			else if(flavorvalue != '-')
			{
				$('#odrtbl').append('<div class="tbl-row" id="rowid' + counter + '"><div class="tbl-cols" style=" text-align: center;"><a href="#" class="removeRow" id="' + counter + '">X</a></div><div class="tbl-cols"><label>' + productvalue + '</label><br><label>' + flavorvalue.trim().toUpperCase() + '</label></div><div class="tbl-cols" style="text-align:center;width: 75px;"><input class="input-feild-style qty"  id="qty'+counter+'"value="'+qtyvalue+'" style="text-align: center;border: none;"/></div><div class="tbl-cols" style="text-align:center"><label>' + unitPrice + '</label></div><div class="tbl-cols" style="text-align:center;"><label id="subTotal'+counter+'"class="subTotal">' + stotal.toFixed(2) + '</label></div></div>');
			}
			else
			{
				$('#odrtbl').append('<div class="tbl-row" id="rowid' + counter + '"><div class="tbl-cols" style=" text-align: center;"><a href="#" class="removeRow" id="' + counter + '">X</a></div><div class="tbl-cols"><label>' + productvalue + '</label></div><div class="tbl-cols" style="text-align:center;width: 75px;"><input class="input-feild-style qty"  id="qty'+counter+'"value="'+qtyvalue+'" style="text-align: center;border: none;"/></div><div class="tbl-cols" style="text-align:center"><label>' + unitPrice + '</label></div><div class="tbl-cols" style="text-align:center;"><label id="subTotal'+counter+'"class="subTotal">' + stotal.toFixed(2) + '</label></div></div>');
			}
		}
	}
	
	function viewTotal(entry)
	{
		var total=0;
		var discount=0;
		var tax=0.0;
		var subTotal=0;
		
		for(i=0;i<entry.length;i++)
		{
			var productEntry=entry[i];
			var selectedProduct=productList[productMap[productEntry.product.id]];
			total=total+parseFloat(calculateTotal(productEntry.product.id,productEntry.optionId,productEntry.qty));
			tax=tax+parseFloat(calculateTax(selectedProduct,productEntry.qty,productEntry.optionId));
			subTotal=subTotal+parseFloat(calculateSubTotal(selectedProduct,productEntry.qty,productEntry.optionId));
		}

		$('#totalAmt').text(total.toFixed(2));
		$('#discount').text(discount.toFixed(2));
		$('#tax').text(tax.toFixed(2));
		$('#amount').text(subTotal.toFixed(2));
	}
				 
	$(document).delegate('#billdetailsCloneOrder','click', function(evt)
	{
		cloneOrder();
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

	Date.prototype.customFormat = function(formatString)
	{
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

	function calculateTotal(productId,currentOptionId,currentQty) 
	{
		var selectedProduct=productList[productMap[productId]];
		var total=(calculateSubTotal(selectedProduct,currentQty,currentOptionId) + calculateTax(selectedProduct,currentQty,currentOptionId));
		return total;
	}
	
	function calculateSubTotal(selectedProduct,qty,currentOptionId)
	{
		var unitPrice;
		var retailPrice;
        var quantity = qty;
		
		if(currentOptionId != null || currentOptionId > 0)
		{
			var selectedOption = productOptionsList[productOptionMap[currentOptionId]];
			unitPrice=selectedOption.unitPrice;
			retailPrice=selectedOption.retailPrice;
		}
		else
		{
			unitPrice = selectedProduct.unitPrice;
			retailPrice=selectedProduct.retailPrice;
		}
		
		var subtotal ="";
		if(customerType=='R')
			subtotal=(Number(retailPrice) * Number(quantity));//*( 1+)/100  )).toFixed(2);
		else
			subtotal=(Number(unitPrice) * Number(quantity));//*( 1+(Number(salesTax)+Number(otherTax))/100  )).toFixed(2);
		return subtotal;
	}
	
	function calculateTax(selectedProduct,qty,currentOptionId)
	{
		var salesTax = selectedProduct.salesTax;
		var otherTax = selectedProduct.otherTax;
		var tax=(calculateSubTotal(selectedProduct,qty,currentOptionId) * (Number(salesTax)+Number(otherTax)))/100;
		return tax;
	}
	
	function cloneOrder( )
	{
		var responseString = localStorage.getItem("cloneResponse");
		cloneResponse = JSON.parse( responseString );
		
		var order=cloneResponse.order;
		var orderEntries=order.orderEntries;
		
		for(var counter=0;counter<orderEntries.length;counter++)
		{
			var entry1 = orderEntries[counter];
			var productEntryList={};
			productEntryList.product=productList[productMap[entry1.productId]];
			productEntryList.unitPrice=entry1.unitPrice;
			productEntryList.qty=entry1.quantity;
			
			if(entry1.optionId==0)
				productEntryList.optionId=null;
			else
				productEntryList.optionId=entry1.optionId;
			if(entry1.flavorId==0)
				productEntryList.flavorId=null;
			else
				productEntryList.flavorId=entry1.flavorId;
			
			productEntries.push(productEntryList);
		}
		$('.productCount').show();
		$('.productCount').text('('+productEntries.length+')');
		$.mobile.navigate('#review');	
	}
	
	/* Global Variable Declaration Ends*/
	
	$(document).delegate('.changeStores',"click",function(evt){
			
			if(productEntries.length>0)
			{
				$("#warning").dialog({
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
				$('#warningMessage').text("You Have "+productEntries.length +" Item(s) In Your Cart.. If You Change The Distributor Your Cart Has Been Empty. Do You Want To Continue?");
				$(document).delegate('#yes', 'click', function(evt)
				{
					$.mobile.navigate("#distributorScreen");
					
					$("#warning").dialog("close");
					$('.productCount').hide();
					while(productEntries.length>0){
						productEntries.pop();
					}
					
					$("#warning").dialog("close");
					
				});
						
				$(document).delegate('#no', 'click', function(evt)
				{
					$.mobile.navigate("#review");
					$("#warning").dialog("close");
				});
			}
			else
			{
				$.mobile.navigate("#distributorScreen");
			}
					
		});
	
	/*Order Screen starts*/

	$(document).delegate('#order', 'pageinit', function(evt)
	{
		$('#neworder').on('click', function() 
		{
			$.mobile.navigate('#order-new');	
		});
	});
			
	$('#order').on('pageshow',function()
	{
		if(productEntries.length == 0)
		{
			$('.newCart').show();
			$('.cartExist').hide();
		}
		else
		{
			$('.newCart').hide();
			$('.cartExist').show();
		}
		
		customerId=localStorage.getItem("customerId");	
		employeeId=localStorage.getItem("employeeId");
		customerType=localStorage.getItem("customerType");
		outstandingBills="";
		originalBills = $('#outstandingDiv').html();
        var billId = "";
		
		$.ajax({
		type: 'GET',
		url: baseUrl+'/prodcast/global/customer?id='+customerId+'&employeeId='+employeeId,
		dataType: 'json',
		success: function(response) 
		{
			
				if(response.error)
				{
					alertMessage(response.errorMessage);
				}
				else
				{
					outstandingBills = (response.customer.outstandingBill);
					writeOutstandingBills ( outstandingBills , true,customerId);	
				}
			
		}
		});	

		$.ajax({
			type: 'GET',
			url: baseUrl+'/prodcast/distributor/getCategory?employeeId=' + employeeId,
			timeout : 10000,
			dataType: 'json',
			success: function(response) 
			{

					if (response.error) 
					{
						alertMessage(response.errorMessage);
					} 
					else 
					{
						categoryList = response.result;
						while(productCategoryDisplay.length > 0 )
						{
							productCategoryDisplay.pop();
						}
						
						for (var counter = 0; counter < categoryList.length; counter++) 
						{
							productCategoryMap[categoryList[counter].categoryId] = counter;
							productCategoryDisplay.push({
								label: categoryList[counter].categoryName+" ",
								value: categoryList[counter].categoryId
							});
				   
							
						}
				
					}
				
			    
			}
		});
	
		$.ajax({
		type: 'GET',
		url: baseUrl+'/prodcast/global/products?employeeId=' + employeeId,
		timeout : 10000,
		dataType: 'json',
		success: function(response) 
		{

					if (response.error) 
					{
						alertMessage(response.errorMessage);
					} 
					else 
					{
						productList = response.productList;
						productOptionsList = response.productOptionsList;
						productFlavorsList = response.productFlavorsList;
						while(productDisplay.length > 0 )
						{
							productDisplay.pop();
						}
						for (var counter = 0; counter < productList.length; counter++) 
						{
							productMap[productList[counter].id] = counter;
										 
							productDisplay.push({
								label: productList[counter].productDisplayName+" ",
								value: productList[counter].id
							});
						}
						while(productOptionsDisplay.length > 0 )
						{
							productOptionsDisplay.pop();
						}
						for (var counter = 0; counter < productOptionsList.length; counter++) 
						{
							 productOptionMap[productOptionsList[counter].optionId] = counter;
							 
							 productOptionsDisplay.push({
								label: productOptionsList[counter].optionValue+" ",
								value: productOptionsList[counter].optionId
							  });
						}
						
						while(productFlavorsDisplay.length > 0 )
						{
							productFlavorsDisplay.pop();
						}
						
						for (var counter = 0; counter < productFlavorsList.length; counter++) 
						{
							productFlavorMap[productFlavorsList[counter].flavorId] = counter;
							productFlavorsDisplay.push({
								label: productFlavorsList[counter].flavorValue+" ",
								value: productFlavorsList[counter].flavorId
							});
						}
					
						
					}
		  
		}
		});
		});
	
	/*Order Screen ends*/
	
	/*Order new starts*/
	
	$("#order-new").on("pageinit", function() 
	{
		if(originalOrderDetailsTable=="")
			originalOrderDetailsTable = $('#odtbl').html();
				
		$('#savedialog').hide();
		$('#savedialog1').hide();
		$('#minbalance2').hide();
	});
	
	$('.reviewbtn').on('click', function() 
	{
		if(productEntries.length>0){
			$.mobile.navigate("#review");
		}
	});
	
	$("#order-new").on("pageshow", function() 
	{
		originalAllProducts = $('#viewallcategorisDiv').html();
		$('#allcategorisTable').empty();
		$('#allcategorisTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">Browse Categories</div></div>');

		if(categoryList.length>0)
		{
			if(productList.length>0)
			{
				for (var counter = 0; counter < categoryList.length; counter++) 
				{
					var count=0;
					for (var i = 0; i < productList.length; i++) 
					{
						if(categoryList[counter].categoryId==productList[i].categoryId)
						{
							count=count+1;
						}
					}

					if(count>0)
					{
						
						var newRow = '<div class="tbl-row "><div class="tbl-cols"><a class="viewallcategorisName" id="'+categoryList[counter].categoryId+'" data-toggle="tab" data-mini="true"  aria-expanded="true">'+categoryList[counter].categoryName.trim().toUpperCase() +' ('+count+')</a></div></div>';
						
						$('#allcategorisTable').append(newRow);
						$('#allcategorisTable').show();
					}
					else
					{
						continue;	
					}
				}
			}
		}
		
		$('.viewallcategorisName').on("click" , function(evt)
		{
			currentCategoryId=evt.target.id;
			$.mobile.navigate('#order-search');
		});
	});
	
	/*Order new ends*/
	
	/*Order search starts*/
	
	$("#order-search").on("pageinit", function() 
	{
		
		$('.dialogqty').on("input",function(evt)
		{
			evt.preventDefault();
			var qty=$('.dialogqty').val();
			var optionId = $('#dialogOption').val();
			var subTotal=calculateTotal(currentProductId,optionId,qty);
			$('#dialogTotal').text(subTotal.toFixed(2));
		});
		
		function checkExisting()
		{
			var existingProductEntry=null;
			for(var prd=0;prd < productEntries.length; prd++)
			{
				var getPrdId = productEntries[prd].product.id;
				var getOptId = productEntries[prd].optionId;
				var getFlvId = productEntries[prd].flavorId;
				
				var dialogOption = $('#dialogOption').val();
				var dialogFlavor = $('#dialogFlavor').val();
				
				if(getPrdId == currentProduct.id )
				{
					if(getOptId != null && getFlvId !=null)
					{
						if(getOptId == dialogOption && getFlvId ==dialogFlavor)
						{
							existingProductEntry= productEntries[prd];
							break;
						}
					}		
					else if(getOptId != null)
					{
						if(getOptId == dialogOption)
						{
							existingProductEntry= productEntries[prd];
							break;
						}
					}
					else if(getFlvId !=null)
					{
						if(getFlvId ==dialogFlavor)
						{
							existingProductEntry= productEntries[prd];
							break;
						}
					}
					else
					{	
						existingProductEntry= productEntries[prd];	
						break;
					}
				}
			}
			return existingProductEntry;
		}
		
		function addProductToCart()
		{
			var productEntryList={};
			productEntryList.product=currentProduct;
			productEntryList.unitPrice=$('#dialogUntPrice').text();
			productEntryList.qty=$("#dialogqty").val();
			productEntryList.optionId=$("#dialogOption").val();
			productEntryList.flavorId=$("#dialogFlavor").val();
			productEntries.push(productEntryList);
			
			$('#savedialog').dialog("close");
			$('#continueValidationMsg').hide();
			
			if(productEntries.length > 0)
			{
				$('.productCount').show();
				$('.productCount').text('('+productEntries.length+')');
				
			}
			else
			{
				$('.productCount').hide();
			}
			
			$(this).css('border', ' 1px solid #d8e1b6');	
			$('#cardValidationMsg').hide();
			$('#continueValidationMsg').hide();
			
			alertMessage("Your Order has been added to the cart");
		}
		
		$('.addToCard').on('click', function() 
		{
			var prodvalidate = true;
			
			var dialogOption = "";
			if ($("#dialogOption").val() == "" || isNaN($('#dialogOption').val())) 
			{
				prodvalidate = false;
				$('#dialogOption').css('border', '1px solid red');
			} 
			else 
			{
				dialogOption = $("#dialogOption").val();
			}
			
			var dialogFlavor = "";
			if ($("#dialogFlavor").val() == "") 
			{
				prodvalidate = false;
				$('#dialogFlavor').css('border', '1px solid red');
			} 
			else 
			{
				dialogFlavor = $("#dialogFlavor").val();
			}
			
			var dialogQty = "";
			if ($("#dialogqty").val() == "" || isNaN($('#dialogqty').val())) 
			{
				prodvalidate = false;
				$('#dialogqty').css('border', '1px solid red');
			} 
			else 
			{
				dialogQty = $("#dialogqty").val();
			}
			
			if (prodvalidate == false)
			{
				$('#cardValidationMsg').show();
			} 
			else
			{
				var existingProduct = checkExisting();
			
				if( existingProduct  != null )
				{
					$('#continueValidationMsg').show();
					$('#continueValidationMsg').text("Your order already has " + existingProduct.qty + " of the Item " + existingProduct.product.productName + " Would you like to add more to it? ");
					$('.existOrder').hide();
					$('.continue').show();
					return ;
				}
				else
				{
					$('#continueValidationMsg').hide();
					addProductToCart();
				}
			}
		});
		
		$('.continueOrder').on('click', function() 
		{
			var existingProduct = checkExisting();
			
			if(existingProduct != null)
			{
				var dialogQty = $("#dialogqty").val();
				var currentQty = parseInt(dialogQty)+parseInt(existingProduct.qty) ;
				existingProduct.qty = currentQty;
			}
			else
			{
				addProductToCart();
			}
			
			$('#savedialog').dialog("close");
			$('#continueValidationMsg').hide();
			$('.existOrder').show();
			$('.continue').hide();
		});
		
		$("#dialogOption").change(function() 
		{
			if ($("#dialogOption").val() == "" || isNaN($('#dialogOption').val())) 
			{
				$("#productDetails :input").css('border', ' 1px solid #d8e1b6');
				$('#cardValidationMsg').show();                       
				dialogOption=$('#dialogOption').val();
			} 
			else
			{
                $('#cardValidationMsg').hide(); 
				$('#continueValidationMsg').hide();				
				dialogOption=$('#dialogOption').val();
				var unitPrice ;
				var retailPrice;
				
				if(dialogOption != null)
				{
					var selectedOption = productOptionsList[productOptionMap[dialogOption]];
					unitPrice=selectedOption.unitPrice.toFixed(2);
					retailPrice=selectedOption.retailPrice.toFixed(2);
				}
				else
				{
					unitPrice = selectedProduct.unitPrice.toFixed(2);
					retailPrice=selectedProduct.retailPrice.toFixed(2);
				}	
				
				if(customerType == "R")
				{
					$('#dialogUntPrice').text(retailPrice);
				}
				else
				{
					$('#dialogUntPrice').text(unitPrice);
				}
            }
			
			var qty = $("#dialogqty").val();
			var subTotal=calculateTotal(currentProductId,dialogOption,qty);
			$('#dialogTotal').text(subTotal.toFixed(2));
			
			$('.existOrder').show();
			$('.continue').hide();
        });
		
		$("#dialogFlavor").change(function() 
		{
			if ($("#dialogFlavor").val() == "" || isNaN($('#dialogFlavor').val())) 
			{
				$("#productDetails :input").css('border', ' 1px solid #d8e1b6');
				$('#cardValidationMsg').show();                       
				dialogFlavor=$('#dialogFlavor').val();
			} 
			else
			{
                $('#cardValidationMsg').hide(); 
				$('#continueValidationMsg').hide();
				dialogFlavor=$('#dialogFlavor').val();							
            }
			
			$('.existOrder').show();
			$('.continue').hide();
        });
		
		$(".cardClose").on('click', function(evt)
		{
			$('#savedialog').dialog("close");
			$('#continueValidationMsg').hide();
			$(this).css('border', ' 1px solid #d8e1b6');	
			$('#cardValidationMsg').hide();
		});
		
		$("#order-search :input").on('click', function()
		{
			$(this).css('border', ' 1px solid #d8e1b6');	
			$('#cardValidationMsg').hide();
			$('#continueValidationMsg').hide();
		});
		
		$('#closebtn').on('click', function() 
		{
			goBack();
		});
	});
	
	$("#order-search").on("pageshow", function() 
	{
		originalAllProducts = $('#viewallproductsDiv').html();	
		$('.continue').hide()
		;
		$('#allproductsTable').empty();
		currency=localStorage.getItem("currency");
		
		var displayName=categoryList[productCategoryMap[currentCategoryId]].categoryName ;
		$('#categoryName').text(displayName);
				
		for(var counter=0;counter<productList.length;counter++)
		{
			if(currentCategoryId==productList[counter].categoryId)
			{	
				if(customerType=="R")
				{
					var currentProductName=productList[counter].productName.trim().toUpperCase();
					if(productList[counter].salesTax !="0" || productList[counter].otherTax!="0")
					{
						currentProductName=currentProductName+""+"*";
					
					}
					
					var price=productList[counter].retailPrice.toFixed(2);
					if(productList[counter].hasOptions)
					{
						price=price+''+'+';
					}
				    var newRow = '<ul class="item-menu" align="center"><li class="col-sm-4 boxHighlight"style="margin-bottom:8px;margin-right:8px;"><div class="col-xs-12"><a class="col-xs-10 viewallproductsName" style="position: relative;right: 22px;padding-bottom: 8px;font-size: medium;" align="left" id="'+productList[counter].id+'" data-toggle="tab" data-mini="true"  aria-expanded="true">'+currentProductName +'</a><a class="col-xs-2 viewallproductsName" style="position: relative;right: 28px;padding-bottom: 5px;" align="right" id="'+productList[counter].id+'" data-toggle="tab" data-mini="true"  aria-expanded="true">'+currency+''+price+'</a></div><div align="left">'+productList[counter].productDesc.trim().toUpperCase() +'</div></div></li></ul>';
			    }				
				else
				{
					var currentProductName=productList[counter].productName.trim().toUpperCase();
					if(productList[counter].salesTax !="0" || productList[counter].otherTax!="0")
					{
						currentProductName=currentProductName+""+"*";
					}
					
					var price=productList[counter].unitPrice.toFixed(2);
					if(productList[counter].hasOptions)
					{
						price=price+""+'+';
					}
					var newRow = '<ul class="item-menu" align="center"><li class="col-sm-4 boxHighlight"style="margin-bottom:8px;margin-right:8px;"><div class="col-xs-12"><a class="col-xs-10 viewallproductsName" style="position: relative;right: 22px;padding-bottom: 8px;font-size: medium;" align="left" id="'+productList[counter].id+'" data-toggle="tab" data-mini="true"  aria-expanded="true">'+productList[counter].productName.trim().toUpperCase() +'</a><a class="col-xs-2 viewallproductsName" style="position: relative;right: 28px;padding-bottom: 5px;" align="right" id="'+productList[counter].id+'" data-toggle="tab" data-mini="true"  aria-expanded="true">'+currency+''+price+'</a></div><div align="left">'+productList[counter].productDesc.trim().toUpperCase() +'</div></div></li></ul>';
					
				}
				
				$('#allproductsTable').append(newRow);
				$('#allproductsTable').show();
			}
		}
			
		$('.viewallproductsName').on("click" , function(evt)
		{
			currentProduct=productList[productMap[evt.target.id]];
			currentProductId=currentProduct.id;
					
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
					
			$('#dialogPrdName').text(currentProduct.productName);
					
			if(currentProduct.hasOptions)
			{
				$('.selectOption').show();
				$('#dialogOptionName').html("Please select "+currentProduct.optionName);
				$('#dialogOption').empty();
				//$('#dialogOption').append('<option value="">Please select</option>');
				
				for (var counter = 0; counter < productOptionsList.length; counter++) 
				{
					if(currentProduct.id==productOptionsList[counter].productId)
					{
						$('#dialogOption').append('<option value="'+productOptionsList[counter].optionId+'">'+productOptionsList[counter].optionValue.trim().toUpperCase()+'</option>');
					}
				}
			}
			else
			{
				$('#dialogOption').empty();
				$('.selectOption').hide();	
			}
					
			if(currentProduct.hasFlavors)
			{
				$('.selectFlavor').show();
				$('#dialogFlavor').empty();
				//$('#dialogFlavor').append('<option value="">Please select</option>');
				$('#dialogFlavorName').html("Please select "+currentProduct.flavorName);
				
				for (var counter = 0; counter < productFlavorsList.length; counter++) 
				{
					if(currentProduct.id==productFlavorsList[counter].productId)
					{
						$('#dialogFlavor').append('<option value="'+productFlavorsList[counter].flavorId+'">'+productFlavorsList[counter].flavorValue.trim().toUpperCase()+'</option>');		
					}
				}
			}
			else
			{
				$('#dialogFlavor').empty();
				$('.selectFlavor').hide();
			}
					
			if($('#dialogOption').val()!="")
			{
				optionId=$('#dialogOption').val();
			}
			
			var flavorId="";
			if($('#dialogFlavor').val()!="")
			{
				flavorId=$('#dialogFlavor').val();
			}
			
			if(optionId != null)
			{
				var selectedOption = productOptionsList[productOptionMap[optionId]];
				unitPrice=selectedOption.unitPrice.toFixed(2);
				retailPrice=selectedOption.retailPrice.toFixed(2);
			}
			else
			{
				unitPrice = currentProduct.unitPrice.toFixed(2);
				retailPrice = currentProduct.retailPrice.toFixed(2);
			}
			
			if(customerType == "R")
			{
				$('#dialogUntPrice').text(retailPrice);
			}
			else
			{
				$('#dialogUntPrice').text(unitPrice);
			}
			
			var qty = 1;
			$("#dialogqty").val(1);
			var subTotal=calculateTotal(currentProductId,optionId,qty);
			$('#dialogTotal').text(subTotal.toFixed(2));
		});	
		
	});
	
	/*Order search ends*/
	
	/*review Screen starts*/
	
	$("#review").on("pageinit", function() 
	{
		$('.checkoutdialog').hide();
		
		function submitOrder(shippingType,deliveryAddress)
		{
			
			
			while(entries.length > 0)
			{
				entries.pop();
			}
			
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

			for (var i = 0; i <productEntries.length; i++)
			{
				var entry = {};
                entry.productId = productEntries[i].product.id;
                entry.quantity = productEntries[i].qty;
				entry.optionId=productEntries[i].optionId;
				entry.flavorId=productEntries[i].flavorId;
                so.entries.push(entry);
			}
                    
			$.ajax({
			type: 'POST',
			url: baseUrl+'/prodcast/global/saveOrder',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(so),
			success: function(response) 
			{
				if (response.error) 
				{
					alertMessage(response.errorMessage);
				} 
				else 
				{
					outstandingBills = response.customer.outstandingBill;
					writeOutstandingBills( response , false,customerId );
					alertMessage("Your Order has been Placed successfully");
					
					while(productEntries.length > 0)
					{
						productEntries.pop();
						
						
					}
					
					$('.productCount').hide();
					
					$.mobile.navigate('#order');
				}
			}                  
			});
		}
		
		function showPanel(display)
		{
			var responseString = localStorage.getItem("customerSwitchDistributor");
			var customer= JSON.parse( responseString ).customer;
			
			$('#dialogAddress1').val(customer.billingAddress1);
			$('#dialogAddress2').val(customer.billingAddress2+" "+customer.billingAddress3);
			$('#dialogCity').val(customer.city)
			$('#dialogPincode').val(customer.postalCode);
			$('#dialogState').val(customer.state);

			if(display)
			{
				$("#addressValidationMsg").hide();
				$('#dialogShippingMethod').show();
				deliveryType=$('#dialogShippingMethod').val();
				if(deliveryType="0")
				{
					$(".confirmAddress").hide();
				}
				else
				{
					$(".confirmAddress").show();
				}
							
				if(deliveryType=="1")
				{
					$('#addressDetails').show();						
				}
				else
				{
					$('#addressDetails').hide();						
				}		
			}
			else
			{
				$('#addressDetails').show();						
				$('#dialogShippingMethod').hide();
				deliveryType="1"
			}
		}
		
		$("#dialogShippingMethod").change(function() 
		{
			if($("#dialogShippingMethod").val() == "0")
			{
				$(".confirmAddress").hide();
			}
			else
			{
				$(".confirmAddress").show();
			}

			if ($("#dialogShippingMethod").val() == "1") 
			{
				$("#addressDetails :input").css('border', ' 1px solid #d8e1b6');
				$('#addressDetails').show();                       
				$("#addressValidationMsg").hide();		
				deliveryType=$('#dialogShippingMethod').val();
			} 
			else
			{
                $('#addressDetails').hide();                         
				$("#addressValidationMsg").hide();		
				deliveryType=$('#dialogShippingMethod').val();							
            }
        });

		$(document).delegate('.confirmAddress', 'click', function(evt) 
		{	
			$("#selectOrderType").hide();
			$("#addressValidationMsg").hide();
			var validate=true;
			
			if(deliveryType=="2")
			{
				$('.checkoutdialog').dialog("close");
				submitOrder(deliveryType,null);
			}		
			
			if(deliveryType=="1")
			{
				var responseString = localStorage.getItem("customerSwitchDistributor");
				var distributor= JSON.parse( responseString ).distributor;							

				if(parseFloat($("#dialogTotal").text())>=distributor.minimumDeliveryAmount)
				{
					if($('#dialogAddress1').val()=="" )
					{
						$('#dialogAddress1').css('border', '1px solid red');
						validate=false;
					}
							    
					if($('#dialogAddress2').val()=="")
					{
						$('#dialogAddress2').css('border', '1px solid red');
						validate=false;
					}
					
					if( $('#dialogCity').val()=="")
					{
						$('#dialogCity').css('border', '1px solid red');
						validate=false;
					}
					
					if($('#dialogState').val()=="")
					{
						$('#dialogState').css('border', '1px solid red');
						validate=false;
					}
					
					if($('#dialogPincode').val()=="")
					{							 
						$('#dialogPincode').css('border', '1px solid red');
						validate=false;												  
					}
					
					if($('#dialogAddress1').val()!="" && $('#dialogAddress2').val()!="" && $('#dialogCity').val()!="" && $('#dialogState').val()!="" && $('#dialogPincode').val()!="")
					{									
						$('.checkoutdialog').dialog("close");
						submitOrder(deliveryType,$('#dialogAddress1').val()+" "+$('#dialogAddress2').val()+","+$('#dialogCity').val()+","+$('#dialogState').val()+"-"+$('#dialogPincode').val());
					}
				}
				else
				{
					alertMessage("Your totalvalue should be greaterthan or equalto MinimumDeliveryAmount");
				}
			}
			
			if(!validate)
				$("#addressValidationMsg").show();						
			else
				$('#savedialog').dialog("close");
					
		});		

		$('.saveorder').on('click', function() 
		{
			var responseString = localStorage.getItem("customerSwitchDistributor");
			var distType= JSON.parse( responseString ).distributor.fulfillmentType;
						
			if(distType=="0" || distType=="2")
			{
				
				submitOrder(distType,null);
			}
			else 
			{
				$(".checkoutdialog").show();
				$("#addressDetails").hide();
				
				$(".checkoutdialog").dialog({
					modal: true,
					draggable: false,
					resizable: false,
					position: ['center'],
					show: 'blind',
					hide: 'blind',
					height: 'auto',
					dialogClass: 'ui-dialog-osx',
				});
				
				if(distType=="1")
				{
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
		});
		
		$(document).delegate('.qty', 'input',function(evt)
		{
			//evt.preventDefault();
			var currentId=evt.target.id;
			var id = currentId.replace(/[^\d.]/g, '');
			//alert("nothing"+$('#qty'+id).val());
			var qty=$('#qty'+id).val();
			productEntries[id].qty=qty;
			var currentProductId=productEntries[id].product.id;
			var currentOptionId=productEntries[id].optionId;
			
			var subTotal=calculateTotal(currentProductId,currentOptionId,qty);
			$('#subTotal'+id).text(subTotal.toFixed(2));
			viewTotal(productEntries);
		});
		
		$("#odrtbl").on('click','.removeRow',function(evt)
		{
			$(this).parent().parent().remove();
			var clicked = evt.target;
			var revId = clicked.id || "No ID!"
			productEntries.splice(revId , 1);
			
			if(productEntries.length > 0)
			{
				getReviewProducts(productEntries);
				$('.productCount').show();
				$('.productCount').text('('+productEntries.length+')');
				
			}
			else
			{
				$('.productCount').hide();
				$('.saveorder').hide();
			}
			
			viewTotal(productEntries);
		});
			
		$('#co').on('click', function() 
		{
			$.mobile.navigate("#order-new");
		});
		
	});
	
	$("#review").on("pageshow", function() 
	{
		getReviewProducts(productEntries);
		viewTotal(productEntries);
	});
		
	/*review Screen ends*/
});
 