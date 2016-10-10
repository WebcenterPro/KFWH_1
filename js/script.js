/* ===== JavaScript ===== */

document.addEventListener("DOMContentLoaded", ready);

function ready() {

	/* Стрелочки главного меню */
	var items = document.querySelector(".header_main__items");
	var listComp = getComputedStyle(items);

	items.onclick = function(event) {
		var target = event.target;
		if (listComp.display != "block") return;
		if ((target.parentNode.childNodes.length == 3) &&
			(!target.classList.contains("glyphicon"))) return;
		
		var glyph = target;
		
		if (glyph.classList.contains("glyphicon")){
			target = target.parentNode;
		}
		
		target.classList.add("header_main__active");
		var arrow = document.querySelector(".header_main__active .header_main__arrow_down");
		arrow.classList.toggle("glyphicon-chevron-down");
		arrow.classList.toggle("glyphicon-chevron-up");
		target.classList.remove("header_main__active");
	}

}


/* ===== JQUERY ===== */

/* Слайдер на главной */
$(document).ready(function(){
	$(".owl").owlCarousel({
		items: 1,
		navigation: false,
		autoplay: true,
		autoplayTimeout: 10000,
		autoplayHoverPause: true,
		loop: true,
		dotsClass: 'owl__dots',
		dotClass: "owl__dot"
	});
});