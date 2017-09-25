
$(document).ready(function() {
			//var baseUrl = "http://ec2-52-91-5-22.compute-1.amazonaws.com:8080";
			var baseUrl = "../..";
            /* Global Variable Declaration Begins*/
            var employeeId = "";
            var userRole = "";
			var exp="";
			var expcat_exp="";
			var exp_map ="";
			var expcatId="";
			var expId ="";
			var exp_expmap = {};
			var brand_brandMap = {};
			var areaId="";
			var area_areamap= {};
			var cat_catMap = {};
			var catId="";
			var subcat_subcatMap = {};
			var subcategoryId="";
            var customer_customerList = "";
            var customer_customerMap = {};
            var customer_customerDisplay = [];
            var gid = new Array();
            var billsShown = false;
            var outstandingBills = "";
            var oldSalesHtml = "";
            var oldPaymentHtml = "";
			var oldExpensesHtml = "";
            var originalBills = "";
            var customerId = "";
            var areaMap = "";
            var brandMap = "";
            var catMap = "";
			var subcatMap = "";
			var scatMap = "";
			var resProduct="";
			var prodMap = "";
			var productId="";
            var ccname = "";
			var cname="";
			var ename="";
			var dname="";
            var efname = "";
			var oldExpenses="";
			var originalOrderDetailsTable = "";
			var entry1 = "";
			var trstr1 = "";
			var billDetailsOriginal = "";
			var selectedBill = "";
			var expenseCat="";
			var myDateFormat = "#DD#/#MM#/#YYYY#";
			var myInputDateFormat = "DD/MM/YYYY";
			var myDateFormatDatePicker = "dd/mm/yy";
			var myDateTimeFormat = "#DD#/#MM#/#YYYY# #hh#:#mm#:#ss# #AMPM#";
			var format = "YYYY-MM-DD"
			var delimiter = "-";
			var pname="";
			var inputDelimiter="/";
			var currency = "₹";
			var oldPswd="";
			var newPswd="";
			var activeVal="true";
			var activedist="true";
			var country="";
			var activecust="true";
			var smsAllow="false";
			var confirmPswd="";
			var activeproduct="true";
			var custId="";
			var distId="";
			var empId="";
			var countries="";
			var reportMap="";
			var report_type="";
			var countriesDisplay=[];
			var headerDisplay=[];
			var attributesDisplay=[];
			var originForBillDetails="";
            gid.push("1");

            /* Global Variable Declaration Ens*/
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


			function writeOutstandingBills(response, gotoNewOrder){
					//outstandingBills = response.customer.outstandingBill;
					$('#outstandingdiv').html(originalBills);
						$('#outstandingDiv .tbl').empty();

					if (outstandingBills.length > 0) {
						$('#paymentdiv').show();
						$('#ordmsg').hide();
						$('#outstandingDiv .tbl').empty();
						$('#outstandingDiv .tbl').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">Select</div><div class="tbl-cols">Bill No.</div><div class="tbl-cols">Bill Date</div><div class="tbl-cols">Total ('+currency+')</div><div class="tbl-cols">Balance ('+currency+')</div> </div>');
						for (var counter = 0; counter < outstandingBills.length; counter++) {
							//$('#outstanding').append('<tr><td align="center"><input  id="billSelect'+counter+'" name="billNumber" value="'+outstandingBills[counter].billNumber+'" type="radio"/></td><td align="center"><a class="billNumber"  id="'+outstandingBills[counter].billNumber+'" data-role="button" data-mini="true" >'+outstandingBills[counter].billNumber+'<a/></td><td align="center">'+outstandingBills[counter].billDate+'</td><td align="center">'+outstandingBills[counter].billAmount+'</td><td align="center">'+outstandingBills[counter].outstandingBalance+'</td></tr>');
							$('#outstandingDiv .tbl').append('<div class="tbl-row"><div class="tbl-cols"><input type="radio" id="billSelect' + counter + '" name="outstanding" value="' + outstandingBills[counter].billNumber + '" /></div><div class="tbl-cols"><a class="billNumber"  id="' + outstandingBills[counter].billNumber + '" data-role="button" data-mini="true" href="#billdetailspage">' + outstandingBills[counter].billNumber + '</a></div><div class="tbl-cols" >' + stringToDate( outstandingBills[counter].billDate) + '</div><div class="tbl-cols">' + outstandingBills[counter].billAmount + '</div><div class="tbl-cols">' + outstandingBills[counter].outstandingBalance + '</div></div>');
						}

					} else {
						$('#paymentdiv').hide();
						if( gotoNewOrder ){
							$.mobile.navigate('#order-new');
						}
					}

			}
			function showHide(){
							if (userRole == "D" || userRole == "M") {
			                                    $(".salesmenu").show();
			                                    $(".distmenu").show();
			                                    $(".adminmenu").hide();
			                                } else if (userRole == "S") {
			                                    $(".salesmenu").show();
			                                    $(".distmenu").hide();
			                                    $(".adminmenu").hide();

			                                } else {
			                                    $(".salesmenu").show();
			                                    $(".distmenu").show();
			                                    $(".adminmenu").show();


			                                }
			}


					$.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/global/getCountries',
                        dataType: 'json',
                        encode: true,
                        success: function(response) {

                            if (response.error) {
                                alertmessage(response.errorMessage);
                            } else {
                                countryMap = response.result;
                                for (counter = 0; counter < countryMap.length; counter++) {
                                    $('#country').append('<option value="' + countryMap[counter].countryId + '">' + countryMap[counter].countryName.trim().toUpperCase() + '</option>')
                                    $('#dist_Country').append('<option value="' + countryMap[counter].countryId + '">' + countryMap[counter].countryName.trim().toUpperCase() + '</option>')
                                    $('#Employee_Country').append('<option value="' + countryMap[counter].countryId + '">' + countryMap[counter].countryName.trim().toUpperCase() + '</option>')
									$('#set_country').append('<option value="' + countryMap[counter].countryId + '">' + countryMap[counter].countryName.trim().toUpperCase() + '</option>')
                                }

                            }
                        }
                    });


			$(document).on("pageinit",function(event){
				if( event.target.id != "loginhome" && employeeId == "" ){
					$.mobile.navigate('#loginhome');
				}
			});
			$(document).on("pageshow",function(event){
				if( event.target.id != "loginhome" && employeeId == "" ){
					$.mobile.navigate('#loginhome');
				}
			});

           /* if (employeeId == "") {
				if( !$(location).attr("href").endsWith("#loginhome") && !$(location).attr("href").endsWith("/") ){
					$.mobile.navigate('#loginhome');
				}
                //$.mobile.navigate('#loginhome');
            }
			*/


			$('#loginhome').on("pageinit" , function(){
				$("#LoginUserId").keyup(function(event){
					if(event.keyCode == 13){
						$('#LoginButton').click();
					}
				});
				$("#LoginPassword").keyup(function(event){
					if(event.keyCode == 13){
						$('#LoginButton').click();
					}
				});

			});
			$('#Area').on("pageinit" , function(){
			     $("#Area_Area").keypress(function(event){
					if(event.keyCode == 13){

						$('#AreaId_save').click();
						return false;

					     }
				   });

				   $("#editArea").keypress(function(event){
					if(event.keyCode  == 13){

						$('#editIdsave').click();
						return false;

					     }

				    });
			});

			 $('#productscreen').on("pageinit" , function(){
				    $("#Category_Category").keypress(function(event){
								 if(event.keyCode == 13){
								$('#CategoryId_save').click();
									return false;
							}
							
				       });
				   $("#Brand_Brand").keypress(function(event){
								 if(event.keyCode == 13){
								$('#BrandId_save').click();
									return false;
							}
							

				      });
					$("#subcat").keypress(function(event){
								 if(event.keyCode == 13){
								$('#SubCategoryId_save').click();
									return false;
							}
				     });

					$("#editbrand").keypress(function(event){
						if(event.keyCode == 13){
								$('#editBrandIdsave').trigger("click");
									return false;
						}
					});

					$("#editcategory").keypress(function(event){
						if(event.keyCode == 13){
								$('#editCatIdsave').trigger("click");
									return false;
						}
					});

					$("#editsubcategory").keypress(function(event){
						if(event.keyCode == 13){
								$('#editSubcatIdsave').trigger("click");
									return false;
						}
					});

			 });

			$('#expensescreen').on("pageinit" , function(){

				     $("#exp_amount").keypress(function(event){
								 if(event.keyCode == 13){
								$('#exp_save').trigger("click");
									return false;
							}
				     });
					 $("#exp_desc").keypress(function(event){
								 if(event.keyCode == 13){
								$('#expcat_save').trigger("click");
									return false;
							}
							 });
					$("#editExpCat").keypress(function(event){
						if(event.keyCode == 13){
								$('#editExpIdsave').trigger("click");
									return false;
						}
					});

			  });
			  $("#order-entry").on("pageinit" , function(){
				  $("#payment").keypress(function(event){
								 if(event.keyCode == 13){
								$('#paymentSubmit').click();
									return false;
							}
				       });
					    $("#sopayment").keypress(function(event){
								 if(event.keyCode == 13){
								$('.sopaymentbtn ').click();
									return false;
							}
				       });
				 });

			function expenseAutoComplete(exp_expmap)
			{
					$('#exp_category').val(exp_expmap.categoryId);
					$('#exp_account').val(exp_expmap.account);
					$('#exp_description').val(exp_expmap.description);
					$('#exp_details').val(exp_expmap.description2);
					$('#exp_amount').val(exp_expmap.expenseAmount);
					$('#exp_payment').val(exp_expmap.payMode);
					$('#exp_date').val(stringToDate(exp_expmap.expenseDate));
					expId=exp_expmap.id;


			}


			 function alertmessage(message)
				{
				  $('#okkmsg').html( message );
									  $("#savedialog1").dialog({
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

				$('#okmsg').on('click', function()
				{

								$('#savedialog1').dialog("close");

							});
				}
			$(".distcurrency").html(currency);
			$("#exp_date").datepicker({
                        changeYear: true,
						dateFormat: myDateFormatDatePicker

                    });
			$("#exp_date").val(new Date().customFormat(myDateFormat) );

            $("#productscreen").on("pageinit", function() {

                    var categoryName = "";
                    var categoryId = "";
                    var subcategoryName = "";
                    var subCategoryId = "";
                    var brandName = "";
                    var brandId = "";
                    var productCategoryDisplay = [];
                    var productCategory = "";
					var productBrand="";
                    var productSubCategory = "";
                    var productSubCategoryDisplay = [];
                    var productBrandDisplay = [];

                    var originalBrands = "";
                    var originalCategorys = "";
                    var productDisplay = [];
					var productBrandFull = [];
                    var product = "";
                    var brandMap = "";
					var resSubCat= "";

                    var prodMap = [];

					$('#productcatmsg').hide();
					//$('#prodsavemsg').hide();
					$('#scatexist').hide();
                    $('#validationmsg').hide();
                    $('#emptyalertmsg').hide();
					$('#prodexist').hide();
					$("#reportstartmsg").hide();

                    // get product
						 $('#csmsg').hide();
						 $('#cnameexist').hide();
						$('#brandfill').hide();
						$('#catfill').hide();
						$('#categoryfillalert').hide();
						$('#subcategoryfillalert').hide();
						$('#brandfillalert').hide();
						$('#categoryadded').hide();
						$('#subcategoryadded').hide();
						$('#brandadded').hide();
						$('#categoryexists').hide();
						$('#subcategoryexists').hide();
						$('#brandexists').hide();

						$('#unitprice1').hide();
						$('#categoryfill').hide();
						$('#areafill').hide();
						$('#expcatconfirm').hide();
						$('#expcatfill').hide();
						$('#expcatexit').hide();
						$("#brandconfirm").hide();
						$("#brandon").hide();
						$("#brandexist").hide();
						$("#brandfill").hide();
						$("#catconfirm").hide();
						$('#categoryon').hide();
						$("#catexist").hide();
						$("#catfill").hide();
						$("#subcatconfirm").hide();
						$('#subcategoryon').hide();
						$("#subcatexist").hide();
						$("#subcatfill").hide();
						$('#productvalidationmsg').hide();
						$('#skuvalidationmsg').hide();
						$('#validationmsg').hide();
						$('#subcatTable').hide();
						$("#editBrandVal").hide();
						$("#editBrandNull").hide();
						$("#editSubNull").hide();
						$("#editSubVal").hide();
						$("#editCatNull").hide();
						$("#editCatVal").hide();

					$('#nontax').click(function()
						{
						  if ($(this).is(':checked'))
							{
								if ($('#salestax').val()||$('#salestax').val()== "")
								{
								salary = $("#salestax").val("0");
								}
								else
								{
								salary = $("#salestax").val();
								}
								if ($('#othertax').val()||$('#othertax').val()== "")
								{
								salary = $("#othertax").val("0");
								} else
								{
								salary = $("#othertax").val();
								}
							}
						});

							if ($('#activeprod').is(':checked'))
							{
								activeproduct="true";
							}
							else
							{
								activeproduct="false";
							}

						$('#p_category').on("change",function()
						{
							//var subcatarray = [];
							var subcatcounter=-1;
							$('#subcatTable').empty();
							$('#subcatTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">No</div><div class="tbl-cols">SubCategory Name</div></div>');

							for (counter = 0; counter < productSubCategory.length; counter++)
								{

									 if ($("#p_category").val() == productSubCategory[counter].categoryId)

										{
										subcatcounter++;

										var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (subcatcounter+ 1) + '</div><div class="tbl-cols editablesubcategory" id="subcategoryUpdate_'+productSubCategory[counter].subCategoryId+'">' + productSubCategory[counter].subCategoryName.trim().toUpperCase() + '</div></div>';
										$('#subcatTable').append(newRow);
										$('#subcatTable').show();

										writeSubCategoryTable();



										}


								}

						});
						$('#cnameexist').hide();

						$('#categoryAddInProduct').on("click" , function(){
							document.getElementById('li_e_tabp2').click();
						});

						$('#brandAddInProduct').on("click" , function(){
							document.getElementById('li_e_tabp1').click();
						});

						$('#subcategory_save').on("click" , function(){

							document.getElementById('li_e_tabp4').click();

							//$('#p_category').val()=$('#selectproductcategory').val()
						});

							//$("#selectproductcategory").on("change", function()
							//$("#p_category").val($(this).find("option:selected").attr("value"));



							 //$('#productscreen #selectproductcategory').text( productSubCategory.p_category);


					function subautocomplete(product)
					{
						$('#productdesc').val(product.productDesc);
						$('#productname').val(product.productName);
                            $('#productsku').val(product.productSku);
                            $('#unitprice').val(product.unitPrice);
							$('#unittype').val(product.uom);
							$('#salestax').val(product.salesTax);
         					$('#othertax').val(product.otherTax);
							$('#activeprod')[0].checked=product.active;

							productId=product.id;
							var getcid = [];
                            var getsid = [];
                            var getbid = [];
                            for (var l = 0; l < productCategoryDisplay.length; l++) {
                                getcid.push(productCategoryDisplay[l].value);

                            }
                            for (var j = 0; j < getcid.length; j++) {
                                if (getcid[j] == product.categoryId) {
                                    $('#selectproductcategory').val(productCategoryDisplay[j].label);
									categoryId=product.categoryId;
                                }
                            }
							for (var counter = 0; counter < productSubCategory.length; counter++)
						   {
							   if( product.categoryId== productSubCategory[counter].categoryId)
							   {
                                    productSubCategoryDisplay.push
									({
                                        label: productSubCategory[counter].subCategoryName,
                                        value: productSubCategory[counter].subCategoryId
                                    });
							   }
						   }

                            for (var l = 0; l < productSubCategoryDisplay.length; l++) {
                                getsid.push(productSubCategoryDisplay[l].value);

                            }
                            for (var j = 0; j < getsid.length; j++) {
                                if (getsid[j] == product.subCategoryId) {
                                    $('#selectsubcategory').val(productSubCategoryDisplay[j].label);
									subCategoryId=product.subCategoryId;
                                }
                            }

                            for (var l = 0; l < productBrandDisplay.length; l++) {
                                getbid.push(productBrandDisplay[l].value);

                            }
                            for (var j = 0; j < getbid.length; j++) {
                                if (getbid[j] == product.brandId) {
                                    $('#selectproductbrand').val(productBrandDisplay[j].label);
									brandId=product.brandId;
                                }
                            }



					}


			function toViewAllproducts(response)
			{
				if (response.error) {
                                alertmessage(response.errorMessage);
                            } else {
                                originalAllProducts = $('#viewallproductsDiv').html();
								$('#allproductsTable').empty();
								$('#allproductsTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">S.No</div><div class="tbl-cols">Product Name</div><div class="tbl-cols">Product Description</div><div class="tbl-cols">Unit Price</div> </div>');

                                for (counter = 0; counter < response.result.length; counter++) {
                                    var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols"><a class="viewallproductsName" id="'+response.result[counter].id+'" data-toggle="tab" data-mini="true"  aria-expanded="true">'+response.result[counter].productName.trim().toUpperCase() +'</a></div><div class="tbl-cols">' + response.result[counter].productDesc.toUpperCase() + '</div><div class="tbl-cols">' + response.result[counter].unitPrice + '</div></div>';

										$('#allproductsTable').append(newRow);
										$('#allproductsTable').show();
                                }
							$('.viewallproductsName').on("click" , function(evt){
							document.getElementById('li_e_tabp3').click();
							subautocomplete(prodMap[evt.target.id]);
							$("#save_product").html('Update');


						});



                            }
			}



                    $.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/getProducts?employeeId=' + employeeId,
                        dataType: 'json',
                        success: function(response) {
                            if (response.error == 'true') {
                              alertmessage('Please refresh the page and try again');

                            } else {

                                product = response.result;
                                while (productDisplay.length > 0) {
                                    productDisplay.pop();
                                }
                                for (var counter = 0; counter < product.length; counter++) {
                                    prodMap[product[counter].id] = product[counter];

                                    productDisplay.push({
                                        "label": product[counter].productName.trim().toUpperCase(),
                                        "value": product[counter].id

                                    });
                                }


                            }


                        }
                    });
					$("#productname").autocomplete({
                        source: productDisplay,
                        select: function(event, ui) {
                            // prevent autocomplete from updating the textbox
                            event.preventDefault();
                            // manually update the textbox and hidden field
                            $(this).val(ui.item.label);
                            //alert(ui.item.value);
                            pid = ui.item.value;
                            var product = prodMap[pid];
                            $('#productdesc').val(product.productDesc);
                            $('#productsku').val(product.productSku);
                            $('#unitprice').val(product.unitPrice);
							$('#unittype').val(product.uom);
                            $('#salestax').val(product.salesTax);
                            $('#othertax').val(product.otherTax);
							$('#activeprod')[0].checked=product.active;
                            var getcid = [];
                            var getsid = [];
                            var getbid = [];
                            for (var l = 0; l < productCategoryDisplay.length; l++) {
                                getcid.push(productCategoryDisplay[l].value);

                            }
                            for (var j = 0; j < getcid.length; j++) {
                                if (getcid[j] == product.categoryId) {
                                    $('#selectproductcategory').val(productCategoryDisplay[j].label);
									categoryId=product.categoryId;
                                }
                            }
							for (var counter = 0; counter < productSubCategory.length; counter++)
						   {
							   if( product.categoryId== productSubCategory[counter].categoryId)
							   {
                                    productSubCategoryDisplay.push
									({
                                        label: productSubCategory[counter].subCategoryName,
                                        value: productSubCategory[counter].subCategoryId
                                    });
							   }
						   }

                            for (var l = 0; l < productSubCategoryDisplay.length; l++) {
                                getsid.push(productSubCategoryDisplay[l].value);

                            }
                            for (var j = 0; j < getsid.length; j++) {
                                if (getsid[j] == product.subCategoryId) {
                                    $('#selectsubcategory').val(productSubCategoryDisplay[j].label);
									subCategoryId=product.subCategoryId;
                                }
                            }

                            for (var l = 0; l < productBrandDisplay.length; l++) {
                                getbid.push(productBrandDisplay[l].value);

                            }
                            for (var j = 0; j < getbid.length; j++) {
                                if (getbid[j] == product.brandId) {
                                    $('#selectproductbrand').val(productBrandDisplay[j].label);
									brandId=product.brandId;
                                }
                            }


                        }

                    });
                    //brand and category page inits
 						brandId=area_areamap.brandId;
                    $.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/getBrands?employeeId=' + employeeId,
                        dataType: 'json',
                        encode: true,
                        success: function(response) {

                            if (response.error) {
                                alertmessage(response.errorMessage);
                            } else {
                                originalBrands = $('#brandsDiv').html();
                                $('#brandconfirm').hide();
                                $('#brandon').hide();
                                $('#brandexist').hide();
                                brandMap = response.result;
                                for (counter = 0; counter < response.result.length; counter++) {
									brand_brandMap[brandMap[counter].brandId] = brandMap[counter];
                                    //var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + response.result[counter].brandName.trim().toUpperCase() + '</div></div>';
									var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols editableBrand" id="brandUpdate_'+brandMap[counter].brandId+'">' + brandMap[counter].brandName.trim().toUpperCase() + '</div></div>';
                                    //alert( newRow );
                                    $('#brandsTable').append(newRow);
									$('#brandsTable').show();
                                }
									writeBrandTable();

                            }
                       }
                    });





					//view allproducts page inits

					$.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/getProducts?employeeId=' + employeeId,
						dataType: 'json',
                        encode: true,
                        success: function(response) {

                            toViewAllproducts(response,true);
                        }
                    });

					//view allproducts page init ends


					$.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/getCategory?employeeId=' + employeeId,
                        dataType: 'json',
                        encode: true,
                        success: function(response) {

                            if (response.error) {
                                alertmessage(response.errorMessage);
                            } else {
                                originalCategorys = $('#categorysDiv').html();
                                $('#catconfirm').hide();
                                $('#categoryon').hide();
                                $('#catexist').hide();
                                catMap = response.result;
                                for (counter = 0; counter < response.result.length; counter++) {
                                    cat_catMap[catMap[counter].categoryId] = catMap[counter];
									                                    var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + ' </div><div class="tbl-cols editablecategory" id="categoryUpdate_'+response.result[counter].categoryId+'">' + response.result[counter].categoryName.trim().toUpperCase()+ '</div></div>';
									                                    //alert( newRow );
									                                    $('#catsTable').append(newRow);
																		$('#p_category').append('<option value="' + response.result[counter].categoryId + '">' + response.result[counter].categoryName.trim().toUpperCase() + '</option>')
																		$('#catsTable').show();
									                                }
																			$('.editablecategory').on("click", function(evt){
																			$('#categoryon').hide();
																			editcategory(evt);
																			$("#catconfirm").hide();
																			savecategory();
																		});

																		catId=area_areamap.categoryId;
									                            }
									                        }
									                    });
						function writeCategoryTable()
							{
							$('.editablecategory').on("click", function(evt){
							$('#categoryon').hide();
							editcategory(evt);
						$("#catconfirm").hide();
							savecategory();

							});
							}

                    // getcategory ajax call begins
                    $.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/getCategory?employeeId=' + employeeId,
                        dataType: 'json',
                        success: function(response) {
							$('#categoryfillalert').hide();
							$('#categoryadded').hide();
							$('#categoryexists').hide();
                            if (response.error == 'true') {
                           alertmessage('Please refresh the page and try again');

                            } else {
                                productCategory = response.result;
                                while (productCategoryDisplay.length > 0) {
                                    productCategoryDisplay.pop();
                                }
                                //alert(productBrand.length);
                                for (var counter = 0; counter < productCategory.length; counter++) {

                                    productCategoryDisplay.push({
                                        label: productCategory[counter].categoryName.trim().toUpperCase(),
                                        value: productCategory[counter].categoryId
                                    });

                                }
                            }
                        }
                    });
                    // getcategory ajax call ends
                    // getcategory  autocomplete mapping begins
                    $("#selectproductcategory").autocomplete({
                        source: productCategoryDisplay,

                        select: function(event, ui) {

                            // prevent autocomplete from updating the textbox
                            event.preventDefault();
                            // manually update the textbox and hidden field
                            $(this).val(ui.item.label);
                            categoryId = ui.item.value;
							while (productSubCategoryDisplay.length > 0) {
                                    productSubCategoryDisplay.pop();
									}
						   for (var counter = 0; counter < productSubCategory.length; counter++)
						   {
							   if(categoryId== productSubCategory[counter].categoryId)
							   {
                                    productSubCategoryDisplay.push
									({
                                        label: productSubCategory[counter].subCategoryName.trim().toUpperCase(),
                                        value: productSubCategory[counter].subCategoryId
                                    });
							   }
						   }



                        }

                    });



                    // getcategory  autocomplete mapping ends
					//get subCategory begins
					 $.ajax({
                        type: 'GET',
                        url:baseUrl+'/prodcast/distributor/getSubCategory?employeeId=' + employeeId,
                        dataType: 'json',
                        encode: true,
                        success: function(response)
						{


                            if (response.error)
							{
                                alertmessage(response.errorMessage);
                            }


							else

							{
                                originalsubcat = $('#subcatDiv').html();
                                $('#subcatconfirm').hide();
                                $('#subcategoryon').hide();
                                $('#subcatexist').hide();
                                productSubCategory = response.result;
								subcatMap=response.result;

                                for (counter = 0; counter < response.result.length; counter++)
								{

                                 subcat_subcatMap[productSubCategory[counter].subCategoryId] = productSubCategory[counter];
								                                     /*var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols editablesubcategory" id="subcategoryUpdate_'+response.result[counter].subCategoryId+'">' + response.result[counter].subCategoryName.trim().toUpperCase() + '</div></div>';
								                                     alert( newRow );
								 									$('#subcatTable').append(newRow);
								 									$('#subcatTable').show();*/
								                                 }


								 								$('.editablesubcategory').on("click", function(evt){
																		$('#subcategoryon').hide();
																		$("#subcatconfirm").hide();
								 										editsubcategory(evt);
																		savesubcategory();

								 									});



								                             }
								                         }
                    });

					//subcategory ends

							writeSubCategoryTable();



                    // getsubcategory ajax call begins
                    $.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/getSubCategory?employeeId=' + employeeId,
                        dataType: 'json',
                        success: function(response)
						{

							$('#subcategoryfillalert').hide();
							$('#productcatmsg').hide();
							$('#categoryfill').hide();
							$('#categoryexists').hide();
							$('#subcategoryexists').hide();
							$('#subcategoryadded').hide();
                            if (response.error == 'true') {
                                alertmessage('Please refresh the page and try again');

                            } else {
                                productSubCategory = response.result;
								subcatMap=response.result;
                                //alert(productBrand.length);
                                while (productSubCategoryDisplay.length > 0) {
                                    productSubCategoryDisplay.pop();
                                }
                            for (var counter = 0; counter < productSubCategory.length; counter++)
						   {
							   if(categoryId== productSubCategory[counter].categoryId)
							   {
                                    productSubCategoryDisplay.push
									({
                                        label: productSubCategory[counter].subCategoryName.trim().toUpperCase(),
                                        value: productSubCategory[counter].subCategoryId
                                    });
							   }
						   }/* for (var counter = 0; counter < productSubCategory.length; counter++) {
                                    productSubCategoryDisplay.push({
                                        label: productSubCategory[counter].subCategoryName,
                                        value: productSubCategory[counter].subCategoryId
                                    });
                                }*/
                            }
                        }
                    });
                    // getsubcategory ajax call ends
                    // getcategory  autocomplete mapping begins
                    $("#selectsubcategory").autocomplete({
                        source: productSubCategoryDisplay,
                        select: function(event, ui) {

                            // prevent autocomplete from updating the textbox
                            event.preventDefault();
                            // manually update the textbox and hidden field
                            $(this).val(ui.item.label);

                          subCategoryId = ui.item.value;

                            //alert(subCatId);


                        }

                    });
                    // getsubcategory  autocomplete mapping ends
                    // getproductbrand ajax call begins
                    $.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/getBrands?employeeId=' + employeeId,
                        dataType: 'json',
                        success: function(response) {

						$('#brandfillalert').hide();
						$('#brandadded').hide();
						$('#brandexists').hide();
						if (response.error == 'true') {
                                alertmessage('Please refresh the page and try again');

                            } else {
                                var productBrand = response.result;
                                //alert(productBrand.length);
                                while (productBrandDisplay.length > 0) {
                                    productBrandDisplay.pop();
                                }
                                for (var counter = 0; counter < productBrand.length; counter++) {

                                    productBrandDisplay.push({
                                        label: productBrand[counter].brandName.trim().toUpperCase(),
                                        value: productBrand[counter].brandId
                                    });
                                }
                            }
                        }
                    });
                    // getproductbrand ajax call ends
                    // getproductbrand  autocomplete mapping begins
                    $("#selectproductbrand").autocomplete({
                        source: productBrandDisplay,
                        select: function(event, ui) {

                            // prevent autocomplete from updating the textbox
                            event.preventDefault();
                            // manually update the textbox and hidden field
                            $(this).val(ui.item.label);
                            brandId = ui.item.value;
                            //alert($(this).val(ui.item.label));


                        }

                    });
                    // getproductbrand  autocomplete mapping ends
                    // save category begins
                    $('#category_save').on("click", function() {
						$('#categoryexists').hide();
						$('#categoryfillalert').hide();
						$("#selectproductcategory").val($("#selectproductcategory").val().trim());
                        categoryName = $("#selectproductcategory").val().toUpperCase().replace(/\s/g, '');

                         if (categoryName == "")
						{
                            $('#categoryfillalert').show();
							return;
                        }
						else{

						for(var i=0;i<catMap.length;i++)
						{
							if(catMap[i].categoryName.trim().toUpperCase().replace(/\s/g, '')==categoryName)
							{
								$('#categoryexists').show();
							    categoryid = catMap[i].categoryId;
								return;
							}


						}



						}

                        var formData2 = {
                            "employeeId": employeeId,
                            "categoryName": categoryName.toUpperCase(),
                        };
                        $.ajax({
                            type: 'POST',
                            url: baseUrl+'/prodcast/distributor/saveCategory',
                            dataType: 'json',
                            data: formData2,
                            encode: true,
                            success: function(response) {
                                if (response.error) {
                                    alertmessage(response.errorMessage);
                                } else

                                {
										$('#categoryadded').show();
									//$("#catconfirm").show();
                                    //$("#subcatconfirm").hide();
                                    //$("#brandconfirm").hide();
                                    var res1 = response.result;
									catMap=res1;
									productCategory=res1;
                                    var recat = [];
                                    var recatFull = [];
                                    //alert(productBrand.length);
                                    $('#categorysDiv').html(originalCategorys);
                               		$('#catsTable').empty();
									$('#catsTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols"> </div><div class="tbl-cols"> Category Id </div><div class="tbl-cols"> Category Name </div></div>');
									  for (counter = 0; counter < response.result.length; counter++) {
										var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + ' </div><div class="tbl-cols">' + response.result[counter].categoryName.trim().toUpperCase()+ '</div></div>';
										//alert( newRow );
										//$('#catsTable').append('<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + ' </div><div class="tbl-cols">' + response.result[counter].categoryId + '</div><div class="tbl-cols">' + response.result[counter].categoryName.trim().toUpperCase()+ '</div></div>');
										$('#catsTable').append(newRow);
										//$('#catsTable').show();
									  }


                                    for (var k = 0; k < res1.length; k++) {
                                        recatFull.push({
                                            label: res1[k].categoryName,
                                            value: res1[k].categoryId

                                        });
										if ($("#selectproductcategory").val().trim().toUpperCase() == res1[k].categoryName.trim().toUpperCase()) {


                                         categoryId = res1[k].categoryId;

                                    }

                                    }

									while (productCategoryDisplay.length > 0) {

												productCategoryDisplay.pop();
											}

											//alert(productBrand.length);
											for (var counter = 0; counter < productCategory.length; counter++) {

												productCategoryDisplay.push({
													label: productCategory[counter].categoryName.trim().toUpperCase(),
													value: productCategory[counter].categoryId
												});

											}

                                }
                            }
                        });
                    });

                    // save category ends
                    // save subcategory begins


					var select = document.getElementById('selectproductcategory');
					var input = document.getElementById('p_category');
                    $('#subcategory_save').on("click", function()
					{


						$('#p_category').val($('#selectproductcategory').val());

						/*if(productCategory.categoryId == productSubCategory.catgoryId)
								{
									$('#p_category').val('#selectproductcategory');
									select.value = input.value;

								}
						*/

						$("#selectsubcategory").val($("#selectsubcategory").val().trim());

						subcategoryName = $("#p_category").val().toUpperCase();
                        subcategoryName = $("#selectsubcategory").val().toUpperCase();
                        //$('#validationmsg21').show();
						if(categoryId=="")
						{
							//$('#categoryfill').show();
							return;
						}
						else
						{
							if (subcategoryName == "")
							{
								$('#subcategoryfillalert').show();
								return;

							}
							else
							{
							//$('#subcategoryfillalert').hide();
								for(var i=0;i<subcatMap.length;i++)
								{
									 if (subcatMap[i].subCategoryName.trim().toUpperCase() == subcategoryName)
									 {
										$('#subcategoryexists').show();
										subCatId=subcatMap[i].subCategoryId;
										return;

									}

								}
							}
						}

						var mainofsubcategory = categoryId;
                        //alert(categoryId);
                        var formData3 = {
                            "employeeId": employeeId,
                            "categoryId": mainofsubcategory,
                            "subCategoryName": subcategoryName.toUpperCase(),
                        };
                        $.ajax({
                            type: 'POST',
                            url: baseUrl+'/prodcast/distributor/saveSubCategory',
                            dataType: 'json',
                            data: formData3,
                            encode: true,
                            success: function(response) {
                                if (response.error) {
                                    alertmessage(response.errorMessage);
                                } else
								{

									$('#subcatDiv').html(originalsubcat);
									$('#subcategoryadded').show();

									$('#scatexist').hide();
                                    var resSubCat = response.result;
									subcatMap=resSubCat;
									productSubCategory=resSubCat;
                                    var reSubCat = [];
									var reSubCatFull = [];



									$('#subcatDiv').html(originalsubcat);
									$('#subcatTable').empty();
									$('#subcatTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">No</div><div class="tbl-cols">SubCategory Name</div></div>');
									for (counter = 0; counter < response.result.length; counter++)
									{



											var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + ' </div><div class="tbl-cols">' + response.result[counter].subCategoryName + '</div></div>';

											//alert( newRow );
											$('#subcatTable').append(newRow);



									}

									 for (var k = 0; k < resSubCat.length; k++)
									{


                                        reSubCatFull.push({

                                            label: resSubCat[k].subCategoryName.trim().toUpperCase(),
                                            value: resSubCat[k].subCategoryId

                                        });

										if ($("#selectsubcategory").val().trim().toUpperCase() == resSubCat[k].subCategoryName.trim().toUpperCase())
									{

                                        subCategoryId = resSubCat[k].subCategoryId;
										$('#scatexist').hide();
                                    }

									while (productSubCategoryDisplay.length > 0)
									{
										productSubCategoryDisplay.pop();
									}
									for (var counter = 0; counter < productsubcategory.length; counter++)
									{

										productSubCategoryDisplay.push({
										label: productsubcategory[counter].subCategoryName.trim().toUpperCase(),
										value: productsubcategory[counter].subCategoryId
										});
									}


                                    }

                                }
                            }
                        });

                    });
                    // save subcategory ends

                    // save productbrand begins
                    var resprodbrandArray = [];
                    var resprodbrandFull = [];
                    $('#productbrand_save').on("click", function()
					{
						$("#brandadded").hide();
						$("#selectproductbrand").val($("#selectproductbrand").val().trim());
                        brandName = $("#selectproductbrand").val().toUpperCase();

							if (brandName == "")
							{
								$('#brandfillalert').show();
								return;
							}
							else
							{
								for(var i=0;i<brandMap.length;i++)
								{
									if(brandMap[i].brandName.trim().toUpperCase()==brandName)
									{
										$('#brandexists').show();
										brandid=brandMap[i].brandId;
										return;
									}
									else{
										$('#brandadded').show();
										return;
								}

								}
							}

						//$('#validationmsg31').show();

                        var formData1 = {
                            "employeeId": employeeId,
                            "brandId" : brandId,
                            "brandName": brandName.toUpperCase(),
                        };
                        $.ajax({
                            type: 'POST',
                            url: baseUrl+'/prodcast/distributor/saveBrand',
                            dataType: 'json',
                            data: formData1,
                            encode: true,
                            success: function(response) {

                                if (response.error) {
                                    alertmessage(response.errorMessage);
                                } else {

									$('#brandadded').show();
									$("#scatexist").hide();
                                    $("#catconfirm").hide();
                                    $("#brandon").hide();
                                    $("#subcatconfirm").hide();
                                    $("#brandconfirm").hide();

                                    var resProdbrand = response.result;
									brandMap=resProdbrand;
									productBrand=resProdbrand;
									$('#brandsDiv').html(originalBrands);
									 $('#brandsTable').empty();
									 $('#brandsTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols"> </div><div class="tbl-cols">Brand Id</div><div class="tbl-cols">Brand Description</div></div>');
                                     for (counter = 0; counter < response.result.length; counter++) {
										var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + response.result[counter].brandName.trim().toUpperCase() + '</div></div>';
										//alert( newRow );
										$('#brandsTable').append(newRow);
									 }
                                    //alert(productBrand.length);
                                    /*resprodbrandArray.push({

                                        label: resProdbrand[resProdbrand.length - 1].brandName,
                                        value: resProdbrand[resProdbrand.length - 1].brandId

                                    });*/


                                    for (var k = 0; k < resProdbrand.length; k++) {
                                        resprodbrandFull.push({

                                            label: resProdbrand[k].brandName.trim().toUpperCase(),
                                            value: resProdbrand[k].brandId

                                        });
										 if ($("#selectproductbrand").val().trim().toUpperCase() == resProdbrand[k].brandName.trim().toUpperCase()) {

                                        brandId = resProdbrand[k].brandId;
                                    }
                                    }
										 while (productBrandDisplay.length > 0) {
											productBrandDisplay.pop();
											  }
										for (var counter = 0; counter < productBrand.length; counter++) {

												productBrandDisplay.push({
												label: productBrand[counter].brandName.trim().toUpperCase(),
												value: productBrand[counter].brandId
													});
										}

                                }
                            }
                        });

                    });
					$('categoryfill').hide();
					$('categoryfillalert').hide();
					$('subcategoryfillalert').hide();
					$('brandfillalert').hide();
					$('categoryadded').hide();
					$('subcategoryadded').hide();
					$('brandadded').hide();
                    // save productbrand ends
                    //Product save begins

                    var priceType = "";
                    var active = "";
                    var pid = "";
                    var originalBrands = "";
                    var originalCategorys = "";

                    $('#priceType input').on('change', function() {
                        priceType = ($('input[name="option"]:checked', '#priceType').val());
                        //alert(priceType);
                    });
                    $('#active').change(function() {
                        active = ($(this).val());
                        //alert(active);
                    });
					//edit brand//
					function editBrand(evt)
							{
								brandId=evt.target.id.split("_")[1];
								$('#editbrand').val($('#'+evt.target.id).html());
								$("#editBrandDialog").dialog({
                            modal: true,
                            draggable: false,
                            resizable: false,
                            position: ['center'],
                            show: 'blind',
                            hide: 'blind',
                            width: 150,
                            height: 170,
                            dialogClass: 'ui-dialog-osx',
                        });
						}
					function savebrand()
					{
						    $("#editBrandNull").hide();
						    $("#editBrandVal").hide();
					$('#editBrandIdsave').on('click', function(){
							$("#editBrandNull").hide();
						    $("#editBrandVal").hide();
							var editbrand = "";

								editbrand = $("#editbrand").val().trim().toUpperCase();
									if (editbrand == "")
										{
									$('#editbrand').css('border', '1px solid red');
									$("#editBrandNull").show();
									return;
									}
								else
										{
										   for (var counter = 0; counter < brandMap.length; counter++)
											   {

													if (brandMap[counter].brandName == editbrand)
													{
													$('#editbrand').css('border', '1px solid red');
													$("#editBrandVal").show();



													return;
													}

												}

										}
						var formData = {
							"employeeId": employeeId,
							"brandId" : brandId,
							"brandName": editbrand
						};

								$.ajax({
								type: 'POST',
								url: baseUrl+'/prodcast/distributor/saveBrand',
								dataType: 'json',
								data: formData,
								encode: true,
								success: function(response) {
									if (response.error) {
										alertmessage(response.errorMessage);
									}
							else {
								for (counter = 0; counter < brandMap.length; counter++)
											{
												$('#editbrand').css('border', '1px solid green');

												if(brandMap[counter].brandId == brandId){
													brandMap[counter].brandName=editbrand;
													$("#editBrandVal").hide();
													$("#editBrandNull").hide();

												break;

												}


											}
								$('#brandon').show();

                              $('#brandUpdate_'+brandId).html(editbrand);
								brandId="";


							$('#editBrandDialog').dialog("close");
							$("#editbrand").val('');
							}
						}

					});


				});
			}
			function writeBrandTable()
							{
							$('.editableBrand').on("click", function(evt){
							 $("#brandon").hide();
							$("#brandconfirm").hide();
							editBrand(evt);
							savebrand();

							});
							}

                    //save for brand and category tab
                    $('#BrandId_save').on("click", function()
					{
						brandId="";
						$("#brandconfirm").hide();
							$('#brandon').hide();

					$("#brandexist").hide();
						$("#brandfill").hide();



                        var brandName = "";
						 brandName = $("#Brand_Brand").val().trim().toUpperCase();
                        if ($('#Brand_Brand').val() == "") {
                            $('#Brand_Brand').css('border', '1px solid red');
							$('#brandfill').show();
                            return;
                        } else {
                              brandName = $("#Brand_Brand").val().trim().toUpperCase();
                        }



                        for (var counter = 0; counter < brandMap.length; counter++) {
                            if (brandMap[counter].brandName.trim().toUpperCase() == brandName) {
                                $('#Brand_Brand').css('border', '1px solid red');
                                $('#brandexist').show();
                                return;
                            }
                        }

                        var formData = {
                            "employeeId": employeeId,
							"brandId":"",
                            "brandName": brandName.toUpperCase()
                        };

                            $.ajax({
                                type: 'POST',
                                url: baseUrl+'/prodcast/distributor/saveBrand',
                                dataType: 'json',
                                data: formData,
                                encode: true,
                                success: function(response) {

                                    if (response.error) {
                                        alertmessage(response.errorMessage);
                                    } else {
										$("#Brand_Brand").css('border', ' 1px solid #d8e1b6');
                                        $("#Brand_Brand").val("");
                                        $('#brandsDiv').html(originalBrands);
										$('#brandfill').hide();
                                        $('#brandexist').hide();
										brandMap=response.result;

                                        for (counter = 0; counter < brandMap.length; counter++) {


											var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols editableBrand" id="brandUpdate_'+brandMap[counter].brandId+'">' + brandMap[counter].brandName.trim().toUpperCase() + '</div></div>';
											//alert( newRow );
                                            $('#brandsTable').append(newRow);
                                            $('#brandconfirm').show();
                                            //$('#brandconfirm').hide();
                                            $('#brandexist').hide();
											$('#brandsDiv').show();


                                           }


										   writeBrandTable();


										var productBrand=response.result;
											 for (var counter = 0; counter < productBrand.length; counter++) {

											productBrandDisplay.push({
												label: productBrand[counter].brandName.trim().toUpperCase(),
												value: productBrand[counter].brandId
											});
										}

                                       /*$("#selectproductbrand").autocomplete({
                                        source:productBrandFull,
                                        select: function(event, ui) {

                                            // prevent autocomplete from updating the textbox
                                            event.preventDefault();
                                            // manually update the textbox and hidden field
                                            brandId = ui.item.value;
                                            $(this).val(ui.item.label);
                                            //alert($(this).val(ui.item.label));


                                        }

                                    });*/

                                    }
                                }
                            });
                    });

							function editsubcategory(evt)

							{
								subCategoryId=evt.target.id.split("_")[1];
								$('#editsubcategory').val($('#'+evt.target.id).html());
								$("#editSubCategoryDialog").dialog({
                            modal: true,
                            draggable: false,
                            resizable: false,
                            position: ['center'],
                            show: 'blind',
                            hide: 'blind',
                            width: 150,
                            height: 170,
                            dialogClass: 'ui-dialog-osx',
                        });
						}
						function savesubcategory()
						{
							$("#editSubNull").hide();
							$("#editSubVal").hide();
						$('#editSubcatIdsave').on('click', function()
						{
							$("#editSubNull").hide();
							$("#editSubVal").hide();

							 var editsubcategory = "";

								editsubcategory = $("#editsubcategory").val().trim().toUpperCase();
								if (editsubcategory == "")
									{
									$('#editsubcategory').css('border', '1px solid red');
									$("#editSubNull").show();
									return;
									}
								else

									{
										   for (var counter = 0; counter < subcatMap.length; counter++)
										   {

													if (subcatMap[counter].subCategoryName == editsubcategory)//|| ($("#p_category").val()!="")||$("#subcat").val()=="")
													{

													$('#editsubcategory').css('border', '1px solid red');
													$("#editSubVal").show();
													return;

													}

												}

										}



												//if (($("#p_category").val()!="")||$("#subcat").val()=="")
													//{
														//for (var counter = 0; counter < subcatMap.length; counter++)
										                  // {
														//if (subcatMap[counter].subCategoryName == editsubcategory)
													        //  {
													             //  $('#editsubcategory').css('border', '1px solid red');
													                 //    $("#editSubVal").show();
													                  //   return;
													          // }
														  // }
										  // }




							var formData = {
							"employeeId": employeeId,
							"categoryId": categoryId,
							"subCategoryId":subCategoryId,
                              "subCategoryName": editsubcategory
                        };

								$.ajax({
								type: 'POST',
								url: baseUrl+'/prodcast/distributor/saveSubCategory',
								dataType: 'json',
								data: formData,
								encode: true,
								success: function(response) {
									if (response.error) {
										alertmessage(response.errorMessage);
									}
							else {
									 
									$('#editsubcategory').css('border', '1px solid green');
									$("#editSubNull").hide();
							        $("#editSubVal").hide();
									//subcatMap=response.result;
								for (counter = 0; counter < subcatMap.length; counter++)
											{
												if(subcatMap[counter].subCategoryId == subCategoryId)
												{
													subcatMap[counter].subCategoryName=editsubcategory;
													
													break;

												}


											}

									$('#subcategoryon').show();
                              $('#subcategoryUpdate_'+subCategoryId).html(editsubcategory);
								subCategoryId="";

							$('#editSubCategoryDialog').dialog("close");
							$("#editsubcategory").val('');
						}
					}

				});


			});
			}
			function writeSubCategoryTable()
							{
							$('.editablesubcategory').on("click", function(evt){
							$('#subcategoryon').hide();
							editsubcategory(evt);
						    $("#subcatconfirm").hide();
							savesubcategory();

							});
							}

					// SubCategoryId_save
					 $('#SubCategoryId_save').on("click", function()
					{
						subCategoryId="";
						$("#subcatconfirm").hide();
							$("#subcategoryon").hide();
						$("#subcatexist").hide();
						$("#subcatfill").hide();


						var subCategoryName  = "";
						subCategoryName=$('#subcat').val().trim().toUpperCase();
						if (subCategoryName == "")
						{
							$('#subcat').css('border', '1px solid red');
							$('#subcatfill').show();
							return;
						}
						else
						{
                             subCategoryName = $("#subcat").val().trim().toUpperCase();

							for (var counter = 0; counter < subcatMap.length; counter++)
							{
								if (subcatMap[counter].subCategoryName == subCategoryName)
								{

									$('#subcat').css('border', '1px solid red');
									$('#subcatexist').show();

									return;
								}
							}

						}

						var mainsubcategory = $("#p_category").val();
                        //alert(categoryId);


							var formData = {
							"employeeId": employeeId,
							"categoryId": mainsubcategory,
							"subCategoryId":"",
                            "subCategoryName": subCategoryName.toUpperCase()
                        };
						  $.ajax({
                                type: 'POST',
                                url:  baseUrl+'/prodcast/distributor/saveSubCategory',
                                dataType: 'json',
                                data: formData,
                                encode: true,
                                success: function(response)
								{

                                    if (response.error) {
                                        alertmessage(response.errorMessage);
                                    }
									else
									{

										// productSubCategory = response.result;
                                        $("#subcat").val("");
                                        $('#subcatDiv').html(originalsubcat);
										$('#subcatfill').hide();
                                        $('#subcatexist').hide();

										$('#subcatTable').empty();
										$('#subcatTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">No</div><div class="tbl-cols">SubCategory Name</div></div>');
										subcatMap=response.result;
                                        for (counter = 0; counter < subcatMap.length; counter++)
										{

											if ($("#p_category").val() == subcatMap[counter].categoryId) {

												 var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols editablesubcategory" id="subcategoryUpdate_'+subcatMap[counter].subCategoryId+'">' + subcatMap[counter].subCategoryName.trim().toUpperCase() + '</div></div>';

												//alert( newRow );
												$('#subcatTable').append(newRow);
												$('#subcatconfirm').show();
												$('#subcatTable').show();

												$('#subcatexist').hide();
												$('#subcatDiv').show();
											}
                                        }

										writeSubCategoryTable();
												var productSubCategory = response.result;
										while( productSubCategoryDisplay.length > 0 ){
											productSubCategoryDisplay.pop();
										}

										for (var k = 0; k < productSubCategory.length; k++) {
                                        productSubCategoryDisplay.push({

                                            label: productSubCategory[k].subCategoryName,
                                            value: productSubCategory[k].subCategoryId

                                            });
                                        }

                                       /*$("#selectsubcategory").autocomplete
									   ({
												source: productSubCategoryDisplay,
												select: function(event, ui)
											{

												// prevent autocomplete from updating the textbox
												event.preventDefault();
												// manually update the textbox and hidden field
												subCategoryId = ui.item.value;
												$(this).val(ui.item.label);
												//alert($(this).val(ui.item.label));


											}

										});*/

                                    }
                                }
                            });



					 });

					function editcategory(evt)
							{
								catId=evt.target.id.split("_")[1];
								$('#editcategory').val($('#'+evt.target.id).html());
								$("#editCategoryDialog").dialog({
                            modal: true,
                            draggable: false,
                            resizable: false,
                            position: ['center'],
                            show: 'blind',
                            hide: 'blind',
                            width: 150,
                            height: 170,
                            dialogClass: 'ui-dialog-osx',
                        });
						}

						function savecategory()
						{
							$("#editCatNull").hide();
							$("#editCatVal").hide();
						$('#editCatIdsave').on('click', function()
						{
							$("#editCatNull").hide();
							$("#editCatVal").hide();
							var editcategory = "";


								editcategory = $("#editcategory").val().trim().toUpperCase();
								if (editcategory == "")
									{
									$('#editcategory').css('border', '1px solid red');
									$("#editCatNull").show();
									return;
									}
								else
										{
										   for (var counter = 0; counter < catMap.length; counter++)
											   {

													if (catMap[counter].categoryName == editcategory)
													{
													$('#editcategory').css('border', '1px solid red');
													$("#editCatVal").show();

													return;
													}

												}

										}

								var formData = {
									"employeeId": employeeId,
									"catId" : catId,
									"categoryName": editcategory
								};

								$.ajax({
								type: 'POST',
								url: baseUrl+'/prodcast/distributor/saveCategory',
								dataType: 'json',
								data: formData,
								encode: true,
								success: function(response) {
									if (response.error) {
										alertmessage(response.errorMessage);
									}
							else {
								$('#editcategory').css('border', '1px solid green');
								for (counter = 0; counter < catMap.length; counter++)
											{


												if(catMap[counter].categoryId == catId)
												{
													catMap[counter].categoryName=editcategory;
													$("#editCatNull").hide();
							                         $("#editCatVal").hide();

												break;

												}


											}
												$("#p_category").empty();
												$("#p_category").append("<option value=''></option>");
												for (counter = 0; counter < catMap.length; counter++)
												{


													 $('#p_category').append('<option value="' + catMap[counter].categoryId + '">' + catMap[counter].categoryName + '</option>')
												}
								 $('#categoryon').show();
                              $('#categoryUpdate_'+catId).html(editcategory);
								catId="";

							$('#editCategoryDialog').dialog("close");
							$("#editcategory").val('');
						}
					}

				});


			});


		}


					//brand complete
					//category begin


                    $('#CategoryId_save').on("click", function()
					{
						catId="";
						$('#categoryon').hide();
                        $("#catconfirm").hide();
						$("#catexist").hide();
						$("#catfill").hide();
                        var categoryName = "";
                        if ($('#Category_Category').val() == "") {
                            $('#Category_Category').css('border', '1px solid red');
							$('#catfill').show();
                            return;
                        } else {
                             categoryName = $("#Category_Category").val().trim().toUpperCase();
                        }
                        categoryName = categoryName.toUpperCase();

                        for (var counter = 0; counter < catMap.length; counter++) {
                            if (catMap[counter].categoryName.trim().toUpperCase() == categoryName) {
                                $('#Category_Category').css('border', '1px solid red');
                                $('#catexist').show();
                                return;
                            }
                        }


                        var formData = {
                            "employeeId": employeeId,
							"catId" : "",

                            "categoryName": categoryName.toUpperCase()
                        };

                            $.ajax({
                                type: 'POST',
                                url: baseUrl+'/prodcast/distributor/saveCategory',
                                dataType: 'json',
                                data: formData,
                                encode: true,
                                success: function(response) {

                                    if (response.error) {
                                        alertmessage(response.errorMessage);
                                    } else {
										//tMap=response.result;
										$("#Category_Category").css('border', ' 1px solid #d8e1b6');
                                        $("#Category_Category").val("");
                                        $('#categorysDiv').html(originalCategorys);
										$('#catfill').hide();
                                        $('#catexist').hide();
										$('#p_category').empty();
										$('#p_category').append('<option value="">Select Category</option>');
										catMap=response.result;
                                        for (counter = 0; counter < catMap.length; counter++) {
                                            var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + ' </div><div class="tbl-cols editablecategory" id="categoryUpdate_'+catMap[counter].categoryId+'">' + catMap[counter].categoryName.trim().toUpperCase()+ '</div></div>';
                                           $('#p_category').append('<option value="' + catMap[counter].categoryId + '">' + catMap[counter].categoryName + '</option>')

										   //alert( newRow );
                                            $('#catsTable').append(newRow);
                                            $('#catconfirm').show();

											$('#catexist').hide();
											$('#categorysDiv').show();
                                        }

											writeCategoryTable();

										var	productCategory=response.result;
										for (var x = 0; x < productCategory.length; x++) {

                                            productCategoryDisplay.push({
                                            label: productCategory[x].categoryName,
                                            value: productCategory[x].categoryId
                                             });

										}
										$("#selectproductcategory").autocomplete({
										    source: productCategoryDisplay,
										    select: function(event, ui) {

												// prevent autocomplete from updating the textbox
												event.preventDefault();
												// manually update the textbox and hidden field
												$(this).val(ui.item.label);
												categoryId = ui.item.value;
												/*while (productSubCategoryDisplay.length > 0) {
														productSubCategoryDisplay.pop();
														}
											   for (var counter = 0; counter < productSubCategory.length; counter++)
											   {
												   if(categoryId== productSubCategory[counter].categoryId)
												   {
														productSubCategoryDisplay.push
														({
															label: productSubCategory[counter].subCategoryName,
															value: productSubCategory[counter].subCategoryId
														});
												   }
											   }*/
																}

												});
										  }
                                  }
							});
						});







                    $("#save_product").on("click", function()
                        {
							$('#productvalidationmsg').hide();
							$('#skuvalidationmsg').hide();
							$('#otmsg').hide();
							$('#stmsg').hide();
							$("#unittypemsg").hide();

                            var productName = "";
                            var prodvalidate = true;
                            if ($("#productname").val() == "") {
                                prodvalidate = false;
                                $('#productname').css('border', '1px solid red');
                            } else {
                                productName = $("#productname").val().toUpperCase();
                            }

                            var productDesc = "";
                            if ($("#productdesc").val() == "") {
                                prodvalidate = false;
                                $('#productdesc').css('border', '1px solid red');
                            } else {
                                productDesc = $("#productdesc").val().toUpperCase();
                            }

                            var productsku = "";
                            if ($("#productsku").val() == "") {
                                prodvalidate = false;
                                $('#productsku').css('border', '1px solid red');
                            } else {
                                productsku = $("#productsku").val().toUpperCase();
                            }


                            var unitprice = $("#unitprice").val();

                            if ($("#unitprice").val() == "") {
                                prodvalidate = false;
                                $('#unitprice').css('border', '1px solid red');
                            } else {
                                if($("#unitprice").val()<=0)
								{
									$('#unitprice1').show();
								}
								else {

								$('#unitprice1').hide();
								}
                            }
							 var unittype = "";

                            if ($("#unittype").val() == "") {
                                prodvalidate = false;
                                $('#unittype').css('border', '1px solid red');
								$("#unittypemsg").show();
                            }
							else {
                                unittype = $("#unittype").val().toUpperCase();

                            }

							var salesTax = "";
							if ($('#salestax').val() < 0 || $('#salestax').val() > 100 )
							{
									prodvalidate = false;
									$('#salestax').css('border', '1px solid red');
									$('#stmsg').show();

							}

							else
							{
								salesTax = $("#salestax").val();

							}
							if ($('#salestax').val() == "") {
								prodvalidate = false;
								$('#salestax').css('border', '1px solid red');
							} else {
								salesTax = $("#salestax").val();
							}

							var otherTax = "";
							if ($('#othertax').val() < 0 || $('#othertax').val() > 100 )
							{
									prodvalidate = false;
									$('#othertax').css('border', '1px solid red');
									$('#otmsg').show();
							}

							else
							{
								otherTax = $("#othertax").val();

							}

							if ($('#othertax').val() == "") {
								prodvalidate = false;
								$('#othertax').css('border', '1px solid red');
							} else {
								otherTax = $("#othertax").val();
							}

                            if (pid == "") {
                                pid = 0;
                            }
                            if ($("#selectproductcategory").val() == ""||categoryId=="") {
                                prodvalidate = false;
                                $('#selectproductcategory').css('border', '1px solid red');
								$('#categoryfillalert').show();
                            }

                            else
							{
								for(var i=0;i<catMap.length;i++)
								{
									if(categoryName==catMap[i].categoryName)
									{
										if(categoryId != catMap[i].categoryId)
										{
											$('#productcatmsg').show();
											break;
										}
									}
								}

							}




						    if ($("#selectsubcategory").val() == "" || subCategoryId == "" ) {
                                prodvalidate = false;
                                $('#selectsubcategory').css('border', '1px solid red');
								$('#subcategoryfillalert').show();
                            }

                            if ($("#selectproductbrand").val() == ""||brandId=="") {
                                prodvalidate = false;
                                $('#selectproductbrand').css('border', '1px solid red');
								$('#brandfillalert').show();
                            }
							 productName = productName.toUpperCase();


							for(var id in prodMap){
								if(productId!=(""+id)){
									if (prodMap[id].productName.trim().toUpperCase() == productName) {
										$('#productname').css('border', '1px solid red');
                                        prodvalidate = false;
										$('#productvalidationmsg').show();
									}
								}
							}


							for(var id in prodMap){
								if(productId!=(""+id)){
									if (prodMap[id].productSku.trim().toUpperCase() == productsku) {
										$('#productsku').css('border', '1px solid red');
										$('#skuvalidationmsg').show();
                                        prodvalidate = false;
									}
								}

							}

                            //alert(prodformData.UnitPrice);
                            if (prodvalidate == false)

                            {
                                $('#validationmsg').show();
                            } else

                            {


                                var formData3 = {
                                    "employeeId": employeeId,
                                    "productId": productId,
                                    "productName": productName,
                                    "productDesc": productDesc,
                                    "productSku": productsku,
                                    "unitPrice": unitprice,
									"uom"      :unittype,
                                    "salesTax": salesTax,
                                    "otherTax": otherTax,
                                    "priceType": 'R',
                                    "categoryId": categoryId,
                                    "subCategoryId": subCategoryId,
                                    "brandId": brandId,
                                    "active": activeproduct




                                };

								$.ajax({
                                    type: 'POST',
                                    url: baseUrl+'/prodcast/distributor/saveProduct',
                                    dataType: 'json',
                                    data: formData3,
                                    encode: true,
                                    success: function(response) {
                                        if (response.error) {
                                            alertmessage(response.errorMessage);
                                        } else {
										    alertmessage("A new product has been saved successfully");
											//$.mobile.loading('hide');

											if(productId=="")
														{
														   alertmessage("A new product has been saved successfully");

														}
													else
														{
														   alertmessage("The product has been update successfully");

														}

                                            //$('#prodsavemsg').show();
                                            $('#brandadded').hide();
											$('#productvalidationmsg').hide();
											$('#skuvalidationmsg').hide();
											$("#productscreen :input").css('border', ' 1px solid #d8e1b6');
                                            $("#productscreen").find('input').val('');
											productId="";
											$('#unitprice').val("");
											product = response.result;
												while (productDisplay.length > 0) {
												productDisplay.pop();
											}
											for (var counter = 0; counter < product.length; counter++) {
												prodMap[product[counter].id] = product[counter];
												productDisplay.push({
													"label": product[counter].productName,
													"value": product[counter].id

												});
												if ($("#productname").val().trim().toUpperCase() == product[counter].productName.trim().toUpperCase()) {

                                                pid = product[counter].id;
                                            }

											}
											toViewAllproducts(response,true);

											$("#save_product").html('Save');

                                        }
                                    }




                                });
                            }


                            //alert(formData3.productId);
                            //alert(formData3.subCategoryId);



                        });



                    //Product save ends
                    $('#reset_product').on('click', function()

                        {
                            $("#productscreen").find('input:text').val('');
							$('#unitprice').val("");
							$("#save_product").html('Save');
							$("#unittype").val("");
							$('#salestax').val("");
							$('#othertax').val("");
                            $("#productscreen :input").css('border', ' 1px solid #d8e1b6');
							$('#productvalidationmsg').hide();
							$('#skuvalidationmsg').hide();
                            $('#validationmsg').hide();
							$('#brandfill').hide();
							$('#catfill').hide();
							$('#subcategoryfillalert').hide();
							$('#brandfillalert').hide();
							$('#categoryfillalert').hide();
							$('#categoryfill').hide();
							$('#unitprice1').hide();
							$('#productcatmsg').hide();
							$('#productsubcatmsg').hide();
							$('#productbrandmsg').hide();
							$('#otmsg').hide();
							$('#stmsg').hide();
							$("#unittypemsg").hide();
							$("#activeprod")[0].checked=true;





							 for (var counter = 0; counter < product.length; counter++) {
                                    prodMap[product[counter].id] = product[counter];
                                    productDisplay.push({
                                        "label": product[counter].productName,
                                        "value": product[counter].id

                                    });
                                }

                        });
                    $("#productname").on('click', function()

                        {
                          //  $('#prodsavemsg').hide();
                            $('#validationmsg').hide();
							$('#brandfill').hide();
							$('#catmsg').hide();
							$('#catfill').hide();
							$('#subcategoryfillalert').hide();
							$('#brandfillalert').hide();
							$('#categoryfillalert').hide();
							$('#categoryfill').hide();
							$('#unitprice1').hide();
							$('#productcatmsg').hide();
							$('#productbrandmsg').hide();
							$('#skuvalidationmsg').hide();
							$('#productvalidationmsg').hide();
							$('#otmsg').hide();
							$('#stmsg').hide();
							$("#unittypemsg").hide();







                        });
						$("#productscreen :input").on('click', function()
						{
                            $(this).css('border', ' 1px solid #d8e1b6');
                            //$('#prodsavemsg').hide();
                            $('#validationmsg').hide();
                            $("#brandon").hide();
                            $('#brandexist').hide();
							$('#brandfill').hide();
							$('#categoryon').hide();
                            $('#brandconfirm').hide();
							$('#catexist').hide();
                            $('#catfill').hide();
                            $('#catconfirm').hide();
                            $('#subcategoryon').hide();
							$('#subcatconfirm').hide();
							$('#subcatfill').hide();
							$('#subcatexist').hide();
							$('#categoryfillalert').hide();


							$('#categoryfill').hide();
							$('#subcategoryfillalert').hide();
							$('#brandfillalert').hide();
							$('#categoryadded').hide();
							$('#subcategoryadded').hide();
							$('#brandadded').hide();
							$('#categoryexists').hide();
							$('#subcategoryexists').hide();
							$('#brandexists').hide();
							$('#unitprice1').hide();

							$('#productcatmsg').hide();
							$('#productsubcatmsg').hide();
							$('#productbrandmsg').hide();
							$('#skuvalidationmsg').hide();
							$('#productvalidationmsg').hide();
							$('#otmsg').hide();
							$('#stmsg').hide();
							$("#unittypemsg").hide();
							$("#editBrandVal").hide();
							$("#editBrandNull").hide();
							$("#editSubNull").hide();
							$("#editSubVal").hide();
							$("#editCatNull").hide();
							$("#editCatVal").hide();
                        });
                });

			//Validation for email//
			function validateEmail(email)
			{
				  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				  return re.test(email);
			}


			//Area Screen Auto Load
            var originalAreas = "";
            var originalBrands = "";
            var originalCategorys = "";

            //Expense Screen Save Starts

			$('#expcatconfirm').hide();
			$('#expcatexist').hide();
			$('#expcatfill').hide();



            var originalExpenses = "";

            function resetDistributorScreen() {
                $("#dist_companyName").val("");
                $("#dist_manufacturer").val(" ");
                $("#dist_title").val("");
                $("#dist_firstname").val("");
                $("#dist_lastname").val("");
                $("#dist_gender").val("");
                $("#dist_cellphone").val("");
                $("#dist_homephone").val("");
                $("#dist_workphone").val("");
                $("#dist_EmailId").val("");
                $("#dist_Addrline1").val("");
                $("#dist_Addrline2").val("");
                $("#dist_Addrline3").val("");
                $("#dist_City").val("");
                $("#dist_state").val("");
                //$("#dist_Country").val("");
                $("#dist_Postalcode").val("");
                $("#dist_comments").val("");

            };
			//BilldetailsPage Starts//
			function returnQty(evt)
										{
											productId=evt.target.id.split("_")[1];
											$('#returnQty').val($('#'+evt.target.id).html());
											$("#returnDialog").dialog({
			                            modal: true,
			                            draggable: false,
			                            resizable: false,
			                            position: ['center'],
			                            show: 'blind',
			                            hide: 'blind',
			                            width: 300,
			                            height: 220,
			                            dialogClass: 'ui-dialog-osx',
			                        });
									}

				$(document).delegate('.billNumber', 'click', function(evt){


					selectedBill=evt.target.id;
					$.mobile.navigate("#billdetailspage");
					originForBillDetails="order-entry";
			});
			$("#billdetailspage").on('pageinit', function(){

				billDetailsOriginal= $('#billdetailspage').html();
				$("#returnQtymsg").hide();
			});
			$("#billdetailspage").on('pageshow', function(e) {
				var returnEntries=[];
				var productId = "";
				$("#returnQtymsg").hide();

					//billDetailsOriginal= $('#billdetailspage').html();
					$('#billdetailspage').html( billDetailsOriginal);
					$(".distcurrency").html(currency);

					$('.printable').on('click', function(evt){

						window.print();
					});
					showHide();
					$("#deleteorder").on('click',function(){

									 var formdata ={ "billNo" : selectedBill };
									$.ajax({
										type: 'POST' ,
										url : baseUrl+'/prodcast/distributor/deleteOrder',
										dataType : 'json',
										data : formdata,
										encode : true,

										success : function( response ){
											if( response.error) {
												alertmessage('Please refresh the page and try again');

												}
												else{


													alertmessage("The order has been deleted successfully");
													$('#selectbillnumber').val('');
													$.mobile.navigate("#ordersscreen");

																//$("#orderdetailspage").hide();
												}
										}
									});
								});
								$('#returnIdsave').on('click', function(){
									$("#returnQtymsg").hide();


														var returnQty = "";

														returnQty = $("#returnQty").val();
														if ($('#returnQty').val() == "")
														{
															$('#returnQty').css('border', '1px solid red');
															$("#returnQtymsg").show();
														return;
														}
														if($('#returnQty').val()<=0)
															{
															$('#returnQty').css('border', '1px solid red');
															$("#returnQtymsg").show();
															return;
														}




													var formdata={
																	"employeeId":employeeId,
																	"quantity":returnQty,
																	"billNo" :selectedBill,
								                                   "comments ":"",

								                                   "productId":productId,
																};
															$.ajax({
																type: 'POST',
																url: baseUrl+'/prodcast/distributor/returnProduct',
																dataType: 'json',
																data : formdata,
																encode : false,
																success: function(response) {

																	if (response.error) {
																		 alertmessage(response.errorMessage);
																		 $.mobile.navigate('#'+originForBillDetails);

																	}
																	else {

																		 var order = response.order;

																		$('#billdetailspage #rordtable').empty();
																		$('#billdetailspage #rordtable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">No</div><div class="tbl-cols">Product</div><div class="tbl-cols">Qty</div><div class="tbl-cols">Price</div><div class="tbl-cols">Sales Tax</div><div class="tbl-cols">Other Tax </div><div class="tbl-cols">Sub Total</div></div>');

																		//$('#rordtable').empty();
																		 var orderEntries = order.returnEntries;
																				// $('#billdetailspage #totalAmount').text( orderEntries.amount );
																		  $('#billdetailspage #totalAmount').text( order.totalAmount );
																		  $('#billdetailspage #outstandingBalance').text(order.outstandingBalance );

																		  if( originForBillDetails == "order-entry"){
																			  for(var i =0;i<outstandingBills.length;i++){
																				  if( outstandingBills[i].billNumber == selectedBill){
																					  outstandingBills[i].billAmount = order.totalAmount;
																					  outstandingBills[i].outstandingBalance = order.outstandingBalance;
																					  writeOutstandingBills( response, false );
																					  break;
																				  }
																			  }
																		  }

																		 for(counter=0;counter<orderEntries.length;counter++){
																		 var entry1 = orderEntries[counter];
																		 var trstr1 = '<div class="tbl-row"><div class="tbl-cols">'+(counter+1)+'</div><div class="tbl-cols">'+entry1.productName+'</div><div class="tbl-cols">'+entry1.quantity+'</div><div class="tbl-cols">'+entry1.unitPrice+'</div><div class="tbl-cols">'+entry1.salesTax+'</div><div class="tbl-cols">'+entry1.otherTax+'</div><div class="tbl-cols">'+entry1.subtotal+'</div></div>';
																		 $('#billdetailspage #rordtable').append( trstr1 );
																		 $('#billdetailspage #rordtable').show();

																	 }
										                               	$("#returnDialog").dialog("close");
																			$("#returnQty").val("");
																		 alertmessage("Thank you. Your product is returned ");
																	}

																	       }
															});
												});



					$.ajax({
					type: 'GET' ,
					url : baseUrl+'/prodcast/global/billdetails?billId='+selectedBill+'&employeeId='+employeeId+'&userRole='+userRole,
					dataType : 'json',
					success : function( response ){
						if( response.error ) {
							alertmessage(response.errorMessage);
							//alertmessage('Please refresh the page and try again');
							$.mobile.navigate('#'+originForBillDetails);

							}
							else{
								 var order = response.order;
								 var customer=order.customer;
								 var customerAddress=(customer.billingAddress1+" "+customer.billingAddress2+" "+customer.billingAddress3);
							     var  custStatepost=(customer.city+","+customer.state+customer.postalCode);
								 var distributor=order.distributor;
							     var distAddress=(distributor.address1+" "+distributor.address2+" "+distributor.address3);
								 var  distCityState=(distributor.city+","+distributor.state+distributor.postalCode);
								 var distPhoneNumber=("PhoneNumber:"+distributor.homePhone)	;
								 var custPhoneNumber=("PhoneNumber:"+customer.phonenumber)	;

									var  discount=$('#discountValue').val();
									if($('#discountValue').val()=="")
									{
										discount=currency+'0';
									}

									 var returntype=$("#discountType").val();

									 if(returntype==1){
										 discount=currency+(order.discount);
										 //discount=($(".distcurrency").html(currency))+(order.discount);
									 }
									  if(returntype==2){
										 discount=(order.discount)+'%';
								  }

								   $('#billdetailspage #distMname').text( distributor.companyName );
								   $('#billdetailspage #distAddress').text(distAddress );
								   $('#billdetailspage #distCity').text(distCityState );
								   $('#billdetailspage #distPhone').text(distPhoneNumber );

								   $('#billdetailspage #customerMname').text( customer.customerName );
								   $('#billdetailspage #custAddress').text(customerAddress );
								   $('#billdetailspage #custCity').text(custStatepost );
								   $('#billdetailspage #custPhone').text(custPhoneNumber);

								   $('#billdetailspage #billNumber').text( selectedBill );
								   $('#billdetailspage #billDate').text( stringToDate (order.billDate) );
								   $('#billdetailspage #employeeName').text( order.employeeName );
								   $('#billdetailspage #discountValue').text(discount);
								   $('#billdetailspage #totalAmount').text( order.totalAmount );
								  $('#billdetailspage #outstandingBalance').text( order.outstandingBalance );
								 //Adding products.
									 var orderEntries = order.orderEntries;

									 for(counter=0;counter<orderEntries.length;counter++){
										 var entry1 = orderEntries[counter];
										  var trstr1 = '<div class="tbl-row"><div class="tbl-cols">'+(counter+1)+'</div><div class="tbl-cols">'+entry1.productName+'</div><div class="tbl-cols"><a class="returnProduct" id="'+entry1.productId+'">'+entry1.quantity+'</a></div><div class="tbl-cols">'+entry1.unitPrice+'</div><div class="tbl-cols">'+entry1.salesTax+'</div><div class="tbl-cols">'+entry1.otherTax+'</div><div class="tbl-cols">'+entry1.subtotal+'</div></div>';

										 $('#billdetailspage #ordtable').append( trstr1 );
										 $('#billdetailspage #ordtable').show();
									 }

									 orderEntries = order.collectionEntries;

									 for(counter=0;counter<orderEntries.length;counter++){
										 var entry1 = orderEntries[counter];
										 var trstr1 = '<div class="tbl-row"><div class="tbl-cols">'+(counter+1)+'</div><div class="tbl-cols">'+stringToDate(entry1.paymentDate)+'</div><div class="tbl-cols">'+entry1.employeeName+'</div><div class="tbl-cols">'+entry1.amountPaid+'</div></div>';
										 $('#billdetailspage #paytable').append( trstr1 );
									 }
									 var orderEntries = order.returnEntries;

									 									 for(counter=0;counter<orderEntries.length;counter++){
									 										 var entry1 = orderEntries[counter];
									 										 var trstr1 = '<div class="tbl-row"><div class="tbl-cols">'+(counter+1)+'</div><div class="tbl-cols">'+entry1.productName+'</div><div class="tbl-cols">'+entry1.quantity+'</div><div class="tbl-cols">'+entry1.unitPrice+'</div><div class="tbl-cols">'+entry1.salesTax+'</div><div class="tbl-cols">'+entry1.otherTax+'</div><div class="tbl-cols">'+entry1.subtotal+'</div></div>';
									 										 $('#billdetailspage #rordtable').append( trstr1 );
									 										 $('#billdetailspage #rordtable').show();
									 }
									 $(".returnProduct").on('click',function(evt){
									 										productId = evt.target.id;

									 										returnQty(evt);

									 });
								}
						}
					});
					$("#b_close").on('click', function(evt){

							$.mobile.navigate('#'+originForBillDetails);

					   });
				$("#billdetailspage :input").on('click', function() {
																	$(this).css('border', ' 1px solid #d8e1b6');
																	$("#ordermsg").hide();
																	$("#returnQtymsg").hide();
											  });

			 });
//BilldetailsPage Ends//
          /*  $('#distributor_reset1').on('click', function() {
                $("#dist_gender")[0].selectedIndex = 0;


					$("input[type=number], textbox").val("");
					$('#dist_manufacturer').on('change',function() {
					$('#dist_manufacturer').attr('selectedIndex',0);
					});


                    $("#distab1").find('input:text').val('');
                    $("#distab1 :input").css('border', ' 1px solid #d8e1b6');
					$("#distab2").find('input:text').val('');
                    $("#distab2 :input").css('border', ' 1px solid #d8e1b6');
					$("#distab3").find('input:text').val('');
					$("#distab3 :input").css('border', ' 1px solid #d8e1b6');
					$("input[type=email], textbox").val("");
            });
            $('#distributor_reset2').on('click', function() {
                 $("#dist_gender")[0].selectedIndex = 0;


					$("input[type=number], textbox").val("");
					$('#dist_manufacturer').on('change',function() {
					$('#dist_manufacturer').attr('selectedIndex',0);
					});


                    $("#distab1").find('input:text').val('');
                    $("#distab1 :input").css('border', ' 1px solid #d8e1b6');
					$("#distab2").find('input:text').val('');
                    $("#distab2 :input").css('border', ' 1px solid #d8e1b6');
					$("#distab3").find('input:text').val('');
					$("#distab3 :input").css('border', ' 1px solid #d8e1b6');
					$("input[type=email], textbox").val("");
				});

            $('#distributor_reset3').on('click', function() {
                 $("#dist_gender")[0].selectedIndex = 0;


									$("input[type=number], textbox").val("");
									$('#dist_manufacturer').on('change',function() {
									$('#dist_manufacturer').attr('selectedIndex'," ");
									});


				                    $("#distab1").find('input:text').val('');
				                    $("#distab1 :input").css('border', ' 1px solid #d8e1b6');
									$("#distab2").find('input:text').val('');
				                    $("#distab2 :input").css('border', ' 1px solid #d8e1b6');
									$("#distab3").find('input:text').val('');
									$("#distab3 :input").css('border', ' 1px solid #d8e1b6');
									$("input[type=email], textbox").val("");

            });*/

			$("#ordersscreen").on('pageinit', function(){

				$("#ordermsg").hide();
				$("#pordermsg").hide();


											  $("#goBillnum").on('click', function() {

												 if($('#selectbillnumber').val()=="")
												  {
													 $('#selectbillnumber').css('border', '1px solid red');
														$("#ordermsg").show();
														return;
												  }


												   if(!isNaN($('#selectbillnumber').val()))
												   {
												selectedBill = $('#selectbillnumber').val();
												 if(selectedBill!=""){

													  $.mobile.navigate("#billdetailspage");
														  }
											         }
											         originForBillDetails="ordersscreen";

											  });
											  $("#ordersscreen :input").on('click', function() {
													$(this).css('border', ' 1px solid #d8e1b6');
													$("#ordermsg").hide();
													$("#pordermsg").hide();
											  });


									   });


				//save expenseCategory strats//
						 function writeExpCatTable()
							{
							$('.editableExpCat').on("click", function(evt){
							$('#expcaton').hide();
							 $("#expcatconfirm").hide();
							 saveExpCategory();
							editExpCat(evt);

							});
							}


						function saveExpCategory()
							{
								$('#editExpVal').hide();
								$('#editExp').hide();
							$('#editExpIdsave').on('click', function(){

								$('#editExpVal').hide();
								$('#editExp').hide();
								var expCat = "";

								expCat = $("#editExpCat").val().trim().toUpperCase();
								if (expCat == "")
									{
									$('#editExpCat').css('border', '1px solid red');
									$('#editExpVal').show();
									return;
									}
								else
									{
										for(var i=0;i<expenseCat.length;i++)
				                           {
					                                 if(expenseCat[i].categoryDesc==expCat)
					                      {
						                                   $('#editExpCat').css('border', '1px solid red');
														   $('#editExp').show();
						                 					return;
											}
				                          }

										}


									var formData = {
										"employeeId": employeeId,
									   "expenseCategoryId": expcatId,
                                       "catgDesc": expCat

											};

									$.ajax({
									type: 'POST',
									 url:baseUrl+'/prodcast/distributor/saveExpenseCategory',
									dataType: 'json',
									data: formData,
									encode: true,
									success: function(response) {
												if (response.error) {
													alertmessage(response.errorMessage);
												}
									     	else {
												 $('#editExpVal').hide();
													 $('#editExp').hide();
												$('#editExpCat').css('border', '1px solid green');
												for(var i=0;i<expenseCat.length;i++)
				                                 {
											   if(expenseCat[i].categoryId==expcatId){
					                                 expenseCat[i].categoryDesc=expCat;

														break;
												}
				                               }

												$("#exp_category").empty();
												 $('#exp_category').append('<option value="">Select Category</option>');

												for (counter = 0; counter < expenseCat.length; counter++)
												{


													 $('#exp_category').append('<option value="' + expenseCat[counter].categoryId + '">' + expenseCat[counter].categoryDesc + '</option>');

												}

										$('#expcaton').show();
										$('#expCatUpdate_'+expcatId).html(expCat);
										expcatId="";
										$('#editCatDialog').dialog("close");
										$("#editExpCat").val('');
									}

								}

							});




						});
							}
							 function editExpCat(evt)
							{
								expcatId=evt.target.id.split("_")[1];
								$('#editExpCat').val($('#'+evt.target.id).html());
								$("#editCatDialog").dialog({
                            modal: true,
                            draggable: false,
                            resizable: false,
                            position: ['center'],
                            show: 'blind',
                            hide: 'blind',
                            width: 150,
                            height: 170,
                            dialogClass: 'ui-dialog-osx',
                        });
						}


            $('#expcat_save').on("click", function() {
				expcatId="";
				$('#expcaton').hide();
				$("#exp_desc").css('border', ' 1px solid #d8e1b6');
				$('#expcatconfirm').hide();
				$('#expcatexist').hide();
				$('#expcatfill').hide();
				$("#editExpVal").hide();
				$("#editExp").hide();


                var catgDesc = "";
                if ($('#exp_desc').val() == "") {
                    $('#exp_desc').css('border', '1px solid red');
					$('#expcatfill').show();

                    return;
                } else {
                    catgDesc = $("#exp_desc").val().trim().toUpperCase();
					$("#exp_desc").val(catgDesc);
                }
				for(var i=0;i<expenseCat.length;i++)
				{
					if(expenseCat[i].categoryDesc.trim().toUpperCase()==catgDesc)
					{
						$('#exp_desc').css('border', '1px solid red');
						$('#expcatexist').show();

						return;
					}
				}
				//catgDesc = catgDesc.toUpperCase();

                var formData = {
                    "employeeId": employeeId,
					//"expenseCategoryId":"",
                    "catgDesc": catgDesc
                };
                if (formData.catgDesc != "")
                    $.ajax({
                        type: 'POST',
                        url: baseUrl+'/prodcast/distributor/saveExpenseCategory',
                        dataType: 'json',
                        data: formData,
                        encode: true,
                        success: function(response) {

                            if (response.error) {
                                alertmessage(response.errorMessage);
                            } else {
								$("#exp_desc").css('border', ' 1px solid #d8e1b6');
                                $("#exp_desc").val("");
								$('#expcatfill').hide();
                                $('#ExpDiv').html(originalExpenses);
                                $('#exp_category').empty();
                                $('#exp_category').append('<option value="">Select Category</option>');
								$('#expcatexist').hide();
								$('#expcatconfirm').show();

								//catgDesc = $("#exp_desc").val().trim().toUpperCase();
								expenseCat=response.result;

				                for (counter = 0; counter < expenseCat.length; counter++) {

								var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols editableExpCat" id="expCatUpdate_'+expenseCat[counter].categoryId+'">' + expenseCat[counter].categoryDesc + '</div></div>';
                                    $('#exp_category').append('<option value="' + expenseCat[counter].categoryId + '">' + expenseCat[counter].categoryDesc + '</option>');
                                        //alert( newRow );
                                    $('#ExpTable').append(newRow);
									$('#ExpTable').show();
                                }
								writeExpCatTable();


                            }
                        }
                    });
                $("#expensescreen :input").on('click', function() {
                    $(this).css('border', ' 1px solid #d8e1b6');
					$('#expcatfill').hide();
					$('#expcaton').hide();
					$('#expcatexist').hide();
					$('#expcatconfirm').hide();
					$("#editExp").hide();
					$("#editExpVal").hide();
                });
            });

            //Expense Screen Save Ends
            //Product save begins


/*report for distributor starts*/
				$("#reportfordistributor").on("pageinit", function() {


				$("#disreportstartmsg").hide();
                $("#disreportodaymsg").hide();
                $("#disreportendmsg").hide();
                $('#disreportendnullmsg').hide();
               $('#disreportnullmsg').hide();
			   $('#discustomrangediv').hide();
					$.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/getReportType',
                        dataType: 'json',
                        encode: true,
                        success: function(response) {

                            if (response.error) {
                                alertmessage(response.errorMessage);
                            } else {
								reportMap = response.result;
                                for (counter = 0; counter < reportMap.length; counter++) {
                                    $('#disreportsType').append('<option value="' + reportMap[counter].reportId + '">' + reportMap[counter].reportName + '</option>')
                                }

                            }
                        }
                    });
					$.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/distributor/getEmployees?employeeId=' + employeeId,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == null) {
                            alertmessage("SQL Error");

                        } else {
                            var emp = response.result;
							for (counter = 0; counter < emp.length; counter++) {
                               $('#disEmployee').append('<option value="' + emp[counter].employeeId + '">' + emp[counter].firstname +' '+ emp[counter].lastname + '</option>')
                            }

                        }
                    }
                });


				$('#disreport_startdate').datepicker({
                        changeYear: true,
						dateFormat: myDateFormatDatePicker

                    });
				$('#disreport_enddate').datepicker({
                        changeYear: true,
						dateFormat: myDateFormatDatePicker

                    });


            });
			function JSONToCSVConvertor(arrData, ReportTitle,exportHeaderDisplay,exportAttributesDisplay) {
							//If JSONData is not an object then JSON.parse will parse the JSON string in an Object


							var CSV = '';
							//Set Report title in first row or line

							var str="";
							for (counter = 0; counter < exportHeaderDisplay.length; counter++) {
                               str+=exportHeaderDisplay[counter]+',';

							}
							//str.slice(0,str.length-1);
							  CSV+=str+'\r\n';
							//$('#reportTable').append().trigger('create');*/

							for(i=0;i<arrData.length;i++)
							{
								var val_str="";

								for (counter = 0; counter < exportAttributesDisplay.length; counter++)
								{
									var col_name=exportAttributesDisplay[counter];
									var value=eval("arrData["+i+"]."+col_name);
									val_str+='"'+value+'",';
								}
							val_str.slice(0, val_str.length - 1);

								//add a line break after each row
								CSV += val_str + '\r\n';
							}




							if (CSV == '') {
								alert("Invalid data");
								return;
							}

							//Generate a file name
							var fileName = ReportTitle+"_";
							//this will remove the blank-spaces from the title and replace it with an underscore
							fileName = ReportTitle.replace(/ /g,"_");

							//Initialize file format you want csv or xls
							var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

							// Now the little tricky part.
							// you can use either>> window.open(uri);
							// but this will not work in some browsers
							// or you will not get the correct file extension

							//this trick will generate a temp <a /> tag
							var link = document.getElementById("downloadReport");
							link.href = uri;

							//set the visibility hidden so it will not effect on your web-layout
							link.download = fileName + ".csv";

							//this part will append the anchor tag and remove it after automatic click

							//document.body.removeChild(link);
						}

			$("#disreportSubmit").on("click" , function(){
				var dist_emp=$('#disEmployee').val();
				var reportid=$('#disreportsType').val();
				var reportType=$('#disreporttype').val();
				var startDate="";
				var endDate="";
				var validated = true;



				startDate = $('#disreport_startdate').val();
				endDate = $('#disreport_enddate').val();

				if(reportType=="custom")
				{
						if( startDate == "" ){
							$('#disreport_startdate').css('border', '1px solid red');
							$('#disreportnullmsg').html("Please select an start date");
							$('#disreportnullmsg').show();
							validated = false;
						}
						if( endDate == "" ){
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
							if(s>m){
								$('#disreport_startdate').css('border', '1px solid red');
								$("#disreportodaymsg").show();
								validated = false;
							}
							if(d>m){
								$('#disreport_enddate').css('border', '1px solid red');
								$("#disreportendmsg").show();
								validated = false;
							}
				}

								$("#disreport_startdate").click(function(){
							$("#disreportstartmsg").hide();
							//$("#reporendmsg").hide();
							$('#disreportnullmsg').hide();
					        $('#disreportodaymsg').hide();
							$('disreport_startdate').css('border', '1px solid #d8e1b6');
							$('#disreport_startdate').css('border', '1px solid #d8e1b6');
						});
						$("#disreport_enddate").click(function(){
							$("#disreportodaymsg").hide();
							$("#disreportendmsg").hide();
							$('#disreportendnullmsg').hide();
							$('#disreport_enddate').css('border', '1px solid #d8e1b6');
							$('#disreport_enddate').css('border', '1px solid #d8e1b6');
						});


				if( validated ){
                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/distributor/report?employeeId=' + employeeId + '&reportType='+reportType+'&startDate='+startDate+'&endDate='+endDate+'&distEmployee='+dist_emp+'&reportId='+reportid,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == 'true') {
                            alertmessage('Please refresh the page and try again');

                        } else {
			                var dist_reportMap= response.result;
							var header=response.header;
							headerDisplay=header.split(",");
							var attributes=response.attributes;
							attributesDisplay=attributes.split(",");

							var exportHeader=response.exportHeader;
							exportHeaderDisplay=exportHeader.split(",");
							var exportAttributes=response.exportAttributes;
							exportAttributesDisplay=exportAttributes.split(",");
							var reportName=response.reportName;

							JSONToCSVConvertor(dist_reportMap,reportName,exportHeaderDisplay,exportAttributesDisplay);
							$('#reportTable').empty();

							var str='<div class="tbl-row tbl-hed"><div class="tbl-cols">S.NO</div>';
							//$('#reportTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">S.NO</div>').trigger('create');
                            for (counter = 0; counter < headerDisplay.length; counter++) {
                               // $('#reportTable').append('<div class="tbl-cols">'+headerDisplay[counter]+'</div>').trigger('create');
								str+='<div class="tbl-cols">'+headerDisplay[counter]+'</div>';

							}

							$('#reportTable').append(str+'</div>').trigger('create');
							//$('#reportTable').append().trigger('create');

							for(i=0;i<dist_reportMap.length;i++)
							{
								var col_str='<div class="tbl-row"><div class="tbl-cols">'+(i+1)+'</div>';

								for (counter = 0; counter < attributesDisplay.length; counter++)
								{
									var col_name=attributesDisplay[counter];
									var value=eval("dist_reportMap["+i+"]."+col_name);
									col_str+='<div class="tbl-cols">'+value+'</div>';
								}
								$('#reportTable').append(col_str+'</div>');
							}




                        }
                    }
                });

				}
			});
			 $('#disreporttype').change( function(evt) {

                evt.stopPropagation();

                var reportType = "today";

				reportType = ($(this).val())

				if( reportType == "custom") {
					$('#discustomrangediv').show();
					return;
				}
				$('#disreport_startdate').val("");
				  $('#disreport_enddate').val("");
				$('#discustomrangediv').hide();



            });
			$("#disreportReset").on("click" , function(){
				$("#reportTable").empty();
				$("#disreporttype")[0].selectedIndex[0];
				$("#disreportsType")[0].selectedIndex[0];
				$("#disEmployee")[0].selectedIndex[0];
				$('#disreportodaymsg').hide();
				$('#disreportnullmsg').hide();
				$('#disreportstartmsg').hide();
				$('#disreportendmsg').hide();
				$('#disreportendnullmsg').hide();
			});


/*report for distributor ends*/


            $("#report").on("pageinit", function() {
                oldSalesHtml = $('#salesTable').html();
                oldPaymentHtml = $('#collectionTable').html();
				oldExpensesHtml = $('#expenseTable').html();
				$('#customrangediv').hide();
				$("#reportstartmsg").hide();
                $("#reportodaymsg").hide();
                $("#reportendmsg").hide();
                $('#reportendnullmsg').hide();
               $('#reportnullmsg').hide();
				$('#report_startdate').datepicker({
                        changeYear: true,
						dateFormat: myDateFormatDatePicker

                    });
				$('#report_enddate').datepicker({
                        changeYear: true,
						dateFormat: myDateFormatDatePicker

                    });

               // $(".distcurrency").html(currency);

                var reportType = "today";

                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/global/salesReport?employeeId=' + employeeId + '&reportType=' + reportType,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == 'true') {
                            alertmessage('Please refresh the page and try again');

                        } else {

                            $('#lblTotalSales').text(response.totalSales);
                            $('#lblTotalCollection').text(response.totalCollection);
                            //$('#lblTotalCash').text(response.collectionGroup["CASH"]);
                            $('#lblBalance').text(response.balance);
                            $('#reportdaterun').text(response.reportDates);
                            //Adding products.
                            var orderEntries = response.orders;
							if( orderEntries != null )
                            for (counter = 0; counter < orderEntries.length; counter++) {
                                var entry = orderEntries[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + entry.customerName + '</div><div class="tbl-cols">' +stringToDate(entry.billDate) + '</div><div class="tbl-cols">' + entry.totalAmount + '</div><div class="tbl-cols">' + entry.outstandingBalance + '</div></div>';
                                $('#reportoutput #salesTable').append(trstr);
                            }

                            orderEntries = response.collections;
							if( orderEntries != null )
                            for (counter = 0; counter < orderEntries.length; counter++) {
                                var entry = orderEntries[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + entry.customerName + '</div><div class="tbl-cols">' + stringToDate(entry.paymentDate) + '</div><div class="tbl-cols">' + entry.amountPaid + '</div><div class="tbl-cols">' + entry.paymentType + '</div></div>';
                                $('#reportoutput #collectionTable').append(trstr);
                            }

							orderEntries = response.expenses;
							if( orderEntries != null )
                            for (counter = 0; counter < orderEntries.length; counter++) {
                                var entry = orderEntries[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + entry.expenseCategory + '</div><div class="tbl-cols">' + stringToDate(entry.expenseDate) + '</div><div class="tbl-cols">' + entry.expenseAmount + '</div><div class="tbl-cols">' + entry.description + '</div></div>';
                                $('#reportoutput #expenseTable').append(trstr);
                            }

                        }
                    }
                });



            });

			$("#reportSubmit").on("click" , function(){
				var startDate = $('#report_startdate').val();
				var endDate = $('#report_enddate').val();
				var validated = true;

				if( startDate == "" ){
					$('#report_startdate').css('border', '1px solid red');
					$('#reportnullmsg').html("Please select an start date");
					$('#reportnullmsg').show();
					validated = false;
				}
				if( endDate == "" ){
					$('#report_enddate').css('border', '1px solid red');
					$('#reportendnullmsg').html("Please select an end date");
					$('#reportendnullmsg').show();
					validated = false;
				}

				if(getdatefromstring(startDate) > getdatefromstring(endDate))
				{
					$('#report_startdate').css('border', '1px solid red');
					$("#reportstartmsg").show();
					validated = false;
				}
				var m=getdatefromstring(new Date().customFormat(myDateFormat));
				var s=getdatefromstring(startDate);
				var d=getdatefromstring(endDate);
					if(s>m){
						$('#report_startdate').css('border', '1px solid red');
						$("#reportodaymsg").show();
						validated = false;
					}
				    if(d>m){
						$('#report_enddate').css('border', '1px solid red');
						$("#reportendmsg").show();
						validated = false;
					}

						$("#report_startdate").click(function(){
							$("#reportstartmsg").hide();
							//$("#reporendmsg").hide();
							$('#reportnullmsg').hide();
					        $('#reportodaymsg').hide();
							$('#report_startdate').css('border', '1px solid #d8e1b6');
							$('#report_startdate').css('border', '1px solid #d8e1b6');
						});
						$("#report_enddate").click(function(){
							$("#reportodaymsg").hide();
							$("#reportendmsg").hide();
							$('#reportendnullmsg').hide();
							$('#report_enddate').css('border', '1px solid #d8e1b6');
							$('#report_enddate').css('border', '1px solid #d8e1b6');
						});

				if( validated ){
                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/global/salesReport?employeeId=' + employeeId + '&reportType=custom&startDate='+startDate+'&endDate='+endDate,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == 'true') {
                            alertmessage('Please refresh the page and try again');

                        } else {
							$("#reportstartmsg").hide();
                            $('#salesTable').html(oldSalesHtml);
                            $('#collectionTable').html(oldPaymentHtml);
							$('#expenseTable').html(oldExpensesHtml );

                            $('#lblTotalSales').text(response.totalSales);
                            $('#lblTotalCollection').text(response.totalCollection);
                            //$('#lblTotalCash').text(response.collectionGroup["CASH"]);
                            $('#lblBalance').text(response.balance);
                            $('#reportdaterun').text(response.reportDates);
                            //Adding products.
                            var orderEntries = response.orders;

                            for (counter = 0; counter < orderEntries.length; counter++) {
                                var entry = orderEntries[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + entry.customerName + '</div><div class="tbl-cols">' + stringToDate(entry.billDate) + '</div><div class="tbl-cols">' + entry.totalAmount + '</div><div class="tbl-cols">' + entry.outstandingBalance + '</div></div>';
                                $('#reportoutput #salesTable').append(trstr);
                            }

                            orderEntries = response.collections;

                            for (counter = 0; counter < orderEntries.length; counter++) {
                                var entry = orderEntries[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + entry.customerName + '</div><div class="tbl-cols">' + stringToDate(entry.paymentDate) + '</div><div class="tbl-cols">' + entry.amountPaid + '</div><div class="tbl-cols">' + entry.paymentType + '</div></div>';
                                $('#reportoutput #collectionTable').append(trstr);
                            }

							orderEntries = response.expenses;

                            for (counter = 0; counter < orderEntries.length; counter++) {
                                var entry = orderEntries[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + entry.expenseCategory + '</div><div class="tbl-cols">' + stringToDate(entry.expenseDate) + '</div><div class="tbl-cols">' + entry.expenseAmount + '</div><div class="tbl-cols">' + entry.description + '</div></div>';
                                $('#reportoutput #expenseTable').append(trstr);
                            }

                        }
                    }
                });

				}
			});
            $('#reporttype').change( function(evt) {

                evt.stopPropagation();

                var reportType = "today";

				reportType = ($(this).val())

				if( reportType == "custom") {
					$('#customrangediv').show();
					return;
				}
				$('#report_startdate').val("");
				  $('#report_enddate').val("");
				$('#customrangediv').hide();
                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/global/salesReport?employeeId=' + employeeId + '&reportType=' + reportType,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == 'true') {
                            alertmessage('Please refresh the page and try again');

                        } else {
                            $('#salesTable').html(oldSalesHtml);
                            $('#collectionTable').html(oldPaymentHtml);
							$('#expenseTable').html(oldExpensesHtml );

                            $('#lblTotalSales').text(response.totalSales);
                            $('#lblTotalCollection').text(response.totalCollection);
                            //$('#lblTotalCash').text(response.collectionGroup["CASH"]);
                            $('#lblBalance').text(response.balance);
                            $('#reportdaterun').text(response.reportDates);
                            //Adding products.
                            var orderEntries = response.orders;

                            for (counter = 0; counter < orderEntries.length; counter++) {
                                var entry = orderEntries[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + entry.customerName + '</div><div class="tbl-cols">' + stringToDate(entry.billDate) + '</div><div class="tbl-cols">' + entry.totalAmount + '</div><div class="tbl-cols">' + entry.outstandingBalance + '</div></div>';
                                $('#reportoutput #salesTable').append(trstr);
                            }

                            orderEntries = response.collections;

                            for (counter = 0; counter < orderEntries.length; counter++) {
                                var entry = orderEntries[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + entry.customerName + '</div><div class="tbl-cols">' + stringToDate(entry.paymentDate) + '</div><div class="tbl-cols">' + entry.amountPaid + '</div><div class="tbl-cols">' + entry.paymentType + '</div></div>';
                                $('#reportoutput #collectionTable').append(trstr);
                            }

							orderEntries = response.expenses;

                            for (counter = 0; counter < orderEntries.length; counter++) {
                                var entry = orderEntries[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols">' + entry.expenseCategory + '</div><div class="tbl-cols">' + stringToDate(entry.expenseDate) + '</div><div class="tbl-cols">' + entry.expenseAmount + '</div><div class="tbl-cols">' + entry.description + '</div></div>';
                                $('#reportoutput #expenseTable').append(trstr);
                            }

                        }
                    }
                });


            });


            $("#Area").on("pageinit", function() {

			$("#editAreaNull").hide();
				$("#editAreaVal").hide();

			$('#areaexist').hide();
			$('#areaon').hide();
            $('#areaconfirm').hide();
            $('#areafill').hide();


			areaId=area_areamap.id;



				$.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/distributor/getAreas?employeeId=' + employeeId,
                    dataType: 'json',
                    encode: true,
                    success: function(response) {

                        if (response.error) {
                            alertmessage(response.errorMessage);
                        } else {

                            originalAreas = $('#areasDiv').html();
							$('#areafill').hide();
                            $('#areaconfirm').hide();
                            $('#areaon').hide();
                            $('#areaexist').hide();
                            areaMap = response.result;
                            for (counter = 0; counter < areaMap.length; counter++) {
									area_areamap[areaMap[counter].id] = areaMap[counter];
                                //var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + ' </div><div class="tbl-cols">' +areaMap[counter].description.trim().toUpperCase() + '</div></div>';
								var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + ' </div><div class="tbl-cols editableArea" id="areaUpdate_'+areaMap[counter].id+'">' + areaMap[counter].description + '</div></div>';
                                //alert( newRow );
                                $('#areaTable').append(newRow);

                            }






							$('.editableArea').on("click", function(evt){
							$('#areaon').hide();
							 $("#areaconfirm").hide();
							editArea(evt);
							savearea();

							});



								areaId=area_areamap.id;
                        }
                    }
                });



                // mysettings screen starts
                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/distributor/setting?employeeId=' + employeeId,
                    dataType: 'json',
                    encode: true,
                    success: function(response) {
                        if (response.error) {
                            alertmessage(response.errorMessage);
                        } else {
                            var setting = response.result;
                            $('#set_tax').val(setting.salesTaxRate);
                            $('#set_comp').val(setting.companyName);
                            $('#set_addr').val(setting.address);
                            $('#set_city').val(setting.city);
                            $('#set_state').val(setting.stateorprovince);
                            $('#set_postal').val(setting.postalcode);
                            $('#set_country').val(setting.country);
                            $('#set_ph').val(setting.phoneNumber);
                            $('#set_fax').val(setting.faxNumber);

                        }
                    }
                });

        });
                // mysettings screen ends

            //ARea Screen Auto Load Over
					//$('.editableArea').on("click", function(evt)

					function editArea(evt)
							{
								areaId=evt.target.id.split("_")[1];
								$('#editArea').val($('#'+evt.target.id).html());
								$("#editDialog").dialog({
                            modal: true,
                            draggable: false,
                            resizable: false,
                            position: ['center'],
                            show: 'blind',
                            hide: 'blind',
                            width: 215,
                            height: 210,
                            dialogClass: 'ui-dialog-osx',
                        });
						}
						function savearea()
							{
								$("#editAreaNull").hide();
								$("#editAreaVal").hide();
								$('#editIdsave').on('click', function(){
									$("#editAreaNull").hide();
								$("#editAreaVal").hide();

								var editArea = "";

								editArea = $("#editArea").val().trim().toUpperCase();
								if (editArea == "")
									{
									$('#editArea').css('border', '1px solid red');
									$("#editAreaNull").show();
									return;
									}
								else
									{
									   for (var counter = 0; counter < areaMap.length; counter++)
										   {

												if (areaMap[counter].description == editArea)
												{
													$('#editArea').css('border', '1px solid red');
													$("#editAreaVal").show();
													return;
												}

											}
										}


									var formData = {
										"employeeId": employeeId,
										"areaId" : areaId,
										"areaName": editArea
									};

											$.ajax({
											type: 'POST',
											url: baseUrl+'/prodcast/distributor/saveArea',
											dataType: 'json',
											data: formData,
											encode: true,
											success: function(response) {
												if (response.error) {
													alertmessage(response.errorMessage);
												}
										else {
												$("#editAreaNull").hide();
								                 $("#editAreaVal").hide();
												$('#editArea').css('border', '1px solid green');
												for (counter = 0; counter < areaMap.length; counter++)
												{
													if(areaMap[counter].id == areaId){
														areaMap[counter].description=editArea;
														break;

													}
												}
												$("#Employee_area").empty();
												$("#Employee_area").append("<option value=''></option>");
												for (var k = 0; k < areaMap.length; k++) {

													$("#Employee_area").append($("<option value=" + areaMap[k].id + ">" + areaMap[k].description + "</option>"));
												}

												$('#areaon').show();
												$('#areaUpdate_'+areaId).html(editArea);
												areaId="";
												$('#editDialog').dialog("close");
												$("#editArea").val('');
									}
								}

							});




						});
							}

							 function writeAreaTable()
							{
							$('.editableArea').on("click", function(evt){
							$('#areaon').hide();
							 $("#areaconfirm").hide();
							editArea(evt);
							savearea();

							});
							}




            //area screen save starts
            $('#AreaId_save').on("click", function()
			{
				areaId = "";
				$('#areaexist').hide();
				$('#areaconfirm').hide();
				 $('#areaon').hide();
				$('#areafill').hide();

                var areaName = "";
                areaName = $("#Area_Area").val().trim().toUpperCase();
                if (areaName == "") {
                    $('#Area_Area').css('border', '1px solid red');
					$('#areafill').show();
                    return;
                } else {
					for (var counter = 0; counter < areaMap.length; counter++) {
						if (areaMap[counter].description == areaName) {
							$('#Area_Area').css('border', '1px solid red');
							$('#areaexist').show();
							//areaId=areaMap[counter].id;
							return;
						}

					}
                }

                var formData = {
                    "employeeId": employeeId,
                    "areaId":"",
                    "areaName": areaName
                };

                    $.ajax({
                    type: 'POST',
                    url: baseUrl+'/prodcast/distributor/saveArea',
                    dataType: 'json',
                    data: formData,
                    encode: true,
                    success: function(response) {

                        if (response.error) {
                            alertmessage(response.errorMessage);

                        } else {

                            $("#Area_Area").val("");
                            $('#areasDiv').html(originalAreas);
                            $('#areaexist').hide();

							areaMap=response.result;
                            $('#areaconfirm').show();
							$('#areaexist').hide();

                            for (counter = 0; counter < areaMap.length; counter++)
							{
                                var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + ' </div><div class="tbl-cols editableArea" id="areaUpdate_'+areaMap[counter].id+'">' + areaMap[counter].description + '</div></div>';

                                //alert( newRow );
                                $('#areaTable').append(newRow);

                            }

							writeAreaTable();

							$("#Employee_area").empty();
							$("#Employee_area").append("<option value=''></option>");
							for (var k = 0; k < areaMap.length; k++) {

                                $("#Employee_area").append($("<option value=" + areaMap[k].id + ">" + areaMap[k].description + "</option>"));
							}

						}

					}
						});
					});


            $("#Area :input").on('click', function() {
                $(this).css('border', ' 1px solid #d8e1b6');
                $('#areaexist').hide();
                 $('#areaon').hide();
				$('#areaconfirm').hide();
                $('#areafill').hide();
				$("#editAreaNull").hide();
				$("#editAreaVal").hide();
            });




            //area screen save ends
            //setting screen save starts

            $('#setting_save').on('click', function() {

                set_tax = $("#set_tax").val();

                set_comp = $("#set_comp").val();

                set_addr = $("#set_addr").val();

                set_city = $("#set_city").val();

                set_state = $("#set_state").val();

                set_postal = $("#set_postal").val();

                set_country = $("#set_country").val();

                set_ph = $("#set_ph").val();

                set_fax = $('#set_fax').val();




                var set_tax = "";
                if ($('#set_tax').val() == "") {
                    $('#set_tax').css('border', '1px solid red');
                } else {
                    set_tax = $("#set_tax").val();
                }
                var set_comp = "";
                if ($('#set_comp').val() == "") {
                    $('#set_comp').css('border', '1px solid red');
                } else {
                    set_comp = $("#set_comp").val().toUpperCase();
                }
                var set_addr = "";
                if ($('#set_addr').val() == "") {
                    $('#set_addr').css('border', '1px solid red');
                } else {
                    set_addr = $("#set_addr").val().toUpperCase();
                }
                var set_city = "";
                if ($('#set_city').val() == "") {
                    $('#set_city').css('border', '1px solid red');
                } else {
                    set_city = $("#set_city").val().toUpperCase();
                }
                var set_state = "";
                if ($('#set_state').val() == "") {
                    $('#set_state').css('border', '1px solid red');
                } else {
                    set_state = $("#set_state").val().toUpperCase();
                }
                var set_postal = "";
                if ($('#set_postal').val() == "") {
                    $('#set_postal').css('border', '1px solid red');
                } else {
                    set_postal = $("#set_postal").val().toUpperCase();
                }
                var set_country = "";
                if ($('#set_country').val() == "") {
                    $('#set_country').css('border', '1px solid red');
                } else {
                    set_country = $("#set_country").val();
                }
                var set_ph = "";
                if ($('#set_ph').val() == "") {
                    $('#set_ph').css('border', '1px solid red');
                } else {
                    set_ph = $("#set_ph").val();
                }
                var set_fax = "";
				 if ($('#set_fax').val() == "") {
                    $('#set_fax').css('border', '1px solid red');
                } else {
                    set_fax = $("#set_fax").val();
                }

					var formData5 = {
					"employeeId": employeeId,
                    "set_tax":set_tax ,
                    "set_comp": set_comp,
                    "set_addr": set_addr,
                    "set_city": set_city,
                    "set_state": set_state,
                    "set_postal": set_postal,
                    "set_country": set_country,
                    "set_ph": set_ph,
                    "set_fax": set_fax,

                };





                $.ajax({
                    type: 'POST',
                    url: baseUrl+'/prodcast/distributor/saveSettings',
                    dataType: 'json',
                    data: formData5,
                    encode: true,
                    success: function(response) {
                        if (response.error) {
                            alertmessage(response.errorMessage);
                        } else {
							alertmessage("New Settings Save Successfully");


						   $("#set_tax").val("");
                            $("#set_comp").val("");
                            $("#set_addr").val("");
                            $("#set_city").val("");


                            $("#set_state").val("");


                            $("#set_postal").val("");

                            $("#set_country").val("");


                            $("#set_ph").val("");


                            $("#set_fax").val("");
                        }
                    }
                });

            });

            //setting screen save ends
            //Expense Screen Load Starts
            var originalExpenses = "";
            $("#expensescreen").on("pageinit", function()
			{
				//expcatId=exp_map.categoryId;
				$("#editExp").hide();
					$("#editExpVal").hide();
				function expensereset (){
					$("#exp_save").html("Save");
					$("#exp_category")[0].selectedIndex = 0;

					$("#exp_payment")[0].selectedIndex = 0;
					expId="";

					$("input[type=number], textbox").val("");
					$("input[type=text], textbox").val("");



                    $("#expnav1").find('input:text').val('');
                    $("#expnav1:input").css('border', ' 1px solid #d8e1b6');


				}



				$('#expenseoutput #allexpenseTable').show();
					$.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/fetchExpense?employeeId=' + employeeId,
                        dataType: 'json',
                        success: function(response) {

                            if (response.error == 'true') {
                                $('#selectError').html('Please refresh the page and try again');

                            }
							else {


                                var exp=response.expenses;
									$('#allexpenseTable').empty();

								  $('#allexpenseTable').html(oldExpenses);
								for (counter = 0; counter < exp.length; counter++) {

								exp_expmap[exp[counter].id] = exp[counter];
                                var entry = exp[counter];

                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols"><a class="viewexpenses" id="'+entry.id+'" data-toggle="tab" data-mini="true"  aria-expanded="true">'+ entry.expenseCategory.trim().toUpperCase()+'</a></div><div class="tbl-cols">' + stringToDate(entry.expenseDate) + '</div><div class="tbl-cols">' + entry.expenseAmount + '</div><div class="tbl-cols">' + entry.description + '</div></div>';
                                $('#expenseoutput #allexpenseTable').append(trstr);


								}



								$('.viewexpenses').on("click" , function(evt){
									document.getElementById('expnav1').click();
									expenseAutoComplete(exp_expmap[evt.target.id]);
									$("#exp_save").html("Update");
								});



							}

						}


                    });
                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/distributor/getExpenseCategories?employeeId='+employeeId,
                    dataType: 'json',
                    encode: true,
                    success: function(response) {

                        if (response.error) {
                            alertmessage(response.errorMessage);
                        } else {
							expenseCat=response.result;
                            originalExpenses = $('#ExpDiv').html();
                            for (counter = 0; counter < response.result.length; counter++)
							{
								exp_map[expenseCat[counter].categoryId] = expenseCat[counter];

                                var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols editableExpCat" id="expCatUpdate_'+expenseCat[counter].categoryId+'">' + response.result[counter].categoryDesc.trim().toUpperCase()+ '</div></div>';
                                $('#exp_category').append('<option value="' + response.result[counter].categoryId + '">' + response.result[counter].categoryDesc.trim().toUpperCase() + '</option>')
                                    //alert( newRow );
                                $('#ExpTable').append(newRow);
								$('#ExpTable').show();

                            }
							writeExpCatTable();


							expcatId=exp_map.categoryId;

                        }
                    }
                });
				$('#resettab').on('click', function() {
					expensereset(true);

                });

			 $("#expensescreen :input").on('click', function() {
                    $(this).css('border', ' 1px solid #d8e1b6');
					$('#expcatfill').hide();
					$('#expcaton').hide();
					$('#expcatexist').hide();
					$('#expcatconfirm').hide();
					$("#editExp").hide();
					$("#editExpVal").hide();
                });

            });
            //Expense Screen Load Ends

            /*Expense screen save begins*/

            var exp_category = "";
            var exp_account = "";
            var exp_description = "";
            var exp_details = "";
            var exp_amount = "";
            var exp_payment = "";
			var exp_date= "";

				oldExpenses = $('#allexpenseTable').html();
            $('#exp_category').on('change', function() {
                exp_category = ($('#exp_category').val());

            });
            $('#exp_payment').on('change', function() {
			                exp_payment = $("#exp_payment").val();

			            });
			$('#exp_date').on('change', function() {
			           exp_date = $("#exp_date").val();

			 });


            $('#exp_save').on("click", function() {

                exp_account = $("#exp_account").val();

                exp_description = $("#exp_description").val();

                exp_details = $("#exp_details").val();

                exp_amount = $("#exp_amount").val();
				exp_date = $('#exp_date').val() ;

				var expenseCategoryId="";
                var validated = true;

                var catgId = "";
                if ($('#exp_category').val() == "") {
                    $('#exp_category').css('border', '1px solid red');
                    validated = false;
                } else {
                    catgId = $("#exp_category").val();

                }

                var account = "";
                if ($('#exp_account').val() == "") {
                    $('#exp_account').css('border', '1px solid red');
                    validated = false;
                } else {
                    account = $("#exp_account").val().toUpperCase();

                }

                var desc1 = "";
                if ($('#exp_description').val() == "") {
                    $('#exp_description').css('border', '1px solid red');
                    validated = false;
                } else {
                    desc1 = $("#exp_description").val().toUpperCase();

                }

                var desc2 = "";
                if ($('#exp_details').val() == "") {
                    $('#exp_details').css('border', '1px solid red');
                    validated = false;
                } else {
                    desc2 = $("#exp_details").val().toUpperCase();
                }

                var amount = "";
                if ($('#exp_amount').val() == "") {
                    $('#exp_amount').css('border', '1px solid red');
                    validated = false;
                } else {
                    amount = $("#exp_amount").val();
                }

                var payMode = "";
                if ($('#exp_payment').val() == "") {
                    $('#exp_payment').css('border', '1px solid red');
                    validated = false;
                } else {
                    payMode = $("#exp_payment").val();
                }
				var expdate="";
				if ($('#exp_date').val() == "") {
					$("#exp_date").val(new Date().customFormat(myDateFormat) );
					 validated = false;
				}
				else{
					expdate=$("#exp_date").val();
				}
                if (!validated) {
                    return;
                }


                var formData4 = {
                    "catgId": catgId,
					"expenseId":expId,
                    "account": account,
                    "desc1": desc1,
                    "desc2": desc2,
                    "amount": amount,
                    "payMode": payMode,
					"expenseDate": expdate,
                    "employeeId": employeeId
                };


                $.ajax({
                    type: 'POST',
                    url: baseUrl+'/prodcast/distributor/saveExpense',
                    dataType: 'json',
                    data: formData4,
                    encode: true,
                    success: function(response) {
                        if (response.error) {
                            alertmessage(response.errorMessage);
                        } else {
								$('#expenseoutput #allexpenseTable').show();
								if(expId==""){
                            $("#expSaveSuccess").html("Expense saved successfully for the amount of " + formData4.amount);
							  $("#expSaveSuccess").show();
								}
								else{
									 $("#expSaveSuccess").html("Expense updated successfully for the amount of " + formData4.amount);
									  $("#expSaveSuccess").show();
								}
                                                        $("#exp_account").val("");

                            $("#exp_description").val("");
							$("#exp_date").val("");

                            $("#exp_details").val("");

                            $("#exp_amount").val("");

							expId="";

                            $("#exp_payment").val("1");
							$("#exp_date").val(new Date().customFormat(myDateFormat) );
	                        $('#exp_category').val("");


							var exp = response.expenses;

								$('#allexpenseTable').empty();

								  $('#allexpenseTable').html(oldExpenses);
                            for (counter = 0; counter < exp.length; counter++) {
								exp_expmap[exp[counter].id] = exp[counter];
                                var entry = exp[counter];
                                var trstr = '<div class="tbl-row"><div class="tbl-cols">' + (counter + 1) + '</div><div class="tbl-cols"><a class="viewexpenses" id="'+entry.id+'" data-toggle="tab" data-mini="true"  aria-expanded="true">'+ entry.expenseCategory.trim().toUpperCase()+'</a></div><div class="tbl-cols">' + stringToDate(entry.expenseDate) + '</div><div class="tbl-cols">' + entry.expenseAmount + '</div><div class="tbl-cols">' + entry.description + '</div></div>';
                                $('#expenseoutput #allexpenseTable').append(trstr);

                            }

							$('.viewexpenses').on("click" , function(evt){
									document.getElementById('expnav1').click();
									expenseAutoComplete(exp_expmap[evt.target.id]);
									$("#exp_save").html("Update");
							});

                        }
						$("#exp_save").html("Save");
                    }
                });
				$("#expensescreen :input").on('click', function()
                        {
                            $(this).css('border', ' 1px solid #d8e1b6');
                            $('#expSaveSuccess').hide();
						});
            });

            /*Expense screen ends*/


            /* Login Screen Begin*/
			$('#RetrievePassword').on("click", function(){
				if($('#LoginUserId').val().trim() != "" ){
					  $.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/global/retrievePassword?emailId=' + $('#LoginUserId').val().toLowerCase(),
                        dataType: 'json',
                        success: function(response) {
							var message = "An email has been sent to the email address with the password";

                            if (response.error) {
								message = response.errorMessage;
                            } else {
								$('#validationMsg').hide();
                            }

							$('#validationMsg').show();
							$('#okkmsg').html( message );
							$("#savedialog1").dialog({
								modal: true,
								draggable: false,
								resizable: false,
								position: ['center'],
								show: 'blind',
								hide: 'blind',
								width: 300,
								height: 200,
								dialogClass: 'ui-dialog-osx',
							});
							$('#okmsg').on('click', function() {

								$('#savedialog1').dialog("close");

							});

                        }
                    });

				}
				else{
					$('#validationMsg').show();
				}

			});
            $('#LoginButton').on("click", function() {
                if ($('#LoginUserId').val() != "" && $('#LoginPassword').val() != "") {

		          var formDataLogin= {
                    "userid": $('#LoginUserId').val().toLowerCase(),
					"password":$('#LoginPassword').val()
					};
					$.ajax({
                        type: 'POST',
                        url: baseUrl+'/prodcast/global/loginp',
			timeout: 10000,
                        dataType: 'json',
			data:formDataLogin,
                        success: function(response) {
			    if (response.error) {
                                $('#validationMsg').show();
                            } else {
				localStorage.setItem("ProdcastLogin", JSON.stringify(response));                           
				var dist_name=response.employee.distributorName;
                                var name = response.employee.firstname + ' ' + response.employee.lastname;
                                employeeId = response.employee.employeeId;
                                userRole = response.employee.userRole;
                                 currency=response.employee.currencySymbol;
                                  showHide();

                                $('.SalesManName').html('Welcome, ' + name);
                                window.location.href = '#home';
								$('.DistributorName').html(dist_name);
								 $(".distcurrency").html(currency);
                            }
                        },
			error: function(){
				alert("Fetching from Local Storage");
				var responseString = localStorage.getItem("ProdcastLogin");
				var response = JSON.parse( responseString );
				var dist_name=response.employee.distributorName;
                                var name = response.employee.firstname + ' ' + response.employee.lastname;
                                employeeId = response.employee.employeeId;
                                userRole = response.employee.userRole;
                                 currency=response.employee.currencySymbol;
                                  showHide();

                                $('.SalesManName').html('Welcome, ' + name);
                                window.location.href = '#home';
				$('.DistributorName').html(dist_name);
				 $(".distcurrency").html(currency);

			}
			
                    });
                } else {
                    alertmessage("Please check your Username and Password");
                }
            });
            $('.logout').on('click', function() {
                employeeId = "";
                $('#LoginUserId').val("");
                $('#LoginPassword').val("");
                $.mobile.navigate('#loginhome');
            });
			$("#cancelbtn").on('click', function(){

				 //var Window=window.open(",'_self',");
				 window.history.back();
			});

            /* Login Screen End*/

            /* Customer Screen Begins */
            $('#customerscreen').on('pageinit', function() {
                $('#csmsg').hide();
                $('#cnameexist').hide();
				$('#savedialog1').hide();
                /* Local variable declaration begins */
                var cusAreaArray = [];
                var cusArea = [];
                var customerType = "0";
                var areaId = "0";
                var weekDay = "0";
                var cvalid1 = true;
                var cvalid2 = true;
                var cvalid3 = true;
				function customerreset (){
					$("#cType")[0].selectedIndex = 0;

					$("#cust_screen_area")[0].selectedIndex = 0;
					$("#country")[0].selectedIndex=0;
					$("#weekday")[0].selectedIndex = 0;

					$("input[type=number], textbox").val("");
					$("input[type=email], textbox").val("");
					$('#cust_screen_area').on('change',function() {
					$('#cust_screen_area').attr('selectedIndex',0);
					});
					$('#activecus')[0].checked="true";
					$('#smsallowed').attr('checked',false);

					$('#cnameexist').hide();
					$('#csmsg').hide();
                    $("#tab1").find('input:text').val('');
                    $("#tab1 :input").css('border', ' 1px solid #d8e1b6');

                    $('#emptyalertmsg1').hide();
                    $('#emptyalertmsg2').hide();
					$("#tab2").find('input:text').val('');
                    $("#tab2 :input").css('border', ' 1px solid #d8e1b6');

					$("#tab3").find('input:text').val('');
                    $("#tab3 :input").css('border', ' 1px solid #d8e1b6');
                    $('#emptyalertmsg3').hide();
					$('#customer_save').html("Save");
					custId="";
				}

               // $('#cussavemsg').hide();
                $('.emptyalertmsg1').hide();
                $('.emptyalertmsg2').hide();
                $('.emptyalertmsg3').hide();
				$('#cnameexist').hide();
                /* Local variable declaration ends */
				function customerSubAutoComplete(cust)
				{


									$('#cType').val(cust.customerType).change();
                                    $('#cust_screen_area').val(cust.area).change();
                                    $('#weekday').val(cust.weekday).change();
                                    $('#unitnumber').val(cust.unitNumber);
                                    $('#billingAddress1').val(cust.billingAddress1);
                                    $('#billingAddress2').val(cust.billingAddress2);
                                    $('#billingAddress3').val(cust.billingAddress3);
									//$('#EmployeeGender').val(cust.)
                                    $('#city').val(cust.city);
                                    $('#state').val(cust.state);
                                    $('#country').val(cust.country);
                                    $('#postalCode').val(cust.postalCode);
                                    $('#customer_companyname').val(cust.customerName);

                                    $('#firstname').val(cust.firstname);
                                    $('#lastname').val(cust.lastname);
                                    $('#phonenumber').val(cust.phonenumber);
                                    $('#cellphone').val(cust.cellPhone);
                                    $('#email').val(cust.emailaddress);
                                    $('#notes').val(cust.notes);
									$('#customerId1').val(cust.customerId1);
									$('#customerDesc1').val(cust.customerDesc1);
									$('#customerId2').val(cust.customerId2);
									$('#customerDesc2').val(cust.customerDesc2);
									$('#activecus')[0].checked=cust.active;
									$('#smsallowed')[0].checked=cust.smsAllowed;
									custId=cust.id;
									$('#customer_save').html("Update");
				}
				function toViewAllcustomers(response)
			{
				if (response.error) {
                       alertmessage(response.errorMessage);
                 } else {
                      originalAllCustomers = $('#viewAllCustomersDiv').html();
                      $('#allcustomersTable').empty();
					  $('#allcustomersTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">S.No</div><div class="tbl-cols">Company Name</div><div class="tbl-cols">First Name</div><div class="tbl-cols">Last Name</div> </div>');
						for (counter = 0; counter < response.customerList.length; counter++) {
						  	var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter+1) + '</div><div class="tbl-cols"><a class="viewallcustomersName" id="'+response.customerList[counter].id+'" data-toggle="tab" data-mini="true"  aria-expanded="true">'+ response.customerList[counter].customerName.trim().toUpperCase()+'</a></div><div class="tbl-cols">' + response.customerList[counter].firstname.toUpperCase() + '</div><div class="tbl-cols">' + response.customerList[counter].lastname+ '</div></div>';
							$('#allcustomersTable').append(newRow);
							$('#allcustomersTable').show();
                           }
						$('.viewallcustomersName').on("click" , function(evt){
							document.getElementById('customerTab').click();
							customerSubAutoComplete(customer_customerMap[evt.target.id]);

						});
					}
			}

                /*Customer Name auto complete begins */
                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/global/customers?employeeId=' + employeeId,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == 'true') {
                            alertmessage('Please refresh the page and try again');
                        } else {
                            customer_customerList = response.customerList;
                            while (customer_customerDisplay.length > 0) {
                                customer_customerDisplay.pop();
                            }
                            //$('#cnameexist').show();
                            for (var counter = 0; counter < customer_customerList.length; counter++) {
                                customer_customerMap[customer_customerList[counter].id] = customer_customerList[counter];
                                customer_customerDisplay.push({
                                    label: customer_customerList[counter].customerName.trim().toUpperCase(),
                                    value: customer_customerList[counter].id
                                });
                            }

                            $("#customer_companyname").autocomplete({
                                source: customer_customerDisplay,
                                select: function(event, ui) {
                                    // prevent autocomplete from updating the textbox
                                    event.preventDefault();
                                    // manually update the textbox and hidden field
                                    $(this).val(ui.item.label);
                                    customerId = ui.item.value;
                                    var cust = customer_customerMap[customerId];
                                    $('#cType').val(cust.customerType).change();
                                    $('#cust_screen_area').val(cust.area).change();
                                    $('#weekday').val(cust.weekday).change();
                                    $('#unitnumber').val(cust.unitNumber);
                                    $('#billingAddress1').val(cust.billingAddress1);
                                    $('#billingAddress2').val(cust.billingAddress2);
                                    $('#billingAddress3').val(cust.billingAddress3);
                                    $('#city').val(cust.city);
                                    $('#state').val(cust.state);
                                    $('#country').val(cust.country);
                                    $('#postalCode').val(cust.postalCode);
                                    $('#firstname').val(cust.firstname);
                                    $('#lastname').val(cust.lastname);
                                    $('#phonenumber').val(cust.phonenumber);
                                    $('#cellphone').val(cust.cellPhone);
                                    $('#email').val(cust.emailaddress);
                                    $('#notes').val(cust.notes);
									$('#customerId1').val(cust.customerId1);
									$('#customerDesc1').val(cust.customerDesc1);
									$('#customerId2').val(cust.customerId2);
									$('#customerDesc2').val(cust.customerDesc2);
									$('#activecus')[0].checked=cust.active;
									$('#smsallowed')[0].checked=cust.smsAllowed;
									custId=cust.id;
									$('#customer_save').html("Update");





                                }
                            });
                        }
                    }
                });
                /*Customer Name auto complete Ends */
							//View All customers Screen Starts

					$.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/global/customers?employeeId=' + employeeId,
						dataType: 'json',
                        encode: true,
                        success: function(response) {

                            toViewAllcustomers(response,true);

                        }
                    });

				//view All Customer Screen Ends





				            /*Customer  Area complete Begins */
                if (userRole == "S") {
                    $.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/global/areas?employeeId=' + employeeId,
                        dataType: 'json',
                        success: function(response) {
                            if (response.error == null) {
                                alertmessage("SQL Error");
                            } else {
                                cusArea = response.areas;
                                for (var k = 0; k < cusArea.length; k++) {
                                    cusAreaArray.push({
                                        label: cusArea[k].description,
                                        value: cusArea[k].id
                                    });
                                }
                                for (var k = 0; k < cusAreaArray.length; k++) {
                                    $("#cust_screen_area").append($("<option value=" + cusAreaArray[k].value + ">" + cusAreaArray[k].label + "</option>"));
                                }
                            }
                        }
                    });
                } else {

                    $.ajax({
                        type: 'GET',
                        url: baseUrl+'/prodcast/distributor/getAreas?employeeId=' + employeeId,
                        dataType: 'json',
                        success: function(response) {
                            if (response.error == null) {
                                alertmessage("SQL Error");
                            } else {
                                cusArea = response.result;
                                for (var k = 0; k < cusArea.length; k++) {
                                    cusAreaArray.push({
                                        label: cusArea[k].description,
                                        value: cusArea[k].id
                                    });
                                }
                                for (var k = 0; k < cusAreaArray.length; k++) {
                                    $("#cust_screen_area").append($("<option value=" + cusAreaArray[k].value + ">" + cusAreaArray[k].label.trim().toUpperCase() + "</option>"));
                                }
                            }
                        }
                    });

                }
                /*Customer  Area complete Ends */

                /* Customer Save Begins */
                $("#cType").change(function() {
                    customerType = $("#cType").val();
                });

                $("#cust_screen_area").change(function() {
                    areaId = $("#cust_screen_area").val();

                });
				$("#country").change(function() {
                    country = $("#country").val();

                });

                $("#weekday").change(function() {
                    weekDay = $("#weekday").val();

                });
                $('#ctab1').on('click', function() {

					customerreset(true);

                });
                $('#ctab2').on('click', function() {
					customerreset(true);
         });
                $('#ctab3').on('click', function() {
					customerreset(true);

                });



                $('#customer_save').on('click', function()

                    {

						cvalid1 = true;
						cvalid2 = true;
						cvalid3 = true;
						$('#cnameexist').hide();
                        $('#csmsg').hide();
                        /*if (customerId == "" && !isNaN(customerId)) {
                            $('#csmsg').show();
							//alert("The customer already exists in the system. Please Reset before entering another customer details.")
                            return;
                        }*/

                        var customerName = "";
                        if ($('#customer_companyname').val() == "") {
                            $('#customer_companyname').css('border', '1px solid red');
                            $('.emptyalertmsg1').show();
                            cvalid1 = false;
                        } else {
                            //cvalid1=true;
                            customerName = $("#customer_companyname").val();
                        }


						customerName = customerName.trim().toUpperCase();


						for(var id in customer_customerMap){

							if(custId!=(""+id))
							{
								if( customer_customerMap[id].customerName.trim().toUpperCase() == customerName ){
								$('#customer_companyname').css('border','1px solid red');
								$('#cnameexist').show();
								cvalid1 = false;
							}
							break;

							}
						}

                        if (new String(weekDay).valueOf() == new String("0").valueOf()) {
                            $('#weekday').css('border', '1px solid red');
							cvalid1=false;
                        } else {
                            weekDay = $("#weekday").val();
                        }

                        if (new String(areaId).valueOf() == new String("0").valueOf()) {
                            $('#cust_screen_area').css('border', '1px solid red');
							cvalid1=false;
                        } else {
                            areaId = $("#cust_screen_area").val();
                        }


                        if (new String(customerType).valueOf() == new String("0").valueOf()) {
                            $('#cType').css('border', '1px solid red');
							cvalid1=false;
                        } else {
                            customerType = $("#cType").val();
                        }
                        var unitNumber = "";
                        if ($('#unitnumber').val() == "") {
                            $('#unitnumber').css('border', '1px solid red');
                            $('.emptyalertmsg2').show();
                            cvalid2 = false;
                        } else {
                            unitNumber = $("#unitnumber").val();
                        }
                        var address1 = "";
                        if ($('#billingAddress1').val() == "") {
                            $('.emptyalertmsg2').show();
                            $('#billingAddress1').css('border', '1px solid red');
                            cvalid2 = false;
                        } else {
                            address1 = $("#billingAddress1").val();
                        }
                        var address2 = "";
                        if ($('#billingAddress2').val() == "") {
                            $('.emptyalertmsg2').show();
                            $('#billingAddress2').css('border', '1px solid red');
                            cvalid2 = false;
                        } else {
                            address2 = $("#billingAddress2").val();
                        }

                        var address3 = "";
                        if ($('#billingAddress3').val() == "") {
                            $('.emptyalertmsg2').show();
                            $('#billingAddress3').css('border', '1px solid red');
                            cvalid2 = false;
                        } else {
                            address3 = $("#billingAddress3").val();
                        }




                        var city = "";
                        if ($('#city').val() == "") {
                            $('.emptyalertmsg2').show();
                            $('#city').css('border', '1px solid red');
                            cvalid2 = false;
                        } else {
                            city = $("#city").val();
                        }

                        var state = "";
                        if ($('#state').val() == "") {
                            $('.emptyalertmsg2').show();
                            $('#state').css('border', '1px solid red');
                            cvalid2 = false;
                        } else {
                            state = $("#state").val();
                        }


                        var firstName = "";
                        if ($('#firstname').val() == "") {
                            $('.emptyalertmsg3').show();
                            $('#firstname').css('border', '1px solid red');
                            cvalid3 = false;
                        } else {
                            firstName = $("#firstname").val();
                        }
                        var postalCode = "";

                        if ($('#postalCode').val() == "") {
                            $('.emptyalertmsg2').show();
                            $('#postalCode').css('border', '1px solid red');
                            cvalid2 = false;
                        } else {
                            postalCode = $("#postalCode").val();
                        }
                        var lastName = "";
                        if ($('#lastname').val() == "") {
                            $('.emptyalertmsg3').show();
                            $('#lastname').css('border', '1px solid red');
                            cvalid3 = false;
                        } else {
                            lastName = $("#lastname").val();
                        }

                        var cellPhone = "";
                        if ($('#cellphone').val() == "" || isNaN($('#cellphone').val())) {
                            $('.emptyalertmsg3').show();
                            $('#cellphone').css('border', '1px solid red');
                            cvalid3 = false;
                        } else {
                            cellPhone = $("#cellphone").val();
                        }

						var customerId1="";
						    customerId1 = $("#customerId1").val();


						var customerId2="";
						    customerId2 = $("#customerId2").val();



						var customerDesc1="";
						    customerDesc1 = $("#customerDesc1").val();


						var customerDesc2="";
						    customerDesc2 = $("#customerDesc2").val();


							if ($('#smsallowed').is(':checked'))
							{
								smsAllow="true";
							}
							else
							{
								smsAllow="false";
							}



                        var emailAddress = "";
                        if ($('#email').val() != "" && !validateEmail( $('#email').val())) {
                            $('#email').css('border', '1px solid red');
                            cvalid3 = false;
                            return;
                        } else

                            emailAddress = $("#email").val();

                        var phoneNumber = "";
                        if ($('#phonenumber').val() == "" || isNaN($('#phonenumber').val())) {
                            $('.emptyalertmsg3').show();
                            $('#phonenumber').css('border', '1px solid red');
                            cvalid3 = false;
                        } else {
                            phoneNumber = $("#phonenumber").val();
                        }



                        var notes = "";
                        if ($('#notes').val() == "") {
                            $('.emptyalertmsg3').show();
                            $('#notes').css('border', '1px solid red');
                            cvalid3 = false;
                        } else {
                            notes = $("#notes").val();
                        }


							if ($('#activecus').is(':checked'))
							{
								activecust="true";
							}
							else
							{
								activecust="false";
							}



                        if (cvalid1 == false) {
                            $('#customerTab').trigger("click");

                        } else if (cvalid2 == false) {
                            $('#customerAddressTab').trigger("click");

                        } else if (cvalid3 == false) {

                            $('#customerContactTab').trigger("click");
                        } else {
                            $('.emptyalertmsg1').hide();
                            $('.emptyalertmsg2').hide();
                            $('.emptyalertmsg3').hide();
                            var formDataCust = {
                                "employeeId": employeeId,
                                "customerName": customerName.toUpperCase(),
                                "customerId":custId,
								"customerType": customerType,
                                "areaId": areaId,
                                "weekDay": weekDay,
                                "firstName": firstName.toUpperCase(),
                                "lastName": lastName.toUpperCase(),
                                "emailAddress": emailAddress.toUpperCase(),
                                "cellPhone": cellPhone,
                                "phoneNumber": phoneNumber,
                                "unitNumber": unitNumber,
                                "billingAddress1": address1.toUpperCase(),
                                "billingAddress2": address2.toUpperCase(),
                                "billingAddress3": address3.toUpperCase(),
                                "city": city.toUpperCase(),
                                "state": state.toUpperCase(),
                                "country":country,
								"smsAllowed":smsAllow,
                                "postalCode": postalCode,
								"customerId1":customerId1,
								"customerId2":customerId2,
								"customerDesc1":customerDesc1,
								"customerDesc2":customerDesc2,
								"active":activecust,
                                "notes": notes.toUpperCase()
                            };

                            $.ajax({
                                type: 'POST',
                                url: baseUrl+'/prodcast/global/saveCustomer',
                                dataType: 'json',
                                data: formDataCust,
                                encode: true,
                                success: function(response) {
                                    if (response.error) {
                                        alertmessage(response.errorMessage);
                                    } else {
										if(custId=="")
											alertmessage("A new customer has been added successfully");
										else
											alertmessage("A customer has been Updated successfully");
										customerreset();
                                        //$('#cussavemsg').show();
                                        customer_customerList = response.customerList;
                                        while (customer_customerDisplay.length > 0) {
                                            customer_customerDisplay.pop();
                                        }
                                        for (var counter = 0; counter < customer_customerList.length; counter++) {
                                            customer_customerMap[customer_customerList[counter].id] = customer_customerList[counter];
                                            customer_customerDisplay.push({
                                                label: customer_customerList[counter].customerName,
                                                value: customer_customerList[counter].id
                                            });
                                        }
										toViewAllcustomers(response,true);
										/*
                                        $("#customer_companyname").autocomplete({
                                            source: customer_customerDisplay,
                                            select: function(event, ui) {
                                                // prevent autocomplete from updating the textbox
                                                event.preventDefault();
                                                // manually update the textbox and hidden field
                                                $(this).val(ui.item.label);
                                                customerId = ui.item.value;
                                                var cust = customer_customerMap[customerId];
                                                $('#cType').val(cust.customerType).change();
                                                $('#cust_screen_area').val(cust.area).change();
                                                $('#weekday').val(cust.weekday).change();
                                                $('#unitnumber').val(" ");
                                                $('#billingAddress1').val(cust.billingAddress1);
                                                $('#billingAddress2').val(cust.billingAddress2);
                                                $('#billingAddress3').val(cust.billingAddress3);
                                                $('#city').val(cust.city);
                                                $('#state').val(cust.state);
                                                //$('#country').val("IN");
                                                $('#postalCode').val(cust.postalCode);
                                                $('#firstname').val(cust.firstname);
                                                $('#lastname').val(cust.lastname);
                                                $('#phonenumber').val(cust.phonenumber);
                                                $('#cellphone').val(" ");
                                                $('#email').val(cust.emailaddress);
                                                $('#notes').val(cust.notes);
                                            }
                                        });
                                    */
									}
                                }
                            });

                        }




                    });

                $("#customer_companyname").on('click', function() {
                    //$('#cussavemsg').hide();
                });
                $("#customerscreen :input").on('click', function() {
                    $(this).css('border', ' 1px solid #d8e1b6');
					$('#csmsg').hide;
					$('#cnameexist').hide();

                });


                /* Customer Save End*/

                /*Customer Reset begins */
                $('#customer_reset').on('click', function() {
					customerreset();
                });
                /*Customer Reset ends */
            });
            /* Customer Screen Ends */

            /*order entry screen begins */
            $('#order-entry').on('pageinit', function() {
				$('#alert').hide();
				$('#pamsg').hide();
				$('#pmsg').hide();
				$('#payalert').hide();
				$('#minbalance1').hide();
				$('#chequenum').hide();
				$('#commentord').hide();

				$('#billdetailspage #ordtable').show();
				originalBills = $('#outstandingDiv').html();
                /* local variable declaration begins*/
                var billId = "";
                /*local variable declaration begins*/
                //$('#outstandingDiv').hide();
                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/global/customers?employeeId=' + employeeId,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == 'true') {
                            alertmessage('Please refresh the page and try again');
                        } else {
                            customer_customerList = response.customerList;
                            while (customer_customerDisplay.length > 0) {
                                customer_customerDisplay.pop();
                            }
                            for (var counter = 0; counter < customer_customerList.length; counter++) {
                                customer_customerMap[customer_customerList[counter].id] = customer_customerList[counter];
                                customer_customerDisplay.push({
                                    label: customer_customerList[counter].customerName.trim().toUpperCase(),
                                    value: customer_customerList[counter].id
                                });


                            }


                            $("#selectcustomer").autocomplete({
                                source: customer_customerDisplay,
                                select: function(event, ui) {
                                    // prevent autocomplete from updating the textbox
                                    event.preventDefault();
                                    // manually update the textbox and hidden field
                                    $(this).val(ui.item.label);
                                    customerId = ui.item.value;
                                    var custresponse = customer_customerMap[customerId];
                                    outstandingBills = custresponse.outstandingBill;
                                    $('.orderNewBillDate').text( "Bill Date : " +(new Date().customFormat(myDateFormat)));
                                    $('.customerName').text(custresponse.customerName);
                                    $('.address1').text(custresponse.billingAddress1 + ',' + custresponse.billingAddress2 + ',' + custresponse.billingAddress3);
                                    //$('.address2').text(custresponse.billingAddress2);
                                    // $('.address3').text(custresponse.billingAddress3);
                                    $.ajax({
                                        type: 'GET',
                                        url: baseUrl+'/prodcast/global/customer?id=' + customerId,
                                        dataType: 'json',
                                        success: function(response) {
                                            outstandingBills = response.customer.outstandingBill;
											writeOutstandingBills ( response , true);
											/*
                                            if (outstandingBills.length > 0) {
												$('#paymentdiv').show();
												$('#ordmsg').hide();
                                                if (!billsShown) {
                                                    $('#outstandingDiv').show();
                                                    originalBills = $('#outstandingDiv').html();
                                                    $('#outstandingdiv').show();
                                                    billsShown = true;
                                                } else {
                                                    $('#outstandingdiv').html(originalBills);
                                                }
                                                $('#outstandingDiv .tbl').empty()
                                                $('#outstandingDiv .tbl').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">Select</div><div class="tbl-cols">Bill No.</div><div class="tbl-cols">Bill Date</div><div class="tbl-cols">Total ('+currency+')</div><div class="tbl-cols">Balance ('+currency+')</div> </div>');
                                                for (var counter = 0; counter < outstandingBills.length; counter++) {
                                                    //$('#outstanding').append('<tr><td align="center"><input  id="billSelect'+counter+'" name="billNumber" value="'+outstandingBills[counter].billNumber+'" type="radio"/></td><td align="center"><a class="billNumber"  id="'+outstandingBills[counter].billNumber+'" data-role="button" data-mini="true" >'+outstandingBills[counter].billNumber+'<a/></td><td align="center">'+outstandingBills[counter].billDate+'</td><td align="center">'+outstandingBills[counter].billAmount+'</td><td align="center">'+outstandingBills[counter].outstandingBalance+'</td></tr>');

                                                    $('#outstandingDiv .tbl').append('<div class="tbl-row"><div class="tbl-cols"><input type="radio" id="billSelect' + counter + '" name="outstanding" value="' + outstandingBills[counter].billNumber + '" /></div><div class="tbl-cols"><a class="billNumber"  id="' + outstandingBills[counter].billNumber + '" data-role="button" data-mini="true" href="#billdetailspage">' + outstandingBills[counter].billNumber + '</a></div><div class="tbl-cols" >' + stringToDate( outstandingBills[counter].billDate) + '</div><div class="tbl-cols">' + outstandingBills[counter].billAmount + '</div><div class="tbl-cols">' + outstandingBills[counter].outstandingBalance + '</div></div>');

                                                }

                                            } else {
                                                $('#paymentdiv').hide();
                                                $.mobile.navigate('#order-new');
                                            }
											*/
                                        }
                                    });
                                },

                            });

                        }
                    }
                });
					$('#mop').change(function(){
						var mop=$('#mop').val();
						if (mop == '1') {
						$('#chequenum').show();
						$('#commentord').show();

						}
						else{
							$('#chequenum').hide();
							$('#commentord').hide();

						}
					});

                $('#paymentSubmit').on("click", function(e) {
					var outstandingAmount="";
				e.preventDefault();
				$('#ordmsg').hide();
				$('#payalert').hide();
				$('#alert').hide()
				$('#pamsg').hide();
				$('#pmsg').hide();
				$('#minbalance1').hide();
                var all_answered = true;

                $("input:radio").each(function () {
                    var name = $(this).attr("name");
                    if ($("input:radio[name=" + name + "]:checked").length == 0) {
                        all_answered = false;
                    }
				});

                if (all_answered == false) {
                    $('#alert').show();
                }
				else{
					if(all_answered == true)
					{
						$('#alert').hide();
					}

				}
					var payment = $("#payment").val();
					var payvalidate=true;
						if (payment == "")
						{

						 payvalidate=false;
						$('#payment').css('border', '1px solid red');
						$('#pamsg').show();
						}
						else{
						$('#pamsg').hide();
						}
						var mop = $("#mop").val();
						if (mop == "")
						{
						 payvalidate=false;
						$('#mop').css('border', '1px solid red');
						$('#pmsg').show();

						}
						else
						{
						$('#pmsg').hide();
						}

						var mop = $("#mop").val();
						if(mop == '1')
						{
						var chequenumber=$('#chequenumber').val();
						var payvalidate=true;
						if (chequenumber == "")
						{
						 payvalidate=false;
						$('#chequenumber').css('border', '1px solid red');
						$('#chequen').show();
						}
						else{
						$('#chequen').hide();
						}

						var commentorder=$('#commentorder').val();
						if (commentorder == "")
						{
						 payvalidate=false;
						$('#commentorder').css('border', '1px solid red');
						$('#commento').show();
						}
						else{
						$('#commento').hide();
						}
					}
                    for (var counter = 0; counter < outstandingBills.length; counter++) {
                        var obj = $('#billSelect' + counter);
                        if (obj.is(':checked')) {
                            $('.savedamount').hide();
                            billId = outstandingBills[counter].billNumber;
                            outstandingAmount = outstandingBills[counter].outstandingBalance;

                            break;

                            //$('.savedamount').text("Saved");
                        }
                    }
						if(payment>outstandingAmount)
							{
							$('#payalert').show();
							return;
							}
						else
						{
							$('#payalert').hide();
						}
						if (payment<0)
							{
							$('#minbalance1').show();
							return;
							}
						else
						{
							$('#minbalance1').hide();
						}

                    var formData = {
                        "employeeId": employeeId,
                        "billId": billId,
                        "amount": $('#payment').val(),
                        "customerId": customerId,
						"paymentType":mop,
						"refNo":chequenumber,
						"refDetail":commentorder
                    };




                    if (payvalidate) {
                        var paymentval = $('#payment').val();
                        var pval = parseInt(paymentval);
                        if ($(!isNaN($('#payment').val()))) {
                            if (pval > 0 && pval <= outstandingAmount) {
                                $.ajax({
                                    type: 'POST',
                                    url: baseUrl+'/prodcast/global/collection',
                                    dataType: 'json',
                                    data: formData,
                                    encode: true,
                                    success: function(response) {
                                        if (response.error) {
                                            alertmessage(response.errorMessage);
                                        } else {
                                            $('#payment').val("");
											$('#chequenumber').val("");
											$('#commentorder').val("");

                                            outstandingBills = response.customer.outstandingBill;
											writeOutstandingBills( response ,true);
											alertmessage("Payment for "+formData.amount+" has been processed");

                                        }


                                    }
                                });
                            }
                        }
                    }

                });


                $('#neworderlink').on('click', function() {
                    //$("#selectcustomer").val('');

                    //$('.outstandingDiv').show();

					$('#productvalue1').val("");
					$('#quantityvalue1').val("");

                    $('#totalvalue').text('0.00');
                    $.mobile.navigate('#order-new');

                });
					$("#order-entry :input").on('click', function()
                        {
                            $(this).css('border', ' 1px solid #d8e1b6');
							$('#commento').hide();
							  $('#chequen').hide();
                            $('#pamsg').hide();
                            $('#pmsg').hide();

                        });
           });

            /* payment ends
            });
            /*order entry screen ends */

            /*order details screen begins */
            $("#order-new").on("pageinit", function() {
				$('.discount').hide();
				//$('#orderdetailscurrency').html(currency);
                originalOrderDetailsTable = $('#odtbl').html();
				originalReviewTable = $('#odrtbl').html();
                /* div hide begin*/
                $('#savedialog').hide();
				$('#savedialog1').hide();
				$('#minbalance2').hide();
				$('#discountValue').val("");
				//$('#discountType').selectedIndex[0];
                /*div hide end*/
                /* local variable declaration begins */
                var productMap = [];
                var productDisplay = [];
                var entries = [];
                var unitPrice = "";
                var qtytext = "";
                var quantity = "";
                var subtotal = "";
                var totalVal = 0;
                var currentID = "";
                var id = "";
                var total = "";

				$(".discount").hide();
				$("#applydiscount").on("click",function(){

					if( $("#applydiscount").html() == "Apply Discount" ){
						$("#applydiscount").html("Cancel Discount");
						$(".discount").show();
					}
					else{
						$("#applydiscount").html("Apply Discount");
						$("#discountValue").val("0");
						calculateTotal(id);
						$(".discount").hide();
					}

				});
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
				$('#productvaluenew').on("click",function(){
						$('#productvalue1').autocomplete("search" , " ");
				});

                var i = gid[gid.length - 1];
                var content = "";
                $('.qty').one('click', function() {
                    i++;
                    gid.push(i);
                    $('#odtbl').append('<div class="tbl-row" id="rowid' + i + '"><div class="tbl-cols"><a href="#" class="remove" id="' + i + '">X</a></div><div class="tbl-cols"><input class="input-feild-style" type="text" id="productvalue' + i + '"/><input type="hidden" id="hproductvalue' + i + '"/><a href="#" class="productvalue_all" id="productvaluenew' + i + '"><span class="ui-icon ui-icon-triangle-1-s"></span></a></div><div class="tbl-cols"><input class="input-feild-style qty" id="quantityvalue' + i + '" type="number" min="0"/></div><div class="tbl-cols"><label style="text-align:center;padding-left:25%" id="subtotal' + i + '">0.00</label></div></div>').trigger('create');
					var temp = i;
					$('#productvaluenew'+temp).on("click",function(){
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
                        }
                    });
                });
                $(document).delegate('.qty', 'keyup', function(evt) {

                    var clicked = evt.target;
                    currentID = clicked.id || "No ID!";
                    id = currentID.replace(/[^\d.]/g, '');
                    calculateTotal(id);
                });
				$(document).delegate('.discountValue', 'keyup', function(evt) {

                    discount=$('#discountValue').val();
					calculateTotal(id);

                });
				$('#discountType').on("change",function(){

					calculateTotal(id);
				});

				$('#productvaluenew').on("click",function(){
						$('#productvalue1').autocomplete("search" , " ");
				});
                $(document).delegate('.qty', 'click', function(evt) {
                    $('.qty').click(function(evt) {

                        var clicked = evt.target;
                        currentID = clicked.id || "No ID!";
                        id = currentID.replace(/[^\d.]/g, '');
                        //alert(id);
                        lastvalue = gid[gid.length - 1];

                        if (id == lastvalue) {
                            i++;
                            gid.push(i);
							$('#odtbl').append('<div class="tbl-row" id="rowid' + i + '"><div class="tbl-cols"><a href="#" class="remove" id="' + i + '">X</a></div><div class="tbl-cols"><input class="input-feild-style" type="text" id="productvalue' + i + '"/><input type="hidden" id="hproductvalue' + i + '"/><a href="#" class="productvalue_all" id="productvaluenew' + i + '"><span class="ui-icon ui-icon-triangle-1-s"></span></a></div><div class="tbl-cols"><input class="input-feild-style qty" id="quantityvalue' + i + '" type="number" min="0"/></div><div class="tbl-cols"><label style="text-align:center;padding-left:25%" id="subtotal' + i + '">0.00</label></div></div>').trigger('create');
							var id = i;
							$('#productvaluenew'+id).on("click",function(){
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
                                }
                            });

                        }

                        accordionEffect(id);


                    });

                });

                $('.chequediv').hide();

				$('#dialogPaymentMode').change(function(){
						var dialogPaymentMode=$('#dialogPaymentMode').val();
						if (dialogPaymentMode == '1') {
						$('#savecheque').show();
						$('#savecomment').show();

						}
						else{
							$('#savecheque').hide();
							$('#savecomment').hide();

						}
					});
                $('.saveorder').on('click', function() {

				if($('#productvalue1').val() != "" && $('#quantityvalue1').val() == 0){
					alertmessage("Please Enter a Quantity");
				}


                    //if ($('#productvalue'+id).val()!= "" && $('#quantityvalue'+id).val()!= "")
                    else if ($('#productvalue1').val() != "" && $('#quantityvalue1').val() != "")
						{

                        $("#savedialog").dialog({
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

							$('#savecheque').hide();
							$('#savecomment').hide();

					}

					else {
                        alertmessage("Please select at least one Product.");
                    }
                });
                /*
                var mode={"cash":"Cash","cheque":"Cheque"};
                $('.paymentmode').append('<option value="1">'+mode.cash+'</option> <option value="2">'+mode.cheque+'</option>'); */
                $('.paymentmode').change(function() {

                    selected_value = $('.paymentmode option:selected').val();
                    //alert("sel"+selected_value);
                    if (selected_value == "2") {
                        $('.chequediv').show();
                        //alert("sel2"+selected_value);
                    } else {
                        $('.chequediv').hide();
                        //alert("sel1"+selected_value);
                    }
                });

                /* local variable declaration begins */

                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/global/products?employeeId=' + employeeId,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == 'true') {
                            //$('#selectError').html('Please refresh the page and try again');
                            alertmessage("Please refresh the page and try again");
                        } else {
                            productList = response.productList;
							while(productDisplay.length > 0 ){
								productDisplay.pop();
							}
                            for (var counter = 0; counter < productList.length; counter++) {
                                productMap[productList[counter].id] = counter;
                                productDisplay.push({
                                    label: productList[counter].productName+" ",
                                    value: productList[counter].id
                                });
                            }

                        }

                    }
                });

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


                    }
                });

                function calculateTotal(id) {
                    if ($('#hproductvalue' + id).val() != "" && !isNaN($('#hproductvalue' + id).val())) {
						var selectedProduct = productList[productMap[$('#hproductvalue' + id).val()]];
                        var unitPrice = selectedProduct.unitPrice;
						var salesTax = selectedProduct.salesTax;
						var otherTax = selectedProduct.otherTax;
                        var qtytext = $('#quantityvalue' + id);
                        var quantity = qtytext.val();

                        var subtotal = (Number(unitPrice) * Number(quantity)*( 1+(Number(salesTax)+Number(otherTax))/100  )).toFixed(2);
						$('#subtotal' + id).text(subtotal);
                    }

                    var totalVal = 0;
					var newtotal=0;
					var discount=0;
					$(document).delegate('.discountValue', 'keyup', function(evt) {

                    //discount=Number($('#discountValue').val());
                });

                    for (var k = 0; k < gid.length; k++) {
                        var ind = gid[k];
                        if (!isNaN($('#subtotal' + ind).text()))
						{

							 var discount=$('#discountValue').val();
							 var discount=$('#discountValue').val();
							 newtotal +=Number($('#subtotal' + ind).text());
							 if(discount=="")
							 {
							 		totalVal=newtotal;
							 }
							 if(isNaN(discount))
							 {
								 alertmessage("Please Enter A Proper Value");
							 }
							 if($('#discountType').val()==1)
							 {
									totalVal = newtotal-discount;
							 }
							 if($('#discountType').val()==2){

									totalVal=(newtotal*(1-(discount/100)));
							}
						}
                    }

                    $('#totalvalue').text(totalVal);

                }

                /* so dialog close begins */
                $('.sopaymentbtn').click(function() {
					$('#minbalance2').hide();
						var dialogPaymentMode=$('#dialogPaymentMode').val();

						if (dialogPaymentMode == '1')
					{
						var chequesavenumber=$('#chequesavenumber').val();
						var payvalidate1=true;
						if (chequesavenumber == "")
						{
						 payvalidate1=false;
						$('#chequesavenumber').css('border', '1px solid red');
						$('#chequesave').show();
						}
						else{
						 chequesavenumber=$('#chequesavenumber').val();
						}

						var commentsaveorder=$('#commentsaveorder').val();
						if (commentsaveorder == "")
						{
						 payvalidate1=false;
						$('#commentsaveorder').css('border', '1px solid red');
						$('#commentsave').show();
						}
						else{
						 commentsaveorder=$('#commentsaveorder').val();
						}


					}
                    var so = {};
                    so.customerId = customerId;
                    so.employeeId = employeeId;
                    so.entries = entries;
					so.paymentType=dialogPaymentMode;
					so.refNO=chequesavenumber;
					so.refDetail=commentsaveorder;
                    so.paymentAmount = $('#sopayment').val();
                    so.discountValue=$('#discountValue').val();
					so.discountType=$('#discountType').val();

					if ((so.paymentAmount<0) || isNaN(so.paymentAmount) || (so.paymentAmount==''))
					{
							$('#minbalance2').show();
							return;
					}

                    for (var i = 0; i < gid.length; i++) {
                        var proId = $('#hproductvalue' + gid[i]).val();
                        if (proId == '') {
                            break;
                        }
                        var qtyVal = $('#quantityvalue' + gid[i]).val();
                        if (qtyVal == '0') {
                            break;
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
                                alertmessage(response.errorMessage);
                            } else {
                                $('#savedialog').dialog("close");
								while(gid.length>0)
								{
									gid.pop();
								}
								while( entries.length>0){
									entries.pop();
								}
								i=0;
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
										}
								});
								$('.qty').one('click', function()
								{
									i++;
									gid.push(i);
									$('#odtbl').append('<div class="tbl-row" id="rowid' + i + '"><div class="tbl-cols"><a href="#" class="remove" id="' + i + '">X</a></div><div class="tbl-cols"><input class="input-feild-style" type="text" id="productvalue' + i + '"/><input type="hidden" id="hproductvalue' + i + '"/></div><div class="tbl-cols"><input class="input-feild-style qty" id="quantityvalue' + i + '" type="number" min="0"/></div><div class="tbl-cols"><label style="text-align:center;padding-left:25%" id="subtotal' + i + '">0.00</label></div></div>').trigger('create');
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
									}
								});
								});
								$('.qty').on('click', function()
								{
									i++;
									gid.push(i);
									$('#odtbl').append('<div class="tbl-row" id="rowid' + i + '"><div class="tbl-cols"><a href="#" class="remove" id="' + i + '">X</a></div><div class="tbl-cols"><input class="input-feild-style" type="text" id="productvalue' + i + '"/><input type="hidden" id="hproductvalue' + i + '"/></div><div class="tbl-cols"><input class="input-feild-style qty" id="quantityvalue' + i + '" type="number" min="0"/></div><div class="tbl-cols"><label style="text-align:center;padding-left:25%" id="subtotal' + i + '">0.00</label></div></div>').trigger('create');
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
									}
								});


							});

						outstandingBills = response.customer.outstandingBill;
						writeOutstandingBills( response , false );
						alertmessage("The order has been processed successfully");
                        /*$("#savedialog1").dialog({
                            modal: true,
                            draggable: false,
                            resizable: false,
                            position: ['center'],
                            show: 'blind',
                            hide: 'blind',
                            width: '300',
                            height: '200',
                            dialogClass: 'ui-dialog-osx',
                        });


						$('#okmsg').on('click', function() {

							$('#savedialog1').dialog("close");

                        });*/
						$.mobile.navigate('#order-entry');
                            }
                        }
                    });

                });


                $(document).delegate('.remove', 'click', function(evt) {
                    var clicked = evt.target;
                    var rowID = clicked.id || "No ID!";
                    $('#rowid' + rowID).remove();
                    gid.splice(rowID, 1);

                });

				$("#order-new :input").on('click', function()
                        {
                            $(this).css('border', ' 1px solid #d8e1b6');
                            $('#minbalance2').hide();
							$('#chequesave').hide();
							$('#commentsave').hide();

                        });
						$('#reviewbtn').on('click', function() {
								$.mobile.navigate("#review");
								$('#odrtbl').html(originalReviewTable);
								//$('#odrtbl').empty();
								for (var i = 0; i < gid.length; i++) {
									if ($('#productvalue' + gid[i]).val() != "" && $('#quantityvalue' + gid[i]).val() != "") {

										var selectedProduct = productList[productMap[$('#hproductvalue' + gid[i]).val()]];
										var unitPrice = selectedProduct.unitPrice;
										var salesTax = selectedProduct.salesTax;
										var otherTax = selectedProduct.otherTax;

										// $("#review").css("display", "block");

										var productvalue = $('#productvalue' + gid[i]).val();

										var qtyvalue = $('#quantityvalue' + gid[i]).val();

										var stotal = $('#subtotal' + gid[i]).text();
										var salesTaxValue = ((Number(salesTax)/100)*unitPrice*Number(qtyvalue)).toFixed(2);
										var otherTaxValue = ((Number(otherTax)/100)*unitPrice*Number(qtyvalue)).toFixed(2);

										if (stotal != "0.00") {
											//$('#reviewtable').append('<tbody id="tablebody" style="color:#FFFFFF"><tr><td align="center">'+productvalue+'</td><td align="right">'+qtyvalue+'</td><td align="right">'+uprice+'</td><td align="right">'+stotal+'</td></tr></tbody>');
											$('#odrtbl').append('<div class="tbl-row" id="rowid' + i + '"><div class="tbl-cols"><label>' + productvalue + '</label></div><div class="tbl-cols" style="text-align:right"><label>' + qtyvalue + '</label></div><div class="tbl-cols" style="text-align:right"><label>' + unitPrice + '</label></div><div class="tbl-cols" style="text-align: right">'+ salesTaxValue +' </div><div class="tbl-cols" style="text-align: right">'+ otherTaxValue +' </div><div class="tbl-cols" style="text-align:right;"><label>' + stotal + '</label></div></div>');
										}
									}

								}
									var disValue=$('#discountValue').val();
									var disType=$('#discountType').val();
									total = $('#totalvalue').text();
									$('#rdiscountValue').text(disValue);
									if(disType==1)
									{
										$('#rdiscountType').text("Amount");
									}
									if(disType==2)
									{
										$('#rdiscountType').text("Percentage");
									}
								$('#rtotalvalue').text(total);
					});

            $('#co').on('click', function() {
                $.mobile.navigate("#order-new");
            });

            });

            /*order details screen ends*/
			/* change password screen begins */

            $('#changepasswordscreen').on("pageinit", function() {

				function resetChangePassword()
				{
					$('#newPassword').val("");
					$('#oldPassword').val("");
					$('#confirmPassword').val("");
					$('#oldpsdnull').hide();
					$('#oldpsderror').hide();
					$('#newpsdnull').hide();
					$('#newpsdsame').hide();
					$('#newpsderror').hide();
					$('#confirmpsdnull').hide();
					$('#confirmpsderror').hide();

				}
				$('#oldpsdnull').hide();
				$('#oldpsderror').hide();
				$('#newpsdnull').hide();
				$('#newpsdsame').hide();
				$('#newpsderror').hide();
				$('#confirmpsdnull').hide();
				$('#confirmpsderror').hide();

				$("#dialog1").show();
				$("#changepasswordscreen :input").on('click', function() {
                    $(this).css('border', ' 1px solid green');
					$('#oldpsdnull').hide();
					$('#oldpsderror').hide();
					$('#newpsdnull').hide();
					$('#newpsdsame').hide();
					$('#newpsderror').hide();
					$('#confirmpsdnull').hide();
					$('#confirmpsderror').hide();

				});




					$('#password_save').on('click',function(){
						newPswd=$('#newPassword').val();
					oldPswd=$('#oldPassword').val();
					confirmPswd=$('#confirmPassword').val();

					if(oldPswd=="")
					{
						$('#oldPassword').css('border', ' 1px solid red');
						$('#oldpsdnull').show();
						return;

					}

					if(newPswd=="")
					{
						$('#newPassword').css('border', ' 1px solid red');
						$('#newpsdnull').show();

						return;

					}
					else{
						if(newPswd==oldPswd)
						{
							$('#newPassword').css('border', ' 1px solid red');
							$('#newpsdsame').show();
							return;
						}
						if(newPswd.length<7)
						{
							$('#newPassword').css('border', ' 1px solid red');
							$('#newpsderror').show();
							return;
						}

					}
					if(confirmPswd=="")
					{
						$('#confirmPassword').css('border', ' 1px solid red');
						$('#confirmpsdnull').show();
						return;
					}
					else{
						if(newPswd!=confirmPswd)
						{
							$('#confirmPassword').css('border', ' 1px solid red');
							$('#confirmpsderror').show();
							return;
						}


					}					var formDataChangePassword={
						"employeeId":employeeId,
						"oldPassword":oldPswd,
						"newPassword":newPswd
					};
					$.ajax({
                            type: 'POST',
                            url: baseUrl+'/prodcast/global/changePassword',
                            dataType: 'json',
							data:formDataChangePassword,


                            encode: true,
                            success: function(response) {
                                if (response.error) {
                                    alertmessage(response.errorMessage);
                                } else {
									alertmessage("Password Changed Successfully");
									resetChangePassword();

							}

                                }

                        });




				});
				$('#password_reset').on('click',function(){
					resetChangePassword();



				});


                                 });
/*change password screen ends*/





            /* employee screen begins */
            $('#employeescreen').on('pageinit', function() {
                /*local variable begins*/
				$('#savedialog1').hide();
				$('#hiredateconfirm').hide();
                var name = [];
                var empMap = [];
                var emp = [];
                var eaArray = [];
                var empArea = [];
                var genderType = "0";
                var empactive = "";
                var empuserRole = "0";
				var emp_country="";
                var empMap1 = [];
                var name1 = [];
                var evalid1 = true;
                var evalid2 = true;
                var evalid3 = true;
                /*local variable ends */
				function employeereset()
				{


					$("#EmployeeGender")[0].selectedIndex = 0;

					$("#Employee_area")[0].selectedIndex = 0;
					$("#Employee_Country")[0].selectedIndex = 0;
					$("#userRole")[0].selectedIndex = 0;
					$('#activeemp')[0].checked=true;

					$("input[type=number], textbox").val("");
					$('#Employee_area').on('change',function() {
					$('#Employee_area').attr('selectedIndex',0);
					});

					empId="";
					$('#Employee_save').html("Save");
                    $("#e_tab1").find('input:text').val('');
                    $("#e_tab1 :input").css('border', ' 1px solid #d8e1b6');
					$("#e_tab2").find('input:text').val('');
                    $("#e_tab2 :input").css('border', ' 1px solid #d8e1b6');

					$("#e_tab3").find('input:text').val('');
					//$("#e_tab3").find('input:email').val('');
                    $("#e_tab3 :input").css('border', ' 1px solid #d8e1b6');
                    $("input[type=email], textbox").val("");
				}




                $('#ereset1').on('click', function()
				{
					employeereset(true);
					$("#hiredateconform").hide();
					$("#todayhiredate").hide();
					$("#todaydobdate").hide();


                });

				$('#ereset2').on('click', function() {

					employeereset(true);
                });

                $('#ereset3').on('click', function() {
                   employeereset(true);
                });

              //  $('#empsavemsg').hide();
                $(function() {
                    $("#Employee_hiredate").datepicker({changeYear: true, dateFormat: myDateFormatDatePicker});
                    $("#Employee_dob").datepicker({
                        changeYear: true,
						dateFormat: myDateFormatDatePicker
                    });

                    //$("#Employee_terminationdate").datepicker();
                });

			function employeeSubAutoComplete(empdetails)
			{

                        $('#Employee_save').html("Update");
						$("#Employee_firstname").val(empdetails.firstname);
                        $("#Employee_lastname").val(empdetails.lastname);
                        $("#Employee_title").val(empdetails.title);
						$("#EmployeeGender").val(empdetails.gender);
						$("#Employee_dob").val(stringToDate(empdetails.dateOfBirth));
                        $("#Employee_salary").val(empdetails.salary);
						$("#Employee_area").val(empdetails.areaId);
                        $("#Employee_hiredate").val(stringToDate(empdetails.hireDate));
                        $("#Employee_allowance").val(empdetails.allowance);
                        $("#userRole").val(empdetails.userRole);
                        $("#EmployeeActive").val(empdetails.active).change();
                        $("#Employee_Addrline1").val(empdetails.address1);
                        $("#Employee_Addrline2").val(empdetails.address2);
                        $("#Employee_Addrline3").val(empdetails.address3);
                        $("#Employee_City").val(empdetails.city);
                        $("#Employee_state").val(empdetails.state);
                        $("#Employee_Postalcode").val(empdetails.postalCode);
                        $("#Employee_Country").val(empdetails.countryId);
						$("#Employee_location").val(empdetails.location);
                        $("#Employee_cellphone").val(empdetails.cellphone);
                        $("#Employee_homephone").val(empdetails.homephone);
                        $("#Employee_workphone").val(empdetails.workphone);
                        $("#Employee_EmailId").val(empdetails.emailId);
                        $("#Comments").val(empdetails.comments);
						$('#activeemp')[0].checked=empdetails.active;
						empId=empdetails.employeeId;
						$('#Employee_save').html("Update");

			}

			function toViewAllemployees(response)
			{
				if (response.error) {
                       alertmessage(response.errorMessage);
                 } else {
                      originalAllEmployees = $('#viewallemployeesDiv').html();
                      $('#allemployeesTable').empty();
					  $('#allemployeesTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">S.No</div><div class="tbl-cols">First Name</div><div class="tbl-cols">Last Name</div><div class="tbl-cols">Email Address</div> </div>');
						for (counter = 0; counter < response.result.length; counter++) {
						  	var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter+1) + '</div><div class="tbl-cols"><a class="viewallemployeesName" id="'+response.result[counter].employeeId+'" data-toggle="tab" data-mini="true"  aria-expanded="true">' + response.result[counter].firstname.trim().toUpperCase() + '</a></div><div class="tbl-cols">' + response.result[counter].lastname.trim().toUpperCase()+ '</div><div class="tbl-cols">'+ response.result[counter].emailId+'</div></div>';
							$('#allemployeesTable').append(newRow);
							$('#allemployeesTable').show();
                           }
						$('.viewallemployeesName').on("click" , function(evt){
							document.getElementById('e_EmployeeTab').click();
							employeeSubAutoComplete(empMap[evt.target.id]);

						});
					}
			}
                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/distributor/getEmployees?employeeId=' + employeeId,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == null) {
                            alertmessage("SQL Error");

                        } else {
                            var emp = response.result;
                            $('#fnameexist').hide();

                            for (var k = 0; k < emp.length; k++) {
                                empMap[emp[k].employeeId] = emp[k];
                                name.push({
                                    label: (emp[k].firstname+ ' ' + emp[k].lastname).trim().toUpperCase(),
                                    value: emp[k].employeeId
                                });
                            }

                        }
                    }
                });

				//View All Employees Starts
				$.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/distributor/getEmployees?employeeId=' + employeeId,
                    dataType: 'json',
                    success: function(response) {
                        toViewAllemployees(response,true);

                        }

                });
					//View All Employees Ends

                $("#Employee_firstname").autocomplete({
                    source: name,
                    select: function(event, ui) {

                        // prevent autocomplete from updating the textbox
                        event.preventDefault();
                        // manually update the textbox and hidden field
                        $(this).val(ui.item.label);
                        //alert(ui.item.value);
                        var eid = ui.item.value;
                        var empdetails = empMap[eid];
                        //$('#productdesc').val(product.productDesc);
                        //$('#customer_save').hide();

                        $("#Employee_firstname").val(empdetails.firstname);
                        $("#Employee_lastname").val(empdetails.lastname);
                        $("#Employee_title").val(empdetails.title);
						$("#EmployeeGender").val(empdetails.gender);
						$("#Employee_dob").val(stringToDate(empdetails.dateOfBirth));
                        $("#Employee_salary").val(empdetails.salary);
						$("#Employee_area").val(empdetails.areaId);
                        $("#Employee_hiredate").val(stringToDate(empdetails.hireDate));
                        $("#Employee_allowance").val(empdetails.allowance);
                        $("#userRole").val(empdetails.userRole);
                        $("#EmployeeActive").val(empdetails.active).change();
                        $("#Employee_Addrline1").val(empdetails.address1);
						 $("#Employee_Country").val(empdetails.countryId);
                        $("#Employee_Addrline2").val(empdetails.address2);
                        $("#Employee_Addrline3").val(empdetails.address3);
                        $("#Employee_City").val(empdetails.city);
                        $("#Employee_state").val(empdetails.state);
                        $("#Employee_Postalcode").val(empdetails.postalCode);
                        $("#Employee_location").val(empdetails.location);
                        $("#Employee_cellphone").val(empdetails.cellphone);
                        $("#Employee_homephone").val(empdetails.homephone);
                        $("#Employee_workphone").val(empdetails.workphone);
                        $("#Employee_EmailId").val(empdetails.emailId);
                        $("#Comments").val(empdetails.comments);
						$('#activeemp')[0].checked=empdetails.active;
						empId=empdetails.employeeId;
						$('#Employee_save').html("Update");




                    }

                });

                $('#Employee_reset').on('click', function() {
					employeereset();
				});

                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/distributor/getAreas?employeeId=' + employeeId,
                    dataType: 'json',
                    success: function(response) {
                        if (response.error == null) {
                            alertmessage("SQL Error");

                        } else {
                            empArea = response.result;
                            for (var k = 0; k < empArea.length; k++) {
                                eaArray.push({
                                    label: empArea[k].description,
                                    value: empArea[k].id
                                });
                            }
                            for (var k = 0; k < eaArray.length; k++) {
                                $("#Employee_area").append($("<option value=" + eaArray[k].value + ">" + eaArray[k].label + "</option>"));

                            }
                        }
                    }

                });

                $('#EmployeeGender').on("click", function() {
                    $(this).css('border', ' 1px solid #d8e1b6');

                });
                $('#userRole').on("click", function() {
                    $(this).css('border', ' 1px solid #d8e1b6');

                });
				$('#Employee_Country').on("click", function() {
                    $(this).css('border', ' 1px solid #d8e1b6');

                });


                $('#EmployeeGender').on('change', function() {
                    genderType = ($(this).val());



                });
				$('#Employee_Country').on('change', function() {
					if($(this).val()=="")
					{
						$(this).css('border', ' 1px solid #d8e1b6');
						evalid2=false;
					}
					else{
                    emp_country = ($(this).val());
					}



                });

                $('#userRole').change(function() {
                    empuserRole = ($(this).val());

                    //alert(empactive);
                });
                var areaIds = "0";
                $("#Employee_area").change(function() {
                    areaIds = $("#Employee_area").val();

                });
                $("#Employee_save").on("click", function() {

					evalid1 = true;
					evalid2 = true;
					evalid3 = true;

                    if ($("#Employee_area").val() == "0") {

                        $("#Employee_area").css('border', '1px solid red');
                        evalid1 = false;
                    } else {
                        areaIds = $("#Employee_area").val();

                    }

                    if ($('#EmployeeGender').val() == "0") {

                        $('#EmployeeGender').css('border', '1px solid red');
                        evalid1 = false;
                    } else {
                        genderType = $('#EmployeeGender').val();

                    }

                    if ($('#userRole').val() == "0") {
                        $('#userRole').css('border', '1px solid red');
                        evalid1 = false;
                    } else {
                        empuserRole = $('#userRole').val();

                    }
                    var firstName = "";
                    if (($('#Employee_firstname').val() == "")||($('#Employee_firstname').val() == null)) {
                        $('#Employee_firstname').css('border', '1px solid red');
                        evalid1 = false;
                    }
					else {
                        firstName = $("#Employee_firstname").val();
                    }

                    var lastName = "";
					if (($('#Employee_lastname').val() == "")||($('#Employee_lastname').val() == null)){
                        evalid1 = false;
                        $('#Employee_lastname').css('border', '1px solid red');
                    }
					else {
                        lastName = $("#Employee_lastname").val();
                    }


                    var title = "";
                    if ($('#Employee_title').val() == "") {
                        title = $("#Employee_title").val(" ");
						evalid1=false;
						$('#Employee_title').css('border', '1px solid red');
                    } else {
                        title = $("#Employee_title").val();
                    }

                    var dob = "";
                    if ($('#Employee_dob').val() == "") {
                        evalid1 = false;
                        $('#Employee_dob').css('border', '1px solid red');
                    }

					else {
                        dob = $("#Employee_dob").val();
                    }

                    var salary = "";
                    if ($('#Employee_salary').val() <=0)
						{
						 evalid1=false;
						$('#Employee_salary').css('border', '1px solid red');

						}

						else
						{
						salary = $("#Employee_salary").val();

						}

                    if ($('#Employee_salary').val() == "") {
                        salary = $("#Employee_salary").val("0");
                    } else {
                        salary = $("#Employee_salary").val();
                    }
                    var hiredate = "";
                    if ($('#Employee_hiredate').val() == "") {
                        evalid1 = false;
                        $('#Employee_hiredate').css('border', '1px solid red');
                    }
					else{
						hiredate = $('#Employee_hiredate').val() ;
					}

					var h=getdatefromstring($('#Employee_hiredate').val());
					var k=getdatefromstring($('#Employee_dob').val());
					if(h<k)
					{
						evalid1=false;
						$('#Employee_hiredate').css('border', '1px solid red');
						$("#hiredateconform").show();
					}
					var m=getdatefromstring(new Date().customFormat(myDateFormat));
					if(h>m){
						evalid1=false;
						$('#Employee_hiredate').css('border', '1px solid red');
						$("#todayhiredate").show();


					}
					var m=getdatefromstring(new Date().customFormat(myDateFormat));
					if(k>m){
						evalid1=false;
						$('#Employee_dob').css('border', '1px solid red');
						$("#todaydobdate").show();


					}
					/*else{
						evalid1=true;
						$('#Employee_hiredate').css('border', '1px solid green');
					}*/


                    var terminationdate = "01/01/1990";

                    var allowance = "";
					var allowvalidate=true;
                    if ($('#Employee_allowance').val() <=0)
						{
						 allowvalidate=false;
						$('#Employee_allowance').css('border', '1px solid red');

						}

						else
						{
						allowance = $("#Employee_allowance").val();

						}

                    if ($('#Employee_allowance').val() == "") {
                        allowance = $("#Employee_allowance").val("0");
                    } else {
                        allowance = $("#Employee_allowance").val();
                    }

                    var add1 = $("#Employee_Addrline1").val();
                    if ($('#Employee_Addrline1').val() == "") {
                        evalid2 = false;
                        $('#Employee_Addrline1').css('border', '1px solid red');
                    } else {
                        add1 = $("#Employee_Addrline1").val();
                    }
                    var add2 = "";
                    if ($('#Employee_Addrline2').val() == "") {
                        evalid2 = false;
                        $('#Employee_Addrline2').css('border', '1px solid red');
                    } else {
                        add2 = $("#Employee_Addrline2").val();
                    }

                    var add3 = "";
                    if ($('#Employee_Addrline3').val() == "") {
                        evalid2 = false;
                        $('#Employee_Addrline3').css('border', '1px solid red');
                    } else {
                        evalid2 = true;
                        add3 = $("#Employee_Addrline3").val();
                    }


                    var city = "";
                    if ($('#Employee_City').val() == "") {
                        evalid2 = false;
                        $('#Employee_City').css('border', '1px solid red');
                    } else {
                        city = $("#Employee_City").val();
                    }

                    var state = "";
                    if ($('#Employee_state').val() == "") {
                        evalid2 = false;
                        $('#Employee_state').css('border', '1px solid red');
                    } else {
                        state = $("#Employee_state").val();
                    }

                    var postalcode = "";
                    if ($('#Employee_Postalcode').val() == "") {
                        evalid2 = false;
                        $('#Employee_Postalcode').css('border', '1px solid red');
                    } else {
                        postalcode = $("#Employee_Postalcode").val();
                    }

                    var location = "";
                    if ($('#Employee_location').val() == "") {
                        evalid2 = false;
                        $('#Employee_location').css('border', '1px solid red');
                    } else {
                        location = $("#Employee_location").val();
                    }


                    var cellphone = "";
                    if ($('#Employee_cellphone').val() == "" || isNaN($('#Employee_cellphone').val())) {
                        evalid3 = false;
                        $('#Employee_cellphone').css('border', '1px solid red');
                    } else {
                        cellphone = $("#Employee_cellphone").val();
                    }

                    var homephone = "";
                    if ($('#Employee_homephone').val() == "" || isNaN($('#Employee_homephone').val())) {
                        evalid3 = false;
                        $('#Employee_homephone').css('border', '1px solid red');
                    } else {
                        homephone = $("#Employee_homephone").val();
                    }


                    var workphone = "";
                    if ($('#Employee_workphone').val() == "" || isNaN($('#Employee_workphone').val())) {
                        evalid3 = false;
                        $('#Employee_workphone').css('border', '1px solid red');
                    } else {
                        workphone = $("#Employee_workphone").val();
                    }

                    var email = "";
					if ($('#Employee_EmailId').val() == "" ||!validateEmail( $('#Employee_EmailId').val())) {
						evalid3 = false;
						$('#Employee_EmailId').css('border', '1px solid red');
					}
					else{
						email = $("#Employee_EmailId").val();
					}






                    var comments = "";
                    if ($('#Comments').val() == "") {
                        comments = $("#Comments").val(" ");
                    } else {
                        comments = $("#Comments").val();
                    }

					 	if ($('#activeemp').is(':checked'))
							{
								activeVal="true";
							}
							else
							{
								activeVal="false";
							}

                    if (evalid1 == false)
					{
                        $('#e_EmployeeTab').trigger("click");
                    } else if (evalid2 == false)
					{
                        $('#e_AddressTab').trigger("click");
                    }
					else if (evalid3 == false)
					{
                        $('#e_ContactTab').trigger("click");
					}
					else if(allowvalidate == false)
					{
						$('#e_EmployeeTab').trigger("click");

					}

                    if(evalid1 && evalid2 && evalid3) {
                        var formData4 = {
                            "employeeId": employeeId,
							"newEmployeeId":empId,
                            "firstName": firstName.toUpperCase(),
                            "lastName": lastName.toUpperCase(),
                            "title": title.toUpperCase(),
                            "sex": genderType,
                            "dateOfBirth": dob,
                            "salary": salary,
                            "hireDate": hiredate,
                            "terminationDate": terminationdate,
                            "allowance": allowance,
                            "userRole": empuserRole,
                            "address1": add1.toUpperCase(),
                            "address2": add2.toUpperCase(),
                            "address3": add3.toUpperCase(),
                            "city": city.toUpperCase(),
                            "state": state.toUpperCase(),
                            "countryId": emp_country,
                            "postalCode": postalcode,
                            "location": location.toUpperCase(),
                            "cellPhone": cellphone,
                            "homePhone": homephone,
                            "workPhone": workphone,
                            "emailId": email.toLowerCase(),
                            "active": activeVal,
                            "comments": comments.toUpperCase(),
                            "areaIds": areaIds,

                        };
                        $.ajax({
                            type: 'POST',
                            url: baseUrl+'/prodcast/distributor/saveEmployee',
                            dataType: 'json',
                            data: formData4,
                            encode: true,
                            success: function(response) {

                                if (response.error) {
											alertmessage(response.errorMessage);
                                } else {
									if(empId=="")
										alertmessage("A New Employee Has Been Added Successfully");
									else
										alertmessage("An Employee Has Been Updated Successfuly")

									toViewAllemployees(response);
									employeereset();
                                    while (empMap.length > 0) {
                                        empMap.pop();
                                    }
                                    while (name.length > 0) {
                                        name.pop();
                                    }
                                    //$('#empsavemsg').show();
                                    var emp = response.result;
                                    for (var k = 0; k < emp.length; k++) {
                                        empMap[emp[k].employeeId] = emp[k];
                                        name.push({
                                            label: emp[k].firstname + ' ' + emp[k].lastname,
                                            value: emp[k].employeeId
                                        });
                                    }


                                }
                            },
                            error: function() {
                                alertmessage("Error in ajax");
                            }
                        });

                    }
                });
				$('#e_EmployeeTab').trigger("click");
				$("#employeescreen :input").on('click', function() {
                        $(this).css('border', ' 1px solid #d8e1b6');
						$('#hiredateconform').hide();
						$('#todayhiredate').hide();
						$('#todaydobdate').hide();
                    });
            });


            /* employee screen ends */
			$("#distributorscreen :input").on('click', function() {
                    $(this).css('border', ' 1px solid #d8e1b6');
            });
            /* distributorscreen begins */
            $("#distributorscreen").on("pageinit", function() {
				$('#savedialog1').hide();

				function distributorreset(){
									$('#distributor_save').html("Save");
									distId="";
					                 $("#dist_gender")[0].selectedIndex = 0;
									$("input[type=number], textbox").val("");
									$("#dist_manufacturer")[0].selectedIndex = 0;
									$("#dist_Country").val("");
									$("input[type=number], textbox").val("");
									$('#activedis')[0].checked=true;
									/*$('#dist_manufacturer').on('change',function() {
									$('#dist_manufacturer').attr('selectedIndex', " ");
									});*/



				                    $("#distab1").find('input:text').val('');
				                    $("#distab1 :input").css('border', ' 1px solid #d8e1b6');
									$("#distab2").find('input:text').val('');
				                    $("#distab2 :input").css('border', ' 1px solid #d8e1b6');
									$("#distab3").find('input:text').val('');
									$("#distab3 :input").css('border', ' 1px solid #d8e1b6');
									$("input[type=email], textbox").val("");
				}
				$('#distributor_reset1').on('click', function() {
					distributorreset(true);
				});
				$('#distributor_reset2').on('click', function() {
					distributorreset(true);
				});
				$('#distributor_reset3').on('click', function() {
					distributorreset(true);
				});

                var dist_type = "";
                var disArray = [];
                var distMap = [];

                $('#distmsg').hide();
                $('#distsave').hide();

				function distributorSubAutoComplete(dist)
				{
						$('#distributor_save').html("Update");
						$("#dist_type").val(dist.type).change();
                        $("#dist_gender").val(dist.gender).change();
                        $("#dist_manufacturer").val(dist.manufacturer==true?1:0).change();
                        $("#dist_active").val(dist.active).change();
                        $('#dist_title').val(dist.title);
                        $('#dist_firstname').val(dist.firstName);
                        $('#dist_companyName').val(dist.companyName);
                        $('#dist_lastname').val(dist.lastName);
                        $('#dist_cellphone').val(dist.cellPhone);
                        $('#dist_homephone').val(dist.homePhone);
                        $('#dist_workphone').val(dist.workPhone);
                        $('#dist_EmailId').val(dist.emailAddress);
                        $('#dist_Addrline1').val(dist.address1);
                        $('#dist_Addrline2').val(dist.address2);
                        $('#dist_Country').val(dist.country);
                        $('#dist_Addrline3').val(dist.address3);
                        $('#dist_City').val(dist.city);
                        $('#dist_state').val(dist.state);
                        $('#dist_Postalcode').val(dist.postalCode);
                        $('#dist_comments').val(dist.comments);
						$('#activedis')[0].checked=dist.active;
						distId=dist.distributorId;
						$('#distributor_save').html("Update");

				}

				function toViewAlldistributors(response)
			{
				if (response.error) {
                       alertmessage(response.errorMessage);
                 } else {
                      originalAllDistributors = $('#viewAllDistributorsDiv').html();
                      $('#alldistributorsTable').empty();
					  $('#alldistributorsTable').append('<div class="tbl-row tbl-hed"><div class="tbl-cols">S.No</div><div class="tbl-cols">Company Name</div><div class="tbl-cols">First Name</div><div class="tbl-cols">Last Name</div> </div>');
						for (counter = 0; counter < response.result.length; counter++) {
						  	var newRow = '<div class="tbl-row"><div class="tbl-cols">' + (counter+1) + '</div><div class="tbl-cols"><a class="viewalldistributorsName" id="'+response.result[counter].distributorId+'" data-toggle="tab" data-mini="true"  aria-expanded="true">' + response.result[counter].companyName.trim().toUpperCase() + '</a></div><div class="tbl-cols">' + response.result[counter].firstName.trim().toUpperCase()+ '</div><div class="tbl-cols">'+ response.result[counter].lastName.trim().toUpperCase()+'</div></div>';
							$('#alldistributorsTable').append(newRow);
							$('#alldistributorsTable').show();
                           }
						$('.viewalldistributorsName').on("click" , function(evt){
							document.getElementById('disnav1').click();
							distributorSubAutoComplete(distMap[evt.target.id]);
						});
					}
			}



                $.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/superadmin/distributors',
                    dataType: 'json',
                    encode: true,
                    success: function(response) {
                        if (response.error) {
                            alertmessage(response.errorMessage);
                        } else {
                            // alert("Distributor data saved");
                            if (disArray.length > 0) {
                                disArray.pop();

                            }
                            var returndist = response.result;

                            for (var j = 0; j < returndist.length; j++) {
                                distMap[returndist[j].distributorId] = returndist[j];


                                disArray.push({
                                    label: returndist[j].companyName.trim().toUpperCase(),
                                    value: returndist[j].distributorId
                                })
                            }



                        }
                    }
                });

                $("#dist_companyName").autocomplete({
                    source: disArray,
                    select: function(event, ui) {
                        // prevent autocomplete from updating the textbox
                        event.preventDefault();
                        // manually update the textbox and hidden field
                        $(this).val(ui.item.label);
                        var dist_id = ui.item.value;
                        var dist = distMap[dist_id];

                        $("#dist_type").val(dist.type).change();
                        $("#dist_gender").val(dist.gender).change();
                        $("#dist_manufacturer").val(dist.manufacturer==true?1:0).change();
                        $("#dist_active").val(dist.active).change();
                        $('#dist_title').val(dist.title);
                        $('#dist_firstname').val(dist.firstName);
                        $('#dist_lastname').val(dist.lastName);
                        $('#dist_cellphone').val(dist.cellPhone);
                        $('#dist_homephone').val(dist.homePhone);
                        $('#dist_workphone').val(dist.workPhone);
                        $('#dist_EmailId').val(dist.emailAddress);
                        $('#dist_Addrline1').val(dist.address1);
                        $('#dist_Addrline2').val(dist.address2);
                        $('#dist_Addrline3').val(dist.address3);
                        $('#dist_City').val(dist.city);
                        $('#dist_Country').val(dist.country);
                        $('#dist_state').val(dist.state);
                        $('#dist_Postalcode').val(dist.postalCode);
                        $('#dist_comments').val(dist.comments);
						$('#activedis')[0].checked=dist.active;
						distId=dist.distributorId;
						$('#distributor_save').html("Update");




                    }
                });
				$.ajax({
                    type: 'GET',
                    url: baseUrl+'/prodcast/superadmin/distributors',
                    dataType: 'json',
                    encode: true,
                    success: function(response) {
                        toViewAlldistributors(response,true);
                    }
                });
                $("#dist_type").change(function() {
                    if ($("#dist_type").val() == "") {
                        $("#dist_type").focu();
                    } else {
                        dist_type = $("#dist_type").val();
                    }


                });



                var dist_manufacturer = "";
                $("#dist_manufacturer").change(function() {
                    if ($("#dist_manufacturer").val() == "") {
                        $("#dist_manufacturer").focus();
                    } {
                        dist_manufacturer = $("#dist_manufacturer").val();
                    }

                });
                var dist_gender = "";
                $("#dist_gender").change(function() {
                    if ($("#dist_gender").val() == "") {
                        $("#dist_gender").focus();
                    } {
                        dist_gender = $("#dist_gender").val();
                    }
                });
                var dist_country="";
									$('#dist_Country').change( function() {
									if($(dist_Country).val()=="")
									{
										 $("#dist_Country").focus();

									}
									else{
				                    dist_country = ($(this).val());
									}



                });

                $('#distributor_save').on("click", function() {
                    $('#distsave').hide();
					var dvalid1 = true;
                    var dvalid2 = true;
                    var dvalid3 = true;
                    var dist_companyName = "";
                    var dist_title = "";
                    var dist_fname = "";
                    var dist_lname = "";
                    if ($('#dist_Country').val() == "") {

					                        dvalid3 = false;
					                        $('#dist_Country').css('border', '1px solid red');
                    }
                    if ($('#dist_companyName').val() == "") {

                        dvalid1 = false;
                        $('#dist_companyName').css("border", "1px solid red");
                    } else {
                        dist_CompanyName = $('#dist_companyName').val();
                    }



                    if ($('#dist_title').val() == "") {

                        dvalid2 = false;
                        $('#dist_title').css('border', '1px solid red');
                    } else {
                        dist_title = $('#dist_title').val();
                    }

                    if ($('#dist_firstname').val() == "") {

                        dvalid2 = false;
                        $('#dist_firstname').css('border', '1px solid red');
                    } else {
                        dist_fname = $('#dist_firstname').val();
                    }
                    if ($('#dist_lastname').val() == "") {

                        dvalid2 = false;
                        $('#dist_lastname').css('border', '1px solid red');
                    } else {
                        dist_lname = $('#dist_lastname').val();
                    }
                    var dist_cellphone = "";
                    if ($('#dist_cellphone').val() == "" || isNaN($('#dist_cellphone').val())) {

                        dvalid3 = false;
                        $('#dist_cellphone').css('border', '1px solid red');
                    } else {
                        dist_cellphone = $('#dist_cellphone').val();
                    }


                    var dist_homephone = $('#dist_homephone').val();

                    if ($('#dist_homephone').val() != "" && isNaN($('#dist_homephone').val())) {
                        dvalid3 = false;
                        $('#dist_workphone').css('border', '1px solid red');
                    }


                    var dist_workphone = "";
                    if ($('#dist_workphone').val() == "" || isNaN($('#dist_workphone').val())) {

                        dvalid3 = false;
                        $('#dist_workphone').css('border', '1px solid red');
                    } else {
                        dist_workphone = $('#dist_workphone').val();
                    }
                    var dist_email = "";
                    if ($('#dist_EmailId').val() == ""||!validateEmail( $('#dist_EmailId').val())) {

                        dvalid3 = false;
                        $('#dist_EmailId').css('border', '1px solid red');
                    } else {
                        dist_email = $('#dist_EmailId').val();
                    }



						if ($('#activedis').is(':checked'))
						{
							activedist="true";
						}
						else
						{
							activedist="false";
						}


                    var dist_addr1 = "";
                    if ($('#dist_Addrline1').val() == "") {

                        dvalid3 = false;
                        $('#dist_Addrline1').css('border', '1px solid red');
                    } else {
                        dist_addr1 = $('#dist_Addrline1').val();
                    }

					var dist_addr2 = $('#dist_Addrline2').val();
                    if ($('#dist_Addrline2').val() == "") {

                        dvalid3 = false;
                        $('#dist_Addrline2').css('border', '1px solid red');
                    }

                    var dist_addr3 = "";
                    if ($('#dist_Addrline3').val() == "") {

                        dvalid3 = false;
                        $('#dist_Addrline3').css('border', '1px solid red');
                    } else {
                        dist_addr3 = $('#dist_Addrline3').val();
                    }
                    var dist_city = "";
                    if ($('#dist_City').val() == "") {

                        dvalid3 = false;
                        $('#dist_City').css('border', '1px solid red');
                    } else {
                        dist_city = $('#dist_City').val();
                    }
                    var dist_state = "";
                    if ($('#dist_state').val() == "") {

                        dvalid3 = false;
                        $('#dist_state').css('border', '1px solid red');
                    } else {
                        dist_state = $('#dist_state').val();
                    }

                    var dist_postalcode = "";
                    if ($('#dist_Postalcode').val() == "") {

                        dvalid3 = false;
                        $('#dist_Postalcode').css('border', '1px solid red');
                    } else {

                        dist_postalcode = $('#dist_Postalcode').val();
                    }

                    var dist_comment = $('#dist_comments').val();


                    if (dvalid1 == false) {

                        $('#disnav1').trigger("click");
                        return;



                    } else if (dvalid2 == false) {
                        $('#disnav2').trigger("click");
                        return;
                    } else if (dvalid3 == false) {

                        $('#disnav3').trigger("click");
                        return;
                    } else {
                        var formData4 = {
                            "employeeId": employeeId,
                            "companyName": dist_CompanyName.toUpperCase(),
                            "type": dist_type,
                            "firstName": dist_fname.toUpperCase(),
                            "lastName": dist_lname.toUpperCase(),
                            "title": dist_title.toUpperCase(),
                            "emailAddress": dist_email.toLowerCase(),
                            "cellPhone": dist_cellphone,
                            "homePhone": dist_homephone,
                            "workPhone": dist_workphone,
                            "address1": dist_addr1.toUpperCase(),
                            "address2": dist_addr2.toUpperCase(),
                            "address3": dist_addr3.toUpperCase(),
                            "city": dist_city.toUpperCase(),
                            "state": dist_state.toUpperCase(),
                            "postalCode": dist_postalcode,
                            "country": dist_country,
                            "gender": dist_gender,
                            "manufacturer": dist_manufacturer,
                            "active": activedist,
                            "comments": dist_comment.toUpperCase(),
                            "newDistributorId": distId

                        };
                        //}



                        $.ajax({
                            type: 'POST',
                            url: baseUrl+'/prodcast/superadmin/saveDistributor',
                            dataType: 'json',
                            data: formData4,
                            encode: true,
                            success: function(response) {
                                if (response.error) {
                                    alertmessage(response.errorMessage);
                                } else {
								if(distId=="")
									alertmessage("The distributor has been saved");
                                else
									alertmessage("The Distributor Has Been Updated Successfully");
                                   // $('#distmsg').show();
								   distributorreset();
								   toViewAlldistributors(response);

                                    var returndist = response.result;

								for (var j = 0; j < returndist.length; j++) {
							    distMap[returndist[j].distributorId] = returndist[j];


								disArray.push({
									   label: returndist[j].companyName.trim().toUpperCase(),
									   value: returndist[j].distributorId
								})
							}

                                }
                            }
                        });



                    }




                });
                				$('#disnav1').trigger("click");

                /*dist 	ends */
				/* product screen begins*/


                /* product screen ends*/

            });

		});