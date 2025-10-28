package com.ticketnow.performance.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PerformanceDto {

    private String performanceScheduleDate;
    private  String performanceImagePath;
    private  String performanceTitle;
    private  String performanceCategory;
    private  int performancePrice;
    private  String performanceAddress;
    private  String performanceInfo;
    private  int performanceRanking;
    private  String castMemberName;
    private  String castMemberImagePath;

}
