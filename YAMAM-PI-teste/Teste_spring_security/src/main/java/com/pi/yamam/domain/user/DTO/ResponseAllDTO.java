package com.pi.yamam.domain.user.DTO;

import com.pi.yamam.domain.user.UserRoles;
import com.pi.yamam.domain.user.Status;

public record ResponseAllDTO(long id, String name,String cpf, String email, String password, Status status, UserRoles role) {
    
}
