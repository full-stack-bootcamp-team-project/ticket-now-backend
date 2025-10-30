package com.ticketnow.reservation.controller;

import com.ticketnow.reservation.model.dto.Reservation;
import com.ticketnow.reservation.model.service.ReservationService;
import com.ticketnow.reservation.model.service.ReservationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    private final ReservationServiceImpl reservationService;
    // 예매 생성
    @PostMapping("/insert")
    public void insertReservation(@RequestParam String performanceScheduleId,
                                  @RequestParam String userId,
                                  @RequestParam String seatId,
                                  @RequestParam String seatNumber) {
        reservationService.insertReservation(performanceScheduleId, userId, seatId, seatNumber);
    }

    // 특정 사용자 예매 조회
    @GetMapping("/get")
    public List<Reservation> getReservation(@RequestParam String userId) {
        return reservationService.getReservation(userId);
    }

    // 예매 삭제
    @DeleteMapping("/delete")
    public void deleteReservation(@RequestParam String performanceScheduleId,
                                  @RequestParam String userId,
                                  @RequestParam String seatId,
                                  @RequestParam String seatNumber) {
        reservationService.deleteReservation(performanceScheduleId, userId, seatId, seatNumber);
    }
}