package com.ticketnow.user.controller;

import com.ticketnow.user.model.dto.User;
import com.ticketnow.user.model.service.UserService;
import com.ticketnow.user.model.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserServiceImpl userService;

    // 회원가입 기능
    @PostMapping("/signup")
    public void userSignup(@RequestParam User user) {
        userService.userSignup(user);
    }

    // 로그인 기능
    @PostMapping("/login")
    public String userLogin(@RequestParam String userEmail, @RequestParam String userPw) {
      return   userService.userLogin(userEmail, userPw);
    }

    // 로그아웃 기능
    @PostMapping("/logout")
    public void userLogout() {

    }

    // 아이디 찾기 기능
    @PostMapping("/login/findId")
    public String userFindId(@RequestParam String userName, @RequestParam String userSSN) {
        return userService.userFindId(userName, userSSN);
    }

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