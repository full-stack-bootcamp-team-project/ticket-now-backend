
// 로그인 내 팝업 생성
const findIdBtn = document.getElementById("findId");
const findPwBtn = document.getElementById("findPassword");
const backdrop = document.getElementById("backdrop");
const findIdModal = document.getElementById("findIdModal");
const findPwModal = document.getElementById("findPwModal");
const cancelButton = document.querySelectorAll(".cancel-button");
const submitIdButton = document.getElementById("submitIdButton");
const submitPwButton = document.getElementById("submitPwButton");

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
    document.querySelectorAll(".modal").forEach(modalChange => modalChange.classList.add("hidden"));
}

// 닫기 버튼 클릭
cancelButton.forEach(btn => {
    btn.addEventListener("click", closeModal);
});


// 확인 버튼 클릭 - 아이디
submitIdButton.addEventListener("click", async () => {
const checkName = document.getElementById("checkName").value.trim();
const checkSSN1 = document.getElementById("checkSSN1").value.trim();
const checkSSN2 = document.getElementById("checkSSN2").value.trim();

const idResultBox = document.getElementById("idResultBox");

    if (!checkName || !checkSSN1 || !checkSSN2) {
        alert("모든 항목을 입력해주세요.");
        return;
    }

    alert(`입력 확인!\n이름: ${checkName}\n주민번호: ${checkSSN1}-${checkSSN2}`);

    let ssn = `${checkSSN1}-${checkSSN2}`;

    try {
        const res = fetch("/api/user/login/findId", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `userName=${encodeURIComponent(checkName)}&userSSN=${encodeURIComponent(ssn)}`
        }).then(
            res => {
                const data = res.json();

                if (data) {
                    // 성공 시 -> 이메일 가져와서 넣기
                    idResultBox.innerHTML =
                        `
                        <p class="id-result-text">
                            <span>${checkName}</span> 님의 아이디는<br>
                            <span class="result-text-point">testEmail@email.com</span> 입니다.
                        </p>
                        `
                } else {
                    // 실패 시
                    idResultBox.innerHTML =
                        `
                        <p class="id-result-text error">
                            아이디가 존재하지 않습니다.
                        </p>
                        `
                }
            }
        )
    } catch (err) {
        console.error("아이디 찾기 오류:", err);
        resultBox.innerHTML = `
                <p class="id-result-text error">
                    서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                </p>
            `;
    }

    // closeModal();
});

// 확인 버튼 클릭
submitPwButton.addEventListener("click", () => {
    // const name = document.getElementById("nameInput").value.trim();
    // const ssn1 = document.getElementById("ssn1").value.trim();
    // const ssn2 = document.getElementById("ssn2").value.trim();
    //
    // if (!name || !ssn1 || !ssn2) {
    //     alert("모든 항목을 입력해주세요.");
    //     return;
    // }
    //
    // alert(`입력 확인!\n이름: ${name}\n주민번호: ${ssn1}-${ssn2}`);
    // closeModal();
});
