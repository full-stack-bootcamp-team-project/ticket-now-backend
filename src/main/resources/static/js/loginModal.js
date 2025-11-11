
// 로그인 내 팝업 생성
const findIdBtn = document.getElementById("findId");
const findPwBtn = document.getElementById("findPassword");
const backdrop = document.getElementById("backdrop");
const findIdModal = document.getElementById("findIdModal");
const findPwModal = document.getElementById("findPwModal");
const cancelBtn = document.querySelectorAll(".cancel-button");
const submitIdBtn = document.getElementById("submitIdBtn");
const submitPwBtn = document.getElementById("submitPwBtn");

// 모달 열기
function openModal(type){
    backdrop.classList.remove("hidden");

    if (type === "id") {
        findIdModal.classList.remove("hidden");
    } else if (type === "pw") {
        findPwModal.classList.remove("hidden");
    }
}

findIdBtn.addEventListener("click", () => openModal("id"));
findPwBtn.addEventListener("click", () => openModal("pw"));

// 모달 닫기 함수
function closeModal() {
    backdrop.classList.add("hidden");
    document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
}

// 닫기 버튼 클릭
cancelBtn.forEach(btn => {
    btn.addEventListener("click", closeModal);
});

// 확인 버튼 클릭 - 아이디
submitIdBtn.addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const ssn1 = document.getElementById("ssn1").value.trim();
    const ssn2 = document.getElementById("ssn2").value.trim();

    if (!name || !ssn1 || !ssn2) {
        alert("모든 항목을 입력해주세요.");
        return;
    }

    alert(`입력 확인!\n이름: ${name}\n주민번호: ${ssn1}-${ssn2}`);
    closeModal();
});

// 확인 버튼 클릭

