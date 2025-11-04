package com.ticketnow.user.controller;

import com.ticketnow.common.util.SessionUtil;
import com.ticketnow.user.model.dto.User;
import com.ticketnow.user.model.service.UserService;
import com.ticketnow.user.model.service.UserServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserServiceImpl userService;
    // http://localhost:8080/api/user/signup?
    // 회원가입 기능
    @PostMapping("/signup")
    public void userSignup(@RequestBody User user) {
        userService.userSignup(user);
    }

    // http://localhost:8080/api/user/login?userEmail=minsu@example.com&userPw=pw1234
    // 로그인 기능
    @PostMapping("/login")
    public void userLogin(@RequestParam String userEmail,
                          @RequestParam String userPw,
                          HttpSession session,
                          HttpServletResponse response) throws IOException {

        User user = userService.userLogin(userEmail, userPw);
        if (user == null) {
            response.sendRedirect("/user/login?error=true");
            return;
        }

        SessionUtil.setLoginUser(session, user);
        response.sendRedirect("/");
    }

    // http://localhost:8080/api/user/logout
    // 로그아웃 기능
    @PostMapping("/logout")
    public void userLogout(HttpSession session, HttpServletResponse res) {
        SessionUtil.invalidateLoginUser(session);
    }

    // http://localhost:8080/api/user/login/findId?userName=김민수&userSSN=900101-1234567
    // 아이디 찾기 기능
    @PostMapping("/login/findId")
    public List<User> userFindId(@RequestParam String userName, @RequestParam String userSSN) {
        return userService.userFindId(userName, userSSN);
    }

    // http://localhost:8080/api/user/login/findPassword?userEmail=minsu@example.com&userPhone=010-1234-5678
    // 로그인 비밀번호 찾기 기능
    @PostMapping("/login/findPassword")
    public boolean userFindPassword(@RequestParam String userEmail, @RequestParam String userPhone) {
        return userService.userFindPassword(userEmail, userPhone);
    }

    // 로그인 페이지 비밀번호 변경 기능
    @PatchMapping("/login/updatePassword")
    public void userUpdatePassword(@RequestParam String userId, @RequestParam String newPassword) {
        userService.userUpdatePassword(userId, newPassword);
    }

    // 개인정보 조회 기능
    @GetMapping("/myPage")
    public User userGetInfo(@RequestParam String userId) {
        return userService.userGetInfo(userId);
    }

    // 마이페이지 현재 비밀번호 확인 기능
    @PostMapping("/myPage/confirmPassword")
    public void userConfirmPassword(@RequestParam String userId, @RequestParam String currentPassword) {
        userService.userConfirmPassword(userId, currentPassword);
    }

    // 마이페이지 비밀번호 변경 기능
    @PatchMapping("/myPage/updatePassword")
    public void userUpdatePassword(@RequestParam String userId, @RequestParam String currentPassword, @RequestParam String newPassword) {
        userService.userUpdatePassword(userId, currentPassword, newPassword);
    }

    // 개인정보 변경 기능
    @PutMapping("myPage/updateInfo")
    public User userUpdateInfo(@RequestBody User user) {
        return userService.userUpdateInfo(user);
    }

    // 이메일 중복확인 기능
    @PostMapping("/checkEmail")
    public boolean checkEmail(@RequestParam String userId, @RequestParam String userEmail) {
        return userService.checkEmail(userId, userEmail);
    }

    // 전화번호 중복확인 기능
    @PostMapping("/checkPhone")
    public boolean checkPhone(@RequestParam String userId, @RequestParam String userPhone) {
        return userService.checkPhone(userId, userPhone);
    }
}