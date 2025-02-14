package com.parkshot.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkshot.domain.Golfcourse;
import com.parkshot.domain.Member;

public interface MemberRepository extends JpaRepository<Member, String> {
	// Optional<Member> findByMember_id(String member_id);
	boolean existsByUsername(String username);
	boolean existsByNickname(String nickname);
	Optional<Member> findByUsername(String username);

}
