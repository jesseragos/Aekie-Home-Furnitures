var isRentTransaction = new RegExp('rent?', 'gi').test(document.location.href);

function setUpCheckOutForm() {
	var cartItems = localStorage.getItem(isRentTransaction? 'rentCartItems' : 'cartItems');
	var emptyCartMsg = '' +
	' <div class="w3-card-2 w3-large w3-container w3-padding w3-white w3-padding-bottom"> ' +
			' <p> You do not have any current items in cart. </p> ' +
			' <p> You may explore more of our products and request them to add to your cart. </p> ' +
			' <button class="w3-btn aekieBtn w3-margin-bottom w3-center" onclick="document.location = &quot;./index.html&quot;">Continue Shopping</button> '
	' </div> ';
		
	var content = '' +	
	((cartItems == undefined || JSON.parse(cartItems).length <= 0)? emptyCartMsg :
	
	' <div id="checkOutForm" class="w3-card-4 animated slideInRight"> ' +

				' <div class="w3-container w3-blue-grey"> ' +
				  ' <h2>Checkout form</h2> ' +
				' </div> ' +

				' <form onsubmit="setOrderSummaryContent();" action="javascript:void(0)" class="w3-container"> ' +
					' <div class="w3-row-padding w3-container w3-padding"> ' +
						
						  ' <div class="w3-half"> ' +
							' <input class="w3-input" type="text" maxlength="15" required> ' +
							' <label>First Name</label> ' +
						  ' </div> ' +
						  
						  ' <div class="w3-half"> ' +
							' <input class="w3-input" type="text" maxlength="15" required> ' +
							' <label>Last Name</label> ' +
						  ' </div> ' +

					' </div> ' +
					
					' <div class="w3-row-padding w3-container w3-padding"> ' +
						
						  ' <div class="w3-half"> ' +
							' <input class="w3-input" type="text" placeholder="Phone, Landline etc." maxlength="12" pattern="[0-9]{10,12}" required> ' +
							' <label>Contact no.</label> ' +
						  ' </div> ' +
						  
						  ' <div class="w3-half"> ' +
							' <input class="w3-input" type="email" required> ' +
							' <label>Email</label> ' +
						  ' </div> ' +

					' </div> ' +
					
					' <div class="w3-row-padding w3-container w3-padding"> ' +
						
						  ' <div class="w3-half"> ' +
							' <input class="w3-input" type="text" maxlength="50" required> ' +
							' <label>Address</label> ' +
						  ' </div> ' +
						  
						  ' <div class="w3-half"> ' +
							' <input class="w3-input" type="text" placeholder="eg. 1107 (for New Era, Quezon City)" maxlength="4" pattern="[0-9]{4}" required> ' +
							' <label>Zip code</label> ' +
						  ' </div> ' +
						  
					' </div> ' +
					
					' <div class="w3-row-padding w3-container w3-padding"> ' +
						
						  ' <div class="w3-half"> ' +
							' <select id="CityScopeList" class="w3-select" name="option" required> ' +
							  ' <option value="" disabled selected>Choose your city</option> ' +
							' </select> ' +
							' <label>City</label> ' +
						  ' </div> ' +
						  
					' </div> ' +
					
					' <hr> ' +
					
					' <div class="w3-row-padding w3-container w3-padding"> ' +
						
						  ' <div class="w3-third"> ' +
							' <select id="PaymentMethodList" class="w3-select" name="option" required> ' +
							  ' <option value="" disabled selected>Choose your payment</option> ' +
							' </select> ' +
							' <label>Payment Method</label> ' +
						  ' </div> ' +
						  
						  ' <div class="w3-third w3-text-red">* Credit/Debit payment not yet availed</div> ' +
						  ' <button class="w3-btn aekieBtn w3-ripple w3-right">Proceed to order review <i class="fa fa-arrow-right"></i></button> ' +
						  
					' </div> ' +
					
				' </form> ' +
			
			' </div> ');
			
	document.getElementById('cartBtn').disabled = true;
	disableSmallCartBtn();	
	document.getElementById('billingSection').innerHTML = content;
	setUpDropDownContents();
}

function disableSmallCartBtn() {
	document.getElementById('small-cartBtn').onclick = null;
	document.getElementById('small-cartBtn').className += " disable";
}

function setOrderSummaryContent() {
	var content = '' +
	
		' <div id="orderSummarySection" class="w3-card-2 w3-border w3-light-grey w3-padding-bottom animated slideInRight"> ' +
		
			' <div class="w3-container w3-white w3-bottombar border-theme-orange"> ' +
				' <h2>Order Summary</h2> ' +
			' </div> ' +
			
			' <div class="w3-container w3-padding"> ' +
			
				// Order number
				' <div class="w3-margin-bottom"> ' +	
					' <span class="w3-container w3-tag">Order number: <span id="orderNum"></span></span> ' +
					' <span class="w3-right w3-border-bottom">Transaction type: <span id="transactionType"></span></span> ' +
				' </div> ' +
			
				// Order summary
				' <table id="orderSummaryTable" class="w3-table w3-bordered"> ' +
					' <thead class="w3-blue-grey"> ' +
						' <th>Name</th> ' +
						' <th style="text-align: right;">Quantity</th> ' +
						' <th style="text-align: right;">Total</th> ' +
					' </thead> ' +
					
					' <tbody id="orderSummaryTableBody"> ' +
					' </tbody> ' +
					
					' <tfoot class="w3-topbar border-theme-orange" style="font-weight: bold;"> ' +
						' <tr> ' +
							' <td></td> ' +
							' <td></td> ' +
							' <td style="text-align: right;"><span class="w3-left">Subtotal </span><span id="cartItemsTotalPrice" style="font-style: italic;"></span></td> ' +
						' </tr> ' +
					' </tfoot> ' +
					
				' </table> ' +
				' <div class="w3-right" style="font-style: italic;"> ' +
					' +'+getPesoFormat(getDeliveryCharge())+' for delivery charge ' +
				' </div> ' +
				
				' <form onsubmit="confirmOrder();" action="javascript:void(0);"> ' +
					// Apply Terms & Conditions
					' <div class="w3-padding-xlarge w3-margin-top"> ' +
							' <input type="checkbox" name="termsConfirm" onclick="enableConfirmOrderBtn(this.checked);" required> ' +
							' I have read and consider the <a href="'+getInfoHTMLfile()+'?opt=termsAndConditions'+'" target="blank">Terms & Conditions</a> ' +
							' <div>(Ensuring that you have understood the standards including the delivery payment, charges and other scopes)</div> ' +
					' </div> ' +
				
					// Note / Confirm Order
					' <div class="w3-padding"> ' +
						' <span class="w3-text-red">NOTE: Please keep this order no. for future reference of your order on receive.<span> ' +
						' <div class="w3-right w3-padding"><button id="confirmOrderBtn" class="w3-btn aekieBtn w3-ripple" disable>Confirm Order <i class="fa fa-check"></i></button></div> ' +
					' </div> ' +
				' </form> ' +
				
			' </div> ' +
			
		' </div> ';
	
	document.getElementById('billingSection').innerHTML = content;
	
	enableConfirmOrderBtn(false);
	setOrderNumber();
	setTransactionType();
	setUpCartItemsToOrder();
}

function enableConfirmOrderBtn(isChecked) {
	document.getElementById('confirmOrderBtn').disabled = !isChecked;
}

function setOrderNumber() {
	document.getElementById('orderNum').innerHTML = String(new Date().getTime()).substring(0,2) + Math.round(Math.random() * 1000);
}

function setTransactionType() {
	document.getElementById('transactionType').innerHTML = (isRentTransaction? 'Rent':'Buy');
}

function setUpCartItemsToOrder() {
	var cartItems = JSON.parse(localStorage.getItem(isRentTransaction? 'rentCartItems' : 'cartItems'));
	var itemTags, quantity, item;
	var orderSummaryTableBody = document.getElementById('orderSummaryTableBody');
	var tRow, nameCell, quantityCell, subTotalCell;
	var totalPrice = 0, subTotalPrice;
	
	for(var i in cartItems) {
		itemTags = cartItems[i][0];
		quantity = cartItems[i][1];		
		item = furnitures[itemTags[0]][getFurnitureObjName(itemTags[0], itemTags[1])][itemTags[2]];
		
		tRow = document.createElement('tr');
		nameCell = document.createElement('td');
		quantityCell = document.createElement('td');
		subTotalCell = document.createElement('td');
		
		subTotalPrice = (isRentTransaction? getRentPrice(item.price) : (item.sale? getSalePrice(item.price, item.sale):item.price)) * quantity;
		
		nameCell.innerHTML = item.prodName;
		quantityCell.innerHTML = quantity;
		subTotalCell.innerHTML = getPesoFormat(subTotalPrice);
		
		subTotalCell.style.textAlign = "right";
		quantityCell.style.textAlign = "right";
		
		totalPrice += subTotalPrice;
		
		tRow.appendChild(nameCell);
		tRow.appendChild(quantityCell);
		tRow.appendChild(subTotalCell);
		orderSummaryTableBody.appendChild(tRow);
	}
	
	if(isRentTransaction) {
		var rentDays = parseInt(localStorage.rentDays);
		
		var totalDayPrice = rentDays * getRentPricePerDay()
		totalPrice += totalDayPrice;
		
		tRow = document.createElement('tr');
		nameCell = document.createElement('td');
		quantityCell = document.createElement('td');
		subTotalCell = document.createElement('td');
		
		nameCell.innerHTML = '';
		quantityCell.innerHTML = rentDays+' day(s) &times; '+getPesoFormat(getRentPricePerDay())+' =';
		subTotalCell.innerHTML = getPesoFormat(totalDayPrice);
		
		tRow.className = "w3-topbar";
		subTotalCell.style.textAlign = "right";
		quantityCell.style.textAlign = "right";
		
		tRow.appendChild(nameCell);
		tRow.appendChild(quantityCell);
		tRow.appendChild(subTotalCell);
		orderSummaryTableBody.appendChild(tRow);		
	}
	
	document.getElementById('cartItemsTotalPrice').innerHTML = getPesoFormat(totalPrice);
}

function setUpDropDownContents() {
	var cityScopes = getCityScopes().sort(),
	paymentMethods = getPaymentMethods().sort();
	
	var cityScopeDD = document.getElementById("CityScopeList" ),
	paymentMethodDD = document.getElementById("PaymentMethodList" );
	
	//	City Scopes
	for(var i in cityScopes) {
		var opt = document.createElement('option');
		opt.innerHTML = cityScopes[i];
		opt.value = cityScopes[i];
		cityScopeDD.appendChild(opt);
	}
	
	//	Payment Methods
	for(var i in paymentMethods) {
		var opt = document.createElement('option');
		opt.innerHTML = paymentMethods[i];
		opt.value = paymentMethods[i];
		paymentMethodDD.appendChild(opt);
	}
}

var orderInfo1 = "Your request order is successfully sent. Please be advised of our confirmation reply towards your available contacts and email.",
	  orderInfo2 = "Always keep the attached order number (already on your contacts and email) to confirm your item(s) received.",
	  rentInfo = "Rent duration starts as soon you received your orders and taken back after it ends";
function confirmOrder() {
	localStorage.removeItem((isRentTransaction? 'rentCartItems' : 'cartItems'));
	
	var content = '' +
	
		' <div class="w3-card-2 w3-large w3-container w3-padding w3-white w3-padding-bottom animated slideInRight"> ' +
			' <p> ' + orderInfo1 + ' </p> ' +
			' <p> ' + orderInfo2 + ' </p> ' +
			(isRentTransaction? ' <p> ' + rentInfo + ' </p> ':'') +
			' <button class="w3-btn aekieBtn w3-margin-bottom w3-center" onclick="document.location = &quot;./index.html&quot;">Continue Shopping</button> '
		' </div> ';
	
	document.getElementById('billingSection').innerHTML = content;
	
	/*
	var billingSection = document.getElementById('billingSection');
	
	billingSection.innerHTML = '';
	
	var container = document.createElement('div'),
	body = document.createElement('div');
	
	container.className = "w3-card-2 w3-light-grey w3-padding-bottom";
	body.className = "w3-container w3-padding";
	
	body.appendChild((document.createElement('p').innerHTML = orderInfo1));
	body.appendChild((document.createElement('p').innerHTML = orderInfo2));
	
	container.appendChild(body);
	billingSection.appendChild(container);*/
}