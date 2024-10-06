package com.pi.yamam.domain.user.DTO;

import com.pi.yamam.domain.user.UserRoles;

public record UpdateResponseDTO(String name, String cpf, String password, UserRoles role) {
    
}
