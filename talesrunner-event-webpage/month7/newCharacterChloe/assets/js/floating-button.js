let floatingWrap = document.querySelector('.floating-button');
let floating = document.querySelectorAll('.floating-button li');
let evtInnerWrap = document.querySelector('#evt-inner-wrap');

window.addEventListener('load', (e) => {
  let evtInnerWrapWidth = evtInnerWrap.clientWidth;
  autoFloatingButtonXPosition(evtInnerWrapWidth)
})

window.addEventListener('resize', (e) => {
  let evtInnerWrapWidth = evtInnerWrap.clientWidth;
  autoFloatingButtonXPosition(evtInnerWrapWidth)
})
window.addEventListener('scroll', (e) => {
  let scrollY = this.scrollY;
  autoScrollFloatingButtonYPosition(scrollY)
})


/*
* @name autoFloatingButtonXPosition
* @param {number} width
* @description 이벤트 페이지의 너비에 따라 플로팅 버튼의 위치를 조정합니다.
* @update 2023.06.05
* */
function autoFloatingButtonXPosition(width) {
  let floatingWrap = document.querySelector('.floating-button');
  let offset = (width - 2560) / 2
  if (width <= 2560) {
    floatingWrap.style.left =  + "px"
  } else {
    floatingWrap.style.left = offset  + 'px'
  }
}


/*
* @name autoScrollFloatingButtonYPosition
* @param {number} scrollY
* @description 이벤트 페이지의 스크롤 위치에 따라 플로팅 버튼의 위치를 조정합니다.
* @update 2023.06.05
* */
function autoScrollFloatingButtonYPosition(scrollY) {
  // section01 780 section02 2430 section03 3173 section04 4330 section05 5437
  // 첫 위치 포지션

  if (scrollY >= 220) floatingWrap.style.transform = `translateY(${scrollY + 100}px)`

  // 플로팅 버튼 활성화 조건 - 다음 section - 100px 으로 설정
  if (scrollY <= 1810) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[0].classList.add('active')
  } else if (scrollY <= 2973) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[1].classList.add('active')
  } else if (scrollY <= 4000) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[2].classList.add('active')
  } else if (scrollY <= 5100) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[3].classList.add('active')
  }  else {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[4].classList.add('active')
  }
}

/*
* @name onFloatingButtonClicked
* @param {number} number
* @description 플로팅 버튼을 클릭했을 때 해당 섹션으로 이동합니다.
* @update 2023.06.12 추가
* */
function onFloatingButtonClicked(number) {
  //navTop 헤더값을 넣어주세요~
  let NavTop = 0;

  let header = $('.evt-header').innerHeight();
  let section01 =$('.section01').innerHeight();
  let section02 =$('.section02').innerHeight();
  let section03 =$('.section03').innerHeight();
  let section04 =$('.section04').innerHeight();

  let headerScroll = header;
  let section01Top = headerScroll + section01;
  let section02Top = section01Top + section02;
  let section03Top = section02Top + section03;
  let section04Top = section03Top + section04;



  switch (number) {
    case 1:
      window.scrollTo({top: headerScroll + NavTop, behavior: 'smooth'})
      break;
    case 2:
      window.scrollTo({top: section01Top + NavTop, behavior: 'smooth'})
      break;
    case 3:
      window.scrollTo({top: section02Top + NavTop, behavior: 'smooth'})
      break;
    case 4:
      window.scrollTo({top: section03Top +NavTop, behavior: 'smooth'})
      break;
    case 5:
      window.scrollTo({top: section04Top +NavTop, behavior: 'smooth'})
      break;
    default:
      window.scrollTo({top: 0, behavior: 'smooth'})
  }
}
