<!-- todo 달력 -->
const monthYear = document.getElementById('monthYear');
const dates = document.getElementById('dates');
const calendarPrev = document.getElementById('calendarPrev');
const calendarNext = document.getElementById('calendarNext');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null; // 선택된 날짜 저장

function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    monthYear.textContent = `${year}.${month + 1}`;

    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const prevLastDay = new Date(year, month, 0); // 이전 달 마지막 날
    const prevMonthDays = prevLastDay.getDate();

    let html = '';

    // 이전 달 날짜 표시
    for (let i = startDay - 1; i >= 0; i--) {
        const date = prevMonthDays - i;
        html += `<div class="date-area inactive"><p class="date">${date}</p></div>`;
    }

    // 이번 달
    for (let date = 1; date <= daysInMonth; date++) {
        const day = new Date(year, month, date).getDay();
        let classes = 'date-area';

        if (day === 0) classes += ' sunday';
        else if (day === 6) classes += ' saturday';

        if (
            date === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            classes += ' today';
        }

        html += `<div class="${classes}" data-date="${year}-${month + 1}-${date}"><p class="date">${date}</p></div>`;
    }

    // 다음 달 날짜 표시
    const totalCells = startDay + daysInMonth;
    const nextDays = 7 - (totalCells % 7);
    if (nextDays < 7) {
        for (let i = 1; i <= nextDays; i++) {
            html += `<div class="date-area inactive"><p class="date">${i}</p></div>`;
        }
    }

    dates.innerHTML = html;
}

// 날짜 클릭 이벤트 추가
dates.addEventListener('click', (e) => {
    const target = e.target.closest('.date-area');
    if (!target || target.classList.contains('inactive')) return;

    // 기존 선택 해제
    document.querySelectorAll('.dates .date-area').forEach(d => d.classList.remove('selected'));

    // 새로 선택
    target.classList.add('selected');
    selectedDate = target.dataset.date;

    console.log(`선택된 날짜: ${selectedDate}`);

    const choiceDate = document.querySelector('.choice-date');
    choiceDate.style.display = 'block';
});

calendarPrev.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
});

calendarNext.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
});

renderCalendar(currentYear, currentMonth);


<!-- todo 데이터 조회 -->
const API_BASE_URL = "http://localhost:8080"

window.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".reservation-info")) {
        loadPerformanceDetail();
    }
});

async function detailFunction(performanceId) {

    const res = await fetch(API_BASE_URL + `/api/performance/detail?performanceId=${performanceId}`);

    if (!res.ok) {
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

    const infoTime = document.getElementById("infoTime");
    const infoCaster = document.getElementById("infoCaster");

    infoTime.innerText = `${r.schedules[0].performanceScheduleStartTime}`;

    console.log(r.castMembers.length);
    infoCaster.innerHTML = `<div class="info-caster"><p class="info-caster-list">출연진</p></div>`;
    for(let i = 0; i < r.castMembers.length; i++){
        infoCaster.innerHTML += `
        <div class="info-caster">${r.castMembers[i].castMemberName}</div>`;
    }

    const performanceImage = document.getElementById("performanceImage");
    const performanceTitle = document.getElementById("performanceTitle");
    const performanceDate = document.getElementById("performanceDate");
    const performanceAddress = document.getElementById("performanceAddress");

    performanceImage.innerHTML = `
    <img src=${r.performanceImagePath} />`;
    performanceTitle.innerText = `${r.performanceTitle}`;
    performanceDate.innerText = `${r.schedules[0].performanceScheduleStartDate} ~`;
    performanceAddress.innerText = `${r.performanceAddress}`;

}

const first = document.querySelectorAll(".prev-btn");
first.addEventListener("click", () => {
    alert("첫 번째 페이지입니다.");
})

const stepBtn = document.querySelectorAll(".next-btn");
const tabs = document.querySelectorAll(".tab-content");

stepBtn.addEventListener("click", () => {

    const tabReservationInfo = document.getElementById("tabReservationInfo");

    if(tabReservationInfo)
    tabReservationInfo.classList.remove("active")


    document.getElementById("tabSeatInfo").classList.add("active");
})