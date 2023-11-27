let $popup;

function attractionMenuAction(number) {
  const imageTargets = $(".img");
  imageTargets.find("img").remove();
  Array.from({ length: imageTargets.length }).map((_, index) => {
    $(`.img${index + 1}`).append(`   
    <img src="./assets/images/item4/${number}-${index + 1}.png" alt="">
    `);
  });
  $(".txt").attr("src", `./assets/images/item4/txt_${number}.png`);
}

function memorialMenuAction($target) {
  const $type = $target.attr("content-type"),
    $webtoon = $(".item5-webtoon"),
    $container = $webtoon.find(".webtoon-container"),
    $movie = $(".item5-movie"),
    $iframe = $(".movie-iframe");

  // 웹툰일때
  if ($type === "webtoon") {
    $movie.css({ display: "none" });
    $webtoon.show();
    $container.find("img").remove();
    // 스크롤 위치 유지되는 이슈 => scrollTop=0 변경 (SMILE-GATE-EVNETS-T-129)
    $container[0].scrollTop = 0;
    // 일부 영상 계속 재생되는 오류 (SMILE-GATE-EVNETS-T-127)
    $iframe.find("iframe").remove();
    const webIndex = $target.attr("webtoon-index"),
      length = +$target.attr("webtoon-count");
    Array.from({ length }).forEach((_, index) => {
      $(".webtoon-container").append(` 
    <img src="./assets/images/item5/${webIndex}-${index + 1}.jpg" alt="">
    `);
    });
  }
  // 영상일 때
  if ($type === "movie") {
    $webtoon.css({ display: "none" });
    $movie.show();
    const src = `https://www.youtube.com/embed/RT60LHSBvv8?&rel=0&amp;controls=1&amp;showinfo=0`;
    $iframe.find("iframe").remove();
    $iframe.append(`<iframe src=${src} allowfullscreen></iframe>`);
  }
}

function popupAction($type, $popup) {
  const url = "RT60LHSBvv8";
  $("body").addClass("active");
  let src = "";
  if ($type === "item1")
    src = `https://www.youtube.com/embed/${url}?&rel=0&amp;controls=1&amp;showinfo=0`;
  if ($type === "item2")
    src = `https://www.youtube.com/embed/${url}?&rel=0&amp;controls=1&amp;showinfo=0`;
  if ($type === "item3")
    src = `https://www.youtube.com/embed/${url}?&rel=0&amp;controls=1&amp;showinfo=0`;
  if ($type === "item5")
    src = `https://www.youtube.com/embed/${url}?&rel=0&amp;controls=1&amp;showinfo=0`;
  if ($type === "item6")
    src = `https://www.youtube.com/embed/${url}?autoplay=1&mute=1&rel=0&controls=1&showinfo=0&color=white`;

  // 유튜브 삽입
  if ($popup.children("iframe")) {
    $popup.find("iframe").remove();
    $popup
      .find(".iframe")
      .append(
        `<iframe src=${src} allow="autoplay; encrypted-media"  allowfullscreen></iframe>`
      );
  }
  // $type 별 분기처리
  if ($type === "item4") {
    const $activeTarget = $($(".content-item")[0]),
      number = $activeTarget.attr("content-number");
    $activeTarget.addClass("active");
    attractionMenuAction(number);
  }
  if ($type === "item5") {
    const $activeTarget = $(".menu-button").first();
    $activeTarget.addClass("active");
    memorialMenuAction($activeTarget);
  }
}

function popupCloseAction($type, $popup) {
  $popup.removeAttr("style").removeClass("show");
  $("body").removeClass("active");
  $popup.find("iframe").remove();
  if ($type === "item4") {
    $(".img").find("img").remove();
    $(".content-item").removeClass("active");
  }
  if ($type === "item5") {
    $(".menu-button").removeClass("active");
    $(".item5-movie").hide();
    $(".item5-webtoon").hide();
    $(".webtoon-container").find("img").remove();
  }
}

function clickMemorialMenu(that) {
  const $activeTarget = $(that);
  $(".menu-button").removeClass("active");
  $activeTarget.addClass("active");
  memorialMenuAction($activeTarget);
}

function clickAttractionMenu(that) {
  const $this = that,
    number = $(that).attr("content-number");
  $(".content-item").removeClass("active");
  $($this).addClass("active");
  attractionMenuAction(number);
}

/* ◽common 함수
  - 여름 브랜드 3차 재사용 함수.
 * */

function popup(obj) {
  $popup = $(obj);
  $popup.addClass("show");
  const $type = $popup.attr("data-popup-id");
  popupAction($type, $popup);
}

function popupClose(that, isSelf) {
  const $isSelf = isSelf;
  const $popup = $isSelf ? $(that) : $(that).parents(".popup");
  const $type = $popup.attr("data-popup-id");
  popupCloseAction($type, $popup);
}

function controlBackground() {
  $(".button").mouseover(() => {
    $(".bg").css({ display: "block" });
  });
  $(".button").mouseleave(() => {
    $(".bg").css({ display: "none" });
  });
}

$(window).on("load", () => {
    controlBackground();
});
