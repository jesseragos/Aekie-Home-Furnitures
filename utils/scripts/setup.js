var navbarDefClass = 'w3-navbar w3-card-2 theme-orange w3-animate-opacity',
	  navbarStartClass = 'w3-navbar navbarStart';
var categories = getCategories();
var furnitures = getAllFurnitures();

function determineBrowserCompatibility() {
	var noStorageSupport = typeof(Storage) == "undefined",
	ieBrowser = (/*@cc_on!@*/false || !!document.documentMode),
	firefoxBrowser = typeof InstallTrigger !== 'undefined';
	
	if (noStorageSupport || ieBrowser || firefoxBrowser)
		window.location = "./unsupported.html";
}
	  
function setUpDefaultNavBar() {
	// Message bar (Notification)
	document.getElementById('msgBar').innerHTML = '' +
		  ' <div id="msgBarSection" class="w3-large w3-btn w3-container w3-card-4 w3-round-xlarge w3-blue w3-display-middle" onclick="this.style.display = &quot;none&quot;">' + 
		  ' <span id="msgBarText"></span>&nbsp;' + 
		  ' <span style="cursor: pointer;">&times;</span></div> ';
	
	var content =  '' + 
	
	// Top button (Return to top of page) 
		  ' <a href="#" id="topButton"><i class="fa fa-angle-up"></i></a> ' +
		
		  // Desktop 
		  ' <ul class="'+navbarDefClass+'" id="homeNavbar"> ' +
			// Left navs 
			' <li class="w3-dropdown-hover"> ' +
				' <a href="'+getIndexHTMLfile()+'" class="w3-padding-large aekieFont" id="homeLink"> Aekie </a> ' +
				' <div class="w3-dropdown-content w3-dark-grey w3-card-4 w3-small"> ' +
					  ' <a id="hotFeatsLink" href="'+getIndexHTMLfile()+'#hotFeatsStartPad">Hot Feats</a> ' +
					  ' <a id="onSaleLink" href="'+getIndexHTMLfile()+'#onSaleStartPad">On Sale</a> ' +
					  ' <a id="topSellersLink" href="'+getIndexHTMLfile()+'#tsAndNwStartPad">Top Sellers</a> ' +
					  ' <a id="newReleasesLink" href="'+getIndexHTMLfile()+'#tsAndNwStartPad">New Releases</a> ' +
				' </div> ' +
			' </li> ';
			
			// Extract category data
			var subCats;
			
			for(var i in categories) {
				content += ' <li class="w3-dropdown-hover"> ' +
									' <a href="' + getCatListHTMLfile() + i +'" class="catMenu w3-padding-large"> '+categories[i].name+' </a> ' +
									' <div class="w3-dropdown-content w3-dark-grey w3-card-4"> ';
									
					subCats = categories[i].subCategories;
					for(var j in subCats)
						content += ' <a href="' + getCatListHTMLfile() + i + '_' + j + ' " ' +
										 'class="w3-small" style="cursor: pointer;">'+subCats[j]+'</a> ';
					
				content += 	' </div> ' +
								' </li> ';
			}
			
			content += '' + 
			' <li><a href="'+getRentHTMLfile()+'" class="w3-padding-large specialBtn"> Rent </a></li> ' +
			
			// Right navs 
			' <li class="w3-right w3-dropdown-click"> ' +
				' <a class="w3-padding-large" onclick="showSearchBar()"><i id="searchIcon" class="fa fa-search"></i></a> ' +
				' <div id="searchBar" class="w3-dropdown-content w3-container w3-card-4" style="right: 0; z-index: 12;" onkeypress="handleSearchKey(event);"> ' +
					' <input id="searchField" class="w3-input" type="text" size="20" maxlength="30" placeholder="Search" required> ' +
					' <span id="blankSearchInfo" class="w3-xsmall w3-text-red" style="display: none;">Your search is blank.</span> ' +
					' <button class="w3-btn aekieBtn w3-medium w3-right" onclick="verifySearch(&quot;searchField&quot;);"><i class="fa fa-arrow-right"></i></button> ' +
				' </div> ' +
			' </li> ' +
			' <li class="w3-right"> ' + 
				'<button id="cartBtn" class="w3-padding-large w3-btn w3-red" onclick="showElem(&quot;cartSection&quot;, true);"><i class="fa fa-shopping-cart"> ' +
					' <sup id="itemCartQuantitySign"></sup> ' +
					' </i></button> ' + 
			' </li> ' +
		  ' </ul> ' +
		  
		  // Phone/Tablets
		  getCategoriesForSmall() +
		  ' <ul class="w3-navbar w3-hide-large" id="homeNavbar-small" style="border: 1px #ff6600 solid; background: rgba(250, 250, 250, .8)"> ' +
			' <li class="w3-opennav w3-left"> ' +
				' <a class="w3-padding-large aekieFont" onclick="showElem(&quot;small-navCategory&quot;, true);"><i class="fa fa-bars"></i> Aekie</a> ' +
			' </li> ' +			
			' <li class="w3-opennav w3-right"> ' +
				' <a class="w3-padding-large" onclick="showElem(&quot;small-searchBar&quot;, true); document.getElementById(&quot;small-searchField&quot;).focus();"><i class="fa fa-search"></i></a> ' +				
			' </li> ' +
			' <li class="w3-opennav w3-right"> ' +
				' <a id="small-cartBtn" class="w3-padding-large" onclick="showElem(&quot;small-cartSection&quot;, true);"><i class="fa fa-shopping-cart"></i> <sup id="small-itemCartQuantitySign"></sup></a> ' +
			' </li> ' +
		  ' </ul> ' + getSearchbarForSmall();			
		  
		document.getElementById("top").innerHTML = content;

		window.onscroll = function() {
			showTopButton(); 
		}

		setMiscellaneous();		
}

function getSearchbarForSmall() {
	return '' +
		' <div id="small-searchBar" class="w3-container w3-white w3-card-4 w3-hide-large" style="display: none; z-index: 12;" onkeypress="handleSearchKey(event);"> ' +
			' <form action="javascript:void(0);" onsubmit="verifySearch(&quot;small-searchField&quot;);"> ' + 
				' <input id="small-searchField" class="w3-input" type="text" size="20" maxlength="30" placeholder="Search" required> ' +
				' <button class="w3-btn aekieBtn w3-medium w3-right"><i class="fa fa-arrow-right"></i></button> ' +
			' </form> ' + 
		' </div> ';
}

function getCategoriesForSmall() {
	var navSmall = '' +
		' <nav id="small-navCategory" class="w3-sidenav w3-hide-large w3-large theme-orange w3-card-2 w3-animate-left"> ' +
		  ' <div class="w3-container w3-bottombar w3-border-white"> ' +
			' <a href="javascript:void(0)" class="w3-closebtn w3-padding-right" onclick="showElem(&quot;small-navCategory&quot;, false);">&times;</a> ' +
			' <div class="w3-xlarge w3-padding">Menu</div> ' +
		  ' </div> ';
		  
		  navSmall += '' +
			' <a class="aekieBtn w3-margin" href='+getIndexHTMLfile()+'><i class="fa fa-home"></i> Home</a> ' +
			' <div class="w3-accordion w3-margin-top w3-blue-grey w3-leftbar border-theme-lime"> ' +
				' <a class="aekieFont" onclick="showElem(&quot;small-homeCats&quot;, true);">Aekie</a> ' +
				' <div id="small-homeCats" class="w3-accordion-content w3-white text-theme-orange w3-card-4"> ' +
					' <a id="hotFeatsLink" href="'+getIndexHTMLfile()+'#hotFeatsStartPad">Hot Feats</a> ' +
					' <a id="onSaleLink" href="'+getIndexHTMLfile()+'#onSaleStartPad">On Sale</a> ' +
					' <a id="topSellersLink" href="'+getIndexHTMLfile()+'#tsAndNwStartPad">Top Sellers</a> ' +
					' <a id="newReleasesLink" href="'+getIndexHTMLfile()+'#tsAndNwStartPad">New Releases</a> ' +
				' </div> ' + 
			' </div> ';
		  
		  for(var i in categories) {
				navSmall += '' +
				' <div class="w3-accordion w3-margin-top w3-border-bottom border-theme-lime"> ' +
					' <a onclick="showElem(&quot;'+categories[i].name+'&quot;, true);">'+categories[i].name+'</a> ' +
				' <div id="'+categories[i].name+'" class="w3-accordion-content w3-white text-theme-orange w3-card-4"> ';
									
				subCats = categories[i].subCategories;
				for(var j in subCats)
					navSmall += ' <a href="' + getCatListHTMLfile() + i + '_' + j + ' " ' + '>'+subCats[j]+'</a> ';
					
				navSmall += 	' </div> ' +
								' </div> ';
			}
			
			navSmall += '' +
			' <a href="'+getRentHTMLfile()+'" class="w3-padding w3-center w3-margin specialBtn"> Rent </a> ' +
		' </nav> ';
	
	return navSmall;
}	
	
function setUpStartNavBar() {
	setUpDefaultNavBar();
	document.getElementById("homeNavbar").className = navbarStartClass;
	
	window.onscroll = function() { 
		showOpaqueNav(); 
		showTopButton();
	}
}

function setMiscellaneous() {
	small_setUpCart();
	setUpCart();
	setFeedbackModal();
}	
	
function setUpConfig() {
	configBrowser();
	configScreenRes();
	configResize();
}

// Change style of navbar on scroll
function configResize() {
	window.onresize = function() { configScreenRes(); };
}

function configScreenRes() {
	if(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >= 1024) {
		document.getElementById("homeNavbar").style.display = "block";
		
	} else document.getElementById("homeNavbar").style.display = "none";
}
		
// Set Browser references 
function configBrowser() {
	// For IE
	if(/*@cc_on!@*/false || !!document.documentMode) {
		var mainSSs = document.getElementsByClassName('mainSS');					
		for(var i=0; i<mainSSs.length; i++)
			mainSSs[i].style.backgroundAttachment = "scroll";
			
		var homeSectionTitles = document.getElementsByClassName('homeSectionTitle');					
		for(var i=0; i<homeSectionTitles.length; i++)
			homeSectionTitles[i].style.backgroundAttachment = "scroll";
	}	
}

function showOpaqueNav() {
	document.getElementById("homeNavbar").className = 
	(document.body.scrollTop > 250 || document.documentElement.scrollTop > 250)? navbarDefClass : navbarStartClass;
}

function showTopButton() {
	document.getElementById("topButton").style.display = (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250)? "block":"none";
}
			
function showSearchBar() {
	var sBar = document.getElementById("searchBar"),
		  sIcon = document.getElementById("searchIcon");
	if (sBar.className.indexOf("w3-show") == -1) {
		sBar.className += " w3-show";
		sIcon.className = "fa fa-close";
		
		document.getElementById("searchField").focus();
		document.getElementById("blankSearchInfo").style.display = "none";
	} else {
		sBar.className = sBar.className.replace(" w3-show", "");
		sIcon.className = "fa fa-search";
	}
	
}

function setUpFooter() {
	var footerContent = document.createElement('div');
	
	footerContent.className = 'w3-container w3-content';
			
	var optionsContent = getFooterOptionsContent(),
	contactsContent = getContactsContent(),
	socialsContent = getSocialsContent();	
	
	footerContent.appendChild(optionsContent);
	footerContent.appendChild(contactsContent);
	footerContent.appendChild(socialsContent);
	
	document.getElementById("footer").appendChild(footerContent);
}

function getSocialsContent() {
	var socialsContent = document.createElement('div'),
	header, socialAnc, socialIcon;		
	
	socialsContent.className = 'w3-third w3-padding-left';
	
	header = document.createElement('h5');
	header.innerHTML = "Social links"
	socialsContent.appendChild(header);
	
	var socialNets = getSocialNets();
	
	for(var i in socialNets) {
		socialAnc = document.createElement('a');
		socialIcon = document.createElement('i');
		
		socialAnc.className = "w3-btn-floating theme-lime w3-margin " + socialNets[i].hoverColor;
		socialAnc.href = "javascript:void(0);";
		socialAnc.title = socialNets[i].title;
		socialIcon.className = socialNets[i].icon;
		
		socialAnc.appendChild(socialIcon);
		socialsContent.appendChild(socialAnc);
	}
	
	return socialsContent;
}

function getContactsContent() {
	//	Set contacts content
	var contactInfo = getContactInfoData().contactInfo;
	var contactsContent = document.createElement('div');	
	
	contactsContent.className = 'w3-third w3-padding-left w3-leftbar';
	
	var contactInfoHeader = document.createElement('h5');	
	contactInfoHeader.innerHTML = "Contact Info";
	
	var contactInfoTable = document.createElement('table'), contactInfoTableRow, contactInfoTableData1, contactInfoTableData2;
	for(var i in contactInfo) {
		contactInfoTableRow = document.createElement('tr');
		
		contactInfoTableData1 = document.createElement('td');
		contactInfoTableData2 = document.createElement('td');
		contactInfoTableData1.style.paddingRight = "12px";
		
		contactInfoTableData1.innerHTML = '<i class="'+contactInfo[i].icon+'"></i>';
		contactInfoTableData2.innerHTML = contactInfo[i].ciValue;
		
		contactInfoTableRow.appendChild(contactInfoTableData1);
		contactInfoTableRow.appendChild(contactInfoTableData2);
		
		contactInfoTable.appendChild(contactInfoTableRow);	
	}
	
	contactsContent.appendChild(contactInfoHeader);
	contactsContent.appendChild(contactInfoTable);

	return contactsContent;
}

function getFooterOptionsContent() {
	//	Set options data
	var footerMenu = getFooterMenuData().footer;
	
	var optionsContent = document.createElement('div');
	optionsContent.className = 'w3-third w3-margin-top w3-margin-bottom w3-center';
	
	var optionDiv, optionAnc;
	
	for(var i in footerMenu) {
		optionDiv = document.createElement('div');
		optionAnc = document.createElement('a');
		optionAnc.style.textDecoration = "underline";
			
		optionAnc = setFooterOptionFunction(optionAnc, i);
		
		optionAnc.title = footerMenu[i].name;
		optionAnc.className = "w3-hover-opacity footerMenu";
		optionAnc.innerHTML = footerMenu[i].name;
		
		optionDiv.appendChild(optionAnc);
		optionsContent.appendChild(optionDiv);
	}
	
	var separator = document.createElement('hr')
	separator.className = "w3-hide-large w3-hide-medium";
	optionsContent.appendChild(separator);
	
	return optionsContent;
}

function setFooterOptionFunction(anc, indx) {
	switch(parseInt(indx)) {
		case 0: anc.onclick = openFeedback; break;
		case 1: anc.href = getInfoHTMLfile() + "?opt=termsAndConditions"; break;
		case 2: anc.href = getInfoHTMLfile() + "?opt=aboutAekie"; break;
	}
	
	return anc;
}

function openFeedback() {
	document.getElementById('feedbackModal').style.display = "block";
}

//	Side-nav category
function setUpCategoryList() {
	var content = '', subCats;
	
	for(var i in categories){
		content += '<ul id="'+categories[i].name+'">' +
							' <li><a href="' + getCatListHTMLfile() + i + ' " ' +'>'+categories[i].name+'</a></li> ';
		
		subCats = categories[i].subCategories;
		for(var j in subCats)
			content += ' <li><a style="font-size: 12px !important;" href="' + getCatListHTMLfile() + i + '_' + j + ' " ' +'class="w3-medium">'+subCats[j]+'</a></li> ';
		
		content += '</ul>'+(i < categories.length-1? '<hr>':'');
	}
	
	document.getElementById("categoryList").innerHTML = content;
}

function getGridLayoutPlan(cols, dataSize) {
	var colData = new Array(), num;

	for(var i=0; i<cols; i++) {
		var colCountData = new Array();
		num = i;
		while(num < dataSize) {
			colCountData.push(num);
			num += cols;
		}
		
		colData.push(colCountData);
	}		
	
	return colData;
}

function setProdInfo() {
	var content = '',
	optCatData = getOptedCategory("prodinfodata"),
	item = getProduct(optCatData), origPrice= getPesoFormat(item.price),
	relatedItemsIndx = shuffle(getRelatedProductsIndx(optCatData)),
	relProdSize = 4,
	subTotalPrice = item.sale? getSalePrice(item.price, item.sale):item.price;
	
	content += '' +
					' <div class="w3-row"> ' +
					
					' <div class="w3-half w3-container"> ' +
						// Product Name, Image, Price Side 
						' <div class="itemInfo w3-border w3-xlarge w3-display-container"> ' +
						
							' <div class="w3-center w3-border-black w3-padding">'+item.prodName+'</div> ' +
							' <div class="itemInfoImg w3-hover-opacity" onclick="document.getElementById(&quot;imgLarge&quot;).style.display = &quot; block &quot;"> ' +
								' <img src="../res/images/products/'+item.image+'" class="w3-card-4 w3-border"> ' +
								(item.sale? ' <div class="w3-display-topright w3-badge w3-yellow w3-xxlarge">'+getSaleFormat(item.sale)+'</div> ':'' )+	
								' <div class="w3-display-topleft w3-tag w3-light-grey w3-small">Click to enlarge</div> ' +	
							' </div> ' +
							
							' <div id="imgLarge" class="w3-modal" onclick="this.style.display=&quot; none &quot;"> ' +
								' <span class="w3-closebtn w3-red w3-hover-grey w3-container w3-margin w3-display-topright">&times;</span> ' +
								' <div class="w3-modal-content w3-animate-zoom"> ' +
									' <img src="../res/images/products/'+item.image+'"> ' +
								' </div> ' +
							' </div> ' +
							
							' <div class="w3-container"> ' +
								(item.sale? ' <span class="w3-padding">'+getPesoFormat(subTotalPrice)+'</span> ' +
												' <del class="oldPrice w3-text-light-blue w3-large">'+origPrice+'</del>' :
												' <span class="w3-padding">'+origPrice+'</span> '
								) +
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
						' <div> ' + (item.stock? 
							' <form> ' +
								' <label>Quantity: </label> ' +
								' <span id="itemQuantityBox"> ' +
									' <input id="itemQuantityMinus" type="button" value="-" onclick="itemQuantityControl(-1, '+subTotalPrice+');"/>' +
									' <input id="itemQuantityField" type="text" size="1" value="1" min="1" max="'+item.stock+'" style="text-align: center;" readonly/>' +
									' <input id="itemQuantityPlus" type="button" value="+" onclick="itemQuantityControl(+1, '+subTotalPrice+');"/>' +
								' </span> ' +
								' <label style="color: grey;"> (in stock: '+item.stock+')</label> ' + 
							' </form> ' + /* onkeydown="return false" */
							' <div class="w3-margin-top" style="float: left;"><label>Total Price: </label><i id="itemTotalCost" class="w3-border-bottom border-theme-orange">'+getPesoFormat(subTotalPrice)+'</i></div>' + 
							' <div style="float: right;"><button class="w3-btn w3-ripple aekieBtn" onclick="addProdToCart(['+optCatData[1]+', '+optCatData[2]+', '+optCatData[3]+']); return false;"><i class="fa fa-cart-plus"></i> Add to cart</button></div> ' :
							' <div class="w3-tag w3-large w3-black">Out of stock</div> '
							) +
						' </div> ' +
					' </div> ' +				
				' </div> ';
									
					// Related Products Section 
					if(relatedItemsIndx.length) {
						content += '' + 
						' <div class="relProdList itemGrid w3-row w3-row-padding w3-margin-top w3-border w3-round-xlarge" style="margin-top: 13% !important; padding-top: 2px !important;"> ' +
						
							' <div class="w3-container w3-large w3-text-black w3-border-bottom w3-margin-bottom border-theme-orange">Related Products:</div> ';
							
							var item, origPrice;
							for(var i=0; i<relProdSize; i++) {
								if(i >= relatedItemsIndx.length) break;
									
								item = optCatData[0][relatedItemsIndx[i]];
								origPrice = getPesoFormat(item.price);
								
								content += '' +
								' <div class="w3-quarter"> ' +
									' <div class="w3-card-8 itemBox"> ' +
									' <a href="' + getProdInfoHTMLfile() + optCatData[1] + '_' + optCatData[2] + '_' + relatedItemsIndx[i] + ' ">' +
										(item.stock? 
											' <div class="w3-btn w3-ripple w3-display-topleft theme-lime" onclick="addToCartDirect(['+optCatData[1]+', '+optCatData[2]+', '+relatedItemsIndx[i]+']); return false;"><i class="fa fa-cart-plus"></i></div> ' :
											' <div class="w3-tag w3-display-topleft w3-large w3-black">Out of stock</div> '
										) +
										(item.sale? '<div class="w3-badge w3-display-topright w3-yellow w3-xlarge">'+getSaleFormat(item.sale)+'</div>':'') + 
										' <img src="../res/images/products/'+item.image+'" > ' +
										' <div class="w3-container"> ' +
											' <p>'+item.prodName+'</p>  ' +
											' <p> ' +											
												(item.sale? '<span class="price">'+getPesoFormat(getSalePrice(item.price, item.sale))+'</span>' + 
													'<del class="oldPrice w3-text-light-blue">'+origPrice+'</del>' :
												' <span class="price">'+origPrice+'</span> ') +
											' </p> ' +
										' </div> ' +
									' </a> ' +
									' </div> ' +
								' </div> ';					
							}
							
						content += ' </div>	';		
					}					
	
	document.getElementById("itemInfoSection").innerHTML = content;	
}

function itemQuantityControl(step, price) {
	var itemQuantity = document.getElementById("itemQuantityField"),
		  newIqValue = parseInt(itemQuantity.value) + step;
	
	if(newIqValue > 0 && newIqValue <= itemQuantity.max){
		document.getElementById("itemQuantityField").value = newIqValue;
		document.getElementById("itemTotalCost").innerHTML = getPesoFormat(newIqValue * price);
	}
}

function itemCartQuantityControl(step, cartItemIndx, stock) {
	var quantity = document.getElementById('itemCartQuantity'+cartItemIndx).value;
	var newIqValue = parseInt(quantity) + step;
	
	if(newIqValue > 0 && newIqValue <= stock) {
		var cartItems = JSON.parse(localStorage.cartItems);
		cartItems[cartItemIndx][1] = newIqValue;
		localStorage.cartItems = JSON.stringify(cartItems);
		updateCart();
	}
}

function getCategoryListView(catTag) {
	var content = '', subCatLabels = new Array(), name, image, itemQuantity,
	subCats = getFurnitures(catTag);
	
	for(var i in subCats) subCatLabels.push(i);
		
	var colData = getGridLayoutPlan(3, subCatLabels.length);
	
	for(var i in colData) {	
		content += ' <div class="w3-third"> ';
	
		for(var j in colData[i]) {
			name = categories[catTag].subCategories[colData[i][j]];
			image = name.replace(/\//gi, '_');
			itemQuantity = subCats[subCatLabels[colData[i][j]]].length;
		
			content += '' +
								' <div class="w3-card-8 categoryBox itemBox"> ' +
								' <a href="' + getCatListHTMLfile() + catTag + '_' + colData[i][j] + '_' + ' ">' +																		
									' <img alt="category" src="../res/images/category/'+image+'.jpg"> ' +
									' <div class="w3-container"> ' +
										' <p style="float: left;">'+name+'</p>  ' +
										' <p style="float: right;">'+'('+itemQuantity+')'+'</p>  ' +
									' </div> ' +
								' </a> ' +
								' </div> ';
		}
		
		content += ' </div> ';
	}
		
	return content;
}

function getProductListView(optCatData) {	
	var content = '';
	items = optCatData[0], catTag = optCatData[1], furnTag = optCatData[2];
	var colData = getGridLayoutPlan(4, items.length);
	
	for(var i in colData) {
	
	content += ' <div class="w3-quarter"> ';
	
		for(var j in colData[i]) {
			item = items[colData[i][j]];
			origPrice = getPesoFormat(item.price);
			
			content += '' +
								' <div class="w3-card-8 itemBox"> ' +
									' <a href="' + getProdInfoHTMLfile() + catTag + '_' + furnTag + '_' + colData[i][j] + ' ">' +
									(item.stock? 
										' <div class="w3-btn w3-ripple w3-display-topleft theme-lime" onclick="addToCartDirect(['+catTag+', '+furnTag+', '+colData[i][j]+']); return false;"><i class="fa fa-cart-plus"></i></div> ' :
										' <div class="w3-tag w3-display-topleft w3-small w3-black">Out of stock</div> '
									) +
									(item.sale? '<div class="w3-badge w3-display-topright w3-yellow w3-xlarge">'+getSaleFormat(item.sale)+'</div>':'') + 
									' <img src=../res/images/products/'+item.image+'> ' +
									' <div class="w3-container"> ' +
										' <p>'+item.prodName+'</p> ' +
										' <p>' +
											(item.sale? 
												'<span class="price w3-hide-large w3-hide-small w3-small">'+getPesoFormat(getSalePrice(item.price, item.sale))+'</span>' + 
												'<span class="price w3-hide-medium">'+getPesoFormat(getSalePrice(item.price, item.sale))+'</span>' + 
												'<del class="w3-hide-large w3-hide-small w3-tiny oldPrice w3-text-light-blue">'+origPrice+'</del>' +
												'<del class="w3-hide-medium oldPrice w3-text-light-blue">'+origPrice+'</del>' :
											' <span class="price w3-hide-large w3-hide-small w3-small">'+origPrice+'</span> ' +
											' <span class="price w3-hide-medium">'+origPrice+'</span> ') +
										' </p>' +
									 ' </div>' +
									' </a>' +
								' </div>';
		}
		
		content += ' </div> ';
	}
	
	return content;
}

function setCategoryTypeView() {
	var content = "", item, origPrice,	
	optCatData = getOptedCategory("optcatlistdata");
	
	content = isNaN(optCatData[2])? getCategoryListView(optCatData[1]) : getProductListView(optCatData);
	
	document.getElementById("itemList").innerHTML = content;
}

function setUpSearchResults() {
	var content = '',
	search = document.location.href.split("search=")[1].replace(/%20/gi, " ");
	// Extract all words in search
	var itemResultsData = getItemResults(search),
	itemResults = itemResultsData[0], catData = itemResultsData[1], colNum = 4, 
	item, origPrice, catDataIndx, indx;
	
	
	if(!itemResults.length)
		content += '' +
				' <div class="w3-padding-16"> ' +
					' <span id="prodListLabel" class="w3-xlarge w3-tag w3-wide w3-margin">No results found</span> ' +
				' </div> ';
	else {
		var colData = getGridLayoutPlan(colNum, itemResults.length);
		content += '' +
				' <div class="w3-padding-16"> ' +
					' <span id="prodListLabel" class="w3-xlarge w3-tag w3-wide w3-margin">Search results for: </span> ' +
					' <kbd class="w3-xxlarge w3-padding w3-text w3-border-bottom border-theme-orange">'+search+'</kbd> ' +
				' </div> ' +
			' <div id="searchResultContent" class="itemGrid w3-content w3-container w3-row-padding w3-border" style="padding-top: 2%;"> ';
			
		for(var i in colData) {
			content += ' <div class="w3-quarter"> ';
			
			for(var j in colData[i]) {
				indx = colData[i][j];
				item = itemResults[indx];
				catDataIndx = catData[indx].split(",");
				
				origPrice = getPesoFormat(item.price);
				
				content += '' +
						' <div class="w3-card-8 itemBox"> ' +
							' <a href="' + getProdInfoHTMLfile() + catDataIndx[0] + '_' + catDataIndx[1] + '_' + catDataIndx[2] + ' ">' +
									(item.stock? 
										' <div class="w3-btn w3-ripple w3-display-topleft w3-large theme-lime" onclick="addToCartDirect(['+catDataIndx[0]+', '+catDataIndx[1]+', '+catDataIndx[2]+']); return false;"><i class="fa fa-cart-plus"></i></div> ' :
										' <div class="w3-tag w3-display-topleft w3-large w3-black">Out of stock</div> '
									) +
									(item.sale? '<div class="w3-badge w3-display-topright w3-yellow w3-xlarge">'+getSaleFormat(item.sale)+'</div>':'') + 
									' <img src="../res/images/products/'+item.image+'" > ' +
									' <div class="w3-container"> ' +
										' <p>'+item.prodName+'</p>  ' +
										' <p> ' +											
											(item.sale? '<span class="price">'+getPesoFormat(getSalePrice(item.price, item.sale))+'</span>' + 
												'<del class="oldPrice w3-text-light-blue">'+origPrice+'</del>' :
											' <span class="price">'+origPrice+'</span> ') +
										' </p> ' +
									' </div> ' +
							' </a> ' +
						' </div> ';
			}
			
			content += ' </div> ';
		}
		content += ' </div> ';
	}	
	
	document.getElementById("searchResultSection").innerHTML = content;
}

function getItemResults(search) {
	var searchWords = search.split(/\s+/),
	item, searchWord, category, jCtr,
	itemResults = new Array(), catData = new Array();
	
	//	Begin searching by comparing to each word in search to each attribute of product
		for(var i in furnitures) {
			jCtr = -1;
				for(var j in furnitures[i]) {
					jCtr++;
					for(var k in furnitures[i][j]) {
						item = furnitures[i][j][k];
						for(var l in searchWords) {
							searchWord = new RegExp(searchWords[l], "gi");
							category = categories[i];
							
							if(	
								searchWord.test(category.name) ||
								searchWord.test(category.subCategories[jCtr]) ||
								searchWord.test(item.prodName) ||
								/* searchWord.test(item.description) || 
								searchWord.test(item.price) ||
								searchWord.test(item.stock) ||
								searchWord.test(item.rentStock) || */
								searchWord.test(item.tags.join(" "))
							) {
								itemResults.push(item);
								catData.push(i+","+jCtr+","+k);
								break;
							}
						}
					}
				}
		}
		
		return [itemResults, catData];
}

function getProduct(optData) {	
	return optData[0][optData[3]];
}

function getItem(optData) {	
	return optData[0][optData[3]];
}

function getFurnitureObjName(catTag, furnTag) {	
	var furniture = getFurnitures(catTag), ctr = 0;
	for(var i in furniture) {
		if(ctr == furnTag) return i;
		ctr++;
	}
}

function getCategoryIndxs() {
	var catTags = new Array(),
		  furnTags = new Array(),
		  prodTags = new Array(),
		  indxData = new Array();
	var jCtr, indxCtr = -1;
	
	for(var i in furnitures) {
		jCtr = -1;
		for(var j in furnitures[i]) {
			jCtr++;
			for(var k in furnitures[i][j]) {
				catTags.push(i);
				furnTags.push(j+','+jCtr);
				prodTags.push(k);
				indxData.push(++indxCtr);
			}
		}
	}
	
	return [catTags, furnTags, prodTags, indxData];
}

function getRelatedProductsIndx(optCatData) {	
	var relProdIndxs = getArrayInIndxs(optCatData[0]);

	removeFromArray(relProdIndxs, optCatData[3]);
	
	return relProdIndxs;
}
	
function getOptedCategory(attribute) {	
	/* optData = sessionStorage.catOpt.split(','); */
	
	var furniture,
	optData = document.location.href.split(attribute+"=")[1].split("_");
	
	var catTag = parseInt(optData[0]),
		 furnTag = parseInt(optData[1]),
		 prodTag = optData[2];	
	
	hiLightCat(optData[0]);	
	furniture = getFurnitureObjName(catTag, furnTag);
	
	var categoryList = categories[catTag];
	setProdListLabel(categoryList.name, categoryList.subCategories[furnTag]);
	
	return new Array(getFurnitures(catTag)[furniture], catTag, furnTag, prodTag);
}

function setProdListLabel(category, subCategory) {
	document.getElementById("prodListLabel").innerHTML = category + (subCategory!==undefined? ": " + subCategory:"");
}

function hiLightCat(catIndx) {
	var catMenus = document.getElementsByClassName("catMenu");
	
	for(var i in categories)
		if(catMenus[i].innerHTML.trim() == categories[catIndx].name.trim()){
			catMenus[i].style.backgroundColor = "grey";
			break;
		}
}

function directToCategory(category, furniture) {
	/*
	sessionStorage.catOpt = category+','+furniture;
	window.location = getCatListHTMLfile();
	*/
	
	directToNewPage(getCatListHTMLfile() + category+'_'+furniture);	
}

function directToProdInfo(category, furniture, product) {	
	directToNewPage(getProdInfoHTMLfile() + encodeURIComponent(category+'_'+furniture+'_'+product));
}

function directToSearchResults(search) {	
	directToNewPage(getSearchResultHTMLfile() + search);
}

function directToCheckout() {	
	directToNewPage(getBillingHTMLfile());
}

function directToNewPage(url) {	
	document.location.href = url;
}

function handleSearchKey(e) {
	if(e.keyCode === 13) {
		e.preventDefault();
		verifySearch("searchField");
	}
}

function verifySearch(idName) {
	var search = document.getElementById(idName).value
	if(search == '') document.getElementById('blankSearchInfo').style.display = "inline";
	else directToSearchResults(search);
}

function showElem(idName, isShow) {
	var show = document.getElementById(idName).style.display;
	document.getElementById(idName).style.display = isShow && show!=="block"? "block":"none";
}

function small_setUpCart() {
	var content = '' +
	
	' <nav id="small-cartSection" class="w3-sidenav w3-card-4 w3-animate-right w3-hide-large"> ' +
		' <div class="w3-container w3-blue-grey w3-xlarge w3-bottombar border-theme-orange w3-padding"> ' +
			' <span class="w3-closebtn w3-hover-text-red" onclick="showElem(&quot;small-cartSection&quot;, false);">&times;</span> ' +
			' <div class="w3-center"><i class="fa fa-shopping-cart"></i> Cart</div> ' +
		' </div> ' +		
		' <div class="cartSectionArea w3-container"></div> ' +
	' </nav> ';
	
	var bodyContent = document.getElementsByTagName('body')[0];
	bodyContent.innerHTML = content + bodyContent.innerHTML;
}

function setUpCart() {
	var content = '' +
	
	' <div id="cartSectionBox" class="w3-modal-content w3-card-8 w3-animate-right w3-hide-medium w3-hide-small"> ' +
		' <div class="w3-container w3-blue-grey w3-xlarge w3-bottombar border-theme-orange w3-padding" style="border-top-left-radius:16px;"> ' +
			' <span class="w3-closebtn w3-hover-text-red" onclick="showElem(&quot;cartSection&quot;, false);">&times;</span> ' +
			' <div class="w3-center"><i class="fa fa-shopping-cart"></i> Cart</div> ' +
		' </div> ' +		
		' <div class="cartSectionArea w3-container w3-margin"></div> ' +
	' </div> ';
	
	document.getElementById('cartSection').innerHTML = content;
	updateCart();
}

function updateCart() {	
	var cartItems = localStorage.cartItems;
	
	if(cartItems == undefined || JSON.parse(cartItems).length <= 0) {
		var cartSectionAreas = document.getElementsByClassName('cartSectionArea');
		for(var i in cartSectionAreas)
			cartSectionAreas[i].innerHTML = '<div class="w3-large w3-display-middle">Your cart is currently empty.</div>';
		document.getElementById('itemCartQuantitySign').innerHTML = 0;
		document.getElementById('small-itemCartQuantitySign').innerHTML = 0;
	} else {
		var cartItemsContent = JSON.parse(cartItems), itemTags, quantity, item, totalPrice, subTotalPrice = 0;		
		
		var content = '' +
		
		' <div id="cartSectionBody" class="w3-responsive w3-border border-theme-orange"> ' +		
		' <table id="cartItemContent" class="w3-table w3-white"> ' +
		
			' <thead class="w3-dark-grey"> ' +
				' <tr> ';
			  
				for(var i in getCartTableLabel())
					content += '<th '+(i>3? 'class="w3-right-align"':'')+'>'+getCartTableLabel()[i]+'</th>';
				
				content += '' +
				' </tr> ' +
			' </thead> ' + 
			
			' <tbody id="cartItemContentBody" class="w3-bordered"> ';
			
			for(var i in cartItemsContent) {
				itemTags = cartItemsContent[i][0];
				quantity = cartItemsContent[i][1];		
				item = furnitures[itemTags[0]][getFurnitureObjName(itemTags[0], itemTags[1])][itemTags[2]];
				
				totalPrice = item.sale? getSalePrice(item.price, item.sale) : item.price;
				
				content += '' +	
				' <tr> ' +
					' <td><div class="w3-closebtn w3-hover-text-red" onclick="removeItemFromCart('+i+')">&times;</div></td> ' +
					' <td><img src="../res/images/products/'+item.image+'"></td> ' +
					' <td><div><a href="' + getProdInfoHTMLfile() + itemTags[0] + '_' + itemTags[1] + '_' + itemTags[2] + ' " class="w3-hover-text-red">'+item.prodName+'</a></div></td> ' +
					' <td> ' +
						' <span id="itemQuantityBox"> ' +
							' <input id="itemQuantityMinus" type="button" value="-" onclick="itemCartQuantityControl(-1, '+i+', '+item.stock+')"/> ' +
							' <input id="itemCartQuantity'+i+'" type="text" size="1" value="'+quantity+'" style="text-align: center;" readonly/> ' +
							' <input id="itemQuantityPlus" type="button" value="+" onclick="itemCartQuantityControl(+1, '+i+', '+item.stock+')"/> ' +
						' </span> ' +
					' </td> ' +    
					' <td style="text-align: right">'+getPesoFormat(item.price)+'</td> ' +
					' <td style="text-align: right">'+getPesoFormat(totalPrice)+'</td> ' +
					' <td style="text-align: right">'+getPesoFormat(totalPrice * quantity)+'</td> ' +
				' </tr> ';
				
				subTotalPrice += totalPrice * quantity;
			}
			
			content += '' +	
			' </tbody> ' +
		  
			' <tfoot class="w3-topbar border-theme-orange"> ' +
			   ' <tr style="font-weight: bold;"> ' +
				' <td></td> ' +		
				' <td></td> ' +		
				' <td></td> ' +		
				' <td></td> ' +		
				' <td></td> ' +		
				' <td class="w3-right">Subtotal:</td> ' +
				' <td id="cartItemsTotal" style="text-align: right; font-style: italic;">'+getPesoFormat(subTotalPrice)+'</td> ' +
			  ' </tr> ' +
			' </tfoot> ' +
			
			' </table> ' +
			' </div> ' +
		' <div class="w3-btn w3-large aekieBtn w3-ripple w3-margin-top" style="text-decoration: bold;" onclick="directToCheckout();">Checkout <i class="fa fa-arrow-right"></i></div> ';
		
		var cartSectionAreas = document.getElementsByClassName('cartSectionArea');
		for(var i in cartSectionAreas)
			cartSectionAreas[i].innerHTML = content;
		document.getElementById('itemCartQuantitySign').innerHTML = cartItemsContent.length;
		document.getElementById('small-itemCartQuantitySign').innerHTML = cartItemsContent.length;
	}
}

function addToCartDirect(tagData) {
	addToCart(tagData, 1);
}

function addToCart(tagData, quantity) {
	verifyItemToCart(tagData, quantity);
	
	updateCart();
	
	//	document.getElementById('cartBtn').click();
}

function addProdToCart(tagData) {
	addToCart(tagData, parseInt(document.getElementById("itemQuantityField").value));
}

function verifyItemToCart(tagData, quantity) {
	// This function verifies similar item to add within cart and manages prompted item quantity from stock quantity limit
	
	var cartItems;
	if(localStorage.cartItems == undefined) {
		cartItems = new Array();	
		cartItems.push([tagData, quantity]);
		
	} else {
		var itemTags, item, isMatch = false;
		cartItems = JSON.parse(localStorage.cartItems);
	
		for(var i in cartItems) {
			itemTags = cartItems[i][0];
			if(	itemTags[0]==tagData[0] &&
				itemTags[1]==tagData[1] &&
				itemTags[2]==tagData[2] ) 
				{
					item = furnitures[tagData[0]][getFurnitureObjName(tagData[0], tagData[1])][tagData[2]];
					var subQuantity = cartItems[i][1] + quantity;
					
					if(item.stock >= subQuantity) { 
						cartItems[i][1] += quantity;
						setMsgBarText("Successfully added to cart");
						
					} else setMsgBarText('Not enough to add within stock');
					
					isMatch = true;
					break;
				}
		}
		
		if(!isMatch)
			if(cartItems.length >= getCartItemsLimit()) setMsgBarText("Maximum of 5 items only allowed to add");
			else {
				cartItems.push([tagData, quantity]);
				setMsgBarText("Successfully added to cart");
			}
	}
	
	localStorage.cartItems = JSON.stringify(cartItems);	
}

function removeItemFromCart(cartItemIndx) {
	var cartItems = JSON.parse(localStorage.cartItems);
	
	removeFromArray(cartItems, cartItemIndx);
	localStorage.cartItems = JSON.stringify(cartItems);
	updateCart();
}

function setMsgBarText(text) {
	var msgBarSection = document.getElementById("msgBarSection");
	document.getElementById("msgBarText").innerHTML = text;
	msgBarSection.style.display = "block";
	setTimeout(function() { msgBarSection.style.display = "none"; }, 5000);
}

function setFeedbackModal() {
	var content = '' +
	' <div id="feedbackModal" class="w3-modal""> ' +
		' <div class="w3-modal-content w3-card-8 w3-animate-top"> ' +
			' <div class="w3-container w3-blue-grey"> ' +
			  ' <span class="w3-closebtn w3-xxlarge w3-hover-text-red" onclick="document.getElementById(&quot;feedbackModal&quot;).style.display = &quot;none&quot;">&times;</span> ' +
			  ' <h2>Feedback</h2> ' +
			' </div> ' +

			' <form id="feedbackForm" onsubmit="sendFeedback()" action="javascript:void(0)" class="w3-white w3-container w3-padding"> ' +
				' <div class="w3-row-padding w3-container w3-padding"> ' +
					
					  ' <div class="w3-half"> ' +
						' <input class="w3-input" type="text" maxlength="15" required> ' +
						' <label>Name</label> ' +
					  ' </div> ' +
					  
					  ' <div class="w3-half"> ' +
						' <input class="w3-input" type="email" required> ' +
						' <label>Email</label> ' +
					  ' </div> ' +

				' </div> ' +
				
				' <div class="w3-row-padding w3-container w3-padding"> ' +
					
					  ' <div class="w3-col"> ' +
						' <textarea class="w3-input w3-border" type="text" row="5" col="5" maxlength="150" style="resize: none;" required></textarea> ' +
						' <label>Comment</label> ' +
					  ' </div> ' +

				' </div> ' +
				
				' <div class="w3-margin w3-right"> ' +
					  ' <button class="w3-btn aekieBtn w3-ripple">Send</button> ' +						  
				' </div> ' +
				
			' </form> ' +
		' </div> ' +
	' </div> ';		
		
	document.getElementsByTagName('body')[0].innerHTML += content;
}

function sendFeedback() {
	setMsgBarText("Successfully sent your feedback");
	document.getElementById("feedbackModal").style.display = "none";
	document.getElementById("feedbackForm").reset();
}

function setUpInfo() {
	var opt = document.location.href.split("?opt=")[1];
	switch(opt) {
		case 'termsAndConditions': setInfo_TermsAndCond(); break;
		case 'aboutAekie': setInfo_AboutAekie(); break;
	}
}

//	localStorage.removeItem('cartItems');	
determineBrowserCompatibility();

//	Close modals when outer area is clicked
document.onclick = function(event) {
	var modals = document.getElementsByClassName('w3-modal');
	for(var i in modals)
		if (event.target == modals[i]) {
			modals[i].style.display = "none";
			break;
		}
}