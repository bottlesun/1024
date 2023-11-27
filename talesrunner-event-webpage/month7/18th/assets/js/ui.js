let $popup;

/** @param parent:IframeAppendParent,src:IframeSrc element
 * @use 팝업 클릭 시 벌어지는 action
 * @enum false
 */
function createIframe(parent, src) {
        parent.find("iframe").remove();
        parent
            .append(
                // autoPlay width height 등등 속성 요소 수정
                `<iframe src=https://www.youtube.com/embed/${src} allow="autoplay; encrypted-media"  allowfullscreen></iframe>`
            );

}

/** @param type:팝업이름,popup:팝업 element
 * @use 팝업 클릭 시 벌어지는 action
 * @enum false
 */
function popupAction(type, popup) {
    const url = "RT60LHSBvv8";
    $popup.addClass("show");
    $("body").addClass("active");
    createIframe($(".iframe"),url)
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

// 출석하기 클릭 시 플래시작동
function flash(callback){
    const
        $flash=$(".flash");
    $flash.fadeIn(250).fadeOut(250,function (){
        $('html, body').animate({
            scrollTop: $(".section2").offset().top
        }, 1000);
    });
    if(callback) callback();
}

// 추억 사진첩 이미지 생성
//  target : 이미지 오픈될 타겟 ex) $([data-photo-index=01]) , isFade : fadeIn 효과 boolean
function createPhoto($target,isFade){
    const imgName= $target.attr('data-photo-name');
    const $appendElement= $(`
        <img src='assets/images/section2/${imgName}.png' >
        <button onclick="forceDownload(this)" class="download"></button>
    `);
    $target.append($appendElement);
    if(isFade) $target.addClass("active");
}

// 클릭 다운로드
function forceDownload($that){
    const index=$($that).parent().attr("data-photo-index");
    let link = document.createElement('a');
    link.href = `assets/images/section2/download/${index}.png`;
    link.download = `${index}.png`
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

$(function(){

  // Array.from({length:18}).forEach((_,index) => {
  //    let i=(index+1).toString();
  //    if(i.length<2) i= `0${i}`;
  //    createPhoto($(`[data-photo-index=${i}]`))
  // })
  //   controlText(14);
})

// /** @param target:JQueryElement
//  * @use 마우스 오버 시 배경 블러처리
//  * @enum true
//  */
// function controlBackground(target) {
//     target.mouseover(() => {
//         $(".bg").css({display: "block"});
//     });
//     target.mouseleave(() => {
//         $(".bg").css({display: "none"});
//     });
// }
//
//


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