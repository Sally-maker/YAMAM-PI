package com.pi.yamam.domain.user.DTO;

import com.pi.yamam.domain.user.UserRoles;

public record UpdateRequestDTO(String oldPassword, String name, String cpf, String password, UserRoles role) {
    
}
