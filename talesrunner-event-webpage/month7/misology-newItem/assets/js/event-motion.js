const itemList = document.querySelector('.item-list');
const parsButton = document.querySelectorAll('.item-parts-button');
const closeButtons = document.querySelectorAll('.popup-close');

/*function*/
/**
* @name handleTabClick
* @description 탭 클릭시 처리
* @param {object} e - 이벤트 객체
* */
const handleTabClick = (e) => {
  const clickedElement = e.target;
  // 클릭된 요소의 클래스를 확인하여 item-tab인 경우에만 처리
  if (clickedElement.classList.contains('item-tab')) {
    // 모든 li 요소에서 'active' 클래스 제거
    const allItems = itemList.querySelectorAll('li');
    allItems.forEach((item) => item.classList.remove('active'));

    // 클릭된 요소의 부모인 li 요소에 'active' 클래스 추가
    const target = clickedElement.closest('li');
    target.classList.add('active');
  }
};

/**
* @name popUpAddActiveClass
* @description 팝업창 활성화
* @param {object} e - 이벤트 객체
* */
const popUpAddActiveClass = (e) => {
  e.target.classList.toggle('active');
};

/**
* @name popUpRemoveActiveClass
* @description 팝업창 비활성화
* @param {number} num - 버튼의 순서
* */
const popUpRemoveActiveClass = (num) => {
  parsButton[num].classList.remove('active');
};


/*event*/
itemList.addEventListener('click', handleTabClick);

parsButton.forEach((button, num) => {
  button.addEventListener('click', popUpAddActiveClass);
  closeButtons[num].addEventListener('click', () => popUpRemoveActiveClass(num));
});
