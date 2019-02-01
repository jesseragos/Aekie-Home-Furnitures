function getFurnitures(opt) {
	var prodPkg;

	switch(opt){
	case 0: prodPkg = getBedAndStorageData().bedRoomAndStorage; break;
	case 1: prodPkg = getLivingRoomData().livingRoom; break;
	case 2: prodPkg = getDiningRoomData().diningRoom; break;
	case 3: prodPkg = getDisplayAndDecorData().displayAndDecors; break;
	}
	
	return prodPkg;
}

function getAllFurnitures() {
	var prodPkgs = new Array();
	
	for(var i=0; i < getCategoriesData().category.length; i++)
		prodPkgs = prodPkgs.concat(getFurnitures(i));
	
	return prodPkgs;
}

function getProducts(furniture) {
	var relProds = new Array();
	
	for(var i in furniture) 
		relProds.push(furniture[i]);
	
	return relProds;
}

function getAllProducts() {
		var furnitures = getAllFurnitures(),
		products = new Array();
		
		for(var i in furnitures)
			for(var j in furnitures[i])
				for(var k in furnitures[i][j])
					products.push(furnitures[i][j][k]);
				
	return products;
}

function setInfo_TermsAndCond() {
	document.getElementById('infoHeader').innerHTML = "Terms & Conditions";
	
	var infoBody = document.getElementById('infoBody'),
	intro = document.createElement('p'),
	useOfSiteHdr = document.createElement('h4'),
	useOfSiteBody1 = document.createElement('p'),
	useOfSiteBody2 = document.createElement('p'),
	serviceDeliveryScopesHdr = document.createElement('h4'),
	serviceDeliveryScopesBody = document.createElement('p'),
	deliveryPolicyHdr = document.createElement('h4'),
	deliveryPolicyBody = document.createElement('p'),
	rentPolicyHdr = document.createElement('h4'),
	rentPolicyBody1 = document.createElement('p'),
	rentPolicyBody2 = document.createElement('p'),
	maintenanceAndRepairHdr = document.createElement('h4'),
	maintenanceAndRepairBody1 = document.createElement('p'),
	maintenanceAndRepairBody2 = document.createElement('p'),
	changeOrdersHdr = document.createElement('h4'),
	changeOrdersBody = document.createElement('p'),
	paymentHdr = document.createElement('h4'),
	paymentBody1 = document.createElement('p'),
	paymentBody2 = document.createElement('p'),
	priceInfoHdr = document.createElement('h4'),
	priceInfoBody = document.createElement('p');
	
	intro.innerHTML = "Please read these Terms and Conditions carefully before using this website. Using this website means you have read, understood, and accepted these Terms and Conditions. If you do not accept these Terms and Conditions, do not use this website.";
	useOfSiteHdr.innerHTML = "Use of this site";
	useOfSiteBody1.innerHTML = "By accepting these Terms and Conditions through your use of the Site, you certify that you are 18 years of age or older. If you are under the age of 18 but at least 13 years of age you may use this Site only under the supervision of a parent or legal guardian who agrees to be bound by these Terms and Conditions. FurnitureManila.com does not knowingly collect personal information about children under the age of 13 without prior parental consent. If you are a parent or legal guardian agreeing to these Terms and Conditions for the benefit of a child between the ages of 13 and 18, be advised that you are fully responsible for his or her use of this Site, including all financial charges and legal liability that he or she may incur. If you do not agree to (or cannot comply with) any of these terms and conditions, do not use this Site. All billing and registration information provided must be truthful and accurate. Providing any untruthful or inaccurate information constitutes a breach of these Terms and Conditions. By confirming your purchase at the end of the checkout process, you agree to accept and pay for the item(s) requested.";
	useOfSiteBody2.innerHTML = "All materials, including images, text, illustrations, designs, icons, photographs, programs and other materials that are part of this Site (collectively, the &quot;Contents&quot;) are intended solely for personal, non-commercial use. You may download or copy the Contents and other downloadable materials displayed on the Site for your personal use only. No right, title or interest in any downloaded materials or software is transferred to you as a result of any such downloading or copying. You may not reproduce (except as noted above), publish, transmit, distribute, display, modify, create derivative works from, sell or participate in any sale of or exploit in any way, in whole or in part, any of the Contents, the Site or any related software. The Contents and software on this Site may be used only as a shopping resource. Any other use, including the reproduction, modification, distribution, transmission, republication, display, or performance, of the Contents on this Site is strictly prohibited.";
	serviceDeliveryScopesHdr.innerHTML = "Service and delivery scopes";
	serviceDeliveryScopesBody.innerHTML = "Our current scope of service and delivery is limited to the following locations: "+getCityScopes().join(', ')+". By the dynamic progress we acheive, we then assure to expand to our services to other locations and somehow our branches as well.";
	deliveryPolicyHdr.innerHTML = "Delivery Policy";
	deliveryPolicyBody.innerHTML = "Delivery charges are of standard value of "+getPesoFormat(getDeliveryCharge())+" for this moment to all scoped locations. By then, we rely towards your billing address or the checkout form you fill up to identify the location your items to be delivered. Our delivery transportation module is a truck labeled with our company logo, and our staff shall accomodate your purchases towards your pointed location and process the payment by your transaction type.";
	rentPolicyHdr.innerHTML = "Rent Policy";
	rentPolicyBody1.innerHTML = "Our renting standard implies "+getRentDiscountAmount()+"% off for an available rent stock of our current products, and the rent duration is parted by days with the current limit upto "+getRentDaysLimit()+" days, but for further duration can be requested to any of our stores directly to the head staff. The rent price is about "+getPesoFormat(getRentPricePerDay())+" and is finalised for our retail standards.";
	rentPolicyBody2.innerHTML = "Once you received your orders, the rent duration stated in your billing information will start and after it expires, our staff shall redeem it back and accomodate your pending debts and payments.";
	maintenanceAndRepairHdr.innerHTML = "Maintenance/Repair";
	maintenanceAndRepairBody1.innerHTML = "To request any maintenance or repair of your item online, you can contact us through our main hotline or email us your concern and we shall reply for your next phase. Our contact info can be found at our website or any of our stores.";
	maintenanceAndRepairBody2.innerHTML = "Please assure your item to deposit is our official product by attaching your official receipt with a xerox copy of your ID, and shall identify your record in our database. We shall present our transportation module towards your location to accomodate your items for the service you requested then update you with your available contacts of the progress and the date of accomplisment to withdraw your items again.";
	changeOrdersHdr.innerHTML = "Changing/Cancelling of Orders";
	changeOrdersBody.innerHTML = "To change or cancel your order, please send us an email or contact our hotline within 48 hours prior to the delivery date. Any changes made may affect the estimated amount and delivery date for the order. If payment has already been made – whether partial or full, that amount will be converted to store credit. Store credits are valid for use within 12 months starting from date of cancelation. Deposits or payments for Made-to-order and Backordered items are not allowed to be converted to store credits and are non-refundable.";
	paymentHdr.innerHTML = "Payment Options";
	paymentBody1.innerHTML = "Our payment options for online transaction avails the following methods: <i>Cash in-home</i> implies your payment transaction after your orders are being delivered at your stated address, <i>Cash in-store</i> implies your payment transaction at any of our stores before your orders are delivered at your stated address, and <i>Cheque</i> is transacted in any of our stores with your bank account information.";
	paymentBody2.innerHTML = "We do not currently accompany credit/debit payment online and is of implementation process for the moment.";
	priceInfoHdr.innerHTML = "Pricing and Content Information";
	priceInfoBody.innerHTML = "While our site strives to provide accurate pricing information, pricing or typographical errors may occur. We cannot confirm the price of an item until after you order. In the event that an item is listed at an incorrect price due to an error in pricing, We shall have the right, at Aekie’s sole discretion, to refuse or cancel any orders placed for that item. In the event that an item is mispriced, we may, at our discretion, either contact you for instructions or cancel your order and notify you of such cancellation.";
	
	infoBody.appendChild(intro);
	infoBody.appendChild(useOfSiteHdr);
	infoBody.appendChild(useOfSiteBody1);
	infoBody.appendChild(useOfSiteBody2);
	infoBody.appendChild(serviceDeliveryScopesHdr);
	infoBody.appendChild(serviceDeliveryScopesBody);
	infoBody.appendChild(deliveryPolicyHdr);
	infoBody.appendChild(deliveryPolicyBody);
	infoBody.appendChild(rentPolicyHdr);
	infoBody.appendChild(rentPolicyBody1);
	infoBody.appendChild(rentPolicyBody2);
	infoBody.appendChild(maintenanceAndRepairHdr);
	infoBody.appendChild(maintenanceAndRepairBody1);
	infoBody.appendChild(maintenanceAndRepairBody2);
	infoBody.appendChild(changeOrdersHdr);
	infoBody.appendChild(changeOrdersBody);
	infoBody.appendChild(paymentHdr);
	infoBody.appendChild(paymentBody1);
	infoBody.appendChild(paymentBody2);
	infoBody.appendChild(priceInfoHdr);
	infoBody.appendChild(priceInfoBody);
}

function setInfo_AboutAekie() {
	document.getElementById('infoHeader').innerHTML = "About Us";
	
	var developers = eval ('('+getSiteDevsData()+')').devs;
	
	var infoBody = document.getElementById('infoBody'),
	para1 = document.createElement('p'),
	para2 = document.createElement('p'),
	mapCaption = document.createElement('p'),
	mapLocation = document.createElement('div'),
	googleMapLocation = document.createElement('script'),
	maps_googleapis = document.createElement('script'),
	devInfoSection = document.createElement('div'),
	devInfoHeader = document.createElement('h2'),
	animateCSS = document.createElement('link'),
	divQuarter, divImg, devMsg, devImg, devName, devPosition;	
	
	animateCSS.rel = "stylesheet";
	animateCSS.href = "../utils/stylesheets/animate.css";
	
	//	Set paragraphs
	para1.innerHTML = "Aekie Home Furnitures is a local company in the Philippines that retails home/indoor furnitures for public and private use which are made in local or imported from other foreign associates such as in India, Taiwan, Australia. CEO Paul K. Mongo and COO Gaben B. Steams founded this company in early of September 2015 and have their common ambitions, since their college days, of retailing furniture products to the public. They came up for the slogan saying &quot;Your home: the real urban living&quot; to identify the company reputation. The company was ranked 21<sup>st</sup> Best Furniture Retailer in the Philippines for just around 5 months since their debut, and acheived the Top Venture Company in the 50th Asian Business Expo.";
	para2.innerHTML = "The company also services repairs and maintenance of their products and offers renting of availed furnitures. Headquarters is located in Unit 33, Silica St., GreenDays, Makati City and currently has a statistic of 800 employees (not to be exact) and 3 branches. The main branch is in Makati, and the other branches are in Manila and Quezon City.";
	mapCaption.innerHTML = "Our main office is located as shown:";
	
	mapLocation.id = "map";
	mapLocation.className = "w3-card-4";
	mapLocation.style = "width:100%;height:400px";
	
	googleMapLocation.src = "../utils/scripts/googleMapLocation.js";
	maps_googleapis.src = "https://maps.googleapis.com/maps/api/js?callback=myMap";
	
	//	Set developer info
	devInfoSection.className = "w3-container w3-padding-64 w3-center";
	devInfoHeader.className = "w3-padding w3-topbar";
	devInfoHeader.innerHTML = "The team behind this site";
	
	devInfoSection.appendChild(devInfoHeader);
	
	for(var i in developers) {
		divQuarter = document.createElement('div');
		divQuarter.className = "w3-quarter w3-margin-bottom";
		
		divImg = document.createElement('div');
		devMsg = document.createElement('span');
		
		divImg.className = "w3-tooltip";
		devMsg.className = "w3-text w3-tag w3-round-xxlarge";
		devMsg.style = "position: absolute; top: -30%;";
		devMsg.innerHTML = developers[i].msg;		

		devImg = document.createElement('img');
		devName = document.createElement('h3');
		devPosition = document.createElement('span');
		
		devImg.src = "../res/images/" + developers[i].image;
		divImg.id = "devImg"+i;
		devImg.alt = developers[i].name;
		devImg.style.width = "45%";
		devImg.className = "w3-circle w3-hover-opacity w3-animate-right";
		
		divImg.appendChild(devMsg);
		divImg.appendChild(devImg);
		divImg.setAttribute("onclick", "document.getElementById('"+divImg.id+"').className = 'animated hinge'");
		
		devName.innerHTML = developers[i].name;
		devPosition.innerHTML = developers[i].position;
				
		divQuarter.appendChild(divImg);
		divQuarter.appendChild(devName);
		divQuarter.appendChild(devPosition);
		
		devInfoSection.appendChild(divQuarter);		
	}
	
	infoBody.appendChild(animateCSS);
	infoBody.appendChild(para1);
	infoBody.appendChild(para2);
	infoBody.appendChild(mapCaption);
	infoBody.appendChild(googleMapLocation);
	infoBody.appendChild(maps_googleapis);
	infoBody.appendChild(mapLocation);
	infoBody.appendChild(devInfoSection);
}