package com.ticketnow.performance.model.service;

import com.ticketnow.performance.model.dto.Performance;
import com.ticketnow.performance.model.dto.PerformanceDto;
import com.ticketnow.performance.model.mapper.PerformanceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerformanceServiceImpl implements PerformanceService{

    @Autowired
    private PerformanceMapper performanceMapper;


    @Override
    public List<Performance> getPerformanceByCategory(String category) {
        return performanceMapper.getPerformanceByCategory(category);
    }

    @Override
    public List<Performance> searchPerformance(String searchType, String keyword) {
        return performanceMapper.searchPerformance(searchType, keyword);
    }

    @Override
    public PerformanceDto getPerformanceDetail(String performanceId) {
        return performanceMapper.getPerformanceDetail(performanceId);
    }
}
