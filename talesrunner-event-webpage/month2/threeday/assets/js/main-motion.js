$(function () {

  /* 누적코인 받기 완료 시 버튼 disabled 처리 */
  $('.swap-coin-button-item').click(function() {
    if(!confirm('해당 아이템을 받으시겠습니까?')) return false;
    $(this).addClass('button-complete');
  });
});
