const API_BASE_URL = "http://localhost:8080";

// 돔이 생성된 후 작업
document.addEventListener("DOMContentLoaded", () => {
    fetchPerformanceData()
        .then(() => {
            console.log("공연 데이터 로드 완료");
        })
        .catch((err) => {
            console.error("공연 데이터를 불러오는 중 오류 발생:", err);
        });
});

// 전체 공연 데이터, 배너 초기화
async function fetchPerformanceData() {
    const popularList = document.getElementById("popularList");
    const recentList = document.getElementById("recentList");

    try {
        const res = await fetch(`${API_BASE_URL}/api/performance/all`);
        if(!res.ok) throw new Error(`서버 응답 오류 : ${res.status}`);
        const performances = await res.json();
        console.log("공연 데이터 확인 :", performances);

        // 기본 - 최신순 정렬
        const defaultPerformances = [...performances].sort((a, b) => new Date(b.performanceDate) - new Date(a.performanceDate));

        // 메인 배너용
        renderMainBanner(defaultPerformances.slice(0, 10));
        initMainBanner();

        // 인기순 정렬
        const popularPerformances = [...performances].sort((a, b) => a.performanceRanking - b.performanceRanking);

        // 최신순 정렬
        const recentPerformances = [...performances].sort((a, b) => new Date(b.performanceDate) - new Date(a.performanceDate));

        // 인기 공연 섹션
        renderPerformanceList(popularList, popularPerformances.slice(0, 10), "등록된 공연이 없습니다.");

        // 최신 공연 섹션
        renderPerformanceList(recentList, recentPerformances.slice(0, 10), "등록된 공연이 없습니다.");

    } catch(err) {
        console.error("공연 데이터를 불러오는 중 오류 발생:", err);
        popularList.innerText = "공연 데이터를 불러올 수 없습니다.";
        recentList.innerText = "공연 데이터를 불러올 수 없습니다.";
    }
}

// 메인 배너
function initMainBanner() {
    const bannerContainer = document.querySelector(".main-banner");
    const bannerItems = document.querySelectorAll(".main-banner-item");

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (bannerItems.length === 0) return;

    let currentCenter = 0;
    const total = bannerItems.length;

    // 초기 설정
    updateCenterBanner();

    // 자동 슬라이드 (3초마다)
    let slideInterval = setInterval(nextSlide, 3000);

    // 이전 버튼 클릭
    prevBtn.addEventListener("click", () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 3000);
    });

    function prevSlide() {
        currentCenter = (currentCenter - 1 + total) % total;
        updateCenterBanner();
    }

    // 다음 버튼 클릭
    nextBtn.addEventListener("click", () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 3000);
    });

    function nextSlide() {
        currentCenter = (currentCenter + 1) % total;
        updateCenterBanner();
    }

    function updateCenterBanner() {
        // 모든 아이템 클래스 초기화
        bannerItems.forEach((item) => item.classList.remove("center-banner-item","slide-banner-item"));

        // 중앙 배너 설정
        const centerItem = bannerItems[currentCenter];
        centerItem.classList.add("center-banner-item");

        // 양 옆(왼쪽, 오른쪽)
        const leftIndex = (currentCenter - 1 + total) % total;
        const rightIndex = (currentCenter + 1) % total;
        bannerItems[leftIndex].classList.add("slide-banner-item");
        bannerItems[rightIndex].classList.add("slide-banner-item");

        // 슬라이드 이동
        const offset = -currentCenter * (bannerItems[0].offsetWidth + 24); // margin 12px * 2
        bannerContainer.style.transform = `translateX(${offset + (window.innerWidth / 2 - bannerItems[0].offsetWidth / 2)}px)`;
        bannerContainer.style.transition = "transform 0.6s ease-in-out";
    }
}

// 메인 배너 출력
function renderMainBanner(performances) {
    const bannerContainer = document.querySelector(".main-banner");
    bannerContainer.innerHTML = "";

    if (!performances || performances.length === 0) {
        bannerContainer.innerHTML = "<p>등록된 공연이 없습니다.</p>";
        return;
    }

    performances.forEach(performance => {
        const bannerHTML = `
            <div class="main-banner-item" onclick="gotoPerformanceDetail('${performance.performanceId}')">
                <img src="${performance.performanceImagePath}" 
                     alt="${performance.performanceTitle}" 
                     class="main-banner-image" />
                <p class="main-banner-item-title">${performance.performanceTitle}</p>
            </div>
        `;
        bannerContainer.innerHTML += bannerHTML;
    });
}

// 공연 리스트 출력
function renderPerformanceList(container, dataList, emptyMessage) {
    container.innerHTML = ""; // 기존 내용 초기화

    if (!dataList || dataList.length === 0) {
        container.innerText = emptyMessage;
        return;
    }

    dataList.forEach(performance => {
        const itemHTML = `
            <div class="performance-item" onclick="gotoPerformanceDetail('${performance.performanceId}')">
                <img src="${performance.performanceImagePath}" 
                     alt="${performance.performanceCategory}" 
                     class="performance_image" />
                <div class="performance-title-area">
                    <p class="performance-title">${performance.performanceTitle}</p>
                </div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
}

// 상세페이지 이동
function gotoPerformanceDetail(performanceId){
    window.location.href = `${API_BASE_URL}/performance/detail?performanceId=${performanceId}`;
}
