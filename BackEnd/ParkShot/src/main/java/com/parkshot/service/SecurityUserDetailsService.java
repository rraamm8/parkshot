package com.parkshot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.parkshot.domain.Member;
import com.parkshot.persistence.MemberRepository;

@Service
public class SecurityUserDetailsService implements UserDetailsService {

	@Autowired
	private MemberRepository memberRepo;

	@Override
	public UserDetails loadUserByUsername(String username) 
			throws UsernameNotFoundException {
		Member member = memberRepo.findById(username)
				.orElseThrow(() -> new UsernameNotFoundException("Not Found!"));
		return new User(member.getUsername(), member.getPassword(),
				AuthorityUtils.createAuthorityList(member.getRole().toString()));
	}
}
