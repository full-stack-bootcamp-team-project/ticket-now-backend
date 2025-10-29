package com.ticketnow.performance.model.mapper;

import com.ticketnow.performance.model.dto.Performance;
import com.ticketnow.performance.model.dto.PerformanceDetailViewDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PerformanceMapper {

    // 공연 목록 전체 조회
    List<Performance> getAllPerformance();

    // 카테고리 별 공연 목록 조회
    List<Performance> getPerformanceByCategory(String category);

    // 공연 통합 검색
    List<Performance> searchTotalPerformance(String searchType, String keyword);

    // 키워드 검색
    List<Performance> searchKeywordPerformance(String searchType, String keyword);

    // 제목 검색
    List<Performance> searchTitlePerformance(String searchType, String keyword);

    // 출연자 검색
    List<Performance> searchCastPerformance(String searchType, String keyword);

    // 공연 상세 조회
    PerformanceDetailViewDto getPerformanceDetail(String performanceId);
}
