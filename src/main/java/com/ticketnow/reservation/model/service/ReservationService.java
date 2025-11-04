package com.ticketnow.reservation.model.service;

import com.ticketnow.reservation.model.dto.Reservation;

import java.util.List;

public interface ReservationService {

    // 예매
    void insertReservation(String performanceScheduleId, String userId, String seatId, String seatNumber);

    // 예매 내역 조회
    List<Reservation> getReservation(String userId);

    // 예매 삭제
    void deleteReservation(String performanceScheduleId, String userId, String seatId, String seatNumber);

    // 좌석 예약 상태
    List<Reservation> getSeatStatus(String performanceScheduleId);
}
