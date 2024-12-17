package com.parkshot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	SecurityFilterChain sequrityFilterChain(HttpSecurity http) throws Exception{
		http.authorizeHttpRequests(security->security
				.requestMatchers("/member/**").authenticated()
				.requestMatchers("/admin/**").hasRole("ADMIN")
				.anyRequest().permitAll());
		return http.build();
	}
	
	@Autowired
	public void authenticate(AuthenticationManagerBuilder auth) throws Exception{
		auth.inMemoryAuthentication().
		withUser("admin").
		password("{noop}admin123").
		roles("ADMIN");
	}
	
//	@Bean
//	PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
}
