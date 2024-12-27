package com.parkshot.controller.dto;

import com.parkshot.domain.Board;

public class BoardDTO {
	private Long id;
	private String title;
	private String content;
    private String memberId; // member의 ID만 반환
    private String nickname; // member의 닉네임 반환

    public BoardDTO(Board board) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.memberId = board.getMember().getUsername();
        this.nickname = board.getMember().getNickname();
    }
}