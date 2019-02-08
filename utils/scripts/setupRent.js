window.onload = function() {
			
	var modal = document.getElementById('rentCartSection');
	window.onclick = function(event) {
	  if (event.target == modal) {
		modal.style.display = "none";
	  }
	}
		setUpDefaultNavBar();
		setUpFooter();
		setUpConfig();				
		determineRentContent();
}

var furnitures = getAllFurnitures(), categories = getCategories();

function setUpRentPage() {	
	var item, itemTags = new Array(), rentPrice,
	jCtr, products, colData, furnData;
	var catTag, furnTag, prodTag;
	
	//	Extract items to be rent
	for(var i in furnitures) {
		jCtr = 0;
		var furnData = new Array();
		
		for(var j in furnitures[i]) {
			var prodTags = new Array();
			
			for(var k in furnitures[i][j])
				if(furnitures[i][j][k].rentStock)
					prodTags.push(k);					
			furnData.push([[j, jCtr++], prodTags]);
		}
		
		itemTags.push([i, furnData]);
	}
	
	var content = '', tempTitleContent, tempProdsContent;
		
		for(var i in itemTags) {
			tempTitleContent = '' +
				' <div class="itemGrid w3-row-padding w3-border w3-border-blue-grey w3-round-xlarge w3-margin-bottom"> ' +
					' <div class="w3-center w3-xlarge w3-text-black w3-border-bottom w3-leftbar w3-margin-bottom border-theme-orange"> ' +
						categories[itemTags[i][0]].name +
					'</div> ';
			
			furnData = itemTags[i][1];
			
			tempProdsContent = '';
			for(var j in furnData) {
				products = furnData[j][1];
				
				if(!products.length) continue;
					
					colData = getGridLayoutPlan(4, products.length);
					for(var k in colData) {
						tempProdsContent += '' +
						' <div class="w3-quarter"> ';
					
							for(var l in colData[k]) {
								catTag = itemTags[i][0]; furnTag = furnData[j][0]; prodTag = products[colData[k][l]];							
								item = furnitures[catTag][furnTag[0]][prodTag];
								rentPrice = getPesoFormat(getRentPrice(item.price));
								
									tempProdsContent += '' +
									' <div class="w3-card-8 itemBox"> ' +
										' <a href="'+(getRentHTMLfile()+'?rentinfodata='+([catTag, furnTag[1], prodTag].join("_")))+'">' +
											' <div class="w3-btn w3-display-topleft w3-large theme-lime" onclick="addToRentCartDirect(['+catTag+', '+furnTag[1]+', '+prodTag+']); return false;"><i class="fa fa-cart-plus"></i></div> ' +
											' <img src="./res/images/products/'+item.image+'" > ' +
											' <div class="w3-container"> ' +
												' <p>'+item.prodName+'</p>  ' +
												' <p> ' +
													' <big>'+rentPrice+'</big> ' +
												' </p> ' +
											' </div> ' +
										' </a> ' +
									' </div> ';
							}
							tempProdsContent += '' + 
								' </div> ' ;
					}
			}

			tempProdsContent !== ''? content += tempTitleContent + tempProdsContent + ' </div> ':'';
		}
	
	document.getElementById('rentContent').innerHTML = content;	
}

function setMiscelleneous() {
	small_setRentCart();
	setRentCart();
}

function setRentProdInfo(itemTags) {
	for(var i in itemTags) itemTags[i] = parseInt(itemTags[i]);
		
	var item = furnitures[itemTags[0]][getFurnitureObjName(itemTags[0], itemTags[1])][itemTags[2]],
	rentPrice = getRentPrice(item.price),
	rentStock = item.rentStock;
	
	var content = '' +
	
	' <div class="w3-container w3-padding-bottom w3-leftbar w3-border-top border-theme-orange w3-text-black w3-xlarge w3-wide">'+
		categories[itemTags[0]].name+': '+categories[itemTags[0]].subCategories[itemTags[1]]+
	'</div> ' +
	' <div class="w3-half w3-container w3-margin-top w3-margin-bottom"> ' +
			// Product Name, Image, Rent Price Side 
			' <div class="itemInfo w3-border w3-xlarge w3-display-container"> ' +
			
				' <div class="w3-center w3-border-black w3-padding">'+item.prodName+'</div> ' +
				' <div class="itemInfoImg w3-hover-opacity" onclick="document.getElementById(&quot;imgLarge&quot;).style.display = &quot; block &quot;"> ' +
					' <img src="./res/images/products/'+item.image+'" class="w3-card-4 w3-border"> ' +
					' <div class="w3-display-topleft w3-tag w3-light-grey w3-small">Click to enlarge</div> ' +	
				' </div> ' +
				
				' <div id="imgLarge" class="w3-modal" onclick="this.style.display=&quot; none &quot;"> ' +
					' <span class="w3-closebtn w3-hover-grey w3-red w3-container w3-margin w3-display-topright">&times;</span> ' +
					' <div class="w3-modal-content w3-animate-zoom"> ' +
						' <img src="./res/images/products/'+item.image+'"> ' +
					' </div> ' +
				' </div> ' +
				
				' <div class="w3-container"> ' +
					' <span><span class="w3-large">Rent Price: </span>'+getPesoFormat(rentPrice)+'</span> ' +
				' </div> ' +
				
			' </div> ' +
		' </div>' +
		
		// Product Description, Quantity, Add cart Side 
		' <div class="w3-half w3-container w3-padding-top w3-text-black" > ' +
		
			' <div class="itemInfoDescrip"> ' +
			' <big>Description:</big> ' +
			' <p>'+item.description+'</p> ' +
			' </div> ' +
			' <hr> ' +
			' <div> ' + 
				' <form> ' +
					' <label>Quantity: </label> ' +
					' <span id="itemQuantityBox"> ' +
						' <input id="itemQuantityMinus" type="button" value="-" onclick="itemQuantityControl(-1, '+rentPrice+');"/>' +
						' <input id="itemQuantityField" type="text" size="1" value="1" min="1" max="'+rentStock+'" style="text-align: center;" readonly/>' +
						' <input id="itemQuantityPlus" type="button" value="+" onclick="itemQuantityControl(+1, '+rentPrice+');"/>' +
					' </span> ' +
					' <label style="color: grey;"> (in stock: '+rentStock+')</label> ' + 
				' </form> ' + /* onkeydown="return false" */
				' <div class="w3-margin-top" style="float: left;"><label>Total Price: </label><i id="itemTotalCost" class="w3-border-bottom border-theme-orange">'+getPesoFormat(rentPrice)+'</i></div>' + 
				' <div style="float: right;"><button class="w3-btn w3-ripple aekieBtn" onclick="addProdToRentCart(['+itemTags[0]+', '+itemTags[1]+', '+itemTags[2]+']); return false;"><i class="fa fa-cart-plus"></i> Add to rent</button></div> ' +
			' </div> ' +
		' </div> ' +				
	' </div> ';
	
	document.getElementById('rentContent').innerHTML = content;
}

function small_setRentCart() {
	var content = '' +
	
	' <nav id="small-rentCartSection" class="w3-sidenav w3-card-4 w3-animate-right w3-hide-large"> ' +
		' <div class="w3-round-large w3-container w3-blue-grey w3-xlarge w3-bottombar border-theme-orange w3-padding"> ' +
			' <span class="w3-closebtn w3-hover-text-red w3-right" onclick="document.getElementById(&quot;small-rentCartSection&quot;).style.display=&quot; none &quot;">&times;</span> ' +
			' <div class="w3-center"><i class="fa fa-shopping-cart"></i> Rent Cart</div> ' +
		' </div> ' +		
		' <div class="rentCartSectionArea w3-container"></div> ' +
	' </nav> ';
	
	var bodyContent = document.getElementsByTagName('body')[0];
	bodyContent.innerHTML = content + bodyContent.innerHTML;
}

function setRentCart() {
	var content = '' +
	
	' <div class="w3-modal-content w3-card-8 w3-round-large w3-animate-top w3-hide-medium w3-hide-small" style="min-height: 50%;"> ' +
		' <div class="w3-round-large w3-container w3-blue-grey w3-xlarge w3-bottombar border-theme-orange w3-padding"> ' +
			' <span class="w3-closebtn w3-hover-text-red w3-right" onclick="document.getElementById(&quot;rentCartSection&quot;).style.display=&quot; none &quot;">&times;</span> ' +
			' <div class="w3-center"><i class="fa fa-shopping-cart"></i> Rent Cart</div> ' +
		' </div> ' +		
		' <div class="rentCartSectionArea w3-container w3-margin"></div> ' +
	' </div> ';
	
	document.getElementById('rentCartSection').innerHTML = content;
	updateRentCart();
}

function determineRentContent() {
	var rentInfoData = document.location.href.split('?rentinfodata=')[1];
	if(rentInfoData == undefined) setUpRentPage();
	else setRentProdInfo(rentInfoData.split("_"));
		
	setMiscelleneous();	
}

function addToRentCartDirect(tagData) {
	addToRentCart(tagData, 1);
}

function addToRentCart(tagData, quantity) {
	verifyItemToRentCart(tagData, quantity);
	
	updateRentCart();
}

function addProdToRentCart(tagData) {
	addToRentCart(tagData, parseInt(document.getElementById("itemQuantityField").value));
}

function verifyItemToRentCart(tagData, quantity) {
	// This function verifies similar item to add within cart and manages prompted item quantity from stock quantity limit
	
	var rentCartItems;
	if(localStorage.rentCartItems == undefined) {
		rentCartItems = new Array();	
		rentCartItems.push([tagData, quantity]);
		
	} else {
		var itemTags, item, isMatch = false;
		rentCartItems = JSON.parse(localStorage.rentCartItems);
	
		for(var i in rentCartItems) {
			itemTags = rentCartItems[i][0];
			if(	itemTags[0]==tagData[0] &&
				itemTags[1]==tagData[1] &&
				itemTags[2]==tagData[2] ) 
				{
					item = furnitures[tagData[0]][getFurnitureObjName(tagData[0], tagData[1])][tagData[2]];
					var subQuantity = rentCartItems[i][1] + quantity;
					
					if(item.rentStock >= subQuantity) { 
						rentCartItems[i][1] += quantity;
						setMsgBarText("Successfully added to rent cart");
						
					} else setMsgBarText('Not enough to add within stock');
					
					isMatch = true;
					break;
				}
		}
		
		if(!isMatch)
			if(rentCartItems.length >= getCartItemsLimit()) setMsgBarText("Maximum of 5 items only allowed to add");
			else {
				rentCartItems.push([tagData, quantity]);
				setMsgBarText("Successfully added to rent cart");
			}
	}
	
	localStorage.rentCartItems = JSON.stringify(rentCartItems);	
}

var rentTotalPrice;
function updateRentCart() {	
	var rentCartItems = localStorage.rentCartItems;
	rentTotalPrice = 0,
	rentCartSectionAreas = document.getElementsByClassName('rentCartSectionArea'),
	rentItemsQuantityElem = document.getElementsByClassName('rentItemsQuantity');
	
	if(rentCartItems == undefined || JSON.parse(rentCartItems).length <= 0) {
		for(var i in rentCartSectionAreas)
			rentCartSectionAreas[i].innerHTML = '<div class="w3-large w3-display-middle">Your cart is currently empty.</div>';
		for(var i in rentItemsQuantityElem)
			rentItemsQuantityElem[i].innerHTML = 0;
	} else {
		var rentCartItemsContent = JSON.parse(rentCartItems), itemTags, quantity, item, rentPrice, totalPrice = 0;		
		
		var content = '' +
		
		' <div id="cartSectionBody" class="w3-responsive w3-border border-theme-orange"> ' +		
		' <table id="cartItemContent" class="w3-table w3-white"> ' +
		
			' <thead class="w3-dark-grey"> ' +
				' <tr> ';
			  
				for(var i in getRentCartTableLabel())
					content += '<th '+(i>3? 'class="w3-right-align"':'')+'>'+getRentCartTableLabel()[i]+'</th>';
				
				content += '' +
				' </tr> ' +
			' </thead> ' + 
			
			' <tbody id="cartItemContentBody" class="w3-bordered"> ';
			
			for(var i in rentCartItemsContent) {
				itemTags = rentCartItemsContent[i][0];
				quantity = rentCartItemsContent[i][1];		
				item = furnitures[itemTags[0]][getFurnitureObjName(itemTags[0], itemTags[1])][itemTags[2]];
				
				rentPrice = getRentPrice(item.price);
				
				content += '' +	
				' <tr> ' +
					' <td><div class="w3-closebtn w3-hover-text-red" onclick="removeItemFromRent('+i+');">&times;</div></td> ' +
					' <td><img src="./res/images/products/'+item.image+'"></td> ' +
					' <td><div><a href="'+(getRentHTMLfile()+'?rentinfodata='+([itemTags[0], itemTags[1], itemTags[2]].join("_")))+' " class="w3-hover-text-red">'+item.prodName+'</a></div></td> ' +
					' <td> ' +
						' <span id="itemQuantityBox"> ' +
							' <input id="itemQuantityMinus" type="button" value="-" onclick="rentCartQuantityControl(-1, '+i+', '+item.rentStock+')"/> ' +
							' <input id="rentCartQuantity'+i+'" type="text" size="1" value="'+quantity+'" style="text-align: center;" readonly/> ' +
							' <input id="itemQuantityPlus" type="button" value="+" onclick="rentCartQuantityControl(+1, '+i+', '+item.rentStock+')"/> ' +
						' </span> ' +
					' </td> ' +    
					' <td style="text-align: right">'+getPesoFormat(rentPrice)+'</td> ' +
					' <td style="text-align: right">'+getPesoFormat(rentPrice * quantity)+'</td> ' +
				' </tr> ';
				
				totalPrice += rentPrice * quantity;
			}
			
			rentTotalPrice = totalPrice;
			
			content += '' +	
			' </tbody> ' +
		  
			' <tfoot class="w3-topbar border-theme-orange"> ' +
			   ' <tr style="font-weight: bold;"> ' +
				' <td></td> ' +		
				' <td></td> ' +		
				' <td></td> ' +		
				' <td></td> ' +		
				' <td class="w3-right">Subtotal <i class="w3-small">(+rent duration)</i>:</td> ' +
				' <td class="rentItemsTotal" style="text-align: right; font-style: italic;">'+getPesoFormat(rentTotalPrice)+'</td> ' +
			  ' </tr> ' +
			' </tfoot> ' +
			
			' </table> ' +
			' </div> ' +
		' <div class="w3-margin-top"> ' +
			' <div class="w3-btn w3-large aekieBtn w3-ripple w3-margin-bottom" style="text-decoration: bold;" onclick="directToRentCheckout();">Checkout <i class="fa fa-arrow-right"></i></div> ' +
			' <form class="w3-dark-grey w3-right w3-padding w3-small"> ' +
				' <label>Days: </label> ' +
				' <span id="dayQuantityBox"> ' +
					' <input id="dayQuantityMinus" type="button" value="-" onclick="dayQuantityControl(-1);"/>' +
					' <input class="dayQuantityField" type="text" size="1" value="1" min="1" max="'+getRentDaysLimit()+'" style="text-align: center;" readonly/>' +
					' <input id="dayQuantityPlus" type="button" value="+" onclick="dayQuantityControl(+1);"/>' +
				' </span> ' +
				' <label>('+getPesoFormat(getRentPricePerDay())+'/day)</label> ' + 
			' </form> ' +
		' </div> ';
						
		var rentCartSectionAreas = document.getElementsByClassName('rentCartSectionArea');
		for(var i in rentCartSectionAreas)
			rentCartSectionAreas[i].innerHTML = content;
		for(var i in rentItemsQuantityElem)
			rentItemsQuantityElem[i].innerHTML = rentCartItemsContent.length;
		
		updateDayQuantityField();
		updateDayRentPrice();
	}	
}

function directToRentCheckout() {	
	directToNewPage(getBillingHTMLfile()+'?rent');
}

function dayQuantityControl(step) {
	var dayQuantity = document.getElementsByClassName("dayQuantityField")[0],
	
		  newDayValue = parseInt(dayQuantity.value) + step;
		
		if(newDayValue > 0 && newDayValue <= dayQuantity.max) {
			localStorage.rentDays = newDayValue;
			updateDayQuantityField();		
			updateDayRentPrice();
		}
	
}

function updateDayQuantityField() {
	var dayQuantityField = document.getElementsByClassName("dayQuantityField");
	for(var i in dayQuantityField)
		dayQuantityField[i].value = (localStorage.rentDays !== undefined? localStorage.rentDays : dayQuantityField[i].value);
}
	
function updateDayRentPrice() {
	var rentItemsTotal = document.getElementsByClassName("rentItemsTotal");
	for(var i in rentItemsTotal)
		rentItemsTotal[i].innerHTML = getPesoFormat((document.getElementsByClassName("dayQuantityField")[0].value * getRentPricePerDay()) + rentTotalPrice);
}

function rentCartQuantityControl(step, rentCartItemIndx, stock) {
	var quantity = document.getElementById('rentCartQuantity'+rentCartItemIndx).value;
	var newIqValue = parseInt(quantity) + step;
	
	if(newIqValue > 0 && newIqValue <= stock) {
		var rentCartItems = JSON.parse(localStorage.rentCartItems);
		rentCartItems[rentCartItemIndx][1] = newIqValue;
		localStorage.rentCartItems = JSON.stringify(rentCartItems);
		updateRentCart();
	}
}

function removeItemFromRent(rentCartItemIndx) {
	var rentCartItems = JSON.parse(localStorage.rentCartItems);
	
	removeFromArray(rentCartItems, rentCartItemIndx);
	localStorage.rentCartItems = JSON.stringify(rentCartItems);
	updateRentCart();
}
