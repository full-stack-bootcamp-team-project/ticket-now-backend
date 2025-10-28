package com.ticketnow.user.model.service;

import com.ticketnow.user.model.dto.User;
import com.ticketnow.user.model.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public void userSignup(User user) {
        userMapper.userSignup(user);
    }

    @Override
    public void userLogin(String userId, String userPw) {
        userMapper.userLogin(userId, userPw);
    }

    @Override
    public String userFindId(String userName, String userSSN) {
        return userMapper.userFindId(userName, userSSN);
    }

    @Override
    public boolean userFindPassword(String userId, String userPhone) {
        return userMapper.userFindPassword(userId, userPhone);
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
