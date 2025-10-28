package com.ticketnow.reservation.model.mapper;

import com.ticketnow.reservation.model.dto.Reservation;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReservationMapper {
    void insertReservation(String performanceScheduleId, String userId, String seatId, String seatNumber);
    List<Reservation> getReservation(String userId);
    void deleteReservation(String performanceScheduleId, String userId, String seatId, String seatNumber);
}
