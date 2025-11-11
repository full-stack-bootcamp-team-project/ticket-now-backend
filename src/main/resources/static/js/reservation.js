// API Base URL
const API_BASE_URL = "http://localhost:8080"

// URL Parameters
const urlParams = new URLSearchParams(window.location.search);
const performanceId = urlParams.get("performanceId");
<!-- todo 달력 -->
const monthYear = document.getElementById('monthYear');
const dates = document.getElementById('dates');
const calendarPrev = document.getElementById('calendarPrev');
const calendarNext = document.getElementById('calendarNext');

// Wait for DOM to be fully loaded
window.addEventListener("DOMContentLoaded", () => {

// Calendar setup
    const monthYear = document.getElementById('monthYear');
    const dates = document.getElementById('dates');
    const calendarPrev = document.getElementById('calendarPrev');
    const calendarNext = document.getElementById('calendarNext');

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;

    function renderCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        monthYear.textContent = `${year}.${month + 1}`;

        const startDay = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const prevLastDay = new Date(year, month, 0);
        const prevMonthDays = prevLastDay.getDate();

        let html = '';

        // Previous month dates
        for (let i = startDay - 1; i >= 0; i--) {
            const date = prevMonthDays - i;
            html += `<div class="date-area inactive"><p class="date">${date}</p></div>`;
        }

        // Current month dates
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

        // Next month dates
        const totalCells = startDay + daysInMonth;
        const nextDays = 7 - (totalCells % 7);
        if (nextDays < 7) {
            for (let i = 1; i <= nextDays; i++) {
                html += `<div class="date-area inactive"><p class="date">${i}</p></div>`;
            }
        }

        dates.innerHTML = html;
    }

// Date click event
    dates.addEventListener('click', async (e) => {
        const target = e.target.closest('.date-area');
        if (!target || target.classList.contains('inactive')) return;

        document.querySelectorAll('.dates .date-area').forEach(d => d.classList.remove('selected'));

        target.classList.add('selected');
        selectedDate = target.dataset.date;

        console.log(`선택된 날짜: ${selectedDate}`);

        const choiceDate = document.querySelector('.choice-date');
        choiceDate.style.display = 'block';

        const d = await detailFunction(performanceId);

        const reservationDate = document.getElementById("reservationDate");
        const reservationTime = document.getElementById("reservationTime");

        const [year, month, day] = selectedDate.split('-');
        reservationDate.innerText = `${year}년 ${month}월 ${day}일`;
        reservationTime.innerText = `${d.schedules[0].performanceScheduleStartTime}`;
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


// Data fetching functions
    async function detailFunction(performanceId) {
        const res = await fetch(API_BASE_URL + `/api/performance/detail?performanceId=${performanceId}`);

        if (!res.ok) {
            throw new Error("공연 정보를 불러오는데 실패했습니다.")
        }

        return await res.json();
    }

    async function loadPerformanceDetail() {
        const r = await detailFunction(performanceId);
        console.log("DB 데이터 조회 r : ", r)

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

        performanceImage.innerHTML = `<img src=${r.performanceImagePath} />`;
        performanceTitle.innerText = `${r.performanceTitle}`;
        performanceDate.innerText = `${r.schedules[0].performanceScheduleStartDate} ~`;
        performanceAddress.innerText = `${r.performanceAddress}`;
    }


// Tab navigation
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const tabs = document.querySelectorAll('.tab-content');

    const buttonTexts = {
        0:{prev:"닫기", next:"다음단계"},
        1:{prev:"이전단계", next:"다음단계"},
        2:{prev:"이전단계", next:"예약하기"},
        3:{prev:"닫기", next:"마이페이지 이동"}
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

// Seat selection
    const sections = {
        A: { rows: 8, cols: 5 },
        B: { rows: 8, cols: 10 },
        C: { rows: 8, cols: 5 },
        D: { rows: 8, cols: 5 },
        E: { rows: 8, cols: 10 },
        F: { rows: 8, cols: 5 },
    };

    let selectedSeats = [];

    function createSeats() {
        for (const [section, size] of Object.entries(sections)) {
            const container = document.getElementById(section);
            if (!container) continue;

            container.style.gridTemplateColumns = `repeat(${size.cols}, 20px)`;

            for (let r = 1; r <= size.rows; r++) {
                for (let c = 1; c <= size.cols; c++) {
                    const seatId = `${section}-${r}열 ${c}번`;

                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.id = seatId;
                    input.className = 'seat-input';

                    const label = document.createElement('label');
                    label.className = 'seat';
                    label.htmlFor = seatId;
                    label.dataset.seat = seatId;

                    label.appendChild(input);
                    container.appendChild(label);
                }
            }
        }
calendarNext.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    function updateSelectedSeats() {
        const display = selectedSeats.length ? selectedSeats.join(', ') : '좌석을 선택해주세요.';
        const selectedSeatsElement = document.getElementById('selectedSeats');
        const reservationSeat = document.getElementById("reservationSeat");
        const reservationSeatLength = document.getElementById("reservationSeatLength");

        if (selectedSeatsElement) {
            selectedSeatsElement.textContent = display;
            console.log(selectedSeats);
            reservationSeatLength.innerText = `${selectedSeats.length}`;

            reservationSeat.innerHTML = selectedSeats.map(item => `<p>${item}</p>`).join('');
        }
    }

    document.addEventListener('change', (e) => {
        const checkbox = e.target.closest('.seat-input');
        if (!checkbox) return;

        const seatId = checkbox.parentElement.dataset.seat;

        if (checkbox.checked) {
            selectedSeats.push(seatId);
        } else {
            selectedSeats = selectedSeats.filter(s => s !== seatId);
        }
        updateSelectedSeats();
    });

    function getActiveTabIndex() {
        return Array.from(tabs).findIndex(tab => tab.classList.contains('active'));
window.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".reservation-info")) {
        loadPerformanceDetail();
    }

    function updateButtons(){
        const currentIndex = getActiveTabIndex();

        if(buttonTexts[currentIndex]) {
            prevBtn.textContent = buttonTexts[currentIndex].prev;
            nextBtn.textContent = buttonTexts[currentIndex].next;
        }

        if(currentIndex === 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.width = '100%';
        } else {
            prevBtn.style.display = 'block';
            prevBtn.classList.add('active');
            nextBtn.style.width="";
        }
    }

    prevBtn.addEventListener('click', () => {
        const currentIndex = getActiveTabIndex();
        console.log(currentIndex);

        if (currentIndex === 0) {
            if(confirm('예약을 취소하고 나가시겠습니까?')) {
                window.history.back();
            }
            return;
        }
        if(currentIndex <= 0) {
            return;
        }

        tabs[currentIndex].classList.remove('active');
        tabs[currentIndex - 1].classList.add('active');
        updateButtons();
    })

// 1. 페이지 로드 시 공연 상세 정보 가져오기
async function loadPerformanceDetail() {
    const urlParams = new URLSearchParams(window.location.search);

    nextBtn.addEventListener('click', () => {
        const currentIndex = getActiveTabIndex();

        if (currentIndex >= tabs.length - 1) {
            alert('예약이 완료되었습니다!');
            return;
        }

        if(!validateStep(currentIndex)) {
            return;
        }
        tabs[currentIndex].classList.remove('active');
        tabs[currentIndex + 1].classList.add('active');
        updateButtons();
    });

    function validateStep(stepIndex) {
        switch (stepIndex) {
            case 0:
                if(!selectedDate) {
                    alert("날짜를 선택해주세요.");
                    return false;
                }
                break;
                const selectedTime = document.querySelector(".time-selected");
                if(!selectedTime) {
                    alert("시간을 선택해주세요.")
                    return false;
                }
                break;
            case 1:
                if(selectedSeats.length === 0) {
                    alert("좌석을 선택해주세요.")
                    return false;
                }
                break;
            case 2:
                 // Payment verification
                break;
            case 3:

                break;
        }
        return true;
    }

// Initialize
    updateButtons();

    if(document.getElementById('A')){
        createSeats();
    }

    if (document.querySelector(".reservation-info")) {
        loadPerformanceDetail();
    }

}); // End of DOMContentLoaded
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
