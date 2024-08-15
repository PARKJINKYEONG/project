package com.ict.traveljoy.users.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<Users, Long>{
	//중복이메일 검증용
	boolean existsByEmail(String email);
	//중복닉네임 검증용
	boolean existsByNickname(String nickname);
	//이메일 조회용
	Optional<Users> findByEmail(String email);
}
