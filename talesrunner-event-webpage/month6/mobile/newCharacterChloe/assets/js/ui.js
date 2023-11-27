/*
* @name ui.js
* @description UI 관련 스크립트
* @update 2023.05.31
* */


var $popup;
function popup(obj, url) {
  console.log(obj)
  $popup = $(obj);
  var targetY = $(window).scrollTop()+75;
  h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;
  $("body").addClass("dimmed");
  $popup.addClass("show").css({top:targetY,opacity:1});

  if ( $popup.attr('data-popup-id') == 'youtube') {
    $popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
  }
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
