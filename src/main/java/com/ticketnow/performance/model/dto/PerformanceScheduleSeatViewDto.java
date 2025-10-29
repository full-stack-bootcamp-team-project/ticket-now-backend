package com.ticketnow.performance.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PerformanceScheduleSeatViewDto {
    private String performanceScheduleId;
    private String seatId;
    private String seatNumber;
}
