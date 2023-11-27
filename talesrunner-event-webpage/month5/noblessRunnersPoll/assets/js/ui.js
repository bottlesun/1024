window.onload = () => {
    //페이징 처리 js
    let $currentPage = document.querySelector('.currentPage');
    /*응답시작 버튼 */
    let $Btn1 = document.querySelector('.btn');
    //설문조사 초기화면 poll1 체크하는부분은 poll2
    let $Poll1 = document.querySelector('.poll1');
    let $Poll2 = document.querySelector('.poll2');

    function Paging(page) {
        $currentPage.innerHTML =`${page}page`;
    }
    Paging(1);

    $Btn1.addEventListener('click', ()=> {
        $Poll1.style.display ='none';
        Paging(2);
        $Poll2.style.display ='block';
    });
}