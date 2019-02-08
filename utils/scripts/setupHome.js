var furnitures = getAllFurnitures(), categoryIndxs = getCategoryIndxs();

function setUpHotFeatsContent() {
	var content = '', item,
	indxData = categoryIndxs[3],
	hotFeatItemsIndxs = new Array(), catTag, furnTag, prodTag, prodColIndx;
	
	for(var i in indxData) 
		if(furnitures[categoryIndxs[0][i]][categoryIndxs[1][i].split(',')[0]][categoryIndxs[2][i]].onDisplay) hotFeatItemsIndxs.push(indxData[i]);
			
	shuffle(hotFeatItemsIndxs);
			
	var colData = getGridLayoutPlan(4, hotFeatItemsIndxs.length);
				
	for(var i in colData) {
	content += ' <div class="w3-quarter"> ';
	
		for(var j in colData[i]) {
			prodColIndx = hotFeatItemsIndxs[colData[i][j]];
			catTag = categoryIndxs[0][prodColIndx], furnTag = categoryIndxs[1][prodColIndx].split(','), prodTag = categoryIndxs[2][prodColIndx],
			item = furnitures[catTag][furnTag[0]][prodTag];
			origPrice = getPesoFormat(item.price);
											
			content += '' +
								' <div class="w3-card-8 itemBox"> ' +
								' <a href="' + getProdInfoHTMLfile() + catTag + '_' + furnTag[1] + '_' + prodTag + ' ">' +
									(item.stock? 
										' <div class="w3-btn w3-ripple w3-display-topleft theme-lime" onclick="addToCartDirect(['+catTag+', '+furnTag[1]+', '+prodTag+']); return false;"><i class="fa fa-cart-plus"></i></div> ' :
										' <div class="w3-tag w3-display-topleft w3-large w3-black">Out of stock</div> '
									) +
									(item.sale? '<div class="w3-badge w3-display-topright w3-yellow w3-xlarge">'+getSaleFormat(item.sale)+'</div>':'') + 
									' <img src="./res/images/products/'+item.image+'"> ' +
									' <div class="w3-container"> ' +
										' <p>'+item.prodName+'</p> ' +
										' <p>' +
											(item.sale? '<span class="price">'+getPesoFormat(getSalePrice(item.price, item.sale))+'</span>' + 
												'<del class="oldPrice w3-text-light-blue">'+origPrice+'</del>' :
											' <span class="price">'+origPrice+'</span> ') +
										' </p>' +
									' </div> ' +
								' </a> ' +
								' </div>';
		}
		
		content += ' </div> ';
	}				
	
	document.getElementById("hotFeatsContent").innerHTML = content;
}

function setUpOnSaleContent() {
	var content = '', item, saleItemsIndxs = new Array(),
	indxData = categoryIndxs[3], catTag, furnTag, prodTag, prodIndx;
	
	for(var i in indxData) 
		if(furnitures[categoryIndxs[0][i]][categoryIndxs[1][i].split(',')[0]][categoryIndxs[2][i]].sale) saleItemsIndxs.push(indxData[i]);
	
	shuffle(saleItemsIndxs);
	
	for(var i in saleItemsIndxs) {
		prodIndx = saleItemsIndxs[i];
		catTag = categoryIndxs[0][prodIndx], furnTag = categoryIndxs[1][prodIndx].split(','), prodTag = categoryIndxs[2][prodIndx],
		item = furnitures[catTag][furnTag[0]][prodTag];
		
		content += '' +
		' <div class="w3-card-8 itemBox"> ' +
		' <a href="' + getProdInfoHTMLfile() + catTag + '_' + furnTag[1] + '_' + prodTag + ' ">' +
			(item.stock? 
				' <div class="w3-btn w3-ripple w3-display-topleft w3-large theme-lime" onclick="addToCartDirect(['+catTag+', '+furnTag[1]+', '+prodTag+']); return false;"><i class="fa fa-cart-plus"></i></div> ' :
				' <div class="w3-tag w3-display-topleft w3-large w3-black">Out of stock</div> '
			) +
			' <div class="w3-badge w3-display-topright w3-yellow w3-xxlarge">'+getSaleFormat(item.sale)+'</div>' + 
			' <img src="./res/images/products/'+item.image+'"> ' +
			' <div class="w3-container"> ' +
				' <p>'+item.prodName+'</p> ' +
				' <p>' +
					' <span class="price">'+getPesoFormat(getSalePrice(item.price, item.sale))+'</span> ' + 
					' <del class="oldPrice w3-text-light-blue">'+getPesoFormat(item.price)+'</del> ' +
				' </p>' +
			' </div> ' +
		' </a> ' +
		' </div>';			
	}
	
	document.getElementById("onSaleContent").innerHTML = content;
}

function setUpTopSellerContent() {
   var content = '', item, topSellerItemsIndxs = new Array(),
   indxData = categoryIndxs[3], catTag, furnTag, prodTag, prodIndx;
	
	for(var i in indxData) 
		if(furnitures[categoryIndxs[0][i]][categoryIndxs[1][i].split(',')[0]][categoryIndxs[2][i]].purchases > getTopSellingAmount()) topSellerItemsIndxs.push(indxData[i]);
	
	shuffle(topSellerItemsIndxs);	   
   
	for(var i in topSellerItemsIndxs) {
		prodIndx = topSellerItemsIndxs[i];
		catTag = categoryIndxs[0][prodIndx], furnTag = categoryIndxs[1][prodIndx].split(','), prodTag = categoryIndxs[2][prodIndx],
		item = furnitures[catTag][furnTag[0]][prodTag];
		origPrice = getPesoFormat(item.price);

		content += '' +
			' <div class="w3-card-8 w3-animate-opacity itemBox tsSlide"> ' +
			' <a href="' + getProdInfoHTMLfile() + catTag + '_' + furnTag[1] + '_' + prodTag + ' ">' +
				(item.stock? 
					' <div class="w3-btn w3-ripple w3-display-topleft w3-large theme-lime" onclick="addToCartDirect(['+catTag+', '+furnTag[1]+', '+prodTag+']); return false;"><i class="fa fa-cart-plus"></i></div> ' :
					' <div class="w3-tag w3-display-topleft w3-large w3-black">Out of stock</div> '
				) +
					(item.sale? '<div class="w3-badge w3-display-topright w3-yellow w3-xxlarge">'+getSaleFormat(item.sale)+'</div>':'') + 
					' <img src="./res/images/products/'+item.image+'"> ' +
					' <div class="w3-container"> ' +
						' <p class="prodName">'+item.prodName+'</p> ' +
						' <p>' +
						(item.sale? '<span class="price">'+getPesoFormat(getSalePrice(item.price, item.sale))+'</span>' + 
							'<del class="oldPrice w3-text-light-blue">'+origPrice+'</del>' :
						' <span class="price">'+origPrice+'</span> ') +
						' </p>' +
					' </div> ' +
			' </a> ' +
			' </div>';	
		}
	
	document.getElementById("topSellersContent").innerHTML = content;
}

function setUpNewReleaseContent() {
  var content = '', item, newReleaseItemsIndxs = new Array(),
  indxData = categoryIndxs[3], catTag, furnTag, prodTag, prodIndx;
	
	for(var i in indxData) 
		if(furnitures[categoryIndxs[0][i]][categoryIndxs[1][i].split(',')[0]][categoryIndxs[2][i]].newRelease) newReleaseItemsIndxs.push(indxData[i]);
	
	var firstTopSellerItemName = document.getElementsByClassName('prodName')[0].innerHTML;
	
	shuffle(newReleaseItemsIndxs);
	while(newReleaseItemsIndxs[0].prodName == firstTopSellerItemName) shuffle(newReleaseItemsIndxs);   

	for(var i in newReleaseItemsIndxs) {
		prodIndx = newReleaseItemsIndxs[i];
		catTag = categoryIndxs[0][prodIndx], furnTag = categoryIndxs[1][prodIndx].split(','), prodTag = categoryIndxs[2][prodIndx],
		item = furnitures[catTag][furnTag[0]][prodTag];
		origPrice = getPesoFormat(item.price);
		
		content += '' +
			' <div class="w3-card-8 w3-animate-opacity itemBox nrSlide"> ' +
			' <a href="' + getProdInfoHTMLfile() + catTag + '_' + furnTag[1] + '_' + prodTag + ' ">' +
				(item.stock? 
					' <div class="w3-btn w3-ripple w3-display-topleft w3-large theme-lime" onclick="addToCartDirect(['+catTag+', '+furnTag[1]+', '+prodTag+']); return false;"><i class="fa fa-cart-plus"></i></div> ' :
					' <div class="w3-tag w3-display-topleft w3-large w3-black">Out of stock</div> '
				) +
					(item.sale? '<div class="w3-badge w3-display-topright w3-yellow w3-xxlarge">'+getSaleFormat(item.sale)+'</div>':'') + 
					' <img src="./res/images/products/'+item.image+'"> ' +
					' <div class="w3-container"> ' +
						' <p>'+item.prodName+'</p> ' +
						' <p>' +
						(item.sale? '<span class="price">'+getPesoFormat(getSalePrice(item.price, item.sale))+'</span>' + 
							'<del class="oldPrice w3-text-light-blue">'+origPrice+'</del>' :
						' <span class="price">'+origPrice+'</span> ') +
						' </p>' +
					' </div> ' +
			' </a> ' +
			' </div>';	
		}
	
	document.getElementById("newReleasesContent").innerHTML = content;
}

function setUpHomeContents() {
	setUpHotFeatsContent();
	setUpOnSaleContent();
	setUpTopSellerContent();
	setUpNewReleaseContent();
}