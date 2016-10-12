/* ========== JAVASCRIPT ========== */

/* ===== Подключение функций ===== */

document.addEventListener("DOMContentLoaded", mainMenuArrows); //Стрелочки главного меню
document.addEventListener("DOMContentLoaded", unitTopSlidePanel); //Выдвижная панель в блоке unit_top

/* =============================== */

/* Стрелочки главного меню */

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

/* ======================= */

/* Выдвижная панель в блоке unit_top */

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
	} else {
		shadow.style.display = "";
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

	window.onresize = function() {
		inner.oldHeight = parseInt(getComputedStyle(inner).height);
		inner.style.maxHeight = "initial";
		inner.newHeight = parseInt(getComputedStyle(inner).height);
		inner.resHeight = inner.oldHeight - inner.newHeight;

		if (inner.resHeight >= 0) {
			shadow.style.display = "none";
		} else {
			shadow.style.display = "";
		}

		inner.style.maxHeight = "";
	}
}


/* ========== JQUERY ========== */

$(document).ready(function(){

	/* Слайдер на главной */

	$(".owl").owlCarousel({
		items: 1,
		navigation: false,
		autoplay: false,
		autoplayTimeout: 10000,
		autoplayHoverPause: true,
		loop: true,
		dotsClass: 'owl__dots',
		dotClass: "owl__dot"
	});

	/* ================== */

	/* Верхний поиск */

	$(".header_top__search_btn").click(showTopSearch);
	$(".header_main__lens").click(showTopSearch);
	
	var $initialHeight = 65; //Начальная высота шапки (задавать вручную)
	var $mobile = null; //Индикатор пересечения брейк-поинтов
	var $speed = 400; //Скорость анимации
	var $triangle = $(".header_top__search_triangle"); //Треугольник кнопки поиска
	var break1 = 767; //Брейкпоинт 1 (с мобильника на планшет)
	var break2 = 1076; //Брейкпоинт 2 (с планшета на ПК)

	function showTopSearch() {

		var $contHeight = parseInt($(".header_top").css("height"));
		var $height = parseInt($(".search").css("height")) + $contHeight;


		if ($contHeight <= $initialHeight) {

			if (window.innerWidth <= break1) {
				$mobile = 1
			} else if (window.innerWidth < break2){
				$mobile = 2;
			} else {
				$mobile = 3;
			}

			$(".header_top").animate({height: $height}, $speed);
			$(".search").show($speed);
			$(".search__input").focus();

			if (window.innerWidth > break1) {
				$triangle.animate({
					borderWidth: "30px 20px"
				}, $speed);

				if (window.innerWidth < break2) {
					$(".header_main__logo").animate({
						"top": $height - $contHeight
					}, $speed);
				}
			}
		}

		if ($contHeight > $initialHeight) {
			var $h = $initialHeight;
			if ($mobile == 1) {
				$h = 0;
			}

			$(".header_top").animate({height: $h}, $speed);

			$(".search").hide($speed);
			if ((window.innerWidth > break1) && (window.innerWidth < break2)) {
				$(".header_main__logo").animate({
					"top": 0
				}, $speed);
			}

			$triangle.animate({
				borderWidth: "60px 20px 0"
			}, $speed);

			setTimeout(function() {
				$(".header_top").attr("style", "");
			}, $speed + 50);

			$mobile = 0;
		}

		$(".header_top__lens").toggleClass("glyphicon-search glyphicon-remove");
	}

	$(window).resize(function() {
		var $contHeight = parseInt($(".header_top").css("height"));
		var $height = parseInt($(".search").css("height")) + $contHeight;

		if ($mobile == 1) {
			if (window.innerWidth > break1) {
				//Выход из 1
				$(".header_main__logo").css("top", $height - $contHeight);
				var $contHeight = parseInt($(".header_top").css("height")) + $initialHeight;
				$(".header_top").css("height", $contHeight);
				$triangle.css("border-width", "30px 20px");
				$mobile = 2;
			}
		}

		if ($mobile == 2) {
			if (window.innerWidth <= break1) {
				//Выход из 2 налево
				$(".header_main__logo").css("top", "");
				$contHeight = parseInt($(".header_top").css("height")) - $initialHeight;
				$(".header_top").css("height", $contHeight);
				$triangle.css("border-width", "60px 30px");
				$mobile = 1;
			}

			if (window.innerWidth >= break2) {
				//Выход из 2 направо
				$(".header_main__logo").css("top", "");
				$mobile = 3;
			}
		}

		if ($mobile == 3) {
			if (window.innerWidth < break2) {
				//Выход из 3
				$(".header_main__logo").css("top", $height - $contHeight);
				$mobile = 2;
			}
		}
	});

	/* ============= */

	/* Делание ссылок в главном меню с подпунктами - кликабельными на ПК */

	var $windowSize = window.innerWidth;
	if ($windowSize > break1){
		$(".header_main__link[data-toggle]").attr("data-toggle", "");
	} else {
		$(".header_main__link[data-toggle]").attr("data-toggle", "dropdown");
	}

	$(window).resize(function() {
		if (window.innerWidth <= break1) {
			$(".header_main__link[data-toggle]").attr("data-toggle", "dropdown");
		} else {
			$(".header_main__link[data-toggle]").attr("data-toggle", "");
		}
	})

	/* =================================================================== */

	/* Воспроизведение видео во всплывающем окне */

	$('.popup__play').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	/* ========================================= */

});