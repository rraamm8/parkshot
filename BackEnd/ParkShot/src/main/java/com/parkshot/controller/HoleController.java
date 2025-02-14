package com.parkshot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.parkshot.domain.Hole;
import com.parkshot.service.HoleService;

@RestController
public class HoleController {

    @Autowired
    private HoleService holeService;

    @GetMapping("/holes")
    public List<Hole> getallHoles() {
        return holeService.getHoles();
    }

    @GetMapping("/hole/{courseId}")
    public List<Hole> findByCourseId(@PathVariable Integer courseId) {
        return holeService.findByCourseId(courseId);
    }
}
