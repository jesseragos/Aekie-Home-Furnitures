var currencyDF = new DecimalFormat("#,#00.00");

function getPesoFormat(amount) {
	return "&#8369;" + currencyDF.format(amount);
}

/*function getPriceIn2DP(price) {
	return parseFloat(Math.round(price * 100) / 100).toFixed(2);
}*/

function getSalePrice(origPrice, saleAmount) {
	return origPrice - (saleAmount/100 * origPrice)
}

function getSaleFormat(sale) {
	return '-'+sale+'%';
}

function getRentPrice(price) {
	return getSalePrice(price, getRentDiscountAmount());
}

function shuffle(arrList) {
	var rand, temp, size;
	for(size=arrList.length; size; size--) {
		rand = Math.floor(Math.random() * size);
		temp = arrList[size-1];
		arrList[size-1] = arrList[rand];
		arrList[rand] = temp;
	}
	
	return arrList;
}

function getArrayInIndxs(arrList) {
	var arrIndxs = new Array();	
	for(var i in arrList) arrIndxs.push(i);
	
	return arrIndxs;
}

function removeFromArray(arr, indx) {
	if (indx > -1) arr.splice(indx, 1);
}