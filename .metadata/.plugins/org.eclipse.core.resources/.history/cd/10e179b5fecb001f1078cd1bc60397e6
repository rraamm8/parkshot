package com.parkshot.persistence;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkshot.domain.Member;
import com.parkshot.domain.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	boolean existsByCourseId_CourseIdAndReservationDateAndReservationTime(
	        Integer courseId,
	        LocalDate reservationDate,
	        LocalTime reservationTime
	    );
	
	 List<Reservation> getReservationsByUsername(Member Username);
}
