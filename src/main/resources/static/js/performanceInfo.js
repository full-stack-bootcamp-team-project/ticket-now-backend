const API_BASE_URL = "http://localhost:8080"

window.addEventListener("DOMContentLoaded", () => {
    if(document.querySelector(".performance_info")){
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

    if(!performanceId) {
        alert("잘못된 공연 정보입니다.")
        window.location.href = "/performance/all";
    }

    const p = await detailFunction(performanceId);
    console.log("DB 데이터 조회 : ", p)

}

// 2. 출연자 정보 가져오기
async function loadCastInfo() {
    await fetch(`/performance/cast/${performanceId}`);
}

// 3. 예매 페이지로 이동
function goToReservation() {
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