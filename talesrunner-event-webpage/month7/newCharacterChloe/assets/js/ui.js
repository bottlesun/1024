/*
* @name ui.js
* @description UI 관련 스크립트
* @update 2023.05.31
* */

var $popup;

var slide = new Swiper('.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    touchRatio: 0,
    pagination:true,
    centerY:true,
    observer: true,
    observeParents: true,
    loop: true,
    on:{
        slideChange() {

        }
    }
});



function SwiperPopup(obj, index) {
    slide.init();
    slide.update();
    slide.slideToLoop(index);


    $('.swiper-popup').css('display','block');
    $('.swiper-slide').css("display","block");
}

function SwiperClose() {
    $('.swiper-slide').css('display','none');
    $('.swiper-popup').css("display","none");

}

function popupClose(index) {
    let $modal =  document.querySelector(`.modal${index}`);
    $modal.classList.remove('active');
}





