package com.parkshot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkshot.domain.Hole;
import com.parkshot.persistence.HoleRepository;

@Service
public class HoleService {
	@Autowired
	private HoleRepository holeRepo;
	
	public List<Hole> getHoles(){
		return holeRepo.findAll();
	}
	
	public String getHoleById(Integer id) {
		Hole hole = holeRepo.findById(id).get();
		return hole.toString();
	}
}
