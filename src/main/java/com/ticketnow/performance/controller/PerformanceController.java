package com.ticketnow.performance.controller;

import com.ticketnow.performance.model.dto.Performance;
import com.ticketnow.performance.model.dto.PerformanceDetailViewDto;
import com.ticketnow.performance.model.dto.PerformanceScheduleSeatViewDto;
import com.ticketnow.performance.model.service.PerformanceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    private final PerformanceServiceImpl performanceService;

    // 공연 목록 전체 조회
    @GetMapping("/all")
    public List<Performance> getAllPerformance(){
        return performanceService.getAllPerformance();
    }

    // 카테고리별 공연 목록 조회 (예: /api/performance?category=musical)
    @GetMapping("/category")
    public List<Performance> getPerformanceByCategory(@RequestParam String category) {
        return performanceService.getPerformanceByCategory(category);
    }

    // 공연 통합 검색 (예: /api/performance/search?searchType=title&keyword=레미제라블)
    @GetMapping("/search/total")
    public List<Performance> searchTotalPerformance(@RequestParam String searchType,
                                                @RequestParam String keyword) {
        return performanceService.searchTotalPerformance(searchType, keyword);
    }

    // 키워드 검색
    @GetMapping("/search/keyword")
    public List<Performance> searchKeywordPerformance(@RequestParam String searchType,
                                                    @RequestParam String keyword) {
        return performanceService.searchKeywordPerformance(searchType, keyword);
    }

    // 제목 검색
    @GetMapping("/search/title")
    public List<Performance> searchTitlePerformance(@RequestParam String searchType,
                                                    @RequestParam String keyword) {
        return performanceService.searchTitlePerformance(searchType, keyword);
    }

    // 출연자 검색
    @GetMapping("/search/cast")
    public List<Performance> searchCastPerformance(@RequestParam String searchType,
                                                    @RequestParam String keyword) {
        return performanceService.searchCastPerformance(searchType, keyword);
    }

    // 공연 상세 조회 (예: /api/performance/detail/123)
    @GetMapping("/detail")
    public PerformanceDetailViewDto getPerformanceDetail(@RequestParam String performanceId) {
        return performanceService.getPerformanceDetail(performanceId);
    }

    // 공연 회차별 좌석
    @GetMapping("/seat")
    public List<PerformanceScheduleSeatViewDto> getSeatByPerformanceScheduleId(@RequestParam String performanceScheduleId){
        return performanceService.getSeatByPerformanceScheduleId(performanceScheduleId);
    }
}