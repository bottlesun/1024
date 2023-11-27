$(function() {
	selectDrop();
	formstyle();
	surveyPopupUI(); //설문 만들기 팝업 동작
	loading();
	
	//popup tab
	$('.popup-tab a').on('click', function(e) {
		e.preventDefault();

		tab(this,'.popup-tab-content');
		$(this).parents('li').siblings('li').removeClass('active');
		$(this).parents('li').addClass('active');
	});

	//달력 위젯
	$(".js-datepicker").datepicker({dateFormat: "yy.mm.dd"});

	$('a').on('click', function() {
		if ($(this).attr('href') == '#' && $(this).attr('onclick') != '') {
			return false;
		}
	});

	//이 달의 인기 게시글
	listPopularSlide();
	//크리에이터 추천 콘텐츠
	listCreatorSlide();
	//건의게시판 주목 받는 게시글
	listProposalSlide()
});

$(document).on("mouseover",".board-list-slide li",function(){
	$(this).addClass("over");
});
$(document).on("mouseout",".board-list-slide li",function(){
	$(this).removeClass("over");
});

function listPopularSlide(){
	$(".board-list-popular .bxslider").each(function(){	
		$(this).bxSlider({
			slideWidth: 290,
			moveSlides: 1,
			slideMargin: 10,
            minSlides: 3,
            maxSlides: 3,
			//infiniteLoop: true,
			infiniteLoop: ($(this).children('li').length <= 3) ? false : true,
			touchEnabled:false,
			pager: false,
			nextText:'Next',
			prevText:'Prev',
			hideControlOnEnd:true,
			onSliderLoad:function(){
			}
		});
	});
}

//건의게시판 주목 받는 게시글 추가 20220215
function listProposalSlide(){
	$(".board-list-popular2 .bxslider").each(function(){	
		$(this).bxSlider({
			slideWidth: 290,
			moveSlides: 1,
			slideMargin: 10,
            minSlides: 3,
            maxSlides: 3,
			infiniteLoop: ($(this).children('li').length <= 3) ? false : true,
			touchEnabled:false,
			pager: false,
			nextText:'Next',
			prevText:'Prev',
			hideControlOnEnd:true,
			onSliderLoad:function(){
			}
		});
	});
}
function listCreatorSlide(){
	$(".board-bxslider-wrap .bxslider").each(function(){	
		$(this).bxSlider({
			slideWidth : 244,
			//moveSlides: 4,
			slideMargin: 8,
            minSlides: 4,
            maxSlides: 4,
			infiniteLoop: false,
			touchEnabled:false,
			pager: true,
			pagerType: 'short',
			nextText:'Next',
			prevText:'Prev',
			hideControlOnEnd:true,
			onSliderLoad:function(){
			}
		});
	});
}

//로딩 이미지
function loading(){
	$("body").append('<div class="loading"><em>Loading...</em></div>');
	$(window).load(function(){
		$(".loading").remove();
	});
}

//설문 만들기 팝업
function surveyPopupUI() {
	//종료 설정
	$('.table-survey-option input[type=radio]').on('click', function() {
		var idx = $(this).parents('label').index();
		$(this).parents('td').find('.datepicker').hide().eq(idx).show();
	});
	//설문 리스트 순서 변경 및 재정렬
	$('.ui-sortable').sortable({
		handle: '.ui-sortable-handler',		//handler class name
		cancle: '.sortable li',				//drag 제외 영역
		axis: "y",							//움직임 축
		tolerance: 'pointer',
		placeholder: "ui-state-highlight"	//삽입될 임시영역 style 적용할 class name
	}).on( "sortupdate", function() {
		$('.ui-sortable>li').each(function(e) {
			$(this).find('.circle').html(e+1);
		});
	});
}

//디자인 셀렉트 박스
function selectDrop() {
	var $select_list = $('.selectbox');

	if ( $select_list )
	{
		function selectToggle( event ) {
			$this = $(this);
			$this.addClass('active');
			$this.siblings('ul').show().find('a').on('click', function() {
				var text_value = $(this).text();
				$this.removeClass('active').html( text_value + '<i class="ico"></i>');
				$this.siblings('ul').hide();

				if ( $(this).attr('href') === '#' ) {
					return false;
				}
			});
		}
	}
	$select_list.find('button').click( selectToggle ).focus( selectToggle );
	$select_list.on('mouseleave', function() {
		$(this).find('ul').hide();
		$(this).find('ul').removeClass('active')
	});
}

//label check
function formstyle() {
	$('label').on('click', function() {
		$(this).parents('.form').children('li').each(function(e) {
			$(this).children('textarea').attr('disabled', 'disabled');
		});
		$(this).siblings('textarea').removeAttr('disabled').focus();
	});
}

//tab contents
function tab(that,odj) {
	var idx = $(that).parents('li').index();
	$(odj).removeClass('active').eq(idx).addClass('active');
}

function popup(obj,msgNum) {
	$(obj).attr('tabindex', 0).addClass("show").focus();
	$(obj).blur(function() {	// focus out - 20191127 추가
		$(this).removeAttr("tabindex");
	});
	
	if ($(obj).data('popup') == 'alert' || $(obj).data('popup') == 'confirm') {
		$("body").addClass("modal");
		$(obj).find("p").html(msgNum);
		
		if ( parseInt($(obj).width()) % 2 != 0) {
			$(obj).css('width', $(obj).width() + 3);
		}
		if ( parseInt($(obj).height()) % 2 != 0) {
			$(obj).css('height', $(obj).height() + 3);
		}
	}
	else {
		$("body").addClass("dimmed");
	}
}
function popupYoutube(obj,id,title,chName) {
	$(obj).attr('tabindex', 0).addClass("show").focus();
	$(obj).blur(function() {	// focus out - 20191127 추가
		$(this).removeAttr("tabindex");
	});
	
	$("body").addClass("dimmed");
	$(obj).find(".movie-area iframe").remove();
	$(obj).find(".popup-content h4,.popup-content .b-info"). empty();
	$(obj).find(".movie-area").append('<iframe src="https://www.youtube.com/embed/'+id+'?version=2&autoplay=0&vq=hd720&rel=0&amp;controls=1&amp;showinfo=0" allow=" encrypted-media" allowfullscreen></iframe>');
	if (title) {
		$(obj).find(".popup-content h4").html(title);
	}
	if (chName) {
		$(obj).find(".popup-content .b-info").html(chName);
	}
}

function popupClose(that) {
	var obj = typeof(that); //this == "object"
	if ( obj == "object" ){
		$(that).parents('.popup').removeAttr("style").removeClass("show");
		if ($(that).parents('.popup').data('popup') == 'alert' || $(that).parents('.popup').data('popup') == 'confirm') {
			$("body").removeClass("modal");
		}
		else {
			$("body").removeClass("dimmed");
		}
	}
	else {
		$("body").removeClass("dimmed");
		$(that).removeAttr("style").removeClass("show");
	}
	//유튜브일때 팝업에서 유튜브 iframe삭제
	if( that === "[data-popup=movie]"){
		$(that).find(".movie-area iframe").remove();
	}
}

function tooltip(that, obj, left, top) {
	$(obj).addClass('show').css({
		left: left,
		top: top
	});

	$(document).on('click', function(e){
		var $tgPoint = $(e.target);
		if ( !$tgPoint.parents().hasClass(that) && !$tgPoint.hasClass(that) && !$tgPoint.hasClass(obj) ) {
			$(obj).removeClass('show');
		}
	});
	return false;
}

//emoticon tab
function emojiTab() {
	var cur = new Array();
	var $list = $('.emoji__slider li');
	var $emojiImg = $('.emoji__area');
	//init
	cur[0] = 0;
	emojiView( 0 );

	//scroll top값 배열생성
	$list.each(function(e) {
		var href = $(this).find('a').attr("data-emoji-tab");
		cur[e] = $(href).position().top + parseInt($(href).css('margin-top'));
	}); 

	$('.emoji__nav').find('.emoji__slider a').on('click', function(e) {
		emojiView( $(this).parents('li').index() );
		return false;
	});

	function emojiView( index ) {
		var $this = $list.eq(index).find('img');
		$emojiImg.stop().animate({
			scrollTop: cur[index]
		}, 0);
		$list.removeClass('is-active');
		$list.eq(index).addClass('is-active');
		$list.each(function() {
			var url = $(this).find('img').attr('src').replace("/on","/off");
			$(this).find('img').attr("src", url);
		});
		$this.attr("src",function(){return $this.attr("src").replace("/off","/on");});
	}
}

//게시판 list paging 시 scroll top 이동 - 20190727 추가
function scrollPos() {
	var offsetTop = $('.container-body').offset().top + 1;
	$('html, body').stop().animate({
		scrollTop: offsetTop
	}, 0);
}

/* 20201201 추가 */
function scrollTrcreatorTab(num) {
	//var offsetTop = $(".tab-area").offset().top - 80;
	$('html, body').stop().animate({
		scrollTop: offsetTop
	}, 400);
}

//리그게시판 유저 리그정보 팝업 - 20220907 수정 (티어 항목 통합)
function insertLeaguePopup(that, url1, playCount1, winPer1, url2, playCount2, winPer2) {
	var obj = $(that).next('.league-info');
	var html = '<ul>';
		html += '	<li><strong>리그 티어</strong>';
		html += '		<i class="ico-tier"><img src="' + url1 + '" alt="tier"></i>';
		html += '		<dl><dt>플레이</dt><dd><em>' + playCount1 + '</em>회</dd><dt>승률</dt><dd><em>' + winPer1 + '</em>%</dd></dl>';
		html += '	</li>';
		// html += '	<li><strong>마이너 티어</strong>';
		// html += '		<i class="ico-tier"><img src="' + url2 + '" alt="tier"></i>';
		// html += '		<dl><dt>플레이</dt><dd><em>' + playCount2 + '</em>회</dd><dt>승률</dt><dd><em>' + winPer2 + '</em>%</dd></dl>';
		// html += '	</li>';
		html += '</ul>';
	
	obj.prepend(html);
	obj.show();
	obj.find('.bt-close-x').on('click', function() {
		obj.hide().find('ul').remove();
	});
}