package com.parkshot.domain;

import jakarta.persistence.Entity;
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
public class Hole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer holeId;
    private Integer courseId;
    private String holeName;
    private Integer par;
    private Integer distance;

   
}
