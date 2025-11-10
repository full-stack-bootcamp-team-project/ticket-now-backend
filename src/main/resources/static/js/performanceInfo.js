const API_BASE_URL = "http://localhost:8080"

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

    const image = document.getElementById("performanceBodyImage");
    const headerTitle = document.getElementById("performanceHeaderTitle");
    const performanceHeaderCategory = document.getElementById("performanceHeaderCategory");
    const performanceCategory = document.getElementById("performanceCategory");
    const performanceTitle = document.getElementById("performanceTitle");
    const performanceAddress = document.getElementById("performanceAddress");
    const performanceScheduleStartDate = document.getElementById("performanceScheduleStartDate");
    const performanceScheduleStartTime = document.getElementById("performanceScheduleStartTime");
    const performancePrice = document.getElementById("performancePrice");
    const performanceInfo = document.getElementById("performanceInfo");


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
    performanceScheduleStartDate.innerText = `${p.schedules[0].performanceScheduleStartDate}`;
    performanceScheduleStartTime.innerText = `${p.schedules[0].performanceScheduleStartTime}`;
    performancePrice.innerText = `${Number(p.performancePrice).toLocaleString()}원`;
    performanceInfo.innerText = `${p.performanceInfo}`;

    const reservationBtn = document.getElementById("reservationBtn");

    reservationBtn.addEventListener("click", () =>{
        goToReservation(p.performanceId)
    })
}

// 2. 출연자 정보 가져오기
function loadCastInfo() {
    fetch(`/performance/cast/${performanceId}`);
}

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