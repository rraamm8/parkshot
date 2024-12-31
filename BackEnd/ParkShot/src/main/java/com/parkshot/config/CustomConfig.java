//package com.parkshot.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//// @Configuration
//public class CustomConfig implements WebMvcConfigurer {
//
//	@Override
//	public void addCorsMappings(CorsRegistry registry) {
//		// 모든 주소에 대해 CORS 설정 적용
//		registry.addMapping("/**") // 모든 경로 허용
//				.allowedOriginPatterns("http://localhost:3000") // 모든 도메인 허용
//				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용된 HTTP 메소드
//				.allowedHeaders("*") // 모든 헤더 허용
//				.allowCredentials(true) // 인증 정보 포함 허용
//				.exposedHeaders("Authorization"); // 응답 헤더 노출
//	}
//}
