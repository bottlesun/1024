const boxItems = document.querySelectorAll('.content-body .box-item');
const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
const commonSwiperOption = {
  slidesPerView:"auto", // 한 화면에 보여줄 슬라이드 개수
  spaceBetween: 0, // 슬라이드 사이 여백
  // centeredSlides: true, // 슬라이드 가운데 정렬
  freeMode: {
    enabled: true, // 슬라이드 자유 이동
    sticky: false, // 슬라이드 자유 이동 시 스크롤 위치 고정
    momentumBounce: false, // 슬라이드 끝에서 튕기는 현상 방지
  },
  speed: 2000, // 슬라이드 속도
};

/*full page scroll*/
let swiper = new Swiper(".evt-swiper", isSafari ? {
  ...commonSwiperOption,
  mousewheel: {
    enabled: true, // 마우스 휠 이벤트
    sensitivity: 7.0, // 마우스 휠 감도
  },
} : {
  ...commonSwiperOption,
  mousewheel: {
    enabled: true, // 마우스 휠 이벤트
    sensitivity: 7.0, // 마우스 휠 감도
  },
});

/*hover 이미지 프리로드*/

let images = [];
let imagePaths = [
  "assets/images/section01/section01-item01-title-hover.png",
  "assets/images/section01/section01-item02-title-hover.png",
  "assets/images/section02/section02-item02-title-hover.png",
  "assets/images/section04/section04-item01-title-hover.png",
  "assets/images/section04/section04-item02-title-hover.png",
  "assets/images/section04/section04-item03-title-hover.png",
  "assets/images/section04/section04-item04-title-hover.png",
  "assets/images/section04/section04-item05-title-hover.png",
  "assets/images/section04/section04-item06-title-hover.png",
  "assets/images/section05/section05-item01-title-hover.png",
  "assets/images/section05/section05-item02-title-hover.png",
  "assets/images/section05/section05-item03-title-hover.png",
  "assets/images/section06/section06-item01-title-hover.png",
  "assets/images/section06/section06-item02-title-hover.png",
  "assets/images/section06/section06-item03-title-hover.png",
  "assets/images/section07/section07-item01-title-hover.png",
  "assets/images/section07/section07-item02-title-hover.png",
];

for (let i = 0; i < imagePaths.length; i++) {
  images[i] = new Image();
  images[i].src = imagePaths[i];
}

