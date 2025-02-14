package com.parkshot.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.parkshot.domain.Hole;

public interface HoleRepository extends JpaRepository<Hole, Integer> {
	List<Hole> findByCourseId (Integer courseId);
}
