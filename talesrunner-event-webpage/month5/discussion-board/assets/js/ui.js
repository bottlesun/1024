$(function () {
	$('.status-content').each(function() {	
		setEllipsis($(this), 20);	
	});
	initLnb();
	subSlide();
	initSnb();
	$('input, textarea').placeholder();	//20180814 추가
	
	//data-img
	$("[data-img]").each(function(){
		var img = $(this).data("img");
		$(this).css("background-image","url("+img+")");
	});
	
	//GAME START BUTTON
	$( ".btn_gameStart" ).hover(function() {
		$(this).append('<span class="hover"><span class="txt"></span><span class="track"></span></span>');

		var image = $('.btn_gameStart .fire1');
		var image2 = $('.btn_gameStart .fire2');
		var track = $('.btn_gameStart .track');
		var txt = $('.btn_gameStart .txt');

		var tween = TweenMax.fromTo(track, 7, {backgroundPosition: "80% 50%"},{backgroundPosition: "30% 50%" } );
		var tween = TweenLite.fromTo( image, 0.3, {scale:".5"},{scale: "1", ease: Back.easeOut.config(1.7) });
		var tween = TweenLite.fromTo( image2, 0.2, {scale:".4"},{scale: "1", ease: Back.easeOut.config(1.7) });
		var tween = TweenLite.fromTo( txt, 0.5, {scale:".8"},{scale: "1", ease: Elastic.easeOut.config(1, 0.3) });
	}, function() {
		$(".btn_gameStart .hover").remove();
	});
	
	//가로 스크롤 생길 경우 snb 위치 설정 - 20191120 추가
	$(window).scroll(function() {
		var scrollLeft = $(window).scrollLeft();
		if ($('.snb-wrap').hasClass('fixed')) {
			$('.snb-wrap .snb').css({ left: -scrollLeft });
		}
		else {
			$('.snb-wrap .snb').css({ left: 0 });
		}
	});

});

$(window).load(function(){
	iframeZindex();
});
$(window).on("resize",function(){
	currentSnb()
});

//snb, quickmenu movement
function initSnb() {
	currentSnb();
	var $snbWrap = $('.snb-wrap'),
			$snb = $('.snb'),
			$snbCurrent = $('.snb li.current'),
			$snbH = $snb.outerHeight(),
			$line = $('.snb-line'),
			$quickMenu = $('.quick_menu'),
			snbWrapPos = $snbWrap.offset().top,
			quickPos = $(".quick_menu").offset().top - 77;
	
	$(window).on("load",function(){
		if ( $('.snb li').hasClass("current") ){
			currentSnb();
		}
		$(document).on('mouseenter focusin', '.snb li', function(e) {
			var posLeft = $(e.target).offset().left, posWidth = $(e.target).width();
			$line.stop().animate({ "opacity":"1", "left":posLeft, "width":posWidth });

		});

		$(document).on('mouseleave', '.snb', function() {
			currentSnb();
		});
	});

	$(window).on("scroll",function(){
		$(window).scrollTop() >= snbWrapPos ? $snbWrap.addClass("fixed") : $snbWrap.removeClass("fixed");
		$(window).scrollTop() >= quickPos ? $quickMenu.addClass("fixed") : $quickMenu.removeClass("fixed");
	});
}

function currentSnb(){
	var $snbCurrent = $('.snb li.current'),	$line = $('.snb-line');
	var currentPosLeft = $snbCurrent.offset()?.left, currentPosWidth = $snbCurrent?.width();
	$line.stop().animate({ "opacity":"1", "left":currentPosLeft, "width":currentPosWidth });
}

//Sub Slide
function subSlide(){
	var slider = $('.visual-slider .slider').bxSlider({
		speed: 300,
		auto: true,
		autoControls: true,
		stopAutoOnClick: true,
		pager: true,
		onSliderLoad:function(){
			$(".visual-slider .bx-controls-auto").insertAfter(".visual-slider .bx-pager");
		}
	});

	$(document).on('mouseenter','.visual-slider .bx-pager a',function(){
		var index = $(this).attr('data-slide-index');
		$(".bx-wrapper .slider").stop(true);
		slider.goToSlide(index);
		slider.stopAuto();
	});
	$(document).on('mouseleave','.visual-slider .bx-pager a',function(){
		slider.startAuto();
	});
}

function initLnb() {
	var $lnbWrap = $('.lnb_wrap'),
		$lnb = $('.lnb'),
		$lnbH = $lnb.outerHeight(),
		$lineLine = $('.lnb_line');
	$(document).on('mouseenter focusin', '.lnb .depth01', function(e) {
		var posLeft = $(e.target).position().left,
			posWidth = $(e.target).width(),
			posWidth2 = posWidth/10;

		$("#header").addClass("lnb_open");		
		$lnbWrap.css("height",$lnbH);		
		$lineLine.stop().animate({ "opacity":"1", "left":posLeft+(posWidth2/2), "width":posWidth-posWidth2 });

	});

	$(document).on('mouseleave', '.lnb', function() {
		out();
	});
	$(document).on('focusout', '.lnb .depth01:last-child .depth02 li:last-child', function() {
		out();
	});

	function out(){
		$("#header").removeClass("lnb_open");		
		$lnbWrap.css("height",'');
		$lineLine.stop().animate({ "opacity":"", "left":"", "width":"" });
	}
}

//iframe z-index 해결
function iframeZindex() {
	$("#wrapper iframe").each(function() {
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
			var getQString = ifr_source.split('?');
			var oldString = getQString[1];
			var newString = getQString[0];
			$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
}

//게임 소개 세계관
window.onload = function() {
	//slide
	var mySwiper = new Swiper('.mySwiper', {
		updateOnWindowResize: true,
		effect: "fade",
		loop : true,
		touchRatio: 0,
		navigation: {
			nextEl: '.swiper-next-button',
			prevEl: '.swiper-prev-button',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',	
			formatFractionCurrent: function (number) {
            return ('0' + number).slice(-2);
			},
			formatFractionTotal: function (number) {
				return ('0' + number).slice(-2);
			},
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span>' + ' <em>/<em> ' +  '<span class="' + totalClass + '"></span>';
			}	
		},
		watchOverflow: true,
		on: {
			init: function () {
			  console.log(this.realIndex);
			  var initIndex = this.realIndex
			  $('.container-swiper').attr('data-sld',initIndex);
			},
			slideChange: function () {
				
				var index = this.realIndex;
				$('.container-swiper').attr('data-sld',index);				
			}
		},
	});

};

function setEllipsis(element, maxLength) {
	if (element.text().length > maxLength) {
		return element.text(element.text().substring(0, maxLength) + '...');
	} else {
		return element.text();
	}
}
