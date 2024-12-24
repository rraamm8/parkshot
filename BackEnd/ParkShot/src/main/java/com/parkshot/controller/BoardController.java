package com.parkshot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

	// 1. 모든 게시글 조회
	@GetMapping
	public List<Board> getAllBoards() {
		return boardService.getAllBoards();
	}

	// 2. 특정 게시글 조회
	@GetMapping("/{id}")
	public Board getBoardById(@PathVariable Long id) {
		return boardService.getBoardById(id);
	}

//	// 3. 특정 회원의 게시글 조회
//	@GetMapping("/member/{memberId}")
//	public List<Board> getBoardsByMember(@PathVariable String memberId) {
//		return boardService.getBoardsByMember(memberId);
//	}

	// 4. 게시글 생성
	@PostMapping
	public Board createBoard(@RequestBody Board board, @RequestParam String memberId) {
		// Member 객체는 MemberService에서 가져온다고 가정
		Member member = new Member();
		memberService.findByUsername(memberId);

		return boardService.createBoard(board, member);
	}

	// 5. 게시글 수정
	@PutMapping("/{id}")
	public Board updateBoard(@PathVariable Long id, @RequestBody Board updatedBoard) {
		return boardService.updateBoard(id, updatedBoard);
	}

	// 6. 게시글 삭제
	@DeleteMapping("/{id}")
	public void deleteBoard(@PathVariable Long id) {
		boardService.deleteBoard(id);
	}

}
