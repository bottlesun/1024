$(document).ready(function () {
    insertImage();
    lnbListControl();
    setSwiper();
 
});

// popup view - hide
var notToday = false;
function popup(obj, url) {
    var $popup = $(obj);
    if (!!notToday) {
        $(".btn-anymore").hide();
    }

    if (!!url) {
        $popup.find("iframe").remove();
        $popup
            .find(".iframe")
            .append(
                '<iframe src="https://www.youtube.com/embed/' +
                    url +
                    '?&rel=0&amp;controls=1&amp;showinfo=0" allow="encrypted-media" allowfullscreen></iframe>'
            );
    }

    $("#wrapper").addClass("scroll-none");
    $popup.css("display", "flex").focus();
    return false;
}

function popupClose(that, isSelf) {
    var $isSelf = isSelf;
    var $popup = $isSelf ? $(that) : $(that).parents(".popup");
    var $type = $popup.attr("data-popup-id");

    $("#wrapper").removeClass("scroll-none");
    $popup.removeAttr("style").hide();

    if ($type == "youtube") {
        $popup.find(".iframe").empty();
    }
    if ($type == "goods") {
        $(".lnb-list li").removeClass("active");
        $(".lnb-list li[data-state=open]").addClass("active");
    }
   
}

function insertImage() {
    //7월6일 수정 이미지랜덤이 아닌 1개로만 보이게하기
    // var number = Math.floor(Math.random() * 2) + 1;
    var number = 1;
    var imgSrc = `${imageUrl}assets/images/`;
    var today = new Date(),
        year = today.getFullYear(),
        month = ("0" + (today.getMonth() + 1)).slice(-2),
        day = ("0" + today.getDate()).slice(-2),
        hours = ("0" + today.getHours()).slice(-2),
        minutes = ("0" + today.getMinutes()).slice(-2),
        seconds = ("0" + today.getSeconds()).slice(-2),
        nowTime = year + month + month + day + hours + minutes + seconds;
    
    $(".img-box").html(
        '<img src="' +
            imgSrc +
            "bg_0" +
            number +
            ".jpg?ver=" +
            nowTime +
            '" alt="image">'
    ).attr('data-id',number);
    $("body").attr('data-id',`random_${number}`);

    
}

function lnbControl() {
    $(".lnb-wrap").toggleClass("open");
}

function lnbListControl() {
    $(".lnb-list a.lnb-item").on("click", function () {
        $(".lnb-list li").removeClass("active");
        $(this).parents("li").addClass("active");
        lnbControl();
    });
}

function setSwiper() {
    let imageSwiper = new Swiper(".swiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        autoHeight: true,
        calculateHeight: true,
    });
}
