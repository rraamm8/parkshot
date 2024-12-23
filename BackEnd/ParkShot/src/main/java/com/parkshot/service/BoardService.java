package com.parkshot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkshot.domain.Board;
import com.parkshot.domain.Member;
import com.parkshot.persistence.BoardRepository;

import jakarta.transaction.Transactional;

@Service
public class BoardService {
	
	@Autowired
	private BoardRepository boardRepo;
	
	// 1. 모든 게시글 조회
    public List<Board> getAllBoards() {
        return boardRepo.findAll();
    }

    // 2. 특정 게시글 조회
    public Board getBoardById(Long id) {
        return boardRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다. ID: " + id));
    }

//    // 3. 특정 회원의 게시글 조회
//    public List<Board> getBoardsByMember(String memberId) {
//        return boardRepo.findByMember(memberId);
//    }

    // 4. 게시글 생성
    @Transactional
    public Board createBoard(Board board, Member member) {
        board.setMember(member); // Member 객체 설정
        return boardRepo.save(board);
    }

    // 5. 게시글 수정
    @Transactional
    public Board updateBoard(Long id, Board updatedBoard) {
        Board board = boardRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다. ID: " + id));

        board.setTitle(updatedBoard.getTitle());
        board.setContent(updatedBoard.getContent());
        return boardRepo.save(board);
    }

    // 6. 게시글 삭제
    @Transactional
    public void deleteBoard(Long id) {
        if (!boardRepo.existsById(id)) {
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다. ID: " + id);
        }
        boardRepo.deleteById(id);
    }
}
