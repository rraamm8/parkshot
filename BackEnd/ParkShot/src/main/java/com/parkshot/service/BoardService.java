package com.parkshot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.parkshot.domain.Board;
import com.parkshot.domain.Member;
import com.parkshot.persistence.BoardRepository;

import jakarta.transaction.Transactional;

@Service
public class BoardService {
	
	@Autowired
	private BoardRepository boardRepo;
	
	// 정렬 방향 설정 (ASC 또는 DESC)
	public Page<Board> getBoards(int page, int size, String sortBy, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("desc") 
                    ? Sort.by(sortBy).descending() 
                    : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        // 페이징된 결과 반환
        return boardRepo.findAll(pageable);
    }

    // 특정 게시글 조회
    public Board getBoardById(Long id) {
        return boardRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다. ID: " + id));
    }

    // 게시글 생성
    @Transactional
    public Board createBoard(Board board, Member member) {
        board.setMember(member); // Member 객체 설정
        return boardRepo.save(board);
    }
    
    @Transactional
    public Board save(Board board) {
        return boardRepo.save(board);
    }

    // 게시글 수정
    @Transactional
    public Board updateBoard(Long id, Board updatedBoard) {
        Board board = boardRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다. ID: " + id));

        board.setTitle(updatedBoard.getTitle());
        board.setContent(updatedBoard.getContent());
        return boardRepo.save(board);
    }

    // 게시글 삭제
    @Transactional
    public void deleteBoard(Long id) {
        if (!boardRepo.existsById(id)) {
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다. ID: " + id);
        }
        boardRepo.deleteById(id);
    }
}
