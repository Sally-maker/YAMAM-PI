package com.pi.yamam.domain.user;

public record ResponseAllDTO(long id, String name,String cpf, String email, String password, UserStatus status, UserRoles role) {
    
}
