package com.ticketnow.performance.model.service;

import com.ticketnow.performance.model.dto.Performance;
import com.ticketnow.performance.model.dto.PerformanceDto;

import java.util.List;

public interface PerformanceService {

    List<Performance> getPerformanceByCategory(String category);
    List<Performance> searchPerformance(String searchType, String keyword);
    PerformanceDto getPerformanceDetail(String performanceId);

}
