var indexHTMLfile = "./index.html", 
	catListHTMLfile = "./category.html?optcatlistdata=", 
	prodInfoHTMLfile = "./productInfo.html?prodinfodata=",
	searchResultHTMLfile = "./searchResults.html?search=",
	billingHTMLfile = './billing.html',
	rentHTMLfile = './rent.html',
	infoHTMLfile = './info.html';

var categories = getCategoriesData().category;
var cityScopes = ["Malabon", "Quezon City", "Manila", "Taguig", "Pasay", "Makati", "Caloocan"],
paymentMethods = ["Cash in-home", "Cash in-store", "Cheque"];

var cartTableLabel = ["", "", "Product Name", "Quantity", "Original Price", "Current Price", "Total"],
		rentCartTableLabel = ["", "", "Product Name", "Quantity", "Rent Price", "Total"],
		cartItemsLimit = 5,
		topSellingAmount = 10,
		deliveryCharge = 100,
		rentDiscount = 88,
		rentDaysLimit = 10,
		rentPricePerDay = 250;
		
var socialNets = { socialNets: 
		[
			{title:"Facebook", icon:"fa fa-facebook", hoverColor:"w3-hover-blue"},
			{title:"Twitter", icon:"fa fa-twitter", hoverColor:"w3-hover-aqua"},
			{title:"Instagram", icon:"fa fa-instagram", hoverColor:"w3-hover-indigo"},
			{title:"Pinterest", icon:"fa fa-pinterest", hoverColor:"w3-hover-red"}
		] 
	};

function getIndexHTMLfile() {
	return indexHTMLfile;
}

function getCatListHTMLfile() {
	return catListHTMLfile;
}

function getProdInfoHTMLfile() {
	return prodInfoHTMLfile;
}

function getSearchResultHTMLfile() {
	return searchResultHTMLfile;
}

function getBillingHTMLfile() {
	return billingHTMLfile;
}

function getRentHTMLfile() {
	return rentHTMLfile;
}

function getCategories() {
	return categories;
}

function getCartTableLabel() {
	return cartTableLabel;
}

function getRentCartTableLabel() {
	return rentCartTableLabel;
}

function getCartItemsLimit() {
	return cartItemsLimit;
}

function getTopSellingAmount() {
	return topSellingAmount;
}

function getRentDiscountAmount() {
	return rentDiscount;
}

function getRentDaysLimit() {
	return rentDaysLimit;
}

function getRentPricePerDay() {
	return rentPricePerDay;
}

function getDeliveryCharge() {
	return deliveryCharge;
}

function getInfoHTMLfile() {
	return infoHTMLfile;
}

function getCityScopes() {
	return cityScopes;
}

function getPaymentMethods() {
	return paymentMethods;
}

function getSocialNets() {
	return socialNets.socialNets;
}