// 이메일 비밀번호 미작성시 로그인 제한
const loginEmail = document.querySelector("#loginForm input[name='userEmail']")
const loginForm = document.querySelector("#loginForm");
const loginPw= document.querySelector("#loginForm input[name='userPw']");

if(loginForm != null){
    loginForm.addEventListener("submit",e=>{
        if (loginEmail.value.trim()===0){
            alert("이메일 미작성");
            e.preventDefault(); // 기본 제출 막기
            loginEmail.focus(); // 작성 안된 곳으로 초점 이동
            return;
        }

        if (loginPw.value.trim()===0){
            alert("비밀번호 미작성");
            e.preventDefault(); // 기본 제출 막기
            loginPw.focus(); // 작성 안된 곳으로 초점 이동
            return;
        }
    })
}

// 로그인 내 팝업 생성
const findIdBtn = document.querySelector(".login-find-button");
const backdrop = document.getElementById("backdrop");
const modal = document.getElementById("findIdModal");
const cancelBtn = document.getElementById("cancelBtn");
const submitBtn = document.getElementById("submitBtn");

// 모달 열기
findIdBtn.addEventListener("click", () => {
    backdrop.classList.remove("hidden");
    modal.classList.remove("hidden");
});

// 모달 닫기 함수
function closeModal() {
    modal.classList.add("hidden");
    backdrop.classList.add("hidden");
}

// 닫기 버튼 클릭
cancelBtn.addEventListener("click", closeModal);

// 확인 버튼 클릭
submitBtn.addEventListener("click", () => {
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

