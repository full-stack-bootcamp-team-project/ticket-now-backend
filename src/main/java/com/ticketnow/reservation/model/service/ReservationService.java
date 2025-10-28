package com.ticketnow.reservation.model.service;

import com.ticketnow.reservation.model.dto.Reservation;

import java.util.List;

public interface ReservationService {
    void insertReservation(String performanceScheduleId, String userId, String seatId, String seatNumber);
    List<Reservation> getReservation(String userId);
    void deleteReservation(String performanceScheduleId, String userId, String seatId, String seatNumber);
}
