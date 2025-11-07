const API_BASE_URL = "http://localhost:8080"

window.addEventListener("DOMContentLoaded", () => {
    if(document.querySelector(".reservation_info")){
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

    const r = await detailFunction(performanceId);
    console.log("DB 데이터 조회 : ", r)

}