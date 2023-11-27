/*gsap*/

$(document).ready(function(){
  openMouth();
  onClickContents();
});




/*
* 7/10일
* 클로에 콘첸츠 모아보기
* */

function popup(index) {
  let $modal =  document.querySelector(`.modal${index}`);
  $modal.classList.add('active');

}


function onClickContents() {
  const $menu = document.querySelectorAll('.section03 .list li');

  $menu.forEach((item,index) => {
    item.addEventListener('click', (e) => {
      $menu.forEach((item) => {
        item.classList.remove('active');
      });
      item.classList.add('active');
    });
  });
}

function forceDownload(url){
  let urlData = url.getAttribute('data-href');
  let fileName = 'khloe.zip';
  let link = document.createElement('a');
  // console.log(urlData)
  link.href = urlData;
  link.download = fileName

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}






function openMouth() {

  var speed = 1;
  var imgNum = $('.loop span').length;
  isMotionPlay = true;
  $('.loop span').css('opacity',0);
  //motion loop
  $('.loop span').each(function(e) {
    if (e < imgNum)	{
      TweenMax.fromTo($(this), speed, {opacity:0}, {opacity:1, yoyo:true, repeat:-1,repeatDelay:2, delay:e * speed/2,});
    }
  });
}


