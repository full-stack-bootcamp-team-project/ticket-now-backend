package com.ticketnow.user.model.service;

import com.ticketnow.user.model.dto.User;

public interface UserService {
    void userSignup(User user);

    void userLogin(String userId, String userPw);
    String userFindId(String userName,String userSSN);
    boolean userFindPassword(String userId,String userPhone);
    void userUpdatePassword(String userId,String newPassword);
    void userUpdatePassword(String userId,String currentPassword,String newPassword);
    User userGetInfo(String userId);
    void userConfirmPassword(String userId,String currentPassword);
    User userUpdateInfo(User user);
    boolean checkEmail(String userId,String userEmail);
    boolean checkPhone(String userId,String userPhone);
}
