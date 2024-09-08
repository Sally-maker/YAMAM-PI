package com.pi.yamam.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pi.yamam.domain.user.UpdateRequestDTO;
import com.pi.yamam.domain.user.User;
import com.pi.yamam.domain.user.UserStatus;
import com.pi.yamam.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User updateUser(long id, UpdateRequestDTO updateUserDTO) {

        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (user != null && passwordEncoder.matches(updateUserDTO.oldPassword(), user.getPassword())) {
            user.setName(updateUserDTO.name());
            user.setCpf(updateUserDTO.cpf());
            user.setPassword(passwordEncoder.encode(updateUserDTO.password()));
            user.setRole(updateUserDTO.role());
            this.userRepository.save(user);
            return user;
        }
        return null;
    }

    public User updateStatus(long id) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (user.getStatus().equals(UserStatus.ACTIVE)) {
            user.setStatus(UserStatus.INACTIVE);
        } else {
            user.setStatus(UserStatus.ACTIVE);
        }
        this.userRepository.save(user);
        return user;
    }

}
