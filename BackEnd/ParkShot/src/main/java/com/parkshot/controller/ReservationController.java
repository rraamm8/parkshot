package com.parkshot.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkshot.controller.dto.ReservationRequestDto;
import com.parkshot.controller.dto.ReservationResponseDto;
import com.parkshot.domain.Member;
import com.parkshot.domain.Reservation;
import com.parkshot.service.ReservationService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationRequestDto requestDto) {
        try {
        	System.out.println("requestDto : " + requestDto);
            ReservationResponseDto responseDto = reservationService.createReservation(requestDto);
            return ResponseEntity.ok(responseDto);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
    
    @GetMapping("/{username}")
	public List<Reservation> getReservationsByUsername(@PathVariable Member username) {
		return reservationService.getReservationsByUsername(username);
	}
    
    @GetMapping
    public List<Reservation> getReservations(){
    	return reservationService.getReservations();
    }
    
 	@DeleteMapping("/{id}")
 	public void deleteReservation(@PathVariable Long id) {
 		reservationService.deleteReservation(id);
 	}
    
}