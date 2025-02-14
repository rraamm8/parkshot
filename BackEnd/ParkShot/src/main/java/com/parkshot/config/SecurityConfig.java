package com.parkshot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.parkshot.filter.JWTAuthenticationFilter;
import com.parkshot.filter.JWTAuthorizationFilter;
import com.parkshot.handler.OAuth2SuccessHandler;
import com.parkshot.persistence.MemberRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private OAuth2SuccessHandler successHandler;

	@Autowired
	private AuthenticationConfiguration authenticationConfiguration;

	@Autowired
	private MemberRepository memberRepo;

	@Bean
	SecurityFilterChain sequrityFilterChain(HttpSecurity http) throws Exception {
		// CSRF 보호 비활성화
		http.csrf(csrf -> csrf.disable());
		http.cors(cors -> cors.configurationSource(corsSource()));

		http.authorizeHttpRequests(auth -> auth
//				.requestMatchers("/member/**").authenticated()
//				.requestMatchers("/admin/**").hasRole("ADMIN")
				.anyRequest().permitAll());

		// 기본 로그인 페이지 설정
		// http.formLogin(form -> form.loginPage("/login").defaultSuccessUrl("/member", true));
		http.formLogin(form -> form.disable());
		// HTTP 기본 인증 비활성화
		http.httpBasic(basic -> basic.disable());

		// JWT 인증 필터 추가
		http.addFilter(new JWTAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()));

		http.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		// JWT 권한 필터 추가
		http.addFilterBefore(new JWTAuthorizationFilter(memberRepo), AuthorizationFilter.class);

		// OAuth2 로그인 핸들러
		http.oauth2Login(oauth2 -> oauth2
				.successHandler(successHandler));

		return http.build();
	}

	private CorsConfigurationSource corsSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOriginPattern(CorsConfiguration.ALL);
		config.addAllowedMethod(CorsConfiguration.ALL);
		config.addAllowedHeader(CorsConfiguration.ALL);
		config.setAllowCredentials(true);
		config.addExposedHeader(CorsConfiguration.ALL);
		// Header에 Authorization을 추가하기 위해서는 필요
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
}
