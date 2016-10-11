/* ===== JAVASCRIPT ===== */

document.addEventListener("DOMContentLoaded", ready);

function ready() {

	/* Стрелочки главного меню */

	document.querySelector(".header_main__items").onclick = function(event) {

		var glyph = document.querySelector(".header_main__item.open .header_main__link .glyphicon");
		if (glyph) {
			glyph.classList.add("glyphicon-chevron-down");
			glyph.classList.remove("glyphicon-chevron-up");
			glyph.removeAttribute("data-active");

			//alert("Закрывается");
		} else {
			setTimeout(function() {
				glyph = document.querySelector(".header_main__item.open .header_main__link .glyphicon");
				if (!glyph) return;
				glyph.classList.remove("glyphicon-chevron-down");
				glyph.classList.add("glyphicon-chevron-up");
				glyph.setAttribute("data-active", "true");
				//alert("Открывается");
			}, 0);

		}

		var lastItem = event.target;
	}

	/* ======================= */

	/* Выезжающая текстовая панель в блоке UNIT_TOP */

	var inner = null;
	var parent = null;
	var arrow = null;
	var count = 0;

	var shadow = document.querySelector(".unit_top__shadow");

	inner = document.querySelector(".unit_top__inner--wide");
	inner.oldHeight = parseInt(getComputedStyle(inner).height);
	inner.style.maxHeight = "initial";
	inner.newHeight = parseInt(getComputedStyle(inner).height);
	inner.resHeight = inner.oldHeight - inner.newHeight;

	if (inner.resHeight >= 0) {
		shadow.style.display = "none";
	}

	inner.style.maxHeight = "";

	document.querySelector(".unit_top__content--wide").onmouseenter = function(event) {

		if (window.innerWidth < 992) return;
		if (inner.resHeight >= 0) return;

		inner.oldHeight = parseInt(getComputedStyle(inner).height);
		inner.style.maxHeight = "initial";
		inner.newHeight = parseInt(getComputedStyle(inner).height);
		inner.resHeight = inner.oldHeight - inner.newHeight;

		var target = event.target;

		inner.style.maxHeight = "initial";

		var timeout = setInterval(function() {
			target.style.transform = "translateY(" + count + "px)";
			if (count <= inner.resHeight) {
				count = inner.resHeight;
				clearInterval(timeout);
			}
			count = count - 3;
			if (arrow.classList.contains("glyphicon-chevron-down")) {
				target.style.transform = "translateY(0px)";
				clearInterval(timeout);
			}
		}, 4);

		parent = target.parentElement;
		parent.height = parseInt(getComputedStyle(parent).height);
		parent.style.height = (parent.height + inner.resHeight) + "px";

		arrow = inner.querySelector(".unit_top__arrow");
		arrow.classList.remove("glyphicon-chevron-down");
		arrow.classList.add("glyphicon-chevron-up");
	}

	document.querySelector(".unit_top__content--wide").onmouseleave = function(event) {

		if (window.innerWidth < 992) return;
		if (inner.resHeight >= 0) return;

		var target = event.target;
		var timeout = setInterval(function() {
			target.style.transform = "translateY(" + count + "px)";
			if (count >= 0) {
				count = 0;
				clearInterval(timeout);
			}
			count = count + 3;
			if (arrow.classList.contains("glyphicon-chevron-up")) {
				target.style.transform = "translateY(" + inner.resHeight + "px)";
				clearInterval(timeout);
			}
		}, 4);

		inner.style.maxHeight = "";
		parent.style.height = "";
		arrow.classList.remove("glyphicon-chevron-up");
		arrow.classList.add("glyphicon-chevron-down");
	}

	/* ============================================ */

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