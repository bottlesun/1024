window.onload = function () {
      //팝업
      let $popup = document.querySelector('.popup');
      let $closeBtn = document.querySelector('.popup-close');
      let $openBtn = document.querySelector('.btn-detail');


      $openBtn.addEventListener('click', () => {
            $popup.style.display ='block';
      })
      $closeBtn.addEventListener('click', () => {
            $popup.style.display="none";
      } )
}