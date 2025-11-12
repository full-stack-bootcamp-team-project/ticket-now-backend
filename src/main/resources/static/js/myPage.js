const API_BASE_URL = "http://localhost:8080";
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');


fetchUserData().then(renderUserInfo).catch(err => console.error("유저 정보 로드 오류:", err));

fetchReservationData().then(data => setupPagination(data, 4)).catch(err => console.error("예약 정보 로드 오류:", err));

function fetchUserData() {
    return fetch(`${API_BASE_URL}/api/user/myPage`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

function fetchReservationData() {
    return fetch(`${API_BASE_URL}/api/reservation/get`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
}

function renderUserInfo(user) {
    const userInfoArea = document.querySelector(".user-info-area");

    userInfoArea.innerHTML = `
        <div class="user-info">이름: ${user.userName}</div>
        <div class="user-info">이메일: ${user.userEmail}</div>
        <div class="user-info">성별: ${user.userGender}</div>
        <div class="user-info">닉네임: ${user.userNickname}</div>
        <div class="user-info">주소: ${user.userAddress}</div>
        <div class="user-info">전화번호: ${user.userPhone}</div>
        <div class="user-info">등급: ${user.grade || '등급 회원'}</div>
    `;
}


function setupPagination(items, itemsPerPage) {
    const pagination = document.getElementById("reservationPagination");
    const reservationInfoArea = document.querySelector(".reservation-info-area");

    if (!reservationInfoArea || !pagination) return;

    if (!items || items.length === 0) {
        reservationInfoArea.innerHTML = `<p>예매 내역이 없습니다.</p>`;
        pagination.innerHTML = '';
        return;
    }

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const renderPage = (page) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = items.slice(startIndex, endIndex);

        reservationInfoArea.innerHTML = pageItems.map(renderReservation).join('');

        pagination.innerHTML = Array.from({length: totalPages}, (_, i) => {
            const pageNum = i + 1;
            return `<button class="${pageNum === page ? 'active' : ''}" data-page="${pageNum}">${pageNum}</button>`;
        }).join('');

        pagination.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                const pageNum = parseInt(button.dataset.page);
                renderPage(pageNum);
            });
        });
    };
    renderPage(1);
}

function renderReservation(reservation) {
    return `
        <div class="reservation-info">
            <img src="${reservation.performanceImagePath}" 
                 alt="${reservation.performanceTitle}" 
                 class="performance-img"/>
            <div class="performance-info">
                <div>${reservation.performanceTitle}</div>
                <div>좌석: ${reservation.seatNumber}열 (${reservation.seatId})번</div>
                <div>공연 일시: ${reservation.performanceScheduleStartDate}일 ${reservation.performanceScheduleStartTime}시</div>
                <div>예약일: ${reservation.reservationDate}</div>
            </div>
        </div>
    `;
}


tabButtons.forEach(button => {
    button.addEventListener('click', () => {

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        const tabId = button.dataset.tab;
        const targetTab = document.getElementById(tabId);

        targetTab.classList.add('active');
        button.classList.add('active');

    });
});

