$(function () {
	oddFixed();
	AOS.init();

	$('button[data-href]').click(function(e) {
		var href = $(this).data("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top + 1;

		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 400, "easeInOutExpo");

		e.preventDefault();
		return false;
	});
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

//Popup
var $popup;
function popup(obj, url) {
	$popup = $(obj);
	var targetY = $(window).scrollTop()+100;
		h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;
	$("body").addClass("dimmed");
	$popup.addClass("show").css({top:targetY,opacity:1});

	if ( $popup.attr('data-popup-id') == 'youtube') {
		$popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
	}
}
var imgSrc;
function popupItem(itemName, imgName, isOpend) {
	$popup = $('[data-popup-id="item"]');
	var targetY = $(window).scrollTop()+100;
		h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;

	$popup.addClass("show").css({top:targetY,opacity:1});
	$("body").addClass("dimmed");

	imgSrc = imgSrc ? imgSrc : "./images/items/";
	$popup.css({'background-image':'url('+imgSrc+itemName+'.png)'});
	$popup.find('.item-img').html('<img src="' + imgSrc + imgName + '.jpg" alt="item image">');
	$popup.attr('data-popup-re','').attr('data-popup-re',isOpend);

}
//dimmed click popup close
$(document).on('click', function(e) {
	var $tgPoint = $(e.target);
	if ( $tgPoint.hasClass('dimmed') ) {
		$popup.removeAttr("style").removeClass("show");
		$("body").removeClass("dimmed");

		if ( $popup.attr('data-popup-id') == 'youtube') {
			$popup.find('iframe').remove();
		}
		if ( $popup.attr('data-popup-id') == 'item') {
			if ( $popup.attr('data-popup-re') != "re" ) {
				document.location.reload();
			}
		}
		//popup object reset
		$popup = '';
	}
});
function popupClose(that) {
	$("body").removeClass("dimmed").unbind('touchmove');
	var type = typeof(that); //this == "object"
	if ( type == "object" ) {
		$(that).parents('.popup').removeAttr("style").removeClass("show");
		$(that).parents('.popup').find(".iframe iframe").remove();

		if ( $(that).parents('.popup').attr('data-popup-id') == 'item') {
			if ( $(that).parents('.popup').attr('data-popup-re') != 're') {
				document.location.reload();
			}
		}
	} else {
		$(that).parents('.popup').removeAttr("style").removeClass("show");
	}
}

//게이지 모션
function fngauge(target, gaugeNum, total) {
	var $target = $(target);
	var $gauge = $(target).find('.gauge');
	var percent = gaugeNum/total*100;

	$gauge.css("opacity","1");
	if ( gaugeNum >= total ) {
		var percent = 100;
		setTimeout(function() { $gauge.addClass('max'); }, 1000);
	} else {
		var percent = parseInt(gaugeNum/total*100);
	}
	$target.find('.bar').css("width",percent+"%").find('i').html(percent);

	//게이지 숫자 표시
	$(target).find('.gauge-area').next('p').find('.gauge-step').html(gaugeNum);
	// gaugeNum >= total ? $gauge.next('.gauge-num').html('MAX') : $gauge.next('.gauge-num').html(percent+'%'); //하트에 %표시

	//구간별 텍스트 노출
	var gaugeStep = 1;
	gaugeNum == 30 ? gaugeStep = 3 : '';
	gaugeNum <= 29 ? gaugeStep = 2 : '';
	gaugeNum <= 15 ? gaugeStep = 1 : '';
	$target.attr('data-range',gaugeStep);
	insertData($target.find('.balloon'), charStepMsg[$target.index()-1][gaugeStep-1]);
}

//숫자 가격 천단위 표시
function priceToString(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//tab
function tabView(index, btn, that) {
	$(btn).removeClass('current').eq(index).addClass('current');
	$(that).removeClass('current').eq(index).addClass('current');
}

//캐릭터 탭 클릭 시 모션
$(document).on('click', '.character-list li', function(e) {
	var tabIdx = $(this).index();

	tlMotion.kill();
	viewCharacter(tabIdx);
});

//캐릭터 호감도 별 노출 대사
//5.19 version 0.0.1 호감도 별 노출 대사 수정
var charStepMsg = {
	1: [
		"미스티 로즈와 헤이지 블루 여러분! <br>다음 스케줄 가야해요~ 얼른 일어나~",
		"우리 로즈와 블루가 음방 1등 했어요 ~ <br>하핫핫 ~ 성과금도 나오겠지?!",
		"우~~와! 우리 애들 무대 이쁘고 멋지게 잘한다.<br>너~무 감동이야",
	],
	2: [
		"만나서 반가워! 귀여운 널 보니 <br>큐~~~트한 멜로디가 떠올랐어! 고마워!",
		"후훗 이 가사, 리듬 그리고 아름다운 내 목소리..<br> 완벽해.. 뷰리폴...",
		"너의 그 작사 실력!<br>나와 함께 음악을 할 기회를 주지! ",
	],
}

//캐릭터 말풍선 텍스트 삽입
function insertData(target, text) {
	target.find('p').html(text);
}

//캐릭터 등장 모션
var tlMotion = '';
function viewCharacter(index) {
	var target = $('.char'+(index+1));
	var $bg = target.find('.bg-frame');
	var $bg2 = target.find('.bg-character span');
	var $character = target.find('.img-character');
	var $balloon = target.find('.balloon');
	var gaugeTxt = $('.char'+(index+1)+' .gauge').find('.bar i').text();

	//게이지
	$('.char'+(index+1)+' .gauge .bar').css('width',0).animate({
		'width': gaugeTxt + '%'
	});
	tabView(index,$('.character-list li'),$('.character-content'));

	tlMotion = new TimelineMax().add([
		TweenMax.fromTo( $bg, 0.8, {rotation:-180, opacity:0}, {rotation:0, opacity:0.5, yoyo:true, repeat:1 } ),
		TweenMax.fromTo( $bg2, 4, {scale:2, opacity:0}, {scale:1, opacity:1, ease:Elastic.easeOut.config(1,0.7) } ),
		TweenMax.fromTo( $character, 0.5, {opacity:0}, {opacity:1, delay:1 } ),
		TweenMax.fromTo( $balloon, 1, {scale:0, opacity:1, x:"-50%"}, {scale:1, opacity:1, x:"-50%", delay:1.5, ease:Elastic.easeOut.config(1,0.4) } )
	]);
	return tlMotion;
}

//새로고침 시 스크롤 컨텐츠 원하는 위치로 이동
function goToSection(href) {
	offsetTop = $(href).offset().top + 1;
	$('html, body').stop().animate({
		scrollTop: offsetTop
	}, 0, "easeInOutExpo");

	return false;
}