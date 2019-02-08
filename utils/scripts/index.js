var currentMainSlide = 1, currentTsSlide = 1, currentNrSlide = 1,
    slidesAmount = 15, slideDuration = 5000;

setUpStartNavBar();
setUpConfig();

setUpHomeContents();

tsSlideShow_shift(0);
nrSlideShow_shift(0);
mainSlideShow_carousel();

setUpFooter();
			
			
// Main Slideshow

function mainSlideShow_carousel() {
if (currentMainSlide > slidesAmount) currentMainSlide = 1;

var homeView = document.getElementById("homeView");
homeView.style.backgroundImage = "url(./res/images/homeSlideShow/main_ss" + currentMainSlide + ".jpg)";
currentMainSlide++;
setTimeout(mainSlideShow_carousel, slideDuration);
}

// TopSeller Slideshow Controller

function tsSlideShow_shift(indx) {
    var tsSlides = document.getElementsByClassName("tsSlide");
    currentTsSlide += indx;

    if (currentTsSlide > tsSlides.length) currentTsSlide = 1;
    else if (currentTsSlide < 1) currentTsSlide = tsSlides.length;

    for (var i = 0; i < tsSlides.length; i++)
        tsSlides[i].style.display = "none";

    tsSlides[currentTsSlide - 1].style.display = "block";
}

// NewRelease Slideshow Controller

    function nrSlideShow_shift(indx) {
        var nrSlides = document.getElementsByClassName("nrSlide");
        currentNrSlide += indx;

        if (currentNrSlide > nrSlides.length) currentNrSlide = 1;
        else if (currentNrSlide < 1) currentNrSlide = nrSlides.length;

        for (var i = 0; i < nrSlides.length; i++)
            nrSlides[i].style.display = "none";

        nrSlides[currentNrSlide - 1].style.display = "block";
    }

/*function scrollItemRow(idName, direction) {
    document.getElementById(idName).scrollLeft += direction * 600;
}*/

var elem, offset = 600, scrollAmount = 6, time = 5;
function scrollLeftSmooth(elemId, direction) {
    elem = document.getElementById(elemId);

    var distanceLength = elem.scrollLeft + offset * direction,
        maxLength = elem.scrollWidth - elem.clientWidth;

    var scroller = setInterval(direction == 1 ? leftScroller : rightScroller, time);

    function leftScroller() {
        if (elem.scrollLeft < distanceLength && elem.scrollLeft < maxLength)
            elem.scrollLeft += scrollAmount;
        else clearInterval(scroller);
    }

    function rightScroller() {
        if (elem.scrollLeft > distanceLength && elem.scrollLeft > 0)
            elem.scrollLeft -= scrollAmount;
        else clearInterval(scroller);
    }
}