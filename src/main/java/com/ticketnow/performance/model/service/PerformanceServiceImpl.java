package com.ticketnow.performance.model.service;

import com.ticketnow.performance.model.dto.CastMember;
import com.ticketnow.performance.model.dto.Performance;
import com.ticketnow.performance.model.dto.PerformanceDetailViewDto;
import com.ticketnow.performance.model.dto.PerformanceScheduleSeatViewDto;
import com.ticketnow.performance.model.mapper.PerformanceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PerformanceServiceImpl implements PerformanceService{

    private final PerformanceMapper performanceMapper;

    @Override
    public List<Performance> getAllPerformance() {
        return performanceMapper.getAllPerformance();
    }

    @Override
    public List<Performance> getPerformanceByCategory(String category) {
        return performanceMapper.getPerformanceByCategory(category);
    }

    @Override
    public List<Performance> searchTotalPerformance(String searchType, String keyword) {
        return performanceMapper.searchTotalPerformance(searchType, keyword);
    }

    @Override
    public List<Performance> searchKeywordPerformance(String searchType, String keyword) {
        return performanceMapper.searchKeywordPerformance(searchType, keyword);
    }

    @Override
    public List<Performance> searchTitlePerformance(String searchType, String keyword) {
        return performanceMapper.searchTitlePerformance(searchType, keyword);
    }

    @Override
    public List<Performance> searchCastPerformance(String searchType, String keyword) {
        return performanceMapper.searchCastPerformance(searchType, keyword);
    }

    @Override
    public PerformanceDetailViewDto getPerformanceDetail(String performanceId) {

        // 1. 공연 기본 정보 조회 (1개 행)
        PerformanceDetailViewDto detail = performanceMapper.getPerformanceDetail(performanceId);

        // 2. 출연진 목록 조회 (N개 행)
        List<CastMember> castMembers = performanceMapper.getCastMembers(performanceId);

        // 3. 출연진 리스트를 공연 정보에 세팅
        detail.setCastMembers(castMembers);

        return detail;
    }

    @Override
    public List<PerformanceScheduleSeatViewDto> getSeatByPerformanceScheduleId(String performanceScheduleId) {
        return performanceMapper.getSeatByPerformanceScheduleId(performanceScheduleId);
    }
}
