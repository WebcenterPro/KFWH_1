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

	document.querySelector(".unit_top__content--wide").onmouseenter = function(event) {

		var target = event.target;
		inner = target.children[0];

		inner.oldHeight = parseInt(getComputedStyle(inner).height);
		inner.style.maxHeight = "initial";
		inner.newHeight = parseInt(getComputedStyle(inner).height);

		if (inner.oldHeight >= inner.newHeight) {
			inner.style.maxHeight = "";
			return;
		}

		inner.resHeight = inner.oldHeight - inner.newHeight;
		target.style.transform = "translateY(" + inner.resHeight + "px)";

		parent = target.parentElement;
		parent.height = parseInt(getComputedStyle(parent).height);
		parent.style.height = (parent.height + inner.resHeight) + "px";

		arrow = inner.lastElementChild;
		arrow.classList.remove("glyphicon-chevron-down");
		arrow.classList.add("glyphicon-chevron-up");
	}

	document.querySelector(".unit_top__content--wide").onmouseleave = function(event) {
		var target = event.target;
		inner.style.maxHeight = "";
		target.style.transform = "";
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