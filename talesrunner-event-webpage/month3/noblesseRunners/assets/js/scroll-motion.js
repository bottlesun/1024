const section01Item = gsap.timeline();
const section01ScrollMotion = gsap.timeline();
const section02Item = gsap.timeline();
const section03Item = gsap.timeline();
const section03ScrollMotion = gsap.timeline();
const section04Item = gsap.timeline();
const section05Item = gsap.timeline();

const hangame = document.getElementById('gnbWrapDiv');
const stove = document.getElementById('stoveGnb');
const sideBar = document.getElementById('sideEvtNav');

let x = 0;
let y = 0;
let speed = 0.03;

$(document).ready(function(){
  const nexon = document.getElementsByClassName('gnbWrapper')[0];
  console.log('jquery ready')
  if (nexon !== null && nexon !== undefined) {
    return sideBar.style.cssText = 'top:63px'
  } else if (hangame !== null && hangame !== undefined) {
    return sideBar.style.cssText = 'top:51px'
  } else if (stove !== null && stove !== undefined) {
    return sideBar.style.cssText = 'top:49px'
  }
})


swiper.on('slidePrevTransitionStart', function (e) {
  const nexon = document.getElementsByClassName('gnbWrapper')[0];
    console.log(e.activeIndex)
  if (e.activeIndex === 0) {
    if (nexon !== null && nexon !== undefined) {
      if (sideBar !== null && sideBar !== undefined) sideBar.style.cssText = 'top :63px';
      return nexon.style.cssText = 'opacity: 1;'
    } else if (hangame !== null && hangame !== undefined) {
      if (sideBar !== null && sideBar !== undefined) sideBar.style.cssText = 'top :51px';
      return hangame.style.cssText = 'opacity: 1;'
    } else if (stove !== null && stove !== undefined) {
      if (sideBar !== null && sideBar !== undefined) sideBar.style.cssText = 'top :49px';
      return stove.style.cssText = 'opacity: 1;'
    }
  }
})

/*현재 위치 표시*/
swiper.on('slideChange', function () {
  // Get the new active slide index
  const currentIndex = swiper.activeIndex;
  switch (currentIndex) {
    case 1:
      /*section01 event*/
      swiper.disable()
      section01Animate();
      section02AnimateReset();
      const nexon = document.getElementsByClassName('gnbWrapper')[0];
      if (sideBar !== null && sideBar !== undefined) {
        sideBar.style.cssText = 'top :0';
      }
      if (nexon !== null && nexon !== undefined) {
        return nexon.style.cssText = 'height:0;opacity: 0;overflow:hidden'
      } else if (hangame !== null && hangame !== undefined) {
        return hangame.style.cssText = 'height:1px;opacity: 0;overflow:hidden'
      } else if (stove !== null && stove !== undefined) {
        return stove.style.cssText = 'height:1px;opacity: 0;overflow:hidden'
      }
      break;
    case 2:
      swiper.disable()
      section02Animate();
      section03AnimateReset();
      break;
    case 3:
      swiper.disable()
      section02AnimateReset();
      section03Animate();
      break;
    case 4:
      swiper.disable()
      section03AnimateReset();
      section04Animate();
      break;
    case 5:
      swiper.disable()
      section05Animate();
      break;
    default:
      break;
  }


  (currentIndex !== 3) && document.querySelector('.section03-img-bg').removeEventListener('mousemove', handelMouseMove, false);
  (currentIndex === 5) ? document.querySelector('.footer').classList.remove('hides') : document.querySelector('.footer').classList.add('hides');
});


function handelMouseMove(e) {
  // e.clientX,Y (마우스 무브 기준 위치 = 브라우저 안쪽 넓이 , 높이 / 2) = 가운데 값
  x = (e.clientX - window.innerWidth / 2);
  y = (e.clientY - window.innerHeight / 2);
  const section03Img = document.querySelector('.section03-img-bg')
  section03Img.style.transform = ` translate(${x / 50}px,${y / 50}px)`;
}


function section01Animate() {
  /*section01 event*/
  section01ScrollMotion.fromTo('.left-side-text', {y: -5, ease: "expo.out"}, {y: 0})
    .fromTo('.section01-img-bg .section01-polygon-item01', {y: -150, ease: "expo.out"}, {y: 0}, ">")
    .fromTo('.section01-img-bg .section01-polygon-item02', 1, {y: -150, ease: "expo.out"}, {y: 0}, ">")
    .fromTo('.section01-img-bg .section01-polygon-item03', 1, {y: 300, ease: "expo.out"}, {y: 0}, "<")
    .fromTo('.section01-img-bg .section01-alphabet-b', 1, {opacity: 0, y: 150, ease: "expo.out"}, {
      opacity: 1,
      y: 0
    }, "<")
    .fromTo('.section01-img-bg .section01-alphabet-n01', 1, {opacity: 0, y: 250, ease: "expo.out"}, {
      opacity: 1,
      y: 0
    }, "<")
    .fromTo('.section01-img-bg .section01-polygon-item04', {opacity: 0, y: 400, ease: "expo.out"}, {
      opacity: 1,
      y: 0
    }, "<")
    .fromTo('.section01-img-bg .section01-alphabet-n02', 1, {opacity: 0, y: 250, ease: "expo.out"}, {
      opacity: 1,
      y: 0
    }, "<")
    .fromTo('.section01-img-bg .section01-alphabet-r', 1, {opacity: 0, y: 250, ease: "expo.out"}, {
      opacity: 1,
      y: 0
    }, "<")
    .fromTo('.section01-img-bg .section01-polygon-item05', 1, {opacity: 0, y: 400, ease: "expo.out"}, {
      opacity: 1,
      y: 0
    }, "<")

  section01Item.fromTo('.section01-top-text', {delay: 1, opacity: 0, y: -60, ease: "expo.out"}, {
    delay: 1,
    opacity: 1,
    y: 0
  })
    .fromTo('.section01-md-text', 1, {opacity: 0, y: -60, ease: "expo.out"}, {opacity: 1, y: 0,})
    .fromTo('.section01-bottom-text', 1, {opacity: 0, y: -60, ease: "expo.out"}, {opacity: 1, y: 0}, "<")

  setTimeout(() => {
    return swiper.enable()
  }, 2000)
}


function section02Animate() {
  /*section02 event*/
  section02Item.fromTo('.section02-icon span', {opacity: 0, ease: "expo.out"}, {opacity: 1})
    .fromTo('.section02-big-text', 2, {x: -500, ease: "expo.out"}, {x: 0}, ">")
    .fromTo('.section02-text-01 span', 2.5, {width: 0, ease: "expo.out"}, {width: "100%"}, "<")
    .fromTo('.section02-title span', 2.5, {width: 0, ease: "expo.out"}, {width: "100%"}, "<")
    .fromTo('.section02-text-02 ', 2.5, {width: 0, ease: "expo.out"}, {width: "100%"}, "<")
    .fromTo('.section02-bottom-text-line', 1, {width: 0, ease: "expo.out"}, {width: "100%"}, "<")
    .fromTo('.section02-bottom-text-img', 1, {width: 0, ease: "expo.out"}, {width: "100%"}, "<")
    .fromTo('.section02-bottom-text span', 1, {width: 0, ease: "expo.out"}, {width: "100%"}, "<")
    .fromTo('.section02-circle', 1, {opacity: 0, ease: "expo.out"}, {opacity: 1}, ">")
  setTimeout(() => {
    return swiper.enable()
  }, 2000)
}

function section02AnimateReset() {
  section02Item.to('.section02-icon span', {opacity: 0})
    .to('.section02-big-text', {x: -500}, "<")
    .to('.section02-text-01 span', {width: 0}, "<")
    .to('.section02-title span', {width: 0}, "<")
    .to('.section02-text-02 ', {width: 0}, "<")
    .to('.section02-bottom-text-line', {width: 0}, "<")
    .to('.section02-bottom-text-img', {width: 0}, "<")
    .to('.section02-bottom-text span', {width: 0}, "<")
}


function section03Animate() {
  /*section03 event*/
  section03ScrollMotion.fromTo('.section03-img-wrap', 1, {y: -100, ease: "expo.out"}, {y: 0})
  section03Item.fromTo('.section03-icon span', 1, {opacity: 0, ease: "expo.out"}, {opacity: 1})
    .fromTo('.section03-text-01 span', 1, {width: 0, ease: "expo.out"}, {width: "100%"}, "<")
    .fromTo('.section03-title span', 1, {width: 0, delay: 0.4, ease: "expo.out"}, {width: "100%", delay: 0.4}, "<")
    .fromTo('.section03-bottom-text span', 1, {width: 0, ease: "expo.out"}, {width: "100%"}, "<")
    .to('.section03-img-bg', 2, {
      update: () => {
        //window.addEventListener('mousemove', handelMouseMove, false)
        document.querySelector('.section03-img-bg').addEventListener('mousemove', handelMouseMove, false)
      }
    }, ">")

  setTimeout(() => {
    return swiper.enable()
  }, 2000)
}

function section03AnimateReset() {
  section03ScrollMotion.to('.section03-img-wrap', {y: -100})
  section03Item.to('.section03-icon span', {opacity: 0})
    .to('.section03-text-01 span', {width: 0}, "<")
    .to('.section03-title span', {width: 0}, "<")
    .to('.section03-bottom-text span', {width: 0}, "<")
}


function section04Animate() {
  /*section04 event*/
  section04Item.fromTo('.section04 .bg1', 1, {y: 50, x: 600, ease: "expo.out"}, {y: 0, x: 0})
    .fromTo('.section04 .bg2', 1, {y: 150, x: -600, ease: "expo.out"}, {y: 0, x: 0}, "<")
    .fromTo('.section04-text-01', 1, {opacity: 0, y: -60, ease: "expo.out"}, {opacity: 1, y: 0}, "<")
    .fromTo('.section04-title', 1, {opacity: 0, y: -80, ease: "expo.out"}, {opacity: 1, y: 0}, "<")
    .fromTo('.section04-md-item', 1, {opacity: 0, y: -60, ease: "expo.out"}, {opacity: 1, y: 0})
    .fromTo('.section04-bottom-text', 1, {opacity: 0, y: -60, ease: "expo.out"}, {opacity: 1, y: 0}, "<")

  setTimeout(() => {
    return swiper.enable()
  }, 2000)
}

function section05Animate() {
  /*section05 event*/
  section05Item.fromTo('.section05-title span', 1, {y: 150, opacity: 0}, {y: 0, opacity: 1})
    .fromTo('.section05-text span', 1, {y: 150, opacity: 0}, {y: 0, opacity: 1}, ">")
    .fromTo('.hides', 1, {y: 50, opacity: 0}, {y: 0, opacity: 1}, "<")

  setTimeout(() => {
    return swiper.enable()
  }, 2000)
}
