package com.parkshot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.parkshot.domain.Board;
import com.parkshot.domain.Member;
import com.parkshot.service.BoardService;
import com.parkshot.service.MemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/boards")
public class BoardController {

	@Autowired
	private BoardService boardService;
	
	@Autowired
	private MemberService memberService;

	// 모든 게시글 조회
	@GetMapping
    public Page<Board> getBoards(
            @RequestParam(defaultValue = "1") int page,                 // 기본 페이지 번호: 1
            @RequestParam(defaultValue = "10") int size,                // 기본 페이지 크기: 10
            @RequestParam(defaultValue = "id") String sortBy,           // 기본 정렬 기준
            @RequestParam(defaultValue = "asc") String sortDirection    // 기본 정렬 방향: 내림차순
    ) {
        return boardService.getBoards(page, size, sortBy, sortDirection);
    }

	// 특정 게시글 조회
	@GetMapping("/{id}")
	public Board getBoardById(@PathVariable Long id) {
		Board board = boardService.getBoardById(id);
		if (board != null) {
	        // 조회수 증가
	        board.setCnt(board.getCnt() + 1);
	        boardService.save(board); // 변경 사항 저장
	    }
		return boardService.getBoardById(id);
	}

	// 게시글 생성
	@PostMapping
	public Board createBoard(@RequestBody Board board, @RequestParam String username) {
		// Member 객체는 MemberService에서 가져온다고 가정
		Member member = memberService.findByUsername(username);
		if (member == null) {
			throw new IllegalArgumentException("Invalid memberId : member not found");
		}
		
		board.setMember(member);

		return boardService.createBoard(board, member);
	}

	// 게시글 수정
	@PutMapping("/{id}")
	public Board updateBoard(@PathVariable Long id, @RequestBody Board updatedBoard) {
		return boardService.updateBoard(id, updatedBoard);
	}

	// 게시글 삭제
	@DeleteMapping("/{id}")
	public void deleteBoard(@PathVariable Long id) {
		boardService.deleteBoard(id);
	}
	
	

}
