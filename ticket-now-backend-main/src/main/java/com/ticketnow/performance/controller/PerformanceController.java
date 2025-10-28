package com.ticketnow.performance.controller;

import com.ticketnow.performance.model.dto.Performance;
import com.ticketnow.performance.model.dto.PerformanceDto;
import com.ticketnow.performance.model.service.PerformanceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    private final PerformanceServiceImpl performanceService;

    // 카테고리별 공연 목록 조회 (예: /api/performance?category=musical)
    @GetMapping("")
    public List<Performance> getPerformanceByCategory(@RequestParam String category) {
        return performanceService.getPerformanceByCategory(category);
    }

    // 공연 검색 (예: /api/performance/search?searchType=title&keyword=레미제라블)
    @GetMapping("/search")
    public List<Performance> searchPerformance(@RequestParam String searchType,
                                                @RequestParam String keyword) {
        return performanceService.searchPerformance(searchType, keyword);
    }

    // 공연 상세 조회 (예: /api/performance/detail/123)
    @GetMapping("/detail")
    public PerformanceDto getPerformanceDetail(@RequestParam String performanceId) {
        return performanceService.getPerformanceDetail(performanceId);
    }
}