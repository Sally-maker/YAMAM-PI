package com.pi.yamam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pi.yamam.domain.user.UpdateRequestDTO;
import com.pi.yamam.domain.user.User;
import com.pi.yamam.repositories.UserRepository;
import com.pi.yamam.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity updateUser(@PathVariable long id, @RequestBody @Valid UpdateRequestDTO updateUserDTO) {

        try {
            User userResponse = this.userService.updateUser(id, updateUserDTO);
            if (userResponse == null) {
                return ResponseEntity.badRequest().body("ERROR while updated user");
            }
            return ResponseEntity.ok().body("User updated!");

        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex);
        }

    }

}
