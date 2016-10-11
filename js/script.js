/* ===== JAVASCRIPT ===== */

/* ===== Подключение функций ===== */

document.addEventListener("DOMContentLoaded", mainMenuArrows); //Стрелочки главного меню
document.addEventListener("DOMContentLoaded", unitTopSlidePanel); //Выдвижная панель в блоке unit_top

/* =============================== */

function mainMenuArrows() {

	var items = document.querySelector(".header_main__items");

	document.onclick = function(event) {
		if (window.innerWidth > 991) return;

		var glyphs = items.querySelectorAll(".header_main__arrow_down.glyphicon-chevron-up");
		for (var i = 0; i < glyphs.length; i++) {
			glyphs[i].classList.add("glyphicon-chevron-down");
			glyphs[i].classList.remove("glyphicon-chevron-up");
		}

		target = event.target;

		while (target != items) {
			if (target.nodeName == "HTML") break;
			if (target.classList.contains("header_main__item")) break;
			target = target.parentElement;
		}

		if (!target.classList.contains("header_main__item")) return;

		setTimeout(function() {

			if (target.classList.contains("open")) {
				var glyph = target.querySelector(".header_main__arrow_down");
				glyph.classList.remove("glyphicon-chevron-down");
				glyph.classList.add("glyphicon-chevron-up");
			}
		}, 0);
	}
}

function unitTopSlidePanel() {

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