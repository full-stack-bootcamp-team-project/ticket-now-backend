// 이메일 비밀번호 미작성시 로그인 제한
const loginEmail = document.querySelector("#loginForm input[name='userEmail']")
const loginForm = document.getElementById("loginForm");
const loginPw= document.querySelector("#loginForm input[name='userPw']");
const signupBtn = document.getElementById("signupBtn");

if (window.innerWidth <= 1300) {
    // header/footer 숨기기
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    const loginContainer = document.querySelector('.login-container.content-area');

    loginContainer.style.height = "100svh";
    loginContainer.style.padding = "0";
}

document.querySelectorAll(".password-view-button").forEach((btn) => {
    btn.addEventListener("click", () => {
        const input = btn.previousElementSibling;
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        btn.classList.toggle("password-off", !isHidden);
    });
});

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

signupBtn.addEventListener("click", () => {
    // window.open("/user/signup","_self")
    window.open("/","_self")
})


