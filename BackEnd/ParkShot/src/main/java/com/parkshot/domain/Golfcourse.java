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
public class Golfcourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courseId;

    private String region;
    private String name;
    private String location;
    private String area;
    private Integer holesCount;
    private String link;
    private String contact;
    private String summerStart;
    private String summerEnd;
    private String winterStart;
    private String winterEnd;
    private String dayOff;
    private String closingPeriod;
    private String parkinglot;
    private String restroom;
    private String shower;
    private String weekdayPrice;

   
}
