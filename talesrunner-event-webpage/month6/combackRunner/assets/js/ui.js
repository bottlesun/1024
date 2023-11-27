$(function () {
    oddFixed();
	lnbScroll();
});

//window odd fixed
function oddFixed() {
	if ($(window).width() % 2 != 0)	{
		var width = $(window).width() - 1;
		$('html').width(width);
	}
	else {
		$('html').width('100%');
	}
}

$(window).resize(function() {
	oddFixed();
});

//lnb 스크롤
function lnbScroll() {
	var lastId,
		topMenu = $(".lnb-wrap"),
		menuItems = topMenu.find("li a"),
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});

	menuItems.click(function (e) {
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top + 1;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 400, "easeInOutExpo");

		e.preventDefault();
	});

	$('.btn-top').click(function(e){
		var href = $($(this).attr("href")),
			offsetTop = $(href).offset().top + 1
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 400, "easeInOutExpo");
		e.preventDefault();
	})

	//스크롤 시
	$(window).scroll(function(){
		var fromTop = $(this).scrollTop();

		var cur = scrollItems.map(function(){
			if ($(this).offset().top <= fromTop)
				return this;
		});
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
		lastId !== id ? lastId = id : "";

		//하단 스크롤값 체크
		var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
		if (scrollBottom == 0) {
			id = 'section03';
		}

		menuItems.parent().removeClass("active").end().filter("[href='#"+id+"']").parent().addClass("active");
	});
}

//Popup
var $popup;
function popup(obj) {
	$popup = $(obj);
	var targetY = $(window).scrollTop()+100;
		h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;
	$("body").addClass("dimmed");
	$popup.addClass("show").css({top:targetY,opacity:1});

	if ( $popup.attr('data-popup-id') == 'youtube') {
		$popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+popupYoutubeId+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
	}

	if(!!notToday) {
		$('.btn-anymore').hide();
	}
}

function popupClose(that) {
	$("body").removeClass("dimmed").unbind('touchmove');
	$(that).parents('.popup').removeAttr("style").removeClass("show");
}

//tab
function tabView(index, btn, that) {
	$(btn).removeClass('current').eq(index).addClass('current');
	$(that).removeClass('current').hide().eq(index).addClass('current').show();
}

//새로고침 시 스크롤 컨텐츠 원하는 위치로 이동
function goToSection(href) {
	offsetTop = $(href).offset().top - 200;
	$('html, body').stop().animate({
		scrollTop: offsetTop
	}, 0, "easeInOutExpo");

	return false;
}

//타이틀 등장 모션
var tlMotion = '';
function startMotion() {
	isMotionView = true;

	
	tlMotion = new TimelineMax().add([
		TweenMax.to($('.stamp'), 0.3, {opacity:1,scale:1,x:0,y:0, ease:Power1.easeOut, delay: 2.2}),
	]);
	return tlMotion;
}

