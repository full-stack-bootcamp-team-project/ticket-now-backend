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
        if (!res.ok) throw new Error(`서버 응답 오류 : ${res.status}`);

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

    } catch (err) {
        console.error("공연 데이터를 불러오는 중 오류 발생:", err);
        popularList.innerText = "공연 데이터를 불러올 수 없습니다.";
        recentList.innerText = "공연 데이터를 불러올 수 없습니다.";
    }
}

// 메인 배너 무한 캐러셀 초기화 함수
function initMainBanner() {
    const bannerContainer = document.querySelector(".main-banner");
    const originalItems = Array.from(document.querySelectorAll(".main-banner-item")); // NodeList를 Array로 변환 (배열 메서드 사용 위해)

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // 배너 아이템 없으면 종료
    if (originalItems.length === 0) return;

    // 원본 아이템 개수
    const originalTotal = originalItems.length;

    // 뒤쪽에 3세트 복제
    for (let i = 0; i < 3; i++) {
        originalItems.forEach(item => {
            const cloneBack = item.cloneNode(true);
            bannerContainer.appendChild(cloneBack);
        });
    }

    // 앞쪽에 3세트 복제 (역순으로 삽입)
    for (let i = 0; i < 3; i++) {
        originalItems.slice().reverse().forEach(item => {
            const cloneFront = item.cloneNode(true);
            bannerContainer.insertBefore(cloneFront, bannerContainer.firstChild);
        });
    }

    // 복제본 포함 전체 배너 아이템 배열
    let allItems = Array.from(document.querySelectorAll(".main-banner-item"));

    // 현재 중앙에 위치한 배너의 인덱스
    let currentIndex = originalTotal * 3;

    // 트랜지션 진행 중 여부 (중복 클릭 방지용)
    let isTransitioning = false;

    // 초기 위치 설정(애니메이션 없음 상태)
    moveToPosition(false);

    // 자동 슬라이드 (3초마다)
    let slideInterval = setInterval(() => nextSlide(), 3000);

    // 이전 버튼 클릭
    prevBtn.addEventListener("click", () => {
        if (isTransitioning) return;
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 3000);
    });

    // 다음 버튼 클릭
    nextBtn.addEventListener("click", () => {
        if (isTransitioning) return;
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 3000);
    });


    // 이전 슬라이드로 이동
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        moveToPosition(true);
    }

    // 다음 슬라이드로 이동
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        moveToPosition(true);
    }

    // 배너 위치 이동시키는 함수
    function moveToPosition(animated) {
        const itemWidth = allItems[0].offsetWidth + 24; // 배너 너비 + 마진(12px * 2)
        const centerOffset = window.innerWidth / 2 - allItems[0].offsetWidth / 2; // 중앙 정렬 오프셋
        const targetPosition = -currentIndex * itemWidth + centerOffset;

        // 스타일 업데이트
        updateStyles();

        if (animated) {
            // 애니메이션
            bannerContainer.style.transition = "transform 0.6s ease-in-out";
            bannerContainer.style.transform = `translateX(${targetPosition}px)`;

            // 트랜지션 종료 후 경계 처리 - 도달 시 무한 루프를 위한 순간이동 처리
            const transitionEnd = () => {
                bannerContainer.removeEventListener('transitionend', transitionEnd);

                // 오른쪽 끝 도달 (6번째 세트 끝) → 3번째 세트로 순간이동
                if (currentIndex >= originalTotal * 6) {
                    currentIndex = currentIndex - originalTotal * 3;
                    bannerContainer.style.transition = "none";
                    const newPosition = -currentIndex * itemWidth + centerOffset;
                    bannerContainer.style.transform = `translateX(${newPosition}px)`;
                    updateStyles();
                    void bannerContainer.offsetHeight; // 강제 리플로우
                }
                // 왼쪽 끝 도달 (1번째 세트 시작) → 4번째 세트로 순간이동
                else if (currentIndex < originalTotal) {
                    currentIndex = currentIndex + originalTotal * 3;
                    bannerContainer.style.transition = "none";
                    const newPosition = -currentIndex * itemWidth + centerOffset;
                    bannerContainer.style.transform = `translateX(${newPosition}px)`;
                    updateStyles();
                    void bannerContainer.offsetHeight; // 강제 리플로우
                }

                isTransitioning = false; // 슬라이드 완료
            };

            bannerContainer.addEventListener('transitionend', transitionEnd, { once: true });

            // 안전장치: transitionend 이벤트가 발생하지 않을 경우를 대비한 타임아웃
            setTimeout(() => {
                if (isTransitioning) {
                    bannerContainer.removeEventListener('transitionend', transitionEnd);
                    transitionEnd();
                }
            }, 700);
        } else {
            // 애니메이션 없이 즉시 이동 (초기 설정 시 사용)
            bannerContainer.style.transition = "none";
            bannerContainer.style.transform = `translateX(${targetPosition}px)`;
            isTransitioning = false;
        }
    }

    // 배너 아이템들의 스타일 클래스 업데이트
    function updateStyles() {
        allItems.forEach((item, idx) => {
            item.classList.remove("center-banner-item", "slide-banner-item");

            const distance = Math.abs(idx - currentIndex);
            const cycleDistance = Math.min(distance, allItems.length - distance);

            if (idx === currentIndex) {
                item.classList.add("center-banner-item");
            } else if (cycleDistance === 1) {
                item.classList.add("slide-banner-item");
            }
        });
    }
}

// 메인 배너 렌더링하는 함수
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

// 공연 리스트 렌더링하는 함수
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

// 공연 상세 페이지로 이동하는 함수
function gotoPerformanceDetail(performanceId){
    window.location.href = `${API_BASE_URL}/performance/detail?performanceId=${performanceId}`;
}
