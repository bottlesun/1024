$(function () {
    oddFixed();
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
