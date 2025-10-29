package com.ticketnow.performance.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PerformanceDetailViewDto {

    // 공연 시작 날짜
    private String performanceScheduleStartDate;

    // 공연 시작 시간
    private String performanceScheduleStartTime;

    // 공연 이미지
    private String performanceImagePath;

    // 공연 제목
    private String performanceTitle;

    // 공연 카테고리
    private String performanceCategory;

    // 공연 가격
    private int performancePrice;

    // 공연 주소
    private String performanceAddress;

    // 공연 상세정보
    private String performanceInfo;

    // 공연 랭킹
    private int performanceRanking;

    // 출연자 정보
    private List<CastMember> castMembers;    // 출연진 리스트 (여러 명)
}
