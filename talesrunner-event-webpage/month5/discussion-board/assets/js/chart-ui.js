/*DataLabels 플러그인 */
Chart.register(ChartDataLabels);

window.addEventListener('load', () => {
  doughnutChart.update();
  pieChart.update();
  barChart.update();
})

// chart canvas
const barChartCanvas = document.getElementById('barChart');
const pieChartCanvas = document.getElementById('pieChart');
const doughnutChartCanvas = document.getElementById('doughnutChart')

// 차트 데이터
const doughnutDatalist = {
  system: 3,
  farm: 3,
  contents: 5,
  convenience: 0,
  item: 0,
  map: 5,
  character: 0,
  guild: 0,
  bug: 0,
  new: 0,
  etc: 0,
};
const pieDatalist = {
  completed: 1200, // 완료
  unavailable: 1000, // 불가/상시
  review: 1500, // 검토
  reReview: 200, // 재검토
  scheduled: 200, // 예정
  undecided: 120, // 미정
}
const barDatalist = {
  22.06: {
    complete: 20,
    expected: 5
  },
  22.07: {
    complete: 20,
    expected: 0
  },
  22.08: {
    complete: 20,
    expected: 0
  },
  22.09: {
    complete: 5,
    expected: 5
  },
  22.10: {
    complete: 10,
    expected: 2
  },
  22.11: {
    complete: 3,
    expected: 1
  },
  22.12: {
    complete: 4,
    expected: 5
  },
  23.01: {
    complete: 0,
    expected: 3
  },
  23.02: {
    complete: 0,
    expected: 0
  },
  23.03: {
    complete: 30,
    expected: 5
  },
}

let doughnutDataSetArray = []; // 차트에 들어가는 데이터셋 배열
let pieDataSetArray = []; // 차트에 들어가는 데이터셋 배열
let barDataSetArray = Object.entries(barDatalist); // 차트에 들어가는 데이터셋 배열
// bar 차트 슬라이드
let startIndex = 0;
let limit = 7;
let slicedData = barDataSetArray.slice(startIndex, limit);
const movePrevButton = document.getElementById('bar-chart-prev-button');
const moveNextButton = document.getElementById('bar-chart-next-button');

// 배열 생성 (도넛 , 파이 차트)
getDataListSetting(doughnutDatalist, doughnutDataSetArray, getBackgroundColorByDiscussionKey, getNameByDiscussionKey)
getDataListSetting(pieDatalist, pieDataSetArray, getBackgroundColorByMeetingProposal, getNameByMeetingProposal)

/*
* @description 공통차트 config
* */
const commonTooltips = {
  mode: 'index', // 툴팁 표시 모드 (index, nearest, point, dataset)
  caretPadding: 30,
  padding: {
    left: 10,
    right: 10,
    top: 6,
    bottom: 6,
  }, // 툴팁 가로 여백
  borderColor: '#d2d2d2',
  borderWidth: 1,
  displayColors: false, // 툴팁에 데이터셋 색상 표시 여부
  backgroundColor: 'rgba(255,255,255,1)', // 툴팁 배경색
  enabled: true, // 툴팁 표시 여부
}
const commonDataLabels = {
  color: '#fff',
  backgroundColor: "rgba(0,0,0,0.2)",
  borderRadius: 5,
  padding: {
    left: 16,
    right: 16,
    top: 2,
    bottom: 2,
  },
}

/*
* @description 도넛차트 config
* */
const doughnutData = {
  datasets: [{
    data: doughnutDataSetArray.map((item) => item.value),
    backgroundColor: doughnutDataSetArray.map((item) => item.color),
    borderWidth: 0,
    cutout: '50%', // 반지름,
    hoverBorderColor: '#fff',
    hoverBorderWidth: 3,
    hoverBackgroundColor: doughnutDataSetArray.map((item) => item.color),
  }]
};
const doughnutInnerText = {
  id: 'innerText',
  beforeDraw(chart) {
    const text = `카테고리별\n베스트 선정 건수`;
    let lines = text.split("\n");

    const {ctx} = chart;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = " 15px noto sans KR";
    ctx.fillStyle = '#444444';
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 148, 140 + (20 * i));
    }
  }
}
const doughnutTooltips = {
  ...commonTooltips,
  animation: false, // 애니메이션 비활성화
  callbacks: {
    label: (context) => getTooltipItem(context, doughnutDataSetArray),
    labelTextColor: function () {
      return '#444444'
    },
  }
}
const doughnutDataLabels = {
  ...commonDataLabels,
  display: function (context) {
    let index = context.dataIndex // 해당 데이터의 인덱스
    let value = doughnutDataSetArray[index].value // 데이터셋의 value 값
    if (value === 0) {
      return false
    }
  },
  formatter: (data, context) => {
    if (data !== 0) {
      return getTooltipItem(context, doughnutDataSetArray);
    } else {
      return ""
    }
  }
}

/*
* @description 파이차트 config
* */
const pieData = {
  datasets: [{
    data: pieDataSetArray.map((item) => item.value),
    backgroundColor: pieDataSetArray.map((item) => item.color),
    borderWidth: 0,
    hoverBorderColor: '#fff',
    hoverBorderWidth: 3,
    hoverBackgroundColor: pieDataSetArray.map((item) => item.color),
  }]
};
const pieDataLabels = {
  ...commonDataLabels,
  padding: 5,
  // 데이터 라벨 위치
  anchor: function (context) {
    let index = context.dataIndex // 해당 데이터의 인덱스
    let value = pieDataSetArray[index].value // 데이터셋의 value 값
    let valueArray = pieDataSetArray.map((item) => item.value) // 데이터셋의 value 값
    let addValue = valueArray.reduce((acc, cur) => acc + cur, 0) // 토탈 값
    let percent = (value / addValue) * 100 // 퍼센트

    if (percent <= 10) {
      return 'end';
    } else {
      return 'center';
    }

  }, // 데이터 라벨 위치 (start, center, end)
  align: function (context) { // 데이터 라벨 정렬 (top, bottom, center, left, right)
    let percent = getPercentageNumber(context, pieDataSetArray) // 퍼센트

    if (percent <= 10) {
      return 'end';
    } else {
      return 'center';
    }
  }, // 데이터 라벨 정렬 (start, center, end)
  offset: function (context) {
    let percent = getPercentageNumber(context, pieDataSetArray) // 퍼센트
    if (percent <= 10) {
      if(context.dataIndex %2 === 0) {
        return -80;
      }
      return -20;
    }
    return 0;
  },
  display: function (context) {
    let index = context.dataIndex // 해당 데이터의 인덱스
    let value = pieDataSetArray[index].value // 데이터셋의 value 값
    if (value === 0) {
      return false
    }
  },
  formatter: (data, context) => {
    if (data !== 0) {
      return getTooltipItem(context, pieDataSetArray);
    } else {
      return ""
    }
  }
}
const pieTooltips = {
  ...commonTooltips,
  animation: false, // 애니메이션 비활성화
  callbacks: {
    label: (context) => getTooltipItem(context, pieDataSetArray),
    labelTextColor: function () {
      return '#444444'
    },
  }
}

/*
* @description 막대차트 config
* */
const barData = {
  labels: slicedData.map((item) => item[0]),
  datasets: [
    {
      maxBarThickness: 35,
      label: '완료',
      backgroundColor: '#1b67ce',
      data: slicedData.map((item) => item[1].complete),
    },
    {
      maxBarThickness: 35,
      label: '예정',
      backgroundColor: '#1bc13a',
      data: slicedData.map((item) => item[1].expected),
    },
  ]
};
const barDataLabels = {
  color: (context) => {
    if (context.datasetIndex === 1) {
      let value = context.dataset.data[context.dataIndex];
      // if (value <= 3) {
      //   return '#444'
      // }
      return '#fff'
    } else {
      return '#fff'
    }
  },
  formatter: function (value, context) {
    if (value === 0) {
      return ""
    }
    return value
  },
  // anchor: (context) => {
  //   if(context.datasetIndex === 1) {
  //     let value = context.dataset.data[context.dataIndex];
  //     console.log(value)
  //     if(value <= 3) {
  //       return 'end';
  //     }
  //   }
  // },
  // align: (context) => {
  //   if(context.datasetIndex === 1) {
  //     let value = context.dataset.data[context.dataIndex];
  //     if(value <= 3) {
  //       return 'top';
  //     }
  //   }
  // },

}
const barTooltips = {
  enabled: false,
  position: 'nearest',
  animation: false, // 애니메이션 비활성화
  external: (content) => externalTooltipHandler(content),
}
/*
* @description 차트 설정
* */
const doughnutConfig = {
  type: 'doughnut',
  data: doughnutData,
  options: {
    animation: false,
    plugins: {
      tooltip: doughnutTooltips,
      datalabels: doughnutDataLabels
    }
  },
  plugins: [doughnutInnerText],
};
const pieConfig = {
  type: 'pie',
  data: pieData,
  options: {
    plugins: {
      tooltip: pieTooltips,
      datalabels: pieDataLabels
    }
  },
};
const barConfig = {
  type: 'bar',
  data: barData,
  options: {
    maintainAspectRatio: false,

    plugins: {
      datalabels: barDataLabels,
      legend: {display: false},
      tooltip: barTooltips,
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          padding: 10, // y축 눈금과 그래프 사이의 간격을 10으로 설정
        },
        grid: {
          drawBorder: false,
          drawTicks: false,
        },
      },
      y: {
        ticks: {
          stepSize: 10, // y축 눈금 간격을 10으로 설정
          padding: 10, // y축 눈금과 그래프 사이의 간격을 10으로 설정
        },
        grid: {
          drawBorder: false,
          drawTicks: false,
        },
        stacked: true,
        beginAtZero: true, // y축의 값이 0부터 시작합니다.
        suggestedMax: () => getMaxTotalNumber(), // Y축에 공백 추가
      },
    },
  }
}

/*
* @description 차트 생성
* */
const doughnutChart = new Chart(
  doughnutChartCanvas.getContext("2d"),
  doughnutConfig,
);
const pieChart = new Chart(
  pieChartCanvas.getContext("2d"),
  pieConfig,
);
const barChart = new Chart(
  barChartCanvas.getContext("2d"),
  barConfig,
);


/*click 이벤트 등록*/
// barChartCanvas 차트 클릭 이벤트
barChartCanvas.addEventListener('click', onClickBarChart);
// movePrevButton 버튼 클릭 이벤트 prev
movePrevButton.addEventListener('click', function (e) {
  onClickMoveButton(e, -1);
});

moveNextButton.addEventListener('click', function (e) {
  onClickMoveButton(e, 1);
});


/*click 이벤트 함수*/

/**
 * @name onClickBarChart
 * @description 막대차트 클릭 이벤트 | console.log 사용 index or elemnt 정보 확인 가능
 * @param {object} click
 * */
function onClickBarChart(click) {
  const thisClick = barChart.getElementsAtEventForMode(click, 'nearest', {intersect: true}, true);
  /*이벤트 스크립트 작성*/
  // datasetIndex : 0 -> 완료, 1 -> 예정

  console.log(thisClick)

}

/**
 * @name onClickMoveButton
 * @description 이전, 다음 버튼 클릭 이벤트
 * @param {event} e
 * @param {number} direction -1: 이전, 1: 다음
 * */
function onClickMoveButton(e, direction) {
  const nextButtonICon = document.querySelector('.ico-next-btn');
  const prevButtonICon = document.querySelector('.ico-prev-btn');


  startIndex += direction;
  limit += direction;
  let array = barDataSetArray.slice(startIndex, limit);

  barChart.data.labels = array.map((item) => item[0]);
  barChart.data.datasets[0].data = array.map((item) => item[1].complete);
  barChart.data.datasets[1].data = array.map((item) => item[1].expected);
  barChart.update();

  if (startIndex === 0) {
    movePrevButton.setAttribute('disabled', 'disabled');
    prevButtonICon.classList.add('ico-prev-disable-btn');
  } else {
    movePrevButton.removeAttribute('disabled');
    prevButtonICon.classList.remove('ico-prev-disable-btn');
  }

  if (limit === barDataSetArray.length) {
    moveNextButton.setAttribute('disabled', 'disabled');
    nextButtonICon.classList.add('ico-next-disable-btn');
  } else {
    moveNextButton.removeAttribute('disabled');
    nextButtonICon.classList.remove('ico-next-disable-btn');

  }
}

/*차트 생성용 함수*/

/**
 * @name getBackgroundColorByDiscussionKey
 * @name getBackgroundColorByMeetingProposal
 * @description key 값에 따라 컬러값을 반환합니다.
 * @param {string} key
 * @return {string} name
 * */
function getBackgroundColorByDiscussionKey(key) {
  // key 값에 따라 원하는 색상을 반환하는 로직을 작성합니다.
  switch (key) {
    case "system":
      return "#d7ba38";
    case "farm":
      return "#3ad146";
    case "contents":
      return "#38e49a";
    case "convenience":
      return "#39c2d4";
    case "item":
      return "#2e75df";
    case "map":
      return "#796df3";
    case "character":
      return "#8c3bc6";
    case "guild":
      return "#c23bb3";
    case "bug":
      return "#a73e67";
    case "new":
      return "#d44839";
    default:
      return "#d59639";
  }
}

function getBackgroundColorByMeetingProposal(key) {
  switch (key) {
    case "completed":
      return "#8c8c8c"
    case "unavailable":
      return "#bfbfbf"
    case "review":
      return "#c0750f"
    case "reReview":
      return "#f7941d"
    case "scheduled":
      return "#fbae5c"
    default:
      return "#fec689"
  }
}

/**
 * @name getNameByDiscussionKey
 *@name getNameByMeetingProposal
 * @description key 값에 따라 이름명을 반환합니다.
 * @param {string} key
 * */
function getNameByDiscussionKey(key) {
  // key 값에 따라 이름명을 반환하는 로직을 작성합니다.
  switch (key) {
    case "system":
      return "시스템";
    case "farm":
      return "팜";
    case "contents":
      return "콘텐츠";
    case "convenience":
      return "편의성";
    case "item":
      return "아이템";
    case "map":
      return "맵";
    case "character":
      return "캐릭터";
    case "guild":
      return "길드";
    case "bug":
      return "버그";
    case "new":
      return "신규";
    default:
      return "기타";
  }
}

function getNameByMeetingProposal(key) {
  switch (key) {
    case "completed":
      return "완료"
    case "unavailable":
      return "기타"
    case "review":
      return "검토"
    case "reReview":
      return "재검토"
    case "scheduled":
      return "예정"
    default:
      return "미정"
  }
}

/**
 * @name tooltipItem
 * @description 툴팁에 들어가는 데이터를 반환합니다.
 * @param context {object} - 툴팁에 들어가는 데이터
 * @param data {array} - 데이터셋 배열
 * @returns {string}
 * */
function getTooltipItem(context, data) {
  let index = context.dataIndex // 해당 데이터의 인덱스
  let name = data[index].name // 데이터셋의 name 값
  let value = data[index].value // 데이터셋의 value 값

  return name + "  " + value.toLocaleString()
}

/**
 * @name getDataListSetting
 * @description 차트에 들어가는 데이터셋 배열 생성
 * @param list {object} - 데이터셋
 * @param array {array} - 데이터셋 배열
 * @param color {function} - 컬러값 반환 함수
 * @param name {function} - 이름 반환 함수
 * @returns {void}
 * */
function getDataListSetting(list, array, color, name) {
  for (let key in list) {
    if (list.hasOwnProperty(key)) {
      array.push({
        key: key,
        color: color(key),
        name: name(key),
        value: list[key],
      });
    }
  }
}

/**
 * @name getMaxTotalNumberAddTen
 * @description 토탈 값 중 최대값 + 10 을 반환합니다.
 */
function getMaxTotalNumber() {
  // 토탈 값과 해당 월을 저장할 변수 초기화
  let maxTotal = 0;

// barDatalist 객체 순회
  for (const month in barDatalist) {
    // complete와 expected 값을 합산하여 토탈 계산
    const total = barDatalist[month].complete + barDatalist[month].expected;

    // 토탈 값이 현재까지의 최대값보다 크면 최대값과 해당 월 업데이트
    if (total > maxTotal) {
      maxTotal = total;
    }
  }
  return maxTotal + 5;
}

/**
 * @name chartOneLabel
 * @description 툴팁에 들어갈 라벨을 생성합니다. 예시) 예정 | 10건
 * @param tooltip {object} - 툴팁 객체
 * @param tooltipEl {object} - 툴팁 엘리먼트
 * @param set {string} - 완료 여부
 * @param position {boolean} - 툴팁 위치
 * @returns {void}
 * */

function chartOneLabel(tooltip , tooltipEl , set , position){
  if (tooltip.body) {
    const bodyLines = tooltip.body.map(b => b.lines);

    const span = document.createElement('span');
    span.style.marginRight = '15px';
    span.style.borderWidth = '2px';
    span.style.height = '10px';
    span.style.width = '10px';
    span.style.display = 'inline-block';
    span.style.fontWeight = 'bold'
    span.style.color = '#444'
    span.style.fontSize = '13px'
    span.textContent = set; // 완료 여부

    const verticalBar = document.createElement('span');
    verticalBar.style.backgroundColor = '#d2d2d2'
    verticalBar.style.width = '1px';
    verticalBar.style.height = '12px';
    verticalBar.style.display = 'inline-block';

    const text = document.createElement('span');
    text.style.display = 'inline-block';
    text.style.marginLeft = '6px';
    text.style.fontSize = '13px'
    text.style.whiteSpace = 'nowrap';
    text.style.color = '#888888';
    text.textContent = bodyLines[0][0].replace(/[^0-9]/g, '') + ' 건';

    const triangle = document.createElement('div');
    triangle.style.borderTop = '6px solid transparent';
    triangle.style.borderBottom = '6px solid transparent';
    triangle.style.borderLeft = '6px solid transparent';
    triangle.style.borderRight = '6px solid #fff';
    triangle.style.position = 'absolute';
    triangle.style.top = '50%';
    triangle.style.transform = 'translate(-50%, -50%)';
    triangle.style.zIndex = '1';
    if (position) {
      triangle.style.left = "-5px";
    } else {
      triangle.style.borderTop = '6px solid transparent';
      triangle.style.borderBottom = '6px solid transparent';
      triangle.style.borderLeft = '6px solid #fff';
      triangle.style.borderRight = '6px solid transparent';
      triangle.style.right = "-17px";
    }

    const triangleBorder = document.createElement('span');
    triangleBorder.style.borderTop = '6px solid transparent';
    triangleBorder.style.borderBottom = '6px solid transparent';
    triangleBorder.style.borderLeft = '6px solid transparent';
    triangleBorder.style.borderRight = set === '완료' ? '6px solid #1b67ce' : '6px solid #1bc13a';
    triangleBorder.style.position = 'absolute';
    triangleBorder.style.top = '50%';
    if (position) {
      triangleBorder.style.left = "-6px";
    } else {
      triangleBorder.style.borderTop = '6px solid transparent';
      triangleBorder.style.borderBottom = '6px solid transparent';
      triangleBorder.style.borderLeft = set === '완료' ? '6px solid #1b67ce' : '6px solid #1bc13a';
      triangleBorder.style.borderRight = '6px solid transparent';
      triangleBorder.style.right = "-18px";
    }
    triangleBorder.style.transform = 'translate(-50%, -50%)';
    triangleBorder.style.zIndex = '0';

    // Remove old children
    while (tooltipEl.firstChild) {
      tooltipEl.firstChild.remove();
    }

    // Add new children
    tooltipEl.appendChild(span);
    tooltipEl.appendChild(verticalBar);
    tooltipEl.appendChild(text);
    tooltipEl.appendChild(triangle);
    tooltipEl.appendChild(triangleBorder);
  }
}


/**
 * @name chartTotalLabel
 * @description 툴팁에 들어갈 라벨을 생성합니다. 예시) 예정 | 10건
 * @param tooltip {object} - 툴팁 객체
 * @param tooltipEl {object} - 툴팁 엘리먼트
 * @param chartTotalData {object} - 차트 데이터
 * @param position {boolean} - 툴팁 위치
 * @returns {void}
 * */
function chartTotalLabel(tooltip , tooltipEl , position , chartTotalData){
  function commonSpan(span){
    span.style.marginRight = '10px';
    span.style.borderWidth = '2px';
    span.style.height = '10px';
    span.style.width = '10px';
    span.style.display = 'inline-block';
    span.style.fontWeight = 'bold'
    span.style.color = '#444'
    span.style.fontSize = '13px'
  }

  function commonText(text){
    text.style.display = 'inline-block';
    text.style.marginLeft = '3px';
    text.style.fontSize = '13px'
    text.style.whiteSpace = 'nowrap';
    text.style.color = '#444';
  }
  if (tooltip.body) {
    const expectedSpan = document.createElement('span');
    commonSpan(expectedSpan)
    expectedSpan.textContent = '예정';

    const completeSpan = document.createElement('span');
    commonSpan(completeSpan)
    completeSpan.textContent = '완료';

    const expectedText = document.createElement('span');
    commonText(expectedText)
    expectedText.style.marginRight = '5px';
    expectedText.textContent = chartTotalData.expected + ' ,';

    const completeText = document.createElement('span');
    commonText(completeText)
    completeText.textContent = chartTotalData.complete ;

    const triangle = document.createElement('div');
    triangle.style.borderTop = '6px solid transparent';
    triangle.style.borderBottom = '6px solid transparent';
    triangle.style.borderLeft = '6px solid transparent';
    triangle.style.borderRight = '6px solid #fff';
    triangle.style.position = 'absolute';
    triangle.style.top = '50%';
    triangle.style.transform = 'translate(-50%, -50%)';
    triangle.style.zIndex = '1';
    if (position) {
      triangle.style.left = "-5px";
    } else {
      triangle.style.borderTop = '6px solid transparent';
      triangle.style.borderBottom = '6px solid transparent';
      triangle.style.borderLeft = '6px solid #fff';
      triangle.style.borderRight = '6px solid transparent';
      triangle.style.right = "-17px";
    }

    const triangleBorder = document.createElement('span');
    triangleBorder.style.borderTop = '6px solid transparent';
    triangleBorder.style.borderBottom = '6px solid transparent';
    triangleBorder.style.borderLeft = '6px solid transparent';
    triangleBorder.style.borderRight = '6px solid #d2d2d2'
    triangleBorder.style.position = 'absolute';
    triangleBorder.style.top = '50%';
    if (position) {
      triangleBorder.style.left = "-6px";
    } else {
      triangleBorder.style.borderTop = '6px solid transparent';
      triangleBorder.style.borderBottom = '6px solid transparent';
      triangleBorder.style.borderLeft = '6px solid #d2d2d2'
      triangleBorder.style.borderRight = '6px solid transparent';
      triangleBorder.style.right = "-18px";
    }
    triangleBorder.style.transform = 'translate(-50%, -50%)';
    triangleBorder.style.zIndex = '0';

    // Remove old children
    while (tooltipEl.firstChild) {
      tooltipEl.firstChild.remove();
    }

    // Add new children
    tooltipEl.appendChild(expectedSpan);
    tooltipEl.appendChild(expectedText);
    tooltipEl.appendChild(completeSpan);
    tooltipEl.appendChild(completeText);
    tooltipEl.appendChild(triangle);
    tooltipEl.appendChild(triangleBorder);
  }
}



/**
 * @name getPercentageNumber
 * @param context
 * @param array
 * @returns {number}
 */

function getPercentageNumber(context,array){
  let index = context.dataIndex // 해당 데이터의 인덱스
  let value = array[index].value // 데이터셋의 value 값
  let valueArray = array.map((item) => item.value) // 데이터셋의 value 값
  let addValue = valueArray.reduce((acc, cur) => acc + cur, 0) // 토탈 값
  return (value / addValue) * 100 // 퍼센트
}

/**
 * @name getOrCreateTooltip
 * @description 툴팁을 생성하거나 가져옵니다.
 * @param chart {object} - 차트 객체
 * @param oneLabel {boolean} - 툴팁 라벨
 * @description  // true : 예정 | 10건 , false : 예정 10 , 완료 10
 * @returns {void}
 * */
const getOrCreateTooltip = (chart,oneLabel) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');
  let set = chart.tooltip.dataPoints[0].dataset.label; // 완료 여부
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(255,255,255,1)';
    tooltipEl.style.borderRadius = '5px';
    tooltipEl.style.borderWidth = '1px';
    tooltipEl.style.borderStyle = 'solid';
    tooltipEl.style.color = '#444';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.whiteSpace = 'nowrap';

    chart.canvas.parentNode.appendChild(tooltipEl);

  }
  if(oneLabel){
    tooltipEl.style.borderColor = set === '완료' ? '#1b67ce' : '#1bc13a';
  } else {
    tooltipEl.style.borderColor = '#d2d2d2';
  }

  return tooltipEl;
};


/**
 * @name externalTooltipHandler
 * @description 툴팁을 생성하거나 가져옵니다.
 * @param context {object} - 차트 객체
 * @returns {void}
 * */
const externalTooltipHandler = (context) => {
  /*
  * onLabel
  * true : 예정 | 10건
  * false : 예정 10 , 완료 10
  * */
  const onLabel = false ;
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart,onLabel);
  let set = chart.tooltip.dataPoints[0].dataset.label; // 완료 여부
  let position = tooltip.dataPoints[0].dataIndex + 1 <= slicedData.length / 2 // 차트의 중간을 기준으로 툴팁 위치 설정
  let chartTotalData = barDataSetArray.filter((item) => {
    return item[0].includes(tooltip.dataPoints[0].label)
  })[0][1] // 차트의 토탈 데이터

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }


  // Set Text
  onLabel ? chartOneLabel(tooltip , tooltipEl , set ,position) : chartTotalLabel(tooltip , tooltipEl , position , chartTotalData);
  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = position ? 70 + tooltip.caretX + 'px' : -70 + tooltip.caretX + 'px'; // 툴팁 위치
  tooltipEl.style.top = tooltip.caretY + 'px'; // 툴팁 위치
  tooltipEl.style.padding = '4px 10px 5px '; // 툴팁 패딩
};


