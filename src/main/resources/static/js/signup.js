document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#signUpForm");

    const fields = {
        email: document.querySelector("#userEmail"),
        pw: document.querySelector("#userPw"),
        pwCheck: document.querySelector("#checkUserPw"),
        name: document.querySelector("#userName"),
        nickname: document.querySelector("#userNickName"),
        ssn1: document.querySelector("#userSSN1"),
        ssn2: document.querySelector("#userSSN2"),
        tel1: document.querySelector("#tel1"),
        tel2: document.querySelector("#tel2"),
        tel3: document.querySelector("#tel3"),
        postcode: document.querySelector("#postcode"),
        address: document.querySelector("#address"),
        detailAddress: document.querySelector("#detailAddress"),
    };

    // 유효성 검사 이벤트 등록
    fields.email.addEventListener("input", () => validateField("email"));
    fields.pw.addEventListener("input", () => validateField("pw"));
    fields.pwCheck.addEventListener("input", () => validateField("pwCheck"));
    fields.name.addEventListener("input", () => validateField("name"));
    fields.nickname.addEventListener("input", () => validateField("nickname"));
    // 주민등록번호
    fields.ssn1.addEventListener("input", () => validateField("ssn"));
    fields.ssn2.addEventListener("input", () => validateField("ssn"));
    // 휴대폰 번호
    fields.tel1.addEventListener("input", () => validateField("phone"));
    fields.tel2.addEventListener("input", () => validateField("phone"));
    fields.tel3.addEventListener("input", () => validateField("phone"));

    // 비밀번호 보기 토글
    document.querySelectorAll(".password-view-button").forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = btn.previousElementSibling;
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";
            btn.classList.toggle("password-off", !isPassword);
        });
    });

    // 폼 제출
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (!isValid) {
            alert("입력값을 다시 확인해주세요.");
            return;
        }

        const data = collectFormData();
        await submitSignup(data);
    });

    // 유효성 검사
    const rules = {
        email: (v) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "이메일 형식이 올바르지 않습니다.",
        pw: (v) =>
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/.test(v) ||
            "비밀번호는 8자 이상, 영문/숫자/특수문자 포함이어야 합니다.",
        pwCheck: (v) => v === fields.pw.value || "비밀번호가 일치하지 않습니다.",
        name: (v) =>
            /^[가-힣a-zA-Z]{2,10}$/.test(v) || "이름은 2~10자, 한글 또는 영문만 가능합니다.",
        nickname: (v) =>
            /^[가-힣a-zA-Z]{2,10}$/.test(v) || "닉네임은 2~10자, 한글 또는 영문만 가능합니다.",
        ssn: (v) => {
            const [s1, s2] = v.split("-");
            if (!/^\d+$/.test(s1) || !/^\d+$/.test(s2)) return "숫자만 입력 가능합니다.";
            if (!(s1.length === 6 && s2.length === 7)) return "주민등록번호는 000000-0000000 형식이어야 합니다.";
            return true;
        },
        phone: (v) => {
            const [t1, t2, t3] = v.split("-");
            if (!/^\d+$/.test(t1) || !/^\d+$/.test(t2) || !/^\d+$/.test(t3)) return "숫자만 입력 가능합니다.";
            if (!(t1.length === 3 && (t2.length === 3 || t2.length === 4) && t3.length === 4))
                return "휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)";
            return true;
        },

    };

    function validateField(key) {
        let value = "";
        let validationEl;

        switch(key) {
            case "ssn":
                value = `${fields.ssn1.value.trim()}-${fields.ssn2.value.trim()}`;
                validationEl = fields.ssn2.closest(".default-input-wrap").querySelector(".input-validation");
                break;
            case "phone":
                value = `${fields.tel1.value.trim()}-${fields.tel2.value.trim()}-${fields.tel3.value.trim()}`;
                validationEl = fields.tel3.closest(".default-input-wrap").querySelector(".input-validation");
                break;
            default:
                value = fields[key].value.trim();
                validationEl = fields[key].closest(".default-input-wrap").querySelector(".input-validation");
        }


        const rule = rules[key];
        if (!rule) return true;

        const result = rule(value);

        if (result === true) {
            validationEl.textContent = "작성완료!";
            validationEl.className = "input-validation input-validation-success";
            return true;
        } else {
            validationEl.textContent = result;
            validationEl.className = "input-validation input-validation-error";
            return false;
        }
    }

    function validateForm() {
        return Object.keys(rules).every((key) => validateField(key));
    }

    // 폼 데이터 수집
    function collectFormData() {
        const gender = document.querySelector("input[name='gender']:checked")?.value || "";

        return {
            userId: 'U004', // TODO 자동 생성?
            userPw: fields.pw.value.trim(),
            userSSN: `${fields.ssn1.value}-${fields.ssn2.value}`,
            userName: fields.name.value.trim(),
            userNickname: fields.nickname.value.trim(),
            userPhone: `${fields.tel1.value}-${fields.tel2.value}-${fields.tel3.value}`,
            userEmail: fields.email.value.trim(),
            userAddress: `${fields.postcode.value} ${fields.address.value} ${fields.detailAddress.value}` ? `${fields.postcode.value} ${fields.address.value} ${fields.detailAddress.value}` : "",
            userGender: gender ?  gender : "M",
            grade: "bronze",
            userTotalCount: 0,
        };
    }

    // DB 전송
    async function submitSignup(data) {
        console.log(data, "data")
        try {
            const res = await fetch("/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || "회원가입 실패");
            }

            alert(`${data.userNickname}님 회원가입을 환영합니다!`);
            window.location.href = "/user/login";
        } catch (err) {
            console.error("회원가입 오류:", err);
            alert("회원가입 중 오류가 발생했습니다.\n" + err.message);
        }
    }
});


// 우편 주소 가져오기
function daumPostCode(){
    new daum.Postcode(
        {
            oncomplete : function(data) {
                var addr='';

                if(data.userSelectedType === 'R'){
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                document.getElementById('postcode').value = data.zonecode;
                document.getElementById('address').value = addr;
                document.getElementById('detailAddress').focus();
            }
        }
    ).open();
}

document.querySelector("#searchAddress").addEventListener("click",daumPostCode);
