const wrapId = document.getElementById('evt_wrap');
const dummySlide = document.querySelector('.dummy-slide ');
const contentBody = document.querySelector('.content-body ');
const mouseWheel = document.querySelector('.mouse-wheel ');

const innerWidth = 1240;
const refreshAnimate = gsap.timeline();
const mouseWheelAnimate = gsap.timeline();

/*움직이는 요소*/
const section02 = document.querySelector('.section02 .character');
const section04_new_character = document.querySelector('.section04 .new-character .character');
const section04_system = document.querySelector('.section04 .system .character');
const section04_baunabi_island = document.querySelector('.section04 .baunabi-island .character');
const section05 = document.querySelector('.section05 .character');
const section06 = document.querySelector('.section06 .character');
const section07_map_craft = document.querySelector('.section07 .map-craft .character');
const section07_upgrade = document.querySelector('.section07 .upgrade-64bt .character');

/**
 * @description: gnb 종류에 따른 스크롤 높이 조절
 */
swiper.disable()

$(window).on('load', function () {
  setTimeout(() => {
    swiper.enable()
  },800)


  //load 이후 실행할 함수
  const nexon = $('.gnbWrapper')[0]; // 넥슨 gnb
  const hangame = document.getElementById('gnbWrapDiv'); // 한게임 gnb
  const stove = document.getElementById('stoveGnb'); // 스토브 gnb
  dummySlide.style.cssText = `flex-basis: ${(window.innerWidth - innerWidth) / 2 + 50}px;`


  if (nexon !== null && nexon !== undefined) {
    return wrapId.style.cssText = ';height:calc(100% - 63px);min-height:calc(1000px - 63px)'
  } else if (hangame !== null && hangame !== undefined) {
    return wrapId.style.cssText = 'height: calc(100% - 50px);min-height:calc(1000px - 50px)'
  } else if (stove !== null && stove !== undefined) {
    return wrapId.style.cssText = 'height: calc(100% - 49px);min-height:calc(1000px - 49px)'
  } else {
    return wrapId.style.cssText = 'height: 100%;min-height:1000px'

  }

});

window.onresize = function () {
  // 윈도우 사이즈 조정시 실행할 함수
  // 윈도우 리사이즈 시 슬라이드 가운데로 위치 조정
  const dummySlide = document.querySelector('.dummy-slide ');
  dummySlide.style.cssText = `flex-basis: ${(window.innerWidth - innerWidth) / 2 + 50}px;`
  swiper.update();

  if (swiper.activeIndex >= 7) {
    return $('#wrap_bg').css('transform', `translateX(-${10000 - window.innerWidth}px)`);
  }
}

window.addEventListener('mousewheel', onMouseWheel, false)
window.addEventListener('DOMMouseScroll', onMouseWheel, false)


swiper.on('slideChangeTransitionEnd', function (e) {
  const direction = swiper.swipeDirection; // 슬라이드 방향
  characterMotion(direction);
});

/**
 * @description: 슬라이드 이동시 배경이동
 * */
swiper.on('slideChange', function (e) {
  // Get the new active slide index
  const currentIndex = swiper.activeIndex; // 현재 슬라이드 인덱스

  console.log(currentIndex)
  if(currentIndex !== 1){
    mouseWheelAnimate.to('.mouse-wheel', {opacity: 0})

  }
  switch (currentIndex) { // 슬라이드 인덱스에 따른 이벤트
    // $('#wrap_bg').css('transform', `translateX(0px)`); // 슬라이드 이동시 배경이동
    case 0:
      $('#wrap_bg').css('transform', `translateX(0px)`);
      character02Motion('prev');
      break;
    case 1:
      // $('#wrap_bg').css('transform', `translateX(-${e.slidesGrid[currentIndex]}px)`);
      $('#wrap_bg').css('transform', $('.swiper-wrapper')[0].style.transform);

      break;
    case 2:
      $('#wrap_bg').css('transform', $('.swiper-wrapper')[0].style.transform);
      character04Motion('prev');
      // from은
      break;
    case 3:
      $('#wrap_bg').css('transform', $('.swiper-wrapper')[0].style.transform);

      character04Motion('prev');
      break;
    case 4:
      $('#wrap_bg').css('transform', $('.swiper-wrapper')[0].style.transform);

      character02Motion('next');
      character05Motion('prev');
      character06Motion('prev');
      character07Motion('prev');
      break;
    case 5:
      $('#wrap_bg').css('transform', $('.swiper-wrapper')[0].style.transform);

      character02Motion('next');
      character06Motion('prev');
      character07Motion('prev');

      break;
    case 6:
      $('#wrap_bg').css('transform', $('.swiper-wrapper')[0].style.transform);

      character07Motion('prev');
      character04Motion('next');

      break;
    case 7:
      $('#wrap_bg').css('transform', $('.swiper-wrapper')[0].style.transform);

      character04Motion('next');
    case 8:
      $('#wrap_bg').css('transform', `translateX(-${10000 - window.innerWidth}px)`);

      break;

    default:
      break;
  }
});


/*
* @name resizeObserver  : resizeObserver
* @description : 리사이즈시 swiper update
* */
const observer = new ResizeObserver((e) => {
  swiper.update();
});

// Observe a dummySlide element
observer.observe(dummySlide);

/*gsap timeline*/
/*
* @name refreshAnimate  : refreshAnimate
* @description : 로드 시 첫 화면 애니메이션
* */
refreshAnimate.fromTo('.section01', {opacity: 0, x: -10}, {delay: 0.2, opacity: 1, x: 0})
  .fromTo('.section02', {opacity: 0, x: -10}, {delay: 0.2, opacity: 1, x: 0}, "-=0.5")
  .fromTo('.section03', {opacity: 0, x: -30}, {delay: 0.4, opacity: 1, x: 0}, "-=0.5")
//               .fromTo('.footer',{opacity:0, y: 30},{opacity:1,y:0},">")
mouseWheelAnimate.fromTo('.mouse-wheel', {delay:0.8,opacity: 0,y:"-40%"}, {delay:0.8,opacity: 1,y:"-50%"}, ">")


/*
* @name: onMouseWheel
* @description: 마우스 휠 이벤트
* */
function onMouseWheel(e) {
  const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
  const direction = e.deltaY > 0 ? 'next' : "perv";
  const stove = document.getElementById('stoveGnb');

  setTimeout(() => {
    characterMotion(direction);

  },500)

  if (isSafari) {
    $(".swiper-wrapper").removeClass('mousewheelSmoothing');
  }

  // if (!isSafari) {
  //   clearTimeout($.data(this, 'timer')); // 이전 setTimeout 을 clear
  //
  //   $(".swiper-wrapper").addClass('mousewheelSmoothing');
  //   if (!stove) {
  //     $.data(this, 'timer', setTimeout(function () {
  //       $(".swiper-wrapper").removeClass('mousewheelSmoothing')
  //     }, 250));
  //   }
  // }
}
// 마우스 휠 이벤트를 막습니다.
contentBody.addEventListener("wheel", function(event) {
  event.preventDefault();
}, { passive: false });

mouseWheel.addEventListener("wheel", function(event) {
  event.preventDefault();
}, { passive: false });
/*
* @name directionMap  : direction에 따른 translateX 값 변경
* @param direction : next, prev
* @param width : translateX width 위치
* @param deviation : +- width의 움직임 변경 값
* */
const directionMap = (direction, width, deviation) => {
  // console.log(direction, width, deviation)
  switch (direction) {
    case 'next':
      return (width + deviation) + 'px';
    case 'prev':
      return (width - deviation) + 'px';
    default:
      return width + 'px'
  }
}


/*
* @name characterMotion  : characterMotion
* @description : 캐릭터 이동
* */
const characterMotion = (direction) => {
  character02Motion(direction);
  character04Motion(direction);
  character05Motion(direction);
  character06Motion(direction);
  character07Motion(direction);
}

const character02Motion = (direction) => {
  section02.style.transform = 'translateX(' + directionMap(direction, 340, 20) + ')';
}
const character04Motion = (direction) => {
  section04_new_character.style.transform = 'translateX(' + directionMap(direction, 360, 20) + ')';
  section04_baunabi_island.style.transform = 'translateX(' + directionMap(direction, 430, 10) + ')';
  section04_system.style.transform = 'translateX(' + directionMap(direction, 395, 10) + ')';
}
const character05Motion = (direction) => {
  section05.style.transform = 'translateX(' + directionMap(direction, 152, 20) + ')';
}
const character06Motion = (direction) => {
  section06.style.transform = 'translateX(' + directionMap(direction, 100, 10) + ')';
}
const character07Motion = (direction) => {
  section07_map_craft.style.transform = 'translateX(' + directionMap(direction, 580, 10) + ')';
  section07_upgrade.style.transform = 'translateX(' + directionMap(direction, 480, 10) + ')';
}
