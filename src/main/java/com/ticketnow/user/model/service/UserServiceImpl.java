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

    @Override
    public void userSignup(User user) {
        userMapper.userSignup(user);
    }

    @Override
    public User userLogin(String userEmail, String userPw) {
        return  userMapper.userLogin(userEmail, userPw);
    }

    @Override
    public User userFindId(String userName, String userSSN) {
        return userMapper.userFindId(userName, userSSN);
    }

    @Override
    public boolean userFindPassword(String userEmail, String userPhone) {
        return userMapper.userFindPassword(userEmail, userPhone);
    }

    @Override
    public void userUpdatePassword(String userId, String newPassword) {
        userMapper.userUpdatePassword(userId, newPassword);
    }

    @Override
    public void userUpdatePassword(String userId, String currentPassword, String newPassword) {
        userMapper.userUpdatePassword(userId, currentPassword, newPassword);
    }

    @Override
    public User userGetInfo(String userId) {
        return userMapper.userGetInfo(userId);
    }

    @Override
    public void userConfirmPassword(String userId, String currentPassword) {
        userMapper.userConfirmPassword(userId, currentPassword);
    }

    @Override
    public User userUpdateInfo(User user) {
        return userMapper.userUpdateInfo(user);
    }

    @Override
    public boolean checkEmail(String userId, String userEmail) {
        return userMapper.checkEmail(userId, userEmail);
    }

    @Override
    public boolean checkPhone(String userId, String userPhone) {
        return userMapper.checkPhone(userId, userPhone);
    }
}
