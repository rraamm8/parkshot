package com.parkshot.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.parkshot.domain.Member;
import com.parkshot.domain.Role;
import com.parkshot.persistence.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepo;
    private final PasswordEncoder passwordEncoder;

    public void registerMember(Member member) {
    	
    	Member memberRegi = Member.builder()
                .username(member.getUsername())
                .password(passwordEncoder.encode(member.getPassword()))
                .nickname(member.getNickname())
                .role(Role.ROLE_MEMBER)
                .enabled(true)
                .build();

        memberRepo.save(memberRegi);
    }

    public Member findByUsername(String username) {
        return memberRepo.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

}
