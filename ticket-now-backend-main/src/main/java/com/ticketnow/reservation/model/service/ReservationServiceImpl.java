package com.ticketnow.reservation.model.service;

import com.ticketnow.reservation.model.dto.Reservation;
import com.ticketnow.reservation.model.mapper.ReservationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService{
    @Autowired
    ReservationMapper reservationMapper;

    @Override
    public void insertReservation(String performanceScheduleId, String userId, String seatId, String seatNumber) {
        reservationMapper.insertReservation(performanceScheduleId,userId,seatId,seatNumber);
    }

    @Override
    public List<Reservation> getReservation(String userId) {
        return reservationMapper.getReservation(userId);
    }

    @Override
    public void deleteReservation(String performanceScheduleId, String userId, String seatId, String seatNumber) {
        reservationMapper.deleteReservation(performanceScheduleId, userId, seatId, seatNumber);
    }
}
