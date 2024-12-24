package com.parkshot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.parkshot.domain.Golfcourse;
import com.parkshot.persistence.GolfcourseRepository;
import com.parkshot.service.GolfcourseService;

@RestController
public class GolfcourseController {

    @Autowired
    private GolfcourseService golfcourseService;

    @GetMapping("/golfcourses")
    public List<Golfcourse> getAllGolfCourses() {
        return golfcourseService.getGolfcourses();
    }
    
    @GetMapping("/golfcourse/location")
    public List<Golfcourse> findByLocationContainingOrRegionContaining(@RequestParam(defaultValue = "부산") String location, String region){
    	return golfcourseService.findByLocationContainingOrRegionContaining(location, region);
    }
    
    @GetMapping("/golfcourse/name")
    public List<Golfcourse> findByNameContaining(@RequestParam(defaultValue = "사암") String name){
    	return golfcourseService.findByNameContaining(name);
    }
}