let floatingWrap = document.querySelector('.floating-button');
let floating = document.querySelectorAll('.floating-button li');
let evtInnerWrap = document.querySelector('#evt-wrap');

window.addEventListener('load', (e) => {
  let evtInnerWrapWidth = document.querySelector('.floating-button').clientWidth;
  // autoFloatingButtonXPosition(evtInnerWrapWidth)
})

window.addEventListener('resize', (e) => {
  let evtInnerWrapWidth = document.querySelector('.floating-button').clientWidth;
  // autoFloatingButtonXPosition(evtInnerWrapWidth)
})
window.addEventListener('scroll', (e) => {
  let scrollY = this.scrollY;
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
  let targetPosition =document.querySelector(".section1 .inner").getClientRects()[0].left;

  if(Math.floor((targetPosition/window.innerWidth)*100) < 10)floatingWrap.style.left = `calc(${Math.floor((targetPosition/window.innerWidth)*100 - 10) + "%"})`
  else floatingWrap.style.left = `calc(${Math.floor((targetPosition/window.innerWidth)*100) + "%"} - ${floatingWrap.clientWidth  + "px"})`
}


/**
* @name autoScrollFloatingButtonYPosition
* @param scrollY: scrollY
* @description 이벤트 페이지의 스크롤 위치에 따라 플로팅 버튼의 위치를 조정합니다.
* @update 2023.06.05
* */
function autoScrollFloatingButtonYPosition(scrollY) {
 const part2Top= $('.part2').offset().top,
     $part3Top= $('.part3').offset().top
  floatingWrap.style.transition="0.4s";
  if (scrollY >= 120) floatingWrap.style.transform = `translateY(${scrollY - 50}px)`
  // 플로팅 버튼 활성화 조건 - 다음 section - 100px 으로 설정
  if (scrollY < part2Top) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[0].classList.add('active')
  }

  if(scrollY >= part2Top &&scrollY < $part3Top ){
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[1].classList.add('active')
  }
  if(Math.round(scrollY) >= $part3Top){
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[2].classList.add('active')
  }
}

/**
* @name onFloatingButtonClicked
* @param elem || null
* @description 플로팅 버튼을 클릭했을 때 해당 섹션으로 이동합니다.
* @update 2023.07.20 수정
* */
function onFloatingButtonClicked(elem) {
  // section01 780 section02 2430 section03 3173 section04 4330 section05 5437
  const top = !elem ? 0: $(elem).offset().top;
  window.scrollTo({top, behavior: 'smooth'})
}
