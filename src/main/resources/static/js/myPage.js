const API_BASE_URL = "http://localhost:8080";
const buttons = document.querySelectorAll('.tab-button');
const tabs = document.querySelectorAll('.tab-content');

fetchUserData().then(renderUserInfo).catch(err => console.error("오류 발생:", err));
fetchReservationData().then(renderReservationInfo).catch(err=>console.error("오류 발생",err));

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
    }).then(res => res.json());
}

function renderUserInfo(user) {
    const info = document.getElementById("info-area");
    info.innerHTML = `
        <div class="info-item">이름 : ${user.userName}</div>
        <div class="info-item">이메일 : ${user.userEmail}</div>
        <div class="info-item">성별 : ${user.userGender}</div>
        <div class="info-item">닉네임 : ${user.userNickname}</div>
        <div class="info-item">주소 : ${user.userAddress}</div>
        <div class="info-item">전화번호 : ${user.userPhone}</div>
        <div class="info-item">등급 : ${user.grade || '등급 회원'}</div>
    `;
}
function renderReservationInfo(reservation) {
    const ticket = document.getElementById("ticket-area");
    ticket.innerHTML = `
    <div class="ticket-item">${reservation[0].seatNumber}</div>
    <div class="ticket-item">${reservation[0].performanceTitle}</div>`
}
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tabId = btn.id.replace('tab', '').toLowerCase();
        tabs.forEach(tab => tab.classList.remove('active'));
        buttons.forEach(b => b.classList.remove('active'));

        document.getElementById(tabId).classList.add('active');
        e.currentTarget.classList.add('active');
    });
});
