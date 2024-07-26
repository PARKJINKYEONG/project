package com.ict.traveljoy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@Controller
public class testController {

	@GetMapping("/react")
	public String frontend() {
		return "react/index";
	}
}
