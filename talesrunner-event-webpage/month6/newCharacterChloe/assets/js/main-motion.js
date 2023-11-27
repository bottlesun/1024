/*gsap*/
window.onload = function() {
  onClickButtonTab()
}
const tl = gsap.timeline();

tl.add('start')
  .fromTo('.character', {duration:1,opacity: 0, y: 80}, {duration:1,opacity: 1, y: -85},'start')
  .fromTo('.header-title', {delay:3,duration:1,opacity: 0, y: 80}, {delay:0.3,duration:1,opacity: 1, y: 0},"start")
  .add('start02')
  .fromTo('.motion-item01', {opacity: 0}, {duration:0.5,opacity: 1}, "start02")
  .fromTo('.motion-item02', {opacity: 0}, {duration:0.5,opacity: 1}, "start02")
  .add('start03')
  .fromTo('.motion-item03', {opacity: 0}, {duration:0.5,opacity: 1}, "start03")
  .fromTo('.motion-item04', {opacity: 0}, {duration:0.5,opacity: 1}, "start03")
  .fromTo('.motion-item05', {opacity: 0}, {duration:0.5,opacity: 1}, "start03")



/*
* name onClickButtonTab()
* description: tab click 시 해당하는 영상으로 active 변경
* */

function onClickButtonTab(){
  const tab = document.querySelectorAll('.item-button')
  const itemVideo = document.querySelectorAll('.section04 .item-video')
  
  tab.forEach((item,index) => {
    item.addEventListener('click', (e) => {
      tab.forEach((item) => {
        item.classList.remove('active');
      });
      itemVideo.forEach((item) => {
        item.classList.remove('active');
      })
      item.classList.add('active');
      itemVideo[index].classList.add('active');
    });
  });

}


/*
* 이미지 프리로딩
* */

let images = [];
let imagePaths = [
  "assets/images/section04/section04-item01-button-active.png",
  "assets/images/section04/section04-item02-button-active.png",
  "assets/images/section04/video-img01.jpg",
  "assets/images/section04/video-img02.jpg",
  "assets/images/section04/video-img03.jpg",
  "assets/images/section03/section03-buy-buff-popup.png",
  "assets/images/section03/section03-character-proof-popup.png",
  "assets/images/section03/section03-ecclesia-popup.png",
  "assets/images/section03/section03-welcome-box-popup.png",
  "assets/images/section03/item-character-proof-popup-item01.png",
  "assets/images/section03/item-buy-buff-popup-item01.png",
  "assets/images/section03/item-buy-buff-popup-item02.png",
  "assets/images/section03/item-ecclesia-popup-item01.png",
  "assets/images/section03/item-ecclesia-popup-item02.png",
  "assets/images/section03/item-welcome-box-popup-item01.png",
];

for (let i = 0; i < imagePaths.length; i++) {
  images[i] = new Image();
  images[i].src = imagePaths[i];
}
