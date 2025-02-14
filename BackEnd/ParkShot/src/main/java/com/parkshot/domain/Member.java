package com.parkshot.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member {
	@Id
	@Column(name = "member_id")
	// @GeneratedValue(strategy = GenerationType.IDENTITY) 
	// @GeneratedValue와 @Id 매핑문제로 데이터베이스의 상태와 애플리케이션의 상태 간에 동기화 문제
	private String username;
	
	private String nickname;
	private String password;
	@Enumerated(EnumType.STRING)
	private Role role;
	private boolean enabled;

}
