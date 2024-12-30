package com.parkshot.service;

import org.springframework.stereotype.Service;

import com.parkshot.controller.dto.ReservationRequestDto;
import com.parkshot.controller.dto.ReservationResponseDto;
import com.parkshot.domain.Golfcourse;
import com.parkshot.domain.Member;
import com.parkshot.domain.Reservation;
import com.parkshot.persistence.GolfcourseRepository;
import com.parkshot.persistence.MemberRepository;
import com.parkshot.persistence.ReservationRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationService {

    private final ReservationRepository reservationRepo;
    private final GolfcourseRepository golfCourseRepo;
    private final MemberRepository memberRepo;

    public ReservationResponseDto createReservation(ReservationRequestDto requestDto) {
        // 중복 예약 체크
        boolean exists = reservationRepo.existsByCourseId_CourseIdAndReservationDateAndReservationTime(
            requestDto.getCourseId(),
            requestDto.getReservationDate(),
            requestDto.getReservationTime()
        );

        if (exists) {
            throw new IllegalStateException("이미 해당 시간에 예약이 존재합니다.");
        }

        // 골프장 및 회원 정보 가져오기
        Golfcourse golfCourse = golfCourseRepo.findById(requestDto.getCourseId())
            .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 골프장 ID입니다."));
//        Member member = memberRepo.findByUsername(requestDto.getUsername())
//            .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 회원 ID입니다."));

        // 예약 생성
        Reservation reservation = Reservation.builder()
            .courseId(golfCourse)
            .memberId("123@123")
            .reservationDate(requestDto.getReservationDate())
            .reservationTime(requestDto.getReservationTime())
            .status(Reservation.Status.CONFIRMED)
            .build();

        Reservation savedReservation = reservationRepo.save(reservation);

        // 응답 DTO 반환
        return ReservationResponseDto.builder()
            .reservationId(savedReservation.getReservationId())
            .courseName(golfCourse.getName())
            .reservationDate(savedReservation.getReservationDate())
            .reservationTime(savedReservation.getReservationTime())
            .status(savedReservation.getStatus().toString())
            .build();
    }
}
