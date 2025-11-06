const API_BASE_URL = "http://localhost:8080";

(async function(){
    await fetchPerformanceData();
})();

async function fetchPerformanceData() {

    const popularList = document.getElementById("popularList");
    const recentList = document.getElementById("recentList");

    const res =await fetch(API_BASE_URL + "/api/performance/all");

    if(!res.ok){
        throw new Error("서버 응답 오류 : " + res.status)
    }

    const performance = await res.json();

    console.log(performance);

    if(performance.length === 0){
        popularList.innerText = "등록된 공연이 없습니다.";
    } else {
        performance.forEach(
            b =>{
                popularList.innerHTML += `
                <div class="performance-item" onclick="gotoPerformanceDetail('${b.performanceId}')">
                    <img src="${b.performanceImagePath}" alt="${b.performanceCategory}" class="performance_image" />
                    <div class="performance-title-area">
                        <p class="performance-title">${b.performanceTitle}</p>
                    </div>
                </div>
            `;
            }
        )
    }

    if(performance.length === 0){
        recentList.innerText = "등록된 공연이 없습니다.";
    } else {
        performance.forEach(
            b =>{
                recentList.innerHTML += `
                <div class="performance-item" onclick="gotoPerformanceDetail('${b.performanceId}')">
                    <img src="${b.performanceImagePath}" alt="${b.performanceCategory}" class="performance_image" />
                    <div class="performance-title-area">
                        <p class="performance-title">${b.performanceTitle}</p>
                    </div>
                </div>
            `;
            }
        )
    }
}

async function gotoPerformanceDetail(performanceId){
    window.location.href = API_BASE_URL + `/performance/detail?performanceId=${performanceId}`;
}
