package com.ticketnow.user.model.service;

import com.ticketnow.user.model.dto.User;

public interface UserService {
    // 회원가입
    void userSignup(User user);

    // 유저 로그인
    User userLogin(String userEmail, String userPw);

    // 유저 아이디 찾기
    String userFindId(String userName, String userSSN);

    // 비밀번호 찾기 -> 로그인
    boolean userFindPassword(String userEmail, String userPhone);

    // 비밀번호 찾기 -> 비밀번호 변경
    void userUpdatePassword(String userId, String newPassword);

    // 비밀번호 찾기 -> 마이페이지
    void userUpdatePassword(String userId, String currentPassword, String newPassword);

    // 유저 정보 조회 -> 마이페이지
    User userGetInfo(String userId);

    // 유저 정보 수정 -> 마이페이지
    void userConfirmPassword(String userId, String currentPassword);

    // 유저 정보 업데이트
    User userUpdateInfo(User user);

    // 유저 이메일 중복 확인
    boolean checkEmail(String userId, String userEmail);

    // 유저 핸드폰 번호 중복 확인
    boolean checkPhone(String userId, String userPhone);
}
