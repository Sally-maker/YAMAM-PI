package com.pi.yamam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.pi.yamam.domain.user.User;
import com.pi.yamam.domain.user.Status;
import com.pi.yamam.domain.user.DTO.AuthenticationDTO;
import com.pi.yamam.domain.user.DTO.LoginResponseDTO;
import com.pi.yamam.domain.user.DTO.RegisterDTO;
import com.pi.yamam.infra.security.TokenService;
import com.pi.yamam.repositories.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor

public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        User user = userRepository.findByEmail(data.email()).orElseThrow(() -> new RuntimeException("User not found!"));
        String token = "";
        
        if (passwordEncoder.matches(data.password(), user.getPassword())) {
            token = tokenService.generateToken(user);
            return ResponseEntity.ok(new LoginResponseDTO(user.getEmail(),token, user.getRole()));
        }
        return ResponseEntity.ok(token);
    }
    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Valid RegisterDTO data) {
    
        String passEncripted = passwordEncoder.encode(data.password());
        User newUser = new User(data.name(), data.cpf(), data.email(), passEncripted, Status.ACTIVE, data.role());
        this.userRepository.save(newUser);

        return ResponseEntity.ok(newUser);

    }
}
