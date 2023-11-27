/*
* @name ui.js
* @description UI 관련 스크립트
* @update 2023.05.31
* */

var $popup;
function popup(obj, url) {
  $popup = $(obj);


  if($popup.attr('data-popup-id') == 'consentInfo'){
    $('[data-popup-id=reservation]').removeAttr("style").removeClass("show");
  }

  var targetY =  $(window).scrollTop();
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


/*
* @name forceDownload
* @param {object} url
* @description data-href 속성을 통해 다운로드 처리
* */
function forceDownload(url){
  let urlData = url.getAttribute('data-href');
  let fileName = 'khloe.zip';
  let link = document.createElement('a');
  // console.log(urlData)
  link.href = urlData;
  link.download = fileName

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}





