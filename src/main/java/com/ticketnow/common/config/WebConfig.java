package com.ticketnow.common.config;

import com.ticketnow.common.interceptor.LoginInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 일반 유저가 로그인 했을 때 접속할 수 있는 api 리스트
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns( // 로그인 유저가 특별히 더 들어갈 수있는 api들
                        "/reservation",       // 예매 페이지
                        "/user/myPage"        // 마이 페이지

                )
                .excludePathPatterns( // 누구든지 들어갈 수 있는 api 주소들
                        "/",                    // 메인 페이지
                        "/performance",         // 카테고리별 공연 페이지
                        "/performance/detail",  // 공연 상세 페이지
                        "/user/login",          // 로그인 페이지
                        "/user/signup",         // 회원가입 페이지
                        "/performance/search",  // 공연 검색 페이지
                        "/user/findId",         // 아이디 찾기 페이지
                        "/user/findPassword",   // 비밀번호 찾기 페이지
                        "/css/**",              // css 파일
                        "/js/**",               // JS 파일
                        "/images/**",           // Image 파일
                        "/api/**",              // API 요청
                        "/user/add"             // 유저 등록
                );
    }
}
