package com.pi.yamam.domain.user.DTO;

import com.pi.yamam.domain.user.UserRoles;

public record LoginResponseDTO(String email, String token, UserRoles role) {
    
}
