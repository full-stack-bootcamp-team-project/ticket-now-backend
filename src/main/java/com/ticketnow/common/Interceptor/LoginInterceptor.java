package com.ticketnow.common.Interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * 로그인 체크를 자동화하는 인터셉터(가로채기)
 * 특정 URL 접근 시 세션 확인을 자동으로 처리
 * 세션 내부에 로그인한 유저가 존재하는가 확인
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {

    // window : ctrl + o
    // mac : ctrl + l

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HttpSession session = request.getSession();
        User loginUser = (User)session.getAttribute("loginUser");
        if (loginUser == null) {
            response.sendRedirect("/login");
            return false;
        }



        return true;
    }
    // implements에 내장되어 있는 기능을 회사 상황에 맞게 다듬어 재사용할 수 있는 기능 확인하고, 가져오는 단축키
}
