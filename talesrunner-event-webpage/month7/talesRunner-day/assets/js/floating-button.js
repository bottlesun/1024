/**
 * @name floatingButton
 * @description 이벤트 페이지의 플로팅 버튼을 관리합니다.
 * @description2 body 하단 부 스크립트를 넣어 준다.
 * */


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
  // console.log(scrollY)
  autoScrollFloatingButtonYPosition(scrollY)
})


/**
 * @name autoFloatingButtonXPosition
 * @param width: width
 * @description 이벤트 페이지의 너비에 따라 플로팅 버튼의 위치를 조정합니다.
 * @update 2023.06.05
 * */
function autoFloatingButtonXPosition(width) {
  let floatingWrap = document.querySelector('.floating-button');
  let offset = (width - 2560) / 2
  if (width <= 2560) {
    floatingWrap.style.left = 50 + "px"
  } else {
    floatingWrap.style.left = offset + 50 + 'px'
  }
}


/**
 * @name autoScrollFloatingButtonYPosition
 * @param scrollY: scrollY
 * @description 이벤트 페이지의 스크롤 위치에 따라 플로팅 버튼의 위치를 조정합니다.
 * @description2 section 별 위치(끝나는 지점)를 수동으로 조절한다. scroll 위치 조절
 * @update 2023.06.05
 * */
function autoScrollFloatingButtonYPosition(scrollY) {
  // section01 1237 section02 1900 section03 2892 section04 4500 section05 7072
  // 첫 위치 포지션
  if (scrollY >= 480) floatingWrap.style.transform = `translateY(${scrollY }px)`

  // 플로팅 버튼 활성화 조건 - 다음 section - 50 ~ 200px 으로 설정
  if (scrollY <= 1850) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[0].classList.add('active')
  } else if (scrollY <= 2600) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[1].classList.add('active')
  } else if (scrollY <= 4200) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[2].classList.add('active')
  } else if (scrollY <= 6800) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[3].classList.add('active')
  } else {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[4].classList.add('active')
  }
}

/**
 * @name onFloatingButtonClicked
 * @param number : 플로팅Index
 * @description 플로팅 버튼을 클릭했을 때 해당 섹션으로 이동합니다.
 * @description2 section 별 위치(시작하는지점)를 수동으로 조절한다. scroll 위치 조절
 * @update 2023.06.12 추가
 * */
function onFloatingButtonClicked(number) {
  // section01 1237 section02 1900 section03 2892 section04 4500 section05 7072

  switch (number) {
    case 1:
      window.scrollTo({top: 1237, behavior: 'smooth'})
      break;
    case 2:
      window.scrollTo({top: 1900, behavior: 'smooth'})
      break;
    case 3:
      window.scrollTo({top: 2892, behavior: 'smooth'})
      break;
    case 4:
      window.scrollTo({top: 4450, behavior: 'smooth'})
      break;
    case 5:
      window.scrollTo({top: 7000, behavior: 'smooth'})
      break;
    default:
      window.scrollTo({top: 0, behavior: 'smooth'})
  }
}
