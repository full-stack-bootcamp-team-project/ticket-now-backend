// 이메일 비밀번호 미작성시 로그인 제한
const loginEmail = document.querySelector("#loginForm input[name='userEmail']")
const loginForm = document.getElementById("loginForm");
const loginPw= document.querySelector("#loginForm input[name='userPw']");
const signupBtn = document.getElementById("signupBtn");

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
    window.open("/user/signup","_self")
})
