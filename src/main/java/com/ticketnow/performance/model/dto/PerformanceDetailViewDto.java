package com.ticketnow.performance.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PerformanceDetailViewDto {

    private String performanceScheduleStartDate;
    private String performanceScheduleStartTime;
    private String performanceImagePath;
    private String performanceTitle;
    private String performanceCategory;
    private int performancePrice;
    private String performanceAddress;
    private String performanceInfo;
    private int performanceRanking;
    private String castMemberName;
    private String castMemberImagePath;
}
