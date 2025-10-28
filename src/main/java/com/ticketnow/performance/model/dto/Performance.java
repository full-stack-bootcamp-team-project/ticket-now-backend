package com.ticketnow.performance.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Performance {

    private String performanceId;
    private String performanceImagePath;
    private String performanceTitle;
    private String performanceCategory; // (종류) ENUM(콘서트, 뮤지컬, 연극) NOT NULL
    private int performancePrice;
    private String performanceAddress;
    private String performanceInfo;
    private int performanceRanking;
}
