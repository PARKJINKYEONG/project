package com.ict.traveljoy.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ict.traveljoy.users.repository.Users;

import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Builder
public class CustomUserDetails implements UserDetails {
	
	private Users userEntity;//엔터티다
	public CustomUserDetails(Users userEntity) {
		this.userEntity = userEntity;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		Collection<GrantedAuthority> authorities = new ArrayList<>();

		authorities.add(new GrantedAuthority() {

			@Override
			public String getAuthority() {
				return userEntity.getPermission();
			}
		});
		return authorities;
	}

	@Override
	public String getPassword() {
		return userEntity.getPassword();
	}

	@Override
	public String getUsername() {
		return userEntity.getEmail();
	}


	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
