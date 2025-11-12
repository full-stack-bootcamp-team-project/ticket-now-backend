// API Base URL
const API_BASE_URL = "http://localhost:8080"

// URL Parameters
const urlParams = new URLSearchParams(window.location.search);
const performanceId = urlParams.get("performanceId");

let selectedScheduleId = null;
let selectedSeats = [];

// Wait for DOM to be fully loaded
window.addEventListener("DOMContentLoaded", () => {

    // Calendar setup
    // 달력
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
            const formattedMonth = String(month + 1).padStart(2, '0');
            const formattedDate = String(date).padStart(2, '0');
            html += `<div class="${classes}" data-date="${year}-${formattedMonth}-${formattedDate}"><p class="date">${date}</p></div>`;
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
    // 달력 클릭 이벤트
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

        const infoTime = document.getElementById("infoTime");
        const infoCaster = document.getElementById("infoCaster");

        let found = false; // 날짜 존재 여부 표시

        for (let i = 0; i < d.schedules.length; i++) {
            const date = d.schedules[i].performanceScheduleStartDate;
            console.log("DB 날짜:", date);

            if (date === selectedDate) {
                console.log("선택한 날짜의 스케줄:", d.schedules[i]);
                const scheduleId = d.schedules[i].performanceScheduleId;
                selectedScheduleId = d.schedules[i].performanceScheduleId;
                console.log("scheduleId:", scheduleId);
                found = true;

                infoTime.style.display = "block";
                infoCaster.style.display = "flex";

                infoTime.innerText = `${d.schedules[i].performanceScheduleStartTime}`;
                infoCaster.innerHTML = `<div class="info-caster"><p class="info-caster-list">출연진</p></div>`;

                for(let j = 0; j < d.castMembers.length; j++){
                    infoCaster.innerHTML += `
                <div class="info-caster">${d.castMembers[j].castMemberName}</div>`;
                }

                // sendScheduleIdToServer(scheduleId); DB 보내는 방법

                break;
            }
        }

        if (!found) {
            alert("해당하는 날짜에 공연이 없습니다.");
            infoTime.style.display = "none";
            infoCaster.style.display = "none";
        }


        const reservationDate = document.getElementById("reservationDate");
        const reservationTime = document.getElementById("reservationTime");

        const [year, month, day] = selectedDate.split('-');
        reservationDate.innerText = `${year}년 ${month}월 ${day}일`;
        reservationTime.innerText = `${d.schedules[0].performanceScheduleStartTime}`;



    });

    // 달력 이전 버튼 클릭
    calendarPrev.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    // 달력 다음 버튼 클릭
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
    // 공연 정보 JSON 형식으로 변환
    async function detailFunction(performanceId) {
        const res = await fetch(API_BASE_URL + `/api/performance/detail?performanceId=${performanceId}`);

        if (!res.ok) {
            throw new Error("공연 정보를 불러오는데 실패했습니다.")
        }

        return await res.json();
    }

    // 좌석 정보 JSON 형식으로 변환
    async function seatFunction(performanceScheduleId){

        const seatRes = await fetch(API_BASE_URL + `/api/performance/seat?performanceScheduleId=${performanceScheduleId}`);

        if(!seatRes.ok){
            throw new Error("좌석 정보를 불러오는데 실패했습니다.")
        }

        return await seatRes.json();
    }

    // 공연 정보 입력
    async function loadPerformanceDetail() {
        const r = await detailFunction(performanceId);
        console.log("DB 데이터 조회 r : ", r)



        const performanceImage = document.getElementById("performanceImage");
        const performanceTitle = document.getElementById("performanceTitle");
        const performanceDate = document.getElementById("performanceDate");
        const performanceAddress = document.getElementById("performanceAddress");
        const performanceTabImage = document.getElementById("performanceTabImage");

        performanceImage.innerHTML = `<img src=${r.performanceImagePath} />`;
        performanceTitle.innerText = `${r.performanceTitle}`;
        performanceDate.innerText = `${r.schedules[0].performanceScheduleStartDate} ~`;
        performanceAddress.innerText = `${r.performanceAddress}`;

        // 마지막 tab 에서 불러올 정보
        performanceTabImage.innerHTML = `<img src=${r.performanceImagePath} />`;

    }


// Tab navigation
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const tabContent = document.querySelectorAll('.tab-content');

    const buttonTexts = {
        0:{prev:"닫기", next:"다음단계"},
        1:{prev:"이전단계", next:"다음단계"},
        2:{prev:"이전단계", next:"예약하기"},
        3:{prev:"닫기", next:"마이페이지 이동"}
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
    }



    async function updateSelectedSeats() {
        const display = selectedSeats.length ? selectedSeats.join(', ') : '좌석을 선택해주세요.';
        const selectedSeatsElement = document.getElementById('selectedSeats');
        const reservationSeat = document.getElementById("reservationSeat");
        const reservationSeatLength = document.getElementById("reservationSeatLength");
        const reservationPrice = document.getElementById("reservationPrice");
        const reservationCharge = document.getElementById("reservationCharge");
        const reservationDelivery = document.getElementById("reservationDelivery");
        const reservationTotalPrice = document.getElementById("reservationTotalPrice");
        const finalPrice = document.getElementById("finalPrice");

        const p = await detailFunction(performanceId);

        if (selectedSeatsElement) {
            selectedSeatsElement.textContent = display;
            console.log(selectedSeats);
            reservationSeatLength.innerText = `${selectedSeats.length}`;

            reservationSeat.innerHTML = selectedSeats.map(item => `<p>${item}</p>`).join('');
            reservationPrice.innerText = `${Number(selectedSeats.length * p.performancePrice).toLocaleString() + " 원"}`;
            reservationCharge.innerText = Number(4000).toLocaleString() + " 원";
            reservationDelivery.innerText = "0";
            reservationTotalPrice.innerText = `${Number(selectedSeats.length * p.performancePrice + 4000).toLocaleString() + " 원"}`;
            finalPrice.innerText = `${Number(selectedSeats.length * p.performancePrice + 4000).toLocaleString() + " 원"}`;
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
        return Array.from(tabContent).findIndex(tab => tab.classList.contains('active'));
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

        const reservationInfo = document.getElementById("reservationInfo");
        const performanceImage = document.getElementById("performanceImage");

        if (currentIndex === 3) {
            reservationInfo.style.width = "500px";
            performanceImage.style.display = "none";
            prevBtn.onclick = () => {
                window.close();
            };

            nextBtn.onclick = () => {
                window.opener.location.href = "/user/myPage"; // 부모 창 이동
                window.close(); // 현재 팝업 닫기
            };

        } else {
            reservationInfo.style.width = "";
            performanceImage.style.display = "block";
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

        tabContent[currentIndex].classList.remove('active');
        tabContent[currentIndex - 1].classList.add('active');
        updateButtons();
    })

    nextBtn.addEventListener('click', () => {
        const currentIndex = getActiveTabIndex();

        if (currentIndex === 2) {

            if(confirm('예약을 하시겠습니까?')){
                alert('예약이 완료되었습니다!');
            } else {
                return;
            }
        }

        if(!validateStep(currentIndex)) {
            return;
        }

        tabContent[currentIndex].classList.remove('active');
        tabContent[currentIndex + 1].classList.add('active');
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
                // const selectedTime = document.querySelector(".time-selected");
                // if(!selectedTime) {
                //     alert("시간을 선택해주세요.")
                //     return false;
                // }
                // break;
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
    
    const tabButtons = document.querySelectorAll(".tab-button");
    const resultBtn = document.querySelectorAll(".tab-result");

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            const targetTab = document.getElementById(tabId);

            tabButtons.forEach(tab => tab.classList.remove('active'));
            resultBtn.forEach(tab => tab.classList.remove('active'));

            targetTab.classList.add('active');
            button.classList.add('active');
        })
    })

    async function reservationInfo(performanceScheduleId, seatId, seatNumber) {

        const r = await detailFunction(performanceId);

        const psId = r.schedules[0].performanceScheduleId;


        insertReservation(psId, seatId, seatNumber)
    }



}); // End of DOMContentLoaded

