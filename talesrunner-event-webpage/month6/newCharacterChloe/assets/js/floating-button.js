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
    floatingWrap.style.left = 50 + "px"
  } else {
    floatingWrap.style.left = offset + 50 + 'px'
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
  if (scrollY <= 2330) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[0].classList.add('active')
  } else if (scrollY <= 2973) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[1].classList.add('active')
  } else if (scrollY <= 4130) {
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
  // section01 780 section02 2430 section03 3173 section04 4330 section05 5437

  switch (number) {
    case 1:
      window.scrollTo({top: 780, behavior: 'smooth'})
      break;
    case 2:
      window.scrollTo({top: 2430, behavior: 'smooth'})
      break;
    case 3:
      window.scrollTo({top: 3173, behavior: 'smooth'})
      break;
    case 4:
      window.scrollTo({top: 4330, behavior: 'smooth'})
      break;
    case 5:
      window.scrollTo({top: 5437, behavior: 'smooth'})
      break;
    default:
      window.scrollTo({top: 0, behavior: 'smooth'})
  }
}
