package com.parkshot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MemberController {
	@GetMapping("/login")
	public void login() {
		System.out.println("login 요청");
	}
	
	@GetMapping("/loginSuccess")
	public void loginSuccess() {
		System.out.println("loginSuccess 요청");
	}
	
	@GetMapping("/accessDenied")
	public void accessDenied() {
		System.out.println("accessDenied");
	}
	
	@GetMapping("/auth")
	public @ResponseBody ResponseEntity<?> auth(@AuthenticationPrincipal User user){
		if(user == null) {
			return ResponseEntity.ok("로그인 상태가 아닙니다.");
		}
		return ResponseEntity.ok(user);
	}
	
	@GetMapping("/oauth")
	public @ResponseBody String auth(@AuthenticationPrincipal OAuth2User user) {
		if (user ==null) return "OAuth2:null";
		
		System.out.println("attributes : " + user.getAttributes());
		
		return "OAuth2 : " + user;
	}
	
//	@PostMapping("/register")
//	public String Register(@RequestBody UserRequest request) {
//		
//	}
	
}
