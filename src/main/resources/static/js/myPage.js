const API_BASE_URL = "http://localhost:8080/api";
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

let userData = null;
let reservationData = [];

fetchUserData().then(user => {
    userData = user;
    renderUserInfo(userData);
}).catch(err => console.error("유저 정보 로드 오류:", err));

fetchReservationData().then(data => {
    reservationData = data;
    setupPagination(reservationData, 4);
}).catch(err => console.error("예약 정보 로드 오류:", err));

function fetchUserData() {
    return fetch(`${API_BASE_URL}/user/myPage`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

function fetchReservationData() {
    return fetch(`${API_BASE_URL}/reservation/get`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json());
}

function renderUserInfo(user) {
    const userInfoArea = document.getElementById("userInfo");
    userInfoArea.innerHTML = ` 
 <div class="user-info-area">
    <div class="user-info">
        <div>이름: ${user.userName}</div>
        <div>이메일: ${user.userEmail}</div>
        <div>성별: ${user.userGender}</div>
        <div>닉네임: ${user.userNickname}</div>
        <div>주소: ${user.userAddress}</div>
        <div>전화번호: ${user.userPhone}</div>
        <div>등급: ${user.grade} 등급 회원</div>
    </div>
   </div>
    <div class="button-area">
        <button class="update-button" id="updateUserInfo">개인정보 수정</button>
        <button class="update-button" id="updatePassword">비밀번호 변경</button>
    </div>
`
}

function renderUserInfoForm(user) {
    const userInfoArea = document.getElementById("userInfo");
    userInfoArea.innerHTML = `
 <div class="user-info-area">
    <div class="user-info">
        <div>
            이름: <input type="text" id="Name" value="${user.userName}">
        </div>
        <div>
            이메일: 
            <input type="email" id="Email" value="${user.userEmail}">
            <button type="button" id="checkEmail">중복 확인</button>
        </div>
        <div>
            성별: 
                <input type="radio">남자</input>
                <input type="radio">여자</input>
        </div>
        <div>
            닉네임: <input type="text" id="Nickname" value="${user.userNickname}">
        </div>
        <div>
            주소: <input type="text" id="Address" value="${user.userAddress}">
        </div>
        <div>
            전화번호: 
            <input type="text" id="Phone" value="${user.userPhone}">
            <button type="button" id="checkPhone">중복 확인</button>
        </div>
        <div>
            등급: ${user.grade} 등급 회원
        </div>
    </div>
   </div>
    <div class="button-area">
        <button class="update-button" id="saveUserInfo">저장</button>
        <button class="update-button" id="cancelUpdate">취소</button>
    </div>
`
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
        <div class="reservation-info" 
             data-schedule="${reservation.performanceScheduleId}" 
             data-seat-id="${reservation.seatId}" 
             data-seat-number="${reservation.seatNumber}">
            <img src="${reservation.performanceImagePath}" 
                 alt="${reservation.performanceTitle}" 
                 class="performance-img"/>
            <div class="performance-info">
                <div>${reservation.performanceTitle}</div>
                <div>좌석: ${reservation.seatNumber}열 (${reservation.seatId})번</div>
                <div>공연 일시: ${reservation.performanceScheduleStartDate} ${reservation.performanceScheduleStartTime}</div>
                <div>예약 일시: ${reservation.reservationDate}</div>
            </div>
            <div class="button-area">
                <button type="button" class="delete-button">예매 취소</button>
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

document.addEventListener('click', (e) => {
    const target = e.target;


    if (target.id === "updateUserInfo") {
        renderUserInfoForm(userData);
    }
    if (target.id === "cancelUpdate") {
        renderUserInfo(userData);
    }
    if (target.id === "saveUserInfo") {
        const updatedUser = {
            userName: document.getElementById("inputUserName").value,
            userEmail: document.getElementById("inputUserEmail").value,
            userGender: document.getElementById("inputUserGender").value,
            userNickname: document.getElementById("inputUserNickname").value,
            userAddress: document.getElementById("inputUserAddress").value,
            userPhone: document.getElementById("inputUserPhone").value
        };

        // 서버로 업데이트
        fetch(`${API_BASE_URL}/api/user/update`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                userData = data;
                renderUserInfo(userData);
                alert("정보가 수정되었습니다.");
            })
            .catch(err => console.error("수정 오류:", err));
    } else if (target.id === "updatePassword") {
        updatePassword();
    } else if (target.classList.contains('delete-button')) {
        const reservationDiv = target.closest('.reservation-info');
        const scheduleId = reservationDiv.dataset.schedule;
        const seatId = reservationDiv.dataset.seatId;
        const seatNumber = reservationDiv.dataset.seatNumber;

        if (confirm("정말로 예매를 취소하시겠습니까?")) {
            reservationDiv.remove();
            reservationData = reservationData.filter(r => !(r.performanceScheduleId == scheduleId && r.seatId == seatId && r.seatNumber == seatNumber));
            deleteReservation(scheduleId, seatId, seatNumber);
        }
    }
});

function updateUserInfo() {
    // 유저 정보 수정 로직
}

function updatePassword() {
    // 비밀번호 변경 로직
}

function deleteReservation(scheduleId, seatId, seatNumber) {
    const url = `${API_BASE_URL}/reservation/delete?performanceScheduleId=${encodeURIComponent(scheduleId)}&seatId=${encodeURIComponent(seatId)}&seatNumber=${encodeURIComponent(seatNumber)}`;

    fetch(url, {
        method: "DELETE",
        credentials: "include"
    }).then(res => console.log("삭제완료", res.json())).catch(err => console.error("삭제 요청 오류:", err));
}
