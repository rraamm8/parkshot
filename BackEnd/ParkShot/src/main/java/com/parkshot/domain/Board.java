package com.parkshot.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdDate = new Date();
	private Long cnt = 0L;

	@ManyToOne
	@JoinColumn(name = "MEMBER_ID", nullable = false, updatable = false)
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private Member member;
	

}
