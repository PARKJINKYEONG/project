package com.ict.traveljoy.smtp;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MailRepository extends JpaRepository<Mail, Long>{

	Optional<Mail> findByEmail(String email);

}
