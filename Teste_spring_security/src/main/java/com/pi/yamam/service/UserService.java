package com.pi.yamam.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.pi.yamam.domain.user.User;
import com.pi.yamam.domain.user.Status;
import com.pi.yamam.domain.user.DTO.UpdateRequestDTO;
import com.pi.yamam.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User updateUser(long id, UpdateRequestDTO updateUserDTO) {
  
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found")); 
            user.setName(updateUserDTO.name());
            user.setCpf(updateUserDTO.cpf());
            user.setPassword(passwordEncoder.encode(updateUserDTO.password()));
            user.setRole(updateUserDTO.role());
            this.userRepository.save(user);
            return user;
    
      
  
    }

    public User updateStatus(long id) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (user.getStatus().equals(Status.ACTIVE)) {
            user.setStatus(Status.INACTIVE);
        } else {
            user.setStatus(Status.ACTIVE);
        }
        this.userRepository.save(user);
        return user;
    }

    public User findUserById(long id) {
        return this.userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}
