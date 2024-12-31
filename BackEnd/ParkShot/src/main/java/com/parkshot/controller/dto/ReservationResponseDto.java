package com.parkshot.controller.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class ReservationResponseDto {
    private Long reservationId;
    private String courseName;
    private String username;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private String status;
}