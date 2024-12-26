package com.parkshot.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.parkshot.domain.Member;
import com.parkshot.domain.Role;
import com.parkshot.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepo;
    private final PasswordEncoder passwordEncoder;

    public Member registerMember(Member member) {
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        
        // Member 객체 생성 및 저장
        Member memberRegi = Member.builder()
            .member_id(member.getMember_id())
            .password(encodedPassword)
            .name(member.getName())
            .role(Role.ROLE_MEMBER)
            .enabled(true)
            .build();
        
        return memberRepo.save(memberRegi);
    }

    public Member findByUsername(String username) {
        return memberRepo.findById(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
