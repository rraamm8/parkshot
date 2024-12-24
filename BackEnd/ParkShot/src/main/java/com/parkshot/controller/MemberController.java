package com.parkshot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.parkshot.domain.Member;
import com.parkshot.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {
	
	@Autowired
	private MemberService memberService; // MemberService 주입

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

	@PostMapping("/member/register")
	public ResponseEntity<String> registerMember(@RequestBody Member member) {
		memberService.registerMember(member);
		return ResponseEntity.ok("회원가입 성공");
	}
	
//	@PostMapping("/login")
//	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
//		boolean isValid = memberService.validateLogin(request.getMember_id(), request.getPassword());
//
//		if (isValid) {
//			// 유저 정보 및 권한 가져오기
//			UserDetails userDetails = securityUserDetailsService.loadUserByUsername(request.getMember_id());
//			String username = userDetails.getUsername();
//			String role = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
//					.orElse("ROLE_MEMBER"); // 기본값 설정
//
//			// JSON 응답 생성
//			return ResponseEntity.ok(new LoginResponse(username, role));
//		}
//
//		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//	}

	@PostMapping("/auth")
	public @ResponseBody ResponseEntity<?> auth(@AuthenticationPrincipal User user) {
		if (user == null) {
			return ResponseEntity.ok("로그인 상태가 아닙니다.");
		}
		return ResponseEntity.ok(user);
	}
//
//	@GetMapping("/oauth")
//	public @ResponseBody String auth(@AuthenticationPrincipal OAuth2User user) {
//		if (user == null)
//			return "OAuth2:null";
//
//		System.out.println("attributes : " + user.getAttributes());
//
//		return "OAuth2 : " + user;
//	}
	
//	@PostMapping("/join")
//    public @ResponseBody Member join(Member member) {
//        member.setRole("M");
//        member.setPassword(BCryptPasswordEncoder.encode(member.getPassword()));
//
//        return saveUser;
//    }
}
