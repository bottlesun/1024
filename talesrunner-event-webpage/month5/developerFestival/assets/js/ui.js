/*
* @name ui.js
* @description UI 관련 스크립트
* @version 1.0.0
* @update 2023.05.18
* */

const mapList = [
  {
    id: "01",
    name: '라푼젤 찾기',
    src: 'item-more-01',
    description: '여덟 개의 탑! 진짜 라푼젤은 어디에??!',
    map_type: '트레이닝',
    difficulty: '★★★',
    game_type: '노템전/8인',
    vote: 23369,
  },
  {
    id: "02",
    name: '너굴 너굴',
    src: 'item-more-02',
    description: '횡 모드에서 진행하는 아케이드 게임',
    map_type: '트레이닝',
    difficulty: '★★★',
    game_type: '노템전/8인/30인',
    vote: 11653,
  },
  {
    id: "03",
    name: '(HC) 거미 거미',
    src: 'item-more-03',
    description: '횡으로 진행되는 로프 액션을 즐겨봐!',
    map_type: '하드코어',
    difficulty: '★★★★',
    game_type: '노템전/8인/30인',
    vote: 26989,
    acceptance_speech:'거미인간처럼 슝슝 날아다니는 맵을<br/>  만들고 싶었습니다. <br/> 좋아해 주시고 투표해 주셔서<br/> 정말 무한히 엄청나게 감사합니다. '
  },
  {
    id: "04",
    name: '차사 훈련소',
    src: 'item-more-04',
    description: '소형 차사가 되어 모험을 떠나자!',
    map_type: '트레이닝',
    difficulty: '★★★',
    game_type: '아이템전/8인',
    vote: 21277
  },
  {
    id: "05",
    name: "초 스피드 앗! 비좁아",
    src: 'item-more-05',
    description: '비좁아 비좁아 맵이 비좁아',
    map_type: '트레이닝',
    difficulty: '★★★',
    game_type: '노템전/아이템전/8인/30인',
    vote: 47106,
    acceptance_speech: `개발자 맵을 만들 때<br/> 항상 하는 생각이 있습니다.<br/><br/>
     "개발자 맵만큼은 스트레스 덜 받고 골인 할 수 있었으면 좋겠다! 재미는 덤으로~" <br/><br/>
이번 맵엔 그게 나름의 재미로 <br/>잘 전달이 된 거 같아서 기쁩니다.<br/><br/>
완성도는 조금 떨어질지는 몰라도 <br/>개발자 맵에서 기존 정식 맵에서 없는
재미를 많이들 얻었으면 좋겠습니다. <br/><br/> 다음에 또 기회가 된다면<br/>다시 이상한 맵으로 찾아뵙겠습니다.<br/> 재미있게 즐겨주셔서 감사합니다. `,
  },
  {
    id: "06",
    name: '앙리성 지하 대탐험',
    src: 'item-more-06',
    description: '앙리성 지하 공간에서 펼쳐지는 아슬아슬한 레이싱!!',
    map_type: '트레이닝',
    difficulty: '★★★',
    game_type: '노템전/8인/30인',
    vote: 20124
  },
  {
    id: "07",
    name: '회오리 감자',
    src: 'item-more-07',
    description: '회오리 감자 모양의 길을 따라 위로 빨리 올라가야 하는 맵',
    map_type: '트레이닝',
    difficulty: '★★★★',
    game_type: '아이템전/8인/30인',
    vote: 15610
  },
  {
    id: "08",
    name: "마실",
    src: 'item-more-08',
    description: '공원을 산책한다는 느낌의 힐링 맵',
    map_type: '트레이닝',
    difficulty: '★',
    game_type: '노템전/8인',
    vote: 16587
  },
  {
    id: "09",
    name: "(HC) 나타나욧",
    src: 'item-more-09',
    description: '바닥이 사라졌다 생겼다~ 떨어지지 않고 레브 요원을 피해 달려보세욧!',
    map_type: '하드코어',
    difficulty: '★★★',
    game_type: '노템전/아이템전/8인/30인',
    vote: 21991
  },
  {
    id: "10",
    name: "(HC) 점프하면 죽는 병에 걸림",
    src: 'item-more-10',
    description: '뇌절 달리기 2탄으로 점프를 하면 죽는 맵',
    map_type: '하드코어',
    difficulty: '★★★★',
    game_type: '노템전/8인',
    vote: 44560,
    acceptance_speech: `제가 테일즈런너에서<br/> 제일 좋아하는 구간을 맵으로 만들었는데<br/>
많은 분들께서<br/> 투표해 주셔서 정말 감사드립니다! <br/><br/>
다음에도 개발자 페스티벌이 또 진행된다면,<br/> 더욱 재미있는 맵과
구성으로<br/><br/> 런너여러분들께<br/> 즐거움을 드리기 위해 노력하겠습니다!`,
  },
  {
    id: "11",
    name: "무한열차",
    src: 'item-more-11',
    description: '열차를 타고 황무지의 감옥을 탈출하자!',
    map_type: "트레이닝",
    difficulty: '★★★★★',
    game_type: '노템전/8인/30인',
    vote: 26705,
  },
];
const itemList = [
  {
    id: "01",
    name: "인비저블맨",
    src: 'section03-item-more-01',
    description: `누구도 나를 찾을 수 없다<br/> 눈을 크게 떠야지만 나를 찾을 수 있을걸?`,
    position: '변신 캐릭터',
    ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    vote: 25344
  },
  {
    id: "02",
    name: "퓨전파워 크라운 / 윙",
    src: 'section03-item-more-02',
    description: `기계의 도움으로 차원 에너지를 융합하여<br/> 힘을 얻을 수 있는 아이템`,
    position: '복장(머리/등)',
    ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    vote: 8867,
  },
  {
    id: "03",
    name: "빙글빙글",
    src: 'section03-item-more-03',
    description: '미니 스카이다이빙~',
    position: '모션 아이템',
    ref: `스토리 캐릭터 포함<br/> 모든 캐릭터 모션 적용`,
    vote: 11209
  },
  {
    id: "04",
    name: "에어로마스터",
    src: 'section03-item-more-04',
    description: `이제 비행기를 타고 있는 <br/>너의 모습을 상상해~!! `,
    position: '모션 아이템',
    ref: `스토리 캐릭터 포함<br/> 모든 캐릭터 모션 적용`,
    vote: 7973
  },
  {
    id: "05",
    name: "귀농일기 & 내츄럴 썸머 룩",
    src: 'section03-item-more-05',
    description: `엘림스, 카인, 로로아의 귀농일기<br/> 고생했어. 여기, 선물!!`,
    position: `복장(머리/머리·헤어/상·하의/신발/손/얼굴/등)`,
    ref: '엘림스·카인·로로아 전용 복장',
    vote: 41757,
    acceptance_speech: `안녕하세요. 우선 개발자 페스티벌을 사랑해 주신 런너 여러분께 진심으로 감사 인사를 전합니다.<br/>
<br/>
귀농일기 복장은 문득 저 아이들에게 <br/>몸뻬 바지를 입히면 어떨까? 라는 <br/>생각을 시작으로 모자와 장갑, 막삽까지<br/> 제작하게 되었습니다.<br/><br/>
이렇게 많은 표를 받게 될 줄은<br/> 상상도 못했네요!<br/> 귀농일기 바지 염색은<br/> 꼭 해보시길 추천합니다!<br/><br/>
내츄럴 썸머 복장은 <br/>매년 여름 더위를 힘겹게 보내는<br/> 엘림스 ,카인 , 로로아에게 여름 옷을 선물해 주고 싶어 제작하게 되었습니다.<br/>
더 다양한 캐릭터들에게<br/> 멋진 의상을 선물하고 싶었으나 <br/>일정이 여의치 않아 아쉬운 마음이 큽니다.<br/><br/>
게시판 등을 통해 염색 코드 올려주시고<br/> 후기 올려주시는 것들 잘 보고 있습니다!<br/> 예쁘게 봐주셔서 너무 감사합니다!`,
  },
  {
    id: "06",
    name: "테일즈북 스킨",
    src: 'section03-item-more-06',
    description: `다양한 테일즈북 스킨들을 준비해 보았습니다.<br/> 나만의 개성 있는 테일즈북을 꾸며보세요!`,
    position: '테일즈북 스킨',
    ref: '-',
    vote: 27041
  },
  {
    id: "07",
    name: "귀염 동물 10종",
    src: 'section03-item-more-07',
    description: `10마리의 동물로 변신하여<br/> 테일즈런너를 즐겨봅시다!`,
    position: '변신 캐릭터',
    ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    vote: 23151
  },
  {
    id: "08",
    name: "낭만 포엣 셔츠 복장",
    src: 'section03-item-more-08',
    description: "낭만의 도련님 포엣 셔츠 복장",
    position: '복장(상·하의/신발)',
    ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    vote: 39961,
    acceptance_speech: `안녕하세요, 흑마늘 네 쪽 팀에서 포엣셔츠<br/> 복장을 기획한 흑마늘 두 쪽이 입니다.<br/>
제작하면서도 이렇게 풀어 헤친<br/> 옷을..포엣셔츠라고 해도 괜찮을까?<br/> 런너분들께서 좋아해 주실까? 제작 내내<br/> 긴가민가했었는데, 좋은 결과를 전해 듣고<br/> 정말 깜짝 놀랐습니다.<br/>
<br/>
듬직한 남캐들에겐 입히면서는 죄책감이<br/> 들진 않았는데, 시호와 근엄하신 담연<br/> 부장님께 입혀주면서 죄책감이 들더라구요.<br/>
옷을 입히며 시호와 부장님께 죄송하다<br/> 개인적으로 사과의 말을 전했더니<br/> 이번만 용서해 주겠다 해주셔서 다행히 당사자들과 잘 해결되었습니다. <(_ _)><br/>
<br/>
이런 인정 많은 테일즈런너의 주민들과 런너님들의 사랑 덕분에 언제나 마우스와 싸우면서 열심히 복장을 입혀 줄 수 있는 것 같습니다.<br/>
런너님들의 관심은 저희들의 큰 힘이 된다는 말을 항상 전하고 싶었는데<br/> 이번 기회를 통해 전할 수 있어서 올해 개발자를 참여하기 잘했다는 생각이 들어요.<br/>
<br/>
저희는 올해 여름, 바우나비 섬에서 런너님들이 즐거운 피서를 보내실 수 있도록 준비하고 있겠습니다!<br/> 동화나라에서 함께해 주시는 런너님들<br/> 언제나, 항상, 감사합니다!!! `,
  },
  {
    id: "09",
    name: "우주냥 & 별똥묘 복장",
    src: 'section03-item-more-09',
    description: `운명의 짝을 찾아 우주를<br/> 떠돌아다니는 우리들 `,
    position: '복장',
    ref: '고양이/토끼 슈 전용 복장',
    vote: 41120,
    acceptance_speech: `안녕하세요! 슈 복장 시리즈를 맡은<br/> 흑마늘 네 쪽 중 두 쪽입니다.<br/><br/>
우주냥 시리즈는 제 냥이슈에게 <br/>내 취향의 귀여운 슈트 한 벌 입히고 싶다는<br/> 생각으로 디자인하게 되었는데요,<br/> 그런 제 원화를 멋지게 모델링해 주신<br/> 나머지 두 쪽 님께<br/> 먼저 감사의 인사를 올리고 싶네요!<br/>
그리고 투표해 주신 런너분들께도 GRAND 감사의 인사를 올립니다.<br/><br/> 여러분의 표 덕분에 이렇게 인사드릴 기회를 얻게 되어 기쁘네요<br/> <br/>평소에도 런너분들 곁에서 달리고 있지만,<br/> 개발자 이벤트 때는 누가 우리 아이템을 <br/>착용하고 있진 않은지 낚시터를 돌아다니며 <br/> 남몰래 런너분들을 구경하곤 한답니다.<br/> 런너분들 사랑해요♡♡♡`,
  },
  {
    id: "10",
    name: "뉴앙스 티셔츠",
    src: 'section03-item-more-10',
    description: `MZ 세대라면 무조건 구매 필수! <br/> 유행에 민감한 런너님들에게 자신 있게 권합니다!!`,
    position: '복장(상의)',
    ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    vote: 10305
  },
  {
    id: "11",
    name: "뺙뺙",
    src: 'section03-item-more-11',
    description: "노곤노곤한 날 따뜻한 햇볕 아래 나무 휴식공간.<br/> 귀여운 뺙뺙이와 함께라면 잠시나마 피로함이 날아갈지도?",
    position: '모션 아이템',
    ref: `스토리 캐릭터 포함 <br/> 모든 캐릭터 모션 적용`,
    vote: 13727
  },
  {
    id: "12",
    name: "인형 뽑기",
    src: 'section03-item-more-12',
    description: "인형 뽑기 기계 속에 갇혔어요!<br/> 기다리고 있을 테니<br/> 언릉 달려와 뽑아 주세요~",
    position: '모션 아이템',
    ref: `스토리 캐릭터 포함 <br/> 모든 캐릭터 모션 적용`,
    vote: 17142
  },
]

$(function () {
  oddFixed();
  /* login user Type*/
  userTypeChange('$닉네임닉네임$', 3);

  /* section item mapping */
  section02ItemMapping('.vote-wrap .section02-content-items', true, mapList);
  section03ItemMapping('.vote-wrap .section03-content-items', true, itemList);
  section02ItemMapping('.result-wrap .section02-content-items', false, mapList);
  section03ItemMapping('.result-wrap .section03-content-items', false, itemList);
  /*투표탭 최하단 아이템 박스 버튼 set*/
  onButtonDisabled();


});

//window odd fixed
function oddFixed() {
  if ($(window).width() % 2 != 0) {
    var width = $(window).width() - 1;
    $('html').width(width);
  } else {
    $('html').width('100%');
  }
}

$(window).resize(function () {
  oddFixed();
});

//Popup
var $popup;

function popup(obj, url) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 50;
  h = $popup.outerHeight() / 2, w = $popup.outerWidth() / 2;
  $("body").addClass("dimmed");
  $popup.addClass("show").css({top: targetY, opacity: 1});

  if ($popup.attr('data-popup-id') == 'youtube') {
    $popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/' + url + '?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
  }
}

function popupItem01(obj, name, src, description, map_type, difficulty, game_type) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 50;
  h = $popup.outerHeight() / 2, w = $popup.outerWidth() / 2;
  $("body").addClass("dimmed");
  $popup.addClass("show").css({top: targetY, opacity: 1});

  $popup.find('.popup-item').empty().append(`
      <div class="content-top">
        <div class="title">${name}</div>
        <div class="item-img">
        <img src="assets/images/popup-item/${src}.png" alt={name}>
        </div>
        <p class="description">${description}</p>
      </div>

      <div class="content-bottom">
        <ul>
          <li><span class="bubble">맵 타입</span> ${map_type}</li>
          <li><span class="bubble">난이도</span> ${difficulty}</li>
          <li><span class="bubble">경기 유형</span> ${game_type}</li>
        </ul>
      </div>
    </div>
  `);
}

function popupItem02(obj, name, src, description, position, ref) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 50;
  h = $popup.outerHeight() / 2, w = $popup.outerWidth() / 2;
  $("body").addClass("dimmed");
  $popup.addClass("show").css({top: targetY, opacity: 1});

  $popup.find('.popup-item').empty().append(`
      <div class="content-top">
        <div class="title">${name}</div>
        <div class="item-img">
        <img src="assets/images/popup-item/${src}.png" alt={name}>
        </div>
        <p class="description">${description}</p>
      </div>

      <div class="content-bottom">
        <ul>
          <li><span class="bubble">유형</span></li>
          <li>  ${position}</li>
          <li><span class="bubble">참고</span> </li>
          <li> ${ref}</li>

        </ul>
      </div>
    </div>
  `);
}

function popupAwards01(num) {
  const thisMap = mapList[num - 1] // 1등 2등 3등 순서
  const {name, src, map_type, difficulty, game_type, acceptance_speech, story} = thisMap
  $popup = $('[data-popup-id=awardsMap]');
  var targetY = $(window).scrollTop() + 50;
  h = $popup.outerHeight() / 2, w = $popup.outerWidth() / 2;
  $("body").addClass("dimmed");
  $popup.addClass("show").css({top: targetY, opacity: 1});

  $popup.find('.popup-item').empty().append(`
      <div class="content-top">
        <div class="title">${name}</div>
        <div class="item-img">
        <img src="assets/images/popup-item/${src}.png" alt={name}>
        </div>
      </div>
      <div class="content-bottom">
        <ul>
          <li><span class="bubble">맵 타입</span> ${map_type}</li>
          <li><span class="bubble">난이도</span> ${difficulty}</li>
          <li><span class="bubble">경기 유형</span> ${game_type}</li>
        </ul>
      </div>
  `);
  $popup.find('.popup-acceptance-speech').empty().append(`
      <div class="acceptance-speech"><p>${acceptance_speech}</p> </div>
  `);

}

function popupAwards02(num) {
  const thisMap = itemList[num - 1] // 1등 2등 3등 순서
  const {name, src, position, ref, acceptance_speech, story} = thisMap
  $popup = $('[data-popup-id=awardsItem]');
  var targetY = $(window).scrollTop() + 50;
  h = $popup.outerHeight() / 2, w = $popup.outerWidth() / 2;
  $("body").addClass("dimmed");
  $popup.addClass("show").css({top: targetY, opacity: 1});

  $popup.find('.popup-item').empty().append(`
      <div class="content-top">
        <div class="title">${name}</div>
        <div class="item-img">
        <img src="assets/images/popup-item/${src}.png" alt={name}>
        </div>
      </div>

      <div class="content-bottom">
        <ul>
          <li><span class="bubble">유형</span></li>
          <li>  ${position}</li>
          <li><span class="bubble">참고</span> </li>
          <li> ${ref}</li>

        </ul>
      </div>
    </div>
  `);
  $popup.find('.popup-acceptance-speech').empty().append(`
      <div class="acceptance-speech"><p>${acceptance_speech}</p> </div>
  `);

}

function popupClose(that) {
  $("body").removeClass("dimmed").unbind('touchmove');
  var type = typeof (that); //this == "object"
  if (type == "object") {
    $(that).parents('.popup').removeAttr("style").removeClass("show");
    $(that).parents('.popup').find(".iframe iframe").remove();

    // if ($(that).parents('.popup').attr('data-popup-id') == 'item') {
    //   if ($(that).parents('.popup').attr('data-popup-re') != 're') {
    //     document.location.reload();
    //   }
    // }
  } else {
    $(that).parents('.popup').removeAttr("style").removeClass("show");
  }
}

// data-user-type
/**
 * @name userTypeChange
 * @param {string} id -> 닉네임
 * @param {number | null} typeNum -> 1 : 로그인 전, 2 : 캐릭터 미생성, 3 : 로그인 후
 * @description
 * 1 : 로그인 전
 * 2 : 캐릭터 미생성
 * 3 : 로그인 후
 * */
function userTypeChange(id, typeNum) {
  let type = $('.user-state').data('user-type');
  const name = id ? id : "$닉네임닉네임$"

  if (typeNum) {
    type = typeNum ? typeNum : 1;
  }

  if (type === 1) {
    $('.btn-login').show();
  } else {
    $('.btn-login').hide();
  }
  if (type !== 3) $('.count').text('-');

  switch (type) {
    case 1:
      return $('.user-state .state-id .user-set').text('로그인 후 참여하실 수 있습니다.');
    case 2 :
      return $('.user-state .state-id .user-set').text('캐릭터를 생성해주세요.');
    case 3:
      return $('.user-state .state-id .user-set').text(`${name}님`);
  }
}

/**
 * @name section02ItemMapping
 * @description 맵 리스트 매핑
 * @param {string} selector -> 맵 리스트를 넣을 selector
 * @param {boolean} random -> 정렬 기준
 * @param {array} mapList -> 맵 리스트
 * @description item.vote.toLocaleString('ko-KR') -> 투표수 표기 콤마(,) 지우려면 item.vote 로 변경
 * * */

function section02ItemMapping(selector, random, mapList) {
  const contentItems = document.querySelector(selector);
  if (random) {
    mapList.sort(() => Math.random() - 0.5).forEach((item, index) => {
      const newItem = document.createElement("div");
      newItem.classList.add("item-box-wrap");
      newItem.innerHTML = `
      <label class="item-box">
        <input type="radio" name="maps" value="${item.name}">
        <span class="item-img">
      <img  src="assets/images/section02-item/item-${item.id}.png" alt="${item.name}">  </span>
        <span class="text">${item.name}</span>
        <button type="button" class="btn btn-caution movie-btn" onclick="popupItem01('[data-popup-id=item]','${item.name}','${item.src}','${item.description}','${item.map_type}','${item.difficulty}','${item.game_type}')">
          <span class="hide">자세히보기</span>
        </button>
      </label>
    </div>
  `;
      contentItems.appendChild(newItem);
    });

  } else {
    mapList.sort((a, b) => b.vote - a.vote).forEach((item, index) => {
      const newItem = document.createElement("div");
      newItem.classList.add("item-box-wrap");
      newItem.innerHTML = `
      <div class="item-box">
        <span class="item-img">
      <img  src="assets/images/section02-item/item-${item.id}.png" alt="${item.name}">  </span>
        <span class="text">${item.name}</span>
        <div class="votes-number"><span class="heart-icon"></span> ${item.vote.toLocaleString('ko-KR')}</div>
        <button type="button" class="btn btn-caution movie-btn" onclick="popupItem01('[data-popup-id=item]','${item.name}','${item.src}','${item.description}','${item.map_type}','${item.difficulty}','${item.game_type}')">
          <span class="hide">자세히보기</span>
        </button>
      </div>
    </div>
  `;
      contentItems.appendChild(newItem);
    });
  }
}


/**
 * @name section03ItemMapping
 * @description 아이템 리스트 매핑 sort가 true면 랜덤으로 정렬
 * @param {string} selector -> 맵 리스트를 넣을 selector
 * @param {boolean} random -> 정렬 기준
 * @param {array} itemList -> 아이템 리스트
 * @description item.vote.toLocaleString('ko-KR') -> 투표수 표기 콤마(,) 지우려면 item.vote 로 변경
 * */
function section03ItemMapping(selector, random, itemList) {

  const contentItems = document.querySelector(selector);

  if (random) {
    itemList.sort(() => Math.random() - 0.5).forEach((item, index) => {
      const newItem = document.createElement("div");
      newItem.classList.add("item-box-wrap");
      newItem.innerHTML = `
      <label class="item-box">
        <input type="radio" name="items" value="${item.name}">
        <span class="item-img">
        <img  src="assets/images/section03-item/item-${item.id}.png" alt="${item.name}">  </span>
        <span class="text">${item.name}</span>
        <button type="button" class="btn btn-caution movie-btn" onclick="popupItem02('[data-popup-id=item02]','${item.name}','${item.src}','${item.description}','${item.position}','${item.ref}')">
          <span class="hide">자세히보기</span>
        </button>
      </label>
    </div>
  `;
      contentItems.appendChild(newItem);
    });
  } else {
    itemList.sort((a, b) => b.vote - a.vote).forEach((item, index) => {
      const newItem = document.createElement("div");
      newItem.classList.add("item-box-wrap");
      newItem.innerHTML = `
      <div class="item-box">
        <span class="item-img">
        <img  src="assets/images/section03-item/item-${item.id}-result.png" alt="${item.name}">  </span>
        <span class="text">${item.name}</span>
        <div class="votes-number"><span class="heart-icon"></span> ${item.vote.toLocaleString('ko-KR')}</div>
        <button type="button" class="btn btn-caution movie-btn" onclick="popupItem02('[data-popup-id=item02]','${item.name}','${item.src}','${item.description}','${item.position}','${item.ref}')">
          <span class="hide">자세히보기</span>
        </button>
      </div>
    </div>
  `;
      contentItems.appendChild(newItem);
    });
  }

}

/*
* @name onButtonDisabled
* @description 버튼 클릭시 상태 변경
* button.complete = 완료
* button = 비활성
* button.active = 활성
* */
function onButtonDisabled() {
  const button = document.querySelectorAll(".section04-item-btn li .active");
  button.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      const target = e.target;
      button.forEach((item, index) => {
        target.setAttribute("disabled", false);
        target.classList.remove("complete");
      })
      target.setAttribute("disabled", true);
      target.classList.add("complete");

    })
  });
}

/*
* @name onTopClickBoxButton
* @description 상단 클릭박스 버튼 클릭시 화면 전환
* @param thisButton = vote or result
* */

function onTopClickBoxButton(thisButton) {
  const header = document.querySelector('.evt-header');
  const voteWrap = document.querySelector(".vote-wrap");
  const resultWrap = document.querySelector(".result-wrap");

  if (thisButton === "vote") {
    header.style.cssText = 'background: url(assets/images/bg_header.jpg) no-repeat center top;height: 730px;';
    voteWrap.style.display = 'block';
    resultWrap.style.display = 'none';
  } else {
    header.style.cssText = 'background: url(assets/images/bg_header02.jpg) no-repeat center top;height: 700px;';
    voteWrap.style.display = 'none';
    resultWrap.style.display = 'block';
  }
}


/*
* 이미지 프리로딩
* */

let images = [];
let imagePaths = [
  "assets/images/bg_header02.jpg",
  "assets/images/bg_section02_result.jpg",
  "assets/images/bg_section03_result.jpg",
];

for (let i = 0; i < imagePaths.length; i++) {
  images[i] = new Image();
  images[i].src = imagePaths[i];
}

