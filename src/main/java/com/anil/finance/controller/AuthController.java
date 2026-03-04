package com.anil.finance.controller;


import com.anil.finance.model.User;
import com.anil.finance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {

        User user = userRepository.findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user == null) {
            return "User not found";
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (encoder.matches(loginUser.getPassword(), user.getPassword())) {
            return "Login Successful";
        } else {
            return "Invalid Password";
        }
    }
}