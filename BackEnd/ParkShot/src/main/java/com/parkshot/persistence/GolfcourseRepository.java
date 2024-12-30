package com.parkshot.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkshot.domain.Golfcourse;

public interface GolfcourseRepository extends JpaRepository<Golfcourse, Integer> {
	// 여러개의 결과를 반환하려면 List, 하나의 결과만 반환은 Optional
	
	List<Golfcourse> findByNameContaining (String name);

	List<Golfcourse> findByLocationContainingOrRegionContaining (String location, String region);

	Optional<Golfcourse> findById(Integer courseId);
}
