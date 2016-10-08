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
/* ================== */