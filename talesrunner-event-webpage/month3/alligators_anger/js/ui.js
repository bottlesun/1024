$(function () {
	oddFixed();

	//악어 입벌리는 모션 실행
	//openMouth();
});

//window odd fixed
function oddFixed() {
	if ($(window).width() % 2 != 0)	{
		var width = $(window).width() - 1;
		$('html').width(width);
	} else {
		$('html').width('100%');
	}
}
$(window).resize(function() {
	oddFixed();
});

//Popup
var $obj;
function popup(obj) {
	$obj = $(obj);
	$("body").addClass("dimmed");
	$obj.addClass("show");

	$(document).on('click', function(e) {
		var $tgPoint = $(e.target);
		if ( $tgPoint.hasClass('dimmed') ) {
			$obj.removeClass("show");
			$("body").removeClass("dimmed");
			if ( $obj.attr('data-popup-id') == 'youtube') {
				$obj.find('iframe').remove();
			}
		}
	});
}
function popupClose(that) {
	$("body").removeClass("dimmed").unbind('touchmove');
	$(that).parents('.popup').removeClass().addClass('popup');
}

//로그인 전 마우스 움직일 경우 악어 표정 변화
var isMouseMove = 0;
var timer = '';
var timer2 = '';
$(document).on('mousemove', function() {
	isMouseMove++;

	if ( $('.character').attr('data-state') == 'a00' && isMotionPlay == false && isMouseMove == 1 ) {
		timer = setTimeout(function() {
			changeChar('a01');
			timer2 = setTimeout(function() {
				changeChar('a00');
				clearTimeout(timer2);
			}, 10000);
			clearTimeout(timer);
		}, 1000);
	}
})

//악어 상태값 변경
function changeChar(type) {
	clearTimeout(timer);
	clearTimeout(timer2);
	$('.character').attr('data-state',type);
	$('.cha-img span').css('opacity',0);
	$('.btns').css('display','none');

	$('.'+type).css('opacity',1);

	if ( type == 'b01' || type == 'b02' || type == 'b03' ) {
		$('.btns').css('display','block');
	}
	else if ( type == 'a00' ) {
		isMouseMove = 0;
	}
}

//악어 입벌리는 모션
var isMotionPlay = false;
function openMouth() {
	var speed = 0.1;
	var imgNum = $('.loop span').length - 1;
	isMotionPlay = true;

	//init
	changeChar('a00');
	clearTimeout(timer);
	clearTimeout(timer2);
	$('.loop span, .cha-img span').css('opacity',0);

	//motion loop
	$('.loop span').each(function(e) {
		if (e < imgNum)	{
			TweenMax.fromTo($(this), speed, {opacity:0}, {opacity:1, yoyo:true, repeat:1, delay:e*speed/2});
		} else {
			TweenMax.fromTo($(this), speed, {opacity:0}, {opacity:1, delay:e*speed/2, onComplete:function() {
					//delay callback
					TweenMax.delayedCall(0, function() {
						changeChar('b01');
						$('.loop span').eq(imgNum).css('opacity',0);
						isMotionPlay = false;
					});
				}});
		}
	});
}

$(document).on('mouseenter', '.btns button', function() {
	if ( !$(this).hasClass('complete') ) {
		changeChar('b02');
		$('.btns').addClass('hover');
	}
}).on('mouseleave', '.btns button', function() {
	changeChar('b01');
	$('.btns').removeClass('hover');
});