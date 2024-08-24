package com.ict.traveljoy.smtp;

import java.io.UnsupportedEncodingException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @ResponseBody
    @PostMapping("/checkemail")
    public String emailCheck(@RequestBody MailDTO mailDTO) throws MessagingException, UnsupportedEncodingException {
        MailDTO mail = mailService.findByEmail(mailDTO.getEmail());

        if (mail == null) {
            mail = new MailDTO();
            mail.setEmail(mailDTO.getEmail());
        }
        else if (mail.getIsAuth()) {
            return "already";
        }
        else if (mail.getTodayTryCount() >= 5) {

            return "5times";
        }
        
        String authCode = mailService.sendSimpleMessage(mail.getEmail());
        mail.setAuthCode(authCode);
        mail = mailService.saveMailAuth(mail);
        
        return mail.getTodayTryCount()+"회 시도하셨습니다";

    }
    
    @ResponseBody
    @PostMapping("/validemail")
    public String emailValid(@RequestBody MailDTO mailDTO) throws MessagingException, UnsupportedEncodingException {
    	MailDTO mail = mailService.findByEmail(mailDTO.getEmail());
    	if (mail == null) {
            return "error";
        }
    	if (mail.getAuthCode().equals(mailDTO.getAuthCode()))
    		return "success";
    	return "failed";
    }
}