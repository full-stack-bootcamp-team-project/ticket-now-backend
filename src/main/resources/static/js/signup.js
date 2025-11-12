const form = document.getElementById("signUpForm");

const fields = {
    email: "#userEmail",
    pw: "#userPw",
    pwCheck: "#checkUserPw",
    name: "#userName",
    nickname: "#userNickName",
    ssn1: "#userSSN1",
    ssn2: "#userSSN2",
    tel1: "#tel1",
    tel2: "#tel2",
    tel3: "#tel3",
    postcode: "#postcode",
    address: "#address",
    detailAddress: "#detailAddress",
};

const $ = (selector) => document.querySelector(selector);
const els = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, $(v)]));


// 유효성 검사 공통 - 주민등록번호, 휴대폰 번호
const basicValidators = {
    onlyDigits: (v) => /^\d+$/.test(v),
    ssnFormat: (v) => /^\d{6}-\d{7}$/.test(v),
    phoneFormat: (v) => /^01[016789]-\d{3,4}-\d{4}$/.test(v),
};
// 유효성 검사

const validators = {
    email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "이메일 형식이 올바르지 않습니다.",
    pw: (v) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/.test(v) ||
        "비밀번호는 8자 이상, 영문/숫자/특수문자 포함이어야 합니다.",
    pwCheck: (v) => v === els.pw.value || "비밀번호가 일치하지 않습니다.",
    name: (v) =>
        /^[가-힣a-zA-Z]{2,10}$/.test(v) || "이름은 2~10자, 한글 또는 영문만 가능합니다.",
    nickname: (v) =>
        /^[가-힣a-zA-Z]{2,10}$/.test(v) || "닉네임은 2~10자, 한글 또는 영문만 가능합니다.",
    ssn: (v) =>
        /^\d{6}-\d{7}$/.test(v) || "주민등록번호는 000000-0000000 형식이어야 합니다.",
    phone: (v) =>
        /^01[016789]-\d{3,4}-\d{4}$/.test(v) ||
        "휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)",
    // 아무것도 치지 않았을 때 validation 넣기
    ssn: (v) => {
        if (!v) return "주민등록번호를 입력해주세요.";
        if (!basicValidators.onlyDigits(v.replace("-", "")))
            return "숫자만 입력 가능합니다.";
        if (!basicValidators.ssnFormat(v))
            return "주민등록번호는 000000-0000000 형식이어야 합니다.";
        return true;
    },

    phone: (v) => {
        if (!v) return "휴대폰 번호를 입력해주세요.";
        const formatted = v.includes("-")
            ? v
            : v.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
        if (!basicValidators.phoneFormat(formatted))
            return "휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)";
        return true;
    },

};

// 유효성 검사 - 주민등록번호, 휴대폰 번호
async function validateField(key) {
    let value = "";
    if (key === "ssn")
        value = `${els.ssn1.value.trim()}-${els.ssn2.value.trim()}`;
    else if (key === "phone")
        value = `${els.tel1.value.trim()}-${els.tel2.value.trim()}-${els.tel3.value.trim()}`;
    else value = els[key].value.trim();

    const msg = validators[key]?.(value);

    const el =
        (key === "ssn" ? els.ssn2 : key === "phone" ? els.tel3 : els[key])
            .closest(".default-input-wrap")
            ?.querySelector(".input-validation");

    // 입력 비어있을 때
    if (!value) {
        showError(el, "입력값이 없습니다.");
        return false;
    }

    // validation
    if (msg === true) {
        showSuccess(el);
        return true;
    } else {
        showError(el, msg);
        return false;
    }
}
const showError = (el, msg) => {
    el.textContent = msg;
    el.className = "input-validation input-validation-error";
};
const showSuccess = (el) => {
    el.textContent = "작성완료!";
    el.className = "input-validation input-validation-success";
};

async function validateForm() {
    const keys = Object.keys(validators);
    for (const key of keys) {
        const ok = validateField(key);
        if (!ok) return false;
    }
    return true;
}

// 입력 이벤트 등록
const eventMap = {
    email: [els.email],
    pw: [els.pw],
    pwCheck: [els.pwCheck],
    name: [els.name],
    nickname: [els.nickname],
    ssn: [els.ssn1, els.ssn2],
    phone: [els.tel1, els.tel2, els.tel3]
};

for (const [key, inputs] of Object.entries(eventMap)) {
    inputs.forEach((input) =>
        input.addEventListener("input", () => validateField(key))
    );
}

// 비밀번호 보기 토글
document.querySelectorAll(".password-view-button").forEach((btn) => {
    btn.addEventListener("click", () => {
        const input = btn.previousElementSibling;
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        btn.classList.toggle("password-off", !isHidden);
    });
});

// 중복 확인
async function checkDuplicate(key, value) {
    try {
        const keyName =
            key === "phone"
                ? "userPhone"
                : key === "email"
                    ? "userEmail"
                    : "userSSN";

        const res = await fetch(
            `/api/user/check${key.charAt(0).toUpperCase() + key.slice(1)}?${keyName}=${encodeURIComponent(
                value
            )}`
        );
        console.log(res,"res")
        const data = await res.json();
        return data.exists
            ? `${key === "email" ? "이메일" :  key === "phone" ? "휴대폰 번호" : "주민등록번호"}가 이미 사용 중입니다.`
            : null;
    } catch {
        return "중복 확인 중 오류가 발생했습니다.";
    }
}

function setupDuplicateButton(buttonId, key) {
    const button = document.getElementById(buttonId);
    const errorEl = document.querySelector(`[data-error-for="${key}"]`);

    const getValue = () =>
        key === "phone"
            ? `${els.tel1.value}-${els.tel2.value}-${els.tel3.value}`
            : els.email.value;

    const attachInputEvents = () => {
        const targets =
            key === "phone"
                ? [els.tel1, els.tel2, els.tel3]
                : [els.email];
        targets.forEach((el) =>
            el.addEventListener("input", () => {
                button.disabled = !getValue().includes("-");
            })
        );
    };

    button.addEventListener("click", async () => {
        const value = getValue();
        const valid = validators[key](value);
        if (valid !== true) return showError(errorEl, valid);

        const msg = await checkDuplicate(key, value);
        msg ? showError(errorEl, msg) : showSuccess(errorEl);
    });

    attachInputEvents();
    button.disabled = true;
}

setupDuplicateButton("checkEmail", "email");
setupDuplicateButton("checkPhone", "phone");

// 폼 제출
form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (!isValid) {
            alert("입력값을 다시 확인해주세요.");
            return;
        }

        // 폼 데이터 수집
        const data = {
            userPw: els.pw.value.trim(),
            userSSN: `${els.ssn1.value}-${els.ssn2.value}`,
            userName: els.name.value.trim(),
        userNickname: els.nickname.value.trim(),
        userPhone: `${els.tel1.value}-${els.tel2.value}-${els.tel3.value}`,
        userEmail: els.email.value.trim(),
        userAddress: `${els.postcode.value} ${els.address.value} ${els.detailAddress.value}`,
        userGender: document.querySelector("input[name='gender']:checked")?.value || "",
    };

    // DB 전송
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


                els.postcode.value = data.zonecode;

                els.address.value = addr;
                els.detailAddress.focus();
            }
        }
    ).open();
}

document.querySelector("#searchAddress").addEventListener("click",daumPostCode);
