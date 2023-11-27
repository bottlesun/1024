****[스와이퍼 적용 기본 구조]**

```html
<div class="evt-content evt-swiper">
<div class="content-body swiper-wrapper">
<div class="swiper-slide dummy-slide"></div> <!--가운데 정렬을 위한 슬라이드-->
<div class="section01 swiper-slide"></div> <!--5월-->
<div class="section02 swiper-slide"></div> <!--6월-->
<div class="section03 swiper-slide"></div> <!--시즌3 ...-->
<div class="section04 swiper-slide"></div> <!--7월-->
<div class="section05 swiper-slide"></div> <!--8월-->
<div class="section06 swiper-slide"></div> <!--9월 10월-->
<div class="section07 swiper-slide"></div> <!--11월-->
</div>
</div>
```

**[더미와 section03 을 제외한 기본 구조]**

예시 section 02

```html
<div class="section02 swiper-slide">
        <div class="inner ">
          <div class="time-line">
            <!--
            time-line : 타임라인
            time-line p : 월
            dot-wrap : 선 & 점
            -->
            <p></p>
            <div class="dot-wrap">
              <div class="line"></div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="content-box ">
            <div class="box02-item box-item direct no-hover">
              <div class="bg"></div>
              <div class="common-z-index box-title">
                <h3 class="hide">Direct X 11 업그레이드</h3>
              </div>
              <!--
              character : 움직이는 요소
              -->
              <div class="character"></div>
            </div>

            <div class="box02-item box-item shop">
              <div class="bg"></div>
              <!--
              update : 업데이트 버튼 구조
              update-1st : 1차 업데이트
              update-2nd : 2차 업데이트
              [사용 예시]
              <span class="update update-2nd" title="update"></span>
              -->
              <span class="update" title="update"></span>
              <a href="javascript:void (0)" class="link-box"></a>
              <div class="common-z-index box-title">
                <h3 class="hide">교환상점 2.0</h3>
                <p class="content-text hide">매점과 교환상점 대 통합!</p>
                <ul class="dot-wrap">
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div class="content-box-content common-z-index hover-show">
                <p>
                  매점과 교환상점 대통합!<br/>
                  새로운 아이템 교환 시스템이<br/>
                  찾아옵니다.
                </p>
              </div>
              <button class="content-button hover-show" type="button">more</button>
            </div>
          </div>
          <!-- 이벤트 내용 삽입 -->
        </div>
      </div>
```

**hide class**

seo 를 위한 마크업. 홈페이지에는  img 요소로 들어가 있다.

```jsx
<h3 class="hide">교환상점 2.0</h3>
<p class="content-text hide">매점과 교환상점 대 통합!</p>
```

**no-hover class**

hover 및 클릭 기능이 사라진 박스가 필요할 때 사용

```html
          <div class="content-box ">
            <div class="box02-item box-item direct no-hover">
              <div class="bg"></div>
              <div class="common-z-index box-title">
                <h3 class="hide">Direct X 11 업그레이드</h3>
              </div>
              <!--
              character : 움직이는 요소
              -->
              <div class="character"></div>
            </div>
```
