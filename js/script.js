/* ========== JAVASCRIPT ========== */

/* Стрелочки главного меню */

document.addEventListener("click", mainMenuArrows);

function mainMenuArrows() {

	var items = document.querySelector(".header_main__items");
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

/* ======================= */

/* Выдвижная панель в блоке unit_top */

document.addEventListener("DOMContentLoaded", unitTopSlidePanel);

function unitTopSlidePanel() {

	var inner = document.querySelector(".unit_top__inner--wide");

	if (!inner) return;

	var parent = null;
	var arrow = null;
	var count = 0;

	var shadow = document.querySelector(".unit_top__shadow");

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

	window.addEventListener("resize", unitTopSlidePanelResize); //Фикс при изменении ширины окна

	function unitTopSlidePanelResize() {
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

/* ================================= */

/* Карта */

function initMap() {
	var customMapType = new google.maps.StyledMapType([

		{"elementType": "geometry", "stylers": [{"color": "#f5f5f5"} ] },
		{"elementType": "labels.icon", "stylers": [{"visibility": "off"} ] },
		{"elementType": "labels.text.fill", "stylers": [{"color": "#616161"} ] },
		{"elementType": "labels.text.stroke", "stylers": [{"color": "#f5f5f5"} ] },
		{"featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [{"visibility": "off"} ] },
		{"featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{"color": "#bdbdbd"} ] },
		{"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#eeeeee"} ] },
		{"featureType": "poi", "elementType": "labels.text", "stylers": [{"visibility": "off"} ] },
		{"featureType": "poi", "elementType": "labels.text.fill", "stylers": [{"color": "#757575"} ] },
		{"featureType": "poi.business", "stylers": [{"visibility": "off"} ] },
		{"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#e5e5e5"} ] },
		{"featureType": "poi.park", "elementType": "labels.text", "stylers": [{"visibility": "off"} ] },
		{"featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"} ] },
		{"featureType": "road", "elementType": "geometry", "stylers": [{"color": "#ffffff"} ] },
		{"featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#fa2449"} ] },
		{"featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{"color": "#757575"} ] },
		{"featureType": "road.highway", "elementType": "geometry", "stylers": [{"color": "#dadada"} ] },
		{"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#fa2449"} ] },
		{"featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{"color": "#616161"} ] },
		{"featureType": "road.local", "elementType": "labels", "stylers": [{"visibility": "off"} ] },
		{"featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"} ] }, {"featureType": "transit.line", "elementType": "geometry", "stylers": [{"color": "#e5e5e5"} ] },
		{"featureType": "transit.station", "elementType": "geometry", "stylers": [{"color": "#eeeeee"} ] },
		{"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#c9c9c9"} ] },
		{"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"} ] }

	], {
		name: 'Custom Style'
	});

	var customMapTypeId = 'custom_style';
	var warehouse = {lat: 59.740616, lng: 30.526411};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: warehouse,
		scrollwheel: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
		}
	});

	map.mapTypes.set(customMapTypeId, customMapType);
	map.setMapTypeId(customMapTypeId);

	var contentString = '<div id="content">'+
	'<div id="siteNotice">'+
	'</div>'+
	'<h1 class="map__header">Складской комплекс "АКМ Логистик 2"</h1>'+
	'<div>'+
	'<h4 class="map__descr">Поселок Шушары, на первой линии Московского ш.</h4>'+
	'<p>К аренде представлено встроенное складское помещение в логистическом комплексе «АКМ Лоджистик 2» класса «А», расположенное  '+
	'в пос. Шушары, на первой линии Московского ш., в 4 км от КАД.</p>'+
	'</div>'+
	'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 270
	});

	var image = 'img/beachflag.png';

	var marker1 = new google.maps.Marker({
		position: warehouse,
		map: map,
		icon: image,
		title: 'Склад',
		id: 'markerCard-1'
	});

	var lastWindowSize = window.innerWidth;
	var $cont = $(".map__outer");
	var $map = $(".map");

	/* Клик по маркеру */
	marker1.addListener('click', function() {
		lastWindowSize = window.innerWidth;
		infowindow.open(map, marker1);

		if ($("#currentMapItem")) {
			$("#currentMapItem").remove();
		}
		var $card = $("#card-1").clone();
		$card
		.removeClass("card col-md-4 col-sm-6")
		.addClass("col-sm-5 col-md-4")
		.attr("id", "currentMapItem")
		.css("opacity", 0)
		;
		
		if (window.innerWidth > 767) {
			$map.css("display", "flex");

			$cont.css({
				"height": "initial",
				"border-right": "1px solid #e0e0e0"
			})
			.removeClass("col-sm-12")
			.addClass("col-sm-7 col-md-8");
		}
		$map.append($card);
		$card.animate({
			"opacity": 1
		}, 700);

		if ($(".map__close").css("display") == "none") {
			$(".map__close").show(200);
		}
	});

	/* Изменение ширины окна при открытой карточке */
	$(window).on("resize", function() {
		if (!$("#currentMapItem").html()) return;

		if ((lastWindowSize > 767) && (window.innerWidth <= 767)) {
			$map.css("display", "");

			$cont.css({
				"height": "",
				"border-right": ""
			})
			.removeClass("col-sm-7 col-md-8")
			.addClass("col-sm-12");
			
			lastWindowSize = window.innerWidth;
		}

		if ((lastWindowSize <= 767) && (window.innerWidth > 767)) {
			$map.css("display", "flex");

			$cont.css({
				"height": "initial",
				"border-right": "1px solid #e0e0e0"
			})
			.removeClass("col-sm-12")
			.addClass("col-sm-7 col-md-8");

			lastWindowSize = window.innerWidth;
		}

	});

	/* Клик по кнопке "Закрыть" */
	$(".map__close").on("click", function(e) {
		$("#currentMapItem").animate({
			"opacity": 0
		}, 700, function() {
			$("#currentMapItem").remove();
			$map.css("display", "");
			$cont.css({
				"height": "",
				"border": ""
			})
			.removeClass("col-sm-7 col-md-8")
			.addClass("col-sm-12");
		});
		$(".map__close").hide(200);
	});

}

/* ===== */


/* ========== JQUERY ========== */

$(function(){

	/* Слайдер на главной */

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
					borderWidth: "0 20px 30px",
					top: "-29px"
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
				borderWidth: "0 20px",
				top: "0"
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
				$triangle.css("border-width", "0 20px 30px");
				$triangle.css("top", "-29px");
				$mobile = 2;
			}
		}

		if ($mobile == 2) {
			if (window.innerWidth <= break1) {
				//Выход из 2 налево
				$(".header_main__logo").css("top", "");
				$contHeight = parseInt($(".header_top").css("height")) - $initialHeight;
				$(".header_top").css("height", $contHeight);
				$triangle.css("border-width", "0 20px");
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

	$(document).on("click", function() {
		var $contHeight = parseInt($(".header_top").css("height"));
		if ($contHeight <= $initialHeight) return;

		var target = event.target;
		while (target.tagName != "HTML") {
			if ((target.classList.contains("header_top")) ||
				 (target.classList.contains("modal")) ||
				 (target.classList.contains("header_main__lens"))) return;
			target = target.parentNode;
		}

		showTopSearch();
	})

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

	/* Magnific Popup (для видео) */
	$('.popup__play').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'popup__fog',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	/* Сопроводительное письмо в отзывах */
	$('.recall__rec').magnificPopup({
		type: 'image',
		mainClass: 'popup__fog',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	/* ============== */

	/* Анимация гамбургера */

	var $toggle = $(".header_main__toggle");
	var isWorking = false;
	$toggle.click(headerToggleAnimation);

	function headerToggleAnimation() {
		if (isWorking) return;

		var $line1 = $(".header_main__toggle_line:nth-child(2)");
		var $line2 = $(".header_main__toggle_line:nth-child(3)");
		var $line3 = $(".header_main__toggle_line:nth-child(4)");

		$line1.css("transformOrigin", "100% 50%");
		$line3.css("transformOrigin", "100% 50%");

		if ($toggle.hasClass("collapsed")) {
			$line2.css("opacity", 0);
			$line1.css("transform", "rotate(-45deg) translateX(-3px) translateY(-5px)");
			$line3.css("transform", "rotate(45deg) translateX(-3px) translateY(5px)");
		} else {
			$line2.css("opacity", 1);
			$line1.css("transform", "");
			$line3.css("transform", "");
		}

		isWorking = true;
		setTimeout(function() {
			isWorking = false;
		}, 350);
	}

	/* =================== */

	/* Закрытие всплывающего меню в шапке при увеличении ширины экрана */

	var $windowSizeArrows = window.innerWidth;
	$(window).on("resize", function() {
		if ((window.innerWidth > break1) && 
		    ($windowSizeArrows <= break1)) {
			$(".header_main__item.open").removeClass("open");
			var $toggle = $(".header_main__toggle");
			if (!$toggle.hasClass("collapsed")) {
				headerToggleAnimation();
				$(".header_main .navbar-collapse").collapse("hide");
			}
		}
		$windowSizeArrows = window.innerWidth;
	});

	/* =============================================================== */

	/* Автофокус при открытии модального окна */

	$('.modal').on('shown.bs.modal', function() {
		$(this).find('input:first').focus();
	});
	
	/* ====================================== */

	/* Отметка звёздочек в карточках */

	$(".main__cont").on("click", ".card__shortlist", function() {
		$(this).toggleClass("card__shortlist--selected");
	});

	$(".main__cont").on("click", ".card__compare", function() {
		$(this).toggleClass("card__compare--selected");
	});
	
	/* ============================= */

	/* Всплывающие подсказки в карточках */

	$('.card__shortlist').tooltip({"title": "Избранное"});
	$('.card__compare').tooltip({"title": "Сравнения"});

	/* ================================= */

	/* Работа переключателей внутри блока .main_topic */

	$(".main_topic").on("click", ".main_topic__link", function() {

		if (this.parentNode.getAttribute("id") == "mainTopicCatalog") {
			if (this.classList.contains("main_topic__link--active")) return;
			$("#mainTopicCatalog .main_topic__link").toggleClass("main_topic__link--active");
			$("#cards").toggle();
			$(".map").toggle();
		}

		if (this.parentNode.getAttribute("id") == "compareChar") {
			if (this.classList.contains("main_topic__link--active")) return;
			$("#compareChar .main_topic__link").toggleClass("main_topic__link--active");
		}

		if (this.parentNode.getAttribute("id") == "compareParam") {
			$("#compareParam .main_topic__link").toggleClass("main_topic__link--active");
			$("#compareParamBody").slideToggle(300);
		}

		if (this.parentNode.getAttribute("id") == "compareClear") {
			$("#compareClear .main_topic__link").hide();
		}
	});
	
	/* ===================================== */

	/* Раскрывающийся фильтр */

	$(".filter__header_cont").on("click", function(event) {
		if (event.target.classList.contains("filter__apply") ||
		    event.target.classList.contains("filter__reset")) return;

		if ($(".filter .checkbox_custom").is(":checked")) {
			if (window.innerWidth > 767) {
				$(".filter__buttons").css("display", "inline-block");
			} else {
				$(".filter__buttons").css("display", "block");
			}
		} else {
			$(".filter__buttons").css("display", "");
		}

		$(".filter__arrow_icon").toggleClass("glyphicon glyphicon-chevron-down glyphicon glyphicon-chevron-up");
		$(".filter__body_cont").slideToggle(300);

		var text = $(".filter__arrow_text").text();
		if (text == "Раскрыть") {
			text = "Закрыть";
		} else {
			text = "Раскрыть";
		}

		$(".filter__arrow_text").text(text);
	});

	/* Появление / скрытие кнопок "Применить", "Сбросить" */
	$(".filter .checkbox_custom").on("change", function() {
		if ($(".filter .checkbox_custom").is(":checked")) {
			if (window.innerWidth > 767) {
				$(".filter__buttons").css("display", "inline-block");
			} else {
				$(".filter__buttons").css("display", "block");
			}
		} else {
			$(".filter__buttons").css("display", "");
		}
	});

	/* Поведение кнопок при изменении ширины экрана */
	$(window).on("resize", function() {
		if ($(".filter__buttons").css("display") == "none") return;
		
		if (window.innerWidth > 767) {
			$(".filter__buttons").css("display", "inline-block");
		} else {
			$(".filter__buttons").css("display", "block");
		}
	});

	/* Действие кнопки "Сбросить" */
	$(".filter__reset").on("click", function() {
		$(".filter .checkbox_custom").removeAttr("checked");
		$(".filter__buttons").css("display", "");
	});

	/* ===================================== */

	/* Действие кнопки "Печать" */

	$(".print_btn").on("click", function() {
		window.print();
	});

	/* ======================= */

	/* Поведение стрелочек в аккордеоне страницы FAQ */

	$("#accordion").on("show.bs.collapse",  function(e) {
		var parent = e.target.parentNode;
		$(parent).find(".accordion__arrow, .recall__arrow").toggleClass("glyphicon-chevron-down glyphicon-chevron-up");
	});

	$("#accordion").on("hide.bs.collapse", function(e) {
		var parent = e.target.parentNode;
		$(parent).find(".accordion__arrow, .recall__arrow").toggleClass("glyphicon-chevron-down glyphicon-chevron-up");
	});

	/* ============================================= */
});