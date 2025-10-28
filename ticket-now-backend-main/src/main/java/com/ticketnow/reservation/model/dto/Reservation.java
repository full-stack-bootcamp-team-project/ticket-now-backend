package com.ticketnow.reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    private String performanceScheduleId;
    private String seatId;
    private String setNumber;
    private String userId;
    private String reservationDate;
    private boolean status;
}
