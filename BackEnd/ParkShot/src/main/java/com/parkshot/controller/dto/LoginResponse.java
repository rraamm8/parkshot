package com.parkshot.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
	private String member_id;
	private String password;
	private String role;
	
	 public LoginResponse(String member_id, String role) {
	        this.member_id = member_id;
	        this.role = role;
	    }
}
