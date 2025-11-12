package com.ticketnow.user.model.service;

import com.ticketnow.user.model.dto.User;
import com.ticketnow.user.model.mapper.UserMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    // 회원가입
    @Override
    public void userSignup(User user) {
        user.setUserId("U" + System.currentTimeMillis()); // id 값 생성
        userMapper.userSignup(user);
    }

    // 유저 로그인
    @Override
    public User userLogin(String userEmail, String userPw) {
        return  userMapper.userLogin(userEmail, userPw);
    }

    // 유저 아이디 찾기
    @Override
    public User userFindId(String userName, String userSSN) {
        return userMapper.userFindId(userName, userSSN);
    }

    // 비밀번호 찾기 -> 로그인
    @Override
    public boolean userFindPassword(String userEmail, String userPhone) {
        return userMapper.userFindPassword(userEmail, userPhone);
    }

    // 비밀번호 찾기 -> 비밀번호 변경 로그인
    @Override
    public void userUpdatePassword(String userId, String newPassword) {
        userMapper.userUpdatePassword(userId, newPassword);
    }

    // 유저 정보 조회 -> 마이페이지
    @Override
    public User userGetInfo(HttpSession session) {
        User loginUser = (User) session.getAttribute("loginUser");
        String userId = loginUser.getUserId();
        return userMapper.userGetInfo(userId);
    }

    // 비밀번호 찾기 -> 마이페이지
    @Override
    public boolean userConfirmPassword(String userId, String currentPassword) {
        return userMapper.userConfirmPassword(userId, currentPassword);
    }

    // 비밀번호 변경 -> 마이페이지
    @Override
    public void userUpdatePasswordMypage(String userId, String currentPassword, String newPassword) {
        userMapper.userUpdatePasswordMypage(userId, currentPassword, newPassword);
    }

    // 유저 정보 업데이트
    @Override
    public void userUpdateInfo(User user) {
        userMapper.userUpdateInfo(user);
    }

    // 유저 이메일 중복 확인
    @Override
    public boolean checkEmail(String userEmail) {
        return userMapper.checkEmail(userEmail);
    }

    // 유저 핸드폰 번호 중복 확인
    @Override
    public boolean checkPhone(String userPhone) {
        return userMapper.checkPhone(userPhone);
    }
}
