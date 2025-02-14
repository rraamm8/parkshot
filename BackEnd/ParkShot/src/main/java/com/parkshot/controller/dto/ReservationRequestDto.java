package com.parkshot.controller.dto;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Data
public class ReservationRequestDto {
    private Integer courseId;
    private String username;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
}