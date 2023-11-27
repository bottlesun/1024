/*
* @name ui.js
* @description UI 관련 스크립트
* @update 2023.05.31
* */

var $popup;
function popup(obj, url) {
  $popup = $(obj);

  let completeElement = $('.data-form').data('popupStatus')

  if(completeElement === 'complete'){
    $('[data-popup-id=reservation]').addClass('complete-popup')
  } else {
    $('[data-popup-id=reservation]').removeClass('complete-popup')
  }

  if($popup.attr('data-popup-id') == 'consentInfo'){
    $('[data-popup-id=reservation]').removeAttr("style").removeClass("show");
  }

  var targetY = 100;
  h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;
  $("body").addClass("dimmed");
  $popup.addClass("show").css({top:targetY,opacity:1});
  window.scrollTo({top: targetY,left: 0,behavior: 'smooth'})


  if ( $popup.attr('data-popup-id') == 'youtube') {
    // $("body").removeClass("dimmed");
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

function reservationPopupClose(that){
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
  // 재오픈
  popup($('[data-popup-id=reservation]'))
}
