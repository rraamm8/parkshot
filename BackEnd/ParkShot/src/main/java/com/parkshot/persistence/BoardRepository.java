package com.parkshot.persistence;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.parkshot.domain.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

//	// 특정 회원의 게시글 목록 조회
//    List<Board> findByMember_id(String memberId);

    // 제목으로 게시글 검색
    List<Board> findByTitleContaining(String keyword);
    
    Page<Board> findAll(Pageable pageable);
}
