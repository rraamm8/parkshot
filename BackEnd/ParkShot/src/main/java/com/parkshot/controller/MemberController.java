package com.parkshot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.parkshot.controller.dto.LoginRequest;
import com.parkshot.domain.Member;
import com.parkshot.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

	private final MemberService memberService; // MemberService 주입

//	@PostMapping("/login")
//	public boolean login(@RequestBody LoginRequest request) {
//	    return memberService.validateLogin(request.getMember_id(), request.getPassword());
//	}

	@GetMapping("/login")
	public void login() {
		System.out.println("login 요청");
	}
	
//	@PostMapping("/join")
//    public @ResponseBody Member join(Member member) {
//        member.setRole("M");
//        member.setPassword(BCryptPasswordEncoder.encode(member.getPassword()));
//
//        return saveUser;
//    }

	@GetMapping("/loginSuccess")
	public void loginSuccess() {
		System.out.println("loginSuccess 요청");
	}

	@GetMapping("/accessDenied")
	public void accessDenied() {
		System.out.println("accessDenied");
	}

	@PostMapping("/auth")
	public @ResponseBody ResponseEntity<?> auth(@AuthenticationPrincipal User user) {
		if (user == null) {
			return ResponseEntity.ok("로그인 상태가 아닙니다.");
		}
		return ResponseEntity.ok(user);
	}

	@GetMapping("/oauth")
	public @ResponseBody String auth(@AuthenticationPrincipal OAuth2User user) {
		if (user == null)
			return "OAuth2:null";

		System.out.println("attributes : " + user.getAttributes());

		return "OAuth2 : " + user;
	}

	@PostMapping("/member/register")
	public ResponseEntity<String> registerMember(@RequestBody Member member) {
		memberService.registerMember(member);
		return ResponseEntity.ok("회원가입 성공");
	}

	@RequestMapping(method = RequestMethod.OPTIONS)
	public ResponseEntity<Void> options() {
		return ResponseEntity.ok().build(); // 빈 응답
	}
}
