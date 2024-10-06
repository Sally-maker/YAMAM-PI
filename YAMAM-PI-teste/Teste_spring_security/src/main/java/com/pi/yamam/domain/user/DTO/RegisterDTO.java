package com.pi.yamam.domain.user.DTO;

import com.pi.yamam.domain.user.UserRoles;

public record RegisterDTO(String name, String cpf, String email, String password,UserRoles role) {
    
}
