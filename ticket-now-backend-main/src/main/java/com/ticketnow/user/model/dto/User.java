package com.ticketnow.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private String userId;
    private String userPw;
    private String userSSN;
    private String userName;
    private String userNickname;
    private String userPhone;
    private String userEmail;
    private String userAddress;
    private String userGender;
    private String grade;
    private long userTotalCount;

}
