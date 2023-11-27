let floatingWrap = document.querySelector('.floating-button');
let floating = document.querySelectorAll('.floating-button li');
let evtInnerWrap = document.querySelector('#evt-inner-wrap');

window.addEventListener('load', (e) => {
  let evtInnerWrapWidth = evtInnerWrap.clientWidth;
  autoFloatingButtonXPosition(evtInnerWrapWidth)
  realTime();
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
  let offset = (width - 1920) / 2
  if (width <= 1920) {
    floatingWrap.style.left = 0 + "px"
  } else {
    floatingWrap.style.left = offset + 'px'

  }
}


/*
* @name autoScrollFloatingButtonYPosition
* @param {number} scrollY
* @description 이벤트 페이지의 스크롤 위치에 따라 플로팅 버튼의 위치를 조정합니다.
* @update 2023.06.05
* */
function autoScrollFloatingButtonYPosition(scrollY) {
  // 선물 1 990px 선물 2 1710px 선물 3 2568px 선물 4 3946px

  if (scrollY >= 900) floatingWrap.style.transform = `translateY(${scrollY + 100}px)`

  if (scrollY <= 1409) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[0].classList.add('active')
  } else if (scrollY <= 2367) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[1].classList.add('active')
  } else if (scrollY <= 3545) {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[2].classList.add('active')
  } else {
    floating.forEach((item) => {
      item.classList.remove('active')
    })
    floating[3].classList.add('active')
  }
}


/*
* @name realTime
* @description 현재 시간을 표시합니다.
* @update 2023.06.05
* */
function realTime() {
  let realTime = document.querySelector('.real-time')

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formattedDate = `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day}`;

  return realTime.innerText = formattedDate
}

/*
* @name onFloatingButtonClicked
* @param {number} number
* @description 플로팅 버튼을 클릭했을 때 해당 섹션으로 이동합니다.
* @update 2023.06.12 추가
* */
function onFloatingButtonClicked(number) {
  // 선물 1 990px 선물 2 1710px 선물 3 2568px 선물 4 3946px
  switch (number) {
    case 1:
      window.scrollTo({top: 960, behavior: 'smooth'})
      break;
    case 2:
      window.scrollTo({top: 1710, behavior: 'smooth'})
      break;
    case 3:
      window.scrollTo({top: 2568, behavior: 'smooth'})
      break;
    case 4:
      window.scrollTo({top: 3946, behavior: 'smooth'})
      break;
    default:
      window.scrollTo({top: 0, behavior: 'smooth'})
  }
}
