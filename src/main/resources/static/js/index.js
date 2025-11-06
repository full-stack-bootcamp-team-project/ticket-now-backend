const API_BASE_URL = "http://localhost:8080/api";

(async function(){
    await fetchPerformanceData();
})();

async function fetchPerformanceData() {

    const bestResult = document.getElementById("bestResult");

    const res =await fetch(API_BASE_URL + "/performance/all");

    if(!res.ok){
        throw new Error("서버 응답 오류 : " + res.status)
    }

    const performance = await res.json();

    console.log(performance);

    if(performance.length === 0){
        bestResult.innerText = "등록된 공연이 없습니다.";
    } else {
        performance.forEach(
            b =>{
                const row = document.createElement("div");

                row.innerHTML = `
                <div class="performance_info" onclick="gotoPerformanceDetail('${b.performanceId}')">
                <img src="${b.performanceImagePath}" alt="${b.performanceCategory}" class="performance_image" />
                <div class="performance_title">${b.performanceTitle}</div>
                </div>
                `;
                bestResult.appendChild(row)
            }
        )
    }
}

async function gotoPerformanceDetail(performanceId){
    window.location.href = API_BASE_URL + `/performance/detail?performanceId=${performanceId}`;
}
