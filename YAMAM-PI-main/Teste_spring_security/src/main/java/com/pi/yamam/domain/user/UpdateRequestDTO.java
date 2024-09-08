package com.pi.yamam.domain.user;

public record UpdateRequestDTO(String oldPassword, String name, String cpf, String password, UserRoles role) {
    
}
