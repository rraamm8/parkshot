package com.parkshot.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkshot.domain.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

}
