package com.ticketnow.performance.model.mapper;

import com.ticketnow.performance.model.dto.Performance;
import com.ticketnow.performance.model.dto.PerformanceDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PerformanceMapper {

    List<Performance> getPerformanceByCategory(String category);
    List<Performance> searchPerformance(String searchType, String keyword);
    PerformanceDto getPerformanceDetail(String performanceId);
}
