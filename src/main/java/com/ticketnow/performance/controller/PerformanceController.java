package com.ticketnow.performance.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PerformanceController {
    @GetMapping("/")
    public String index() {
        return "index";
    }
}
