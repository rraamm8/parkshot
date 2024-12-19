package com.parkshot.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
	private String member_id;
	private String password;
	
}
