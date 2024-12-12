package com.parkshot.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkshot.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {

}
