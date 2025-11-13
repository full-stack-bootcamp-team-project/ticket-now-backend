window.addEventListener("DOMContentLoaded", () => {
    if(document.querySelector(".performance-info")){
        loadPerformanceDetail();
    }
});

async function detailFunction(performanceId) {

    const res = await fetch(API_BASE_URL + `/api/performance/detail?performanceId=${performanceId}`);

    if(!res.ok){
        throw new Error("공연 정보를 불러오는데 실패했습니다.")
    }

    return await res.json();
}


// 1. 페이지 로드 시 공연 상세 정보 가져오기
async function loadPerformanceDetail() {
    const urlParams = new URLSearchParams(window.location.search);

    const performanceId = urlParams.get("performanceId");

    if (!performanceId) {
        alert("잘못된 공연 정보입니다.")
        window.location.href = "/performance/all";
    }

    const p = await detailFunction(performanceId);

    console.log("DB 데이터 조회 : ", p)

    // performance 테이블에 저장되어 있는 정보
    const image = document.getElementById("performanceBodyImage");
    const headerTitle = document.getElementById("performanceHeaderTitle");
    const performanceHeaderCategory = document.getElementById("performanceHeaderCategory");
    const performanceCategory = document.getElementById("performanceCategory");
    const performanceTitle = document.getElementById("performanceTitle");
    const performanceAddress = document.getElementById("performanceAddress");
    const performancePrice = document.getElementById("performancePrice");
    const performanceInfo = document.getElementById("performanceInfo");
    const performanceCheckInfoTitle = document.getElementById("performanceCheckInfoTitle");
    const performanceCheckInfoTitleContent = document.getElementById("performanceCheckInfoTitleContent");

    // performanceSchedule 테이블에 저장되어 있는 정보
    const performanceScheduleStartDate = document.getElementById("performanceScheduleStartDate");
    const performanceScheduleStartTime = document.getElementById("performanceScheduleStartTime");

    // performanceSchedule 테이블에 저장되어 있는 정보
    const performanceCheckInfoCastingMember = document.getElementById("performanceCheckInfoCastingMember");

    // kakao map 정보
    const performanceCheckInfoMapDetail = document.getElementById("performanceCheckInfoMapDetail");

    // performance 테이블에 저장되어 있는 정보
    headerTitle.innerText = p.performanceTitle;
    image.innerHTML = `
    <img src="${p.performanceImagePath}" class="load-image" />
    `;
    performanceHeaderCategory.innerHTML = `
    <p class="performance-header-ranking"> ${p.performanceCategory} > ${p.performanceCategory} 주간 순위 ${p.performanceRanking}위</p>
    `;
    performanceCategory.innerText = `${p.performanceCategory}`;
    performanceTitle.innerText = `${p.performanceTitle}`;
    performanceAddress.innerText = `${p.performanceAddress}`;
    performancePrice.innerText = `${Number(p.performancePrice).toLocaleString()}원`;
    performanceInfo.innerText = `${p.performanceInfo}`;
    performanceCheckInfoTitle.innerText = `${p.performanceTitle}`;
    performanceCheckInfoTitleContent.innerText = `${p.performanceInfo}`;


    // performanceSchedule 테이블에 저장되어 있는 정보
    if(p.schedules.length === 0) {
        performanceScheduleStartDate.innerText = "등록된 정보가 없습니다";
        performanceScheduleStartTime.innerText = "등록된 정보가 없습니다";
    } else {
        performanceScheduleStartDate.innerText = `${p.schedules[0].performanceScheduleStartDate}`;
        performanceScheduleStartTime.innerText = `${p.schedules[0].performanceScheduleStartTime}`;
    }

    // castMembers 테이블에 저장되어 있는 정보
    if(p.castMembers.length !== 0) {
        performanceCheckInfoCastingMember.innerHTML = '';

        for (let i = 0; i < p.castMembers.length ; i++) {


            performanceCheckInfoCastingMember.innerHTML += `
            <div >
            <img src="${p.castMembers[i].castMemberImagePath}"/>
            <p class="load-casting-member">${p.castMembers[i].castMemberName}</p>
            </div>
            `;
        }
    } else {
        performanceCheckInfoCastingMember.innerHTML = `<p>등록된 정보가 없습니다.</p>`;
    }

    performanceCheckInfoMapDetail.innerText = `장소 : ${p.performanceAddress}`;

    // console.log("스케줄 확인 : ", p.schedules.length);

    const reservationBtn = document.getElementById("reservationBtn");

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div

    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    // console.log("위치 : ", p.performanceAddress);

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(p.performanceAddress , function(result, status) {

        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {

            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // const mapAddress = p.performanceAddress.match(/\(([^)]+)\)/)?.[1] || p.performanceAddress;

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            // const infowindow = new kakao.maps.window();({
            //     content: `<div class="map-box" style="display: none">
            //                 <p class="map-box-title">${p.performanceTitle}</p>
            //                 <p class="map-box-address">${mapAddress}</p>
            //                 </div>`
            // });
            // infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });

    reservationBtn.addEventListener("click", () =>{
        if(p.schedules.length === 0){
            alert("해당 공연은 예약할 수 없습니다.");
        } else {
            goToReservation(p.performanceId)
        }
    })
}

const detailInfo = document.getElementById("detailInfo");

detailInfo.addEventListener('click', () => {
    loadPerformanceDetail();
    const performanceCheckInfo = document.querySelector('.performance-check-info');

    performanceCheckInfo.style.display = "block";
    detailInfo.style.display = "none";

    // 지도가 깨질 경우, map.relayout() 호출
    setTimeout(() => {
        map.relayout(); // 지도가 div 크기를 다시 계산
        map.setCenter(coords); // 중심 좌표 재설정
    }, 3000); // 100ms 정도 지연을 주면 안전
})


// // 2. 출연자 정보 가져오기
// function loadCastInfo() {
//     fetch(`/performance/cast/${performanceId}`);
//
// }

// 3. 예매 페이지로 이동
function goToReservation(performanceId) {

    const width = 1200;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    const options = `
        width=${width},
        height=${height},
        left=${left},
        top=${top},
    `;


    window.open(
        `${API_BASE_URL}/reservation?performanceId=${performanceId}`,
        "_blank",
        options
    );
}




/*
// URL 예시: http://localhost:8080/performance?category=music
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category"); // "music"



html
<div>
    <button onclick="updateCategory('music')">음악</button>
    <button onclick="updateCategory('drama')">드라마</button>
    <button onclick="updateCategory('concert')">콘서트</button>
  </div>

  <p id="category"></p>

script
 function getCategoryFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get("category") || "all";
    }

 function renderCategory() {
      const category = getCategoryFromUrl();
      document.getElementById("category").innerText = `현재 카테고리: ${category}`;
    }


function updateCategory(newCategory) {
  // URL의 category만 교체 (페이지 리로드 없음)
  const newUrl = `${window.location.pathname}?category=${newCategory}`;
  window.history.pushState({}, '', newUrl);

  // 화면 내용 업데이트
  renderCategory();
}

// 초기 렌더링
renderCategory();
 */