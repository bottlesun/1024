let $popup;

/** @param parent:IframeAppendParent,src:IframeSrc element
 * @use 팝업 클릭 시 벌어지는 action
 * @enum false
 */
function createIframe(parent, src) {
  if (parent.children("iframe")) {
    parent.find("iframe").remove();
    parent
      .append(
        // autoPlay width height 등등 속성 요소 수정
        `<iframe src=${src} allow="autoplay; encrypted-media"  allowfullscreen></iframe>`
      );
  }
}

/** @param type:팝업이름,popup:팝업 element
 * @use 팝업 클릭 시 벌어지는 action
 * @enum false
 */
function popupAction(type, popup) {
  const url = "RT60LHSBvv8";
  $popup.addClass("show");
  $("body").addClass("active");
}

/** @param type:팝업이름,popup:팝업 element
 * @use 팝업 닫기 클릭 시 벌어지는 action
 * @enum false
 */
function popupCloseAction(type, popup) {
  $popup.removeClass("show");
  $("body").removeClass("active");
  $popup.find("iframe").remove();
}

/** @param 'data-popup-id=팝업이름'
 * @use 팝업 여는 기능
 * @enum true
 */
function popup(obj) {
  $popup = $(obj);
  const $type = $popup.attr("data-popup-id");
  popupAction($type, $popup);
}

/** @param this
 * @use 팝업 닫는 기능
 * @enum true
 */
function popupClose(that) {
  $popup = $(that).parents(".popup");
  const $type = $popup.attr("data-popup-id");
  popupCloseAction($type, $popup);
}

/** @param target:JQueryElement
 * @use 마우스 오버 시 배경 블러처리
 * @enum true
 */
function controlBackground(target) {
  target.mouseover(() => {
    $(".bg").css({display: "block"});
  });
  target.mouseleave(() => {
    $(".bg").css({display: "none"});
  });
}


$(window).on("load", () => {
  //ex. item1 오버 시 블러처리 원할 경우
  const $target = $(".item1")
  controlBackground($target);
});


// 스마일게이트로 받은 ui.js코드

// function oddFixed() {
//     if ($(window).width() % 2 != 0) {
//         var width = $(window).width() - 1;
//         $('html').width(width);
//     } else {
//         $('html').width('100%');
//     }
// }
//
// $(window).resize(function () {
//     oddFixed();
// });
// $(function () {
//     oddFixed();
// });
