package com.parkshot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkshot.domain.Golfcourse;
import com.parkshot.persistence.GolfcourseRepository;

@Service
public class GolfcourseService {
	@Autowired
	private GolfcourseRepository golfcourseRepo;
	
	public List<Golfcourse> getGolfcourses(){
		return golfcourseRepo.findAll();
	}
	
	public List<Golfcourse> getGolfCoursesByRegion(String region) {
        return golfcourseRepo.findByRegion(region);
    }
}
