package com.ticketnow.common.interceptor;

import com.ticketnow.user.model.dto.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HttpSession session = request.getSession();
        User loginUser = (User)session.getAttribute("loginUser");
        if (loginUser == null) {
            response.sendRedirect("/user/login");
            return false;
        }
        return true;
    }
}
