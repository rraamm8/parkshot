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
	
	public List<Golfcourse> findByNameContaining(String name){
		return golfcourseRepo.findByNameContaining(name);
	}
	
	public List<Golfcourse> findByLocationContainingOrRegionContaining(String location, String region){
		return golfcourseRepo.findByLocationContainingOrRegionContaining(location, region);
	}
	
	
}
