package com.pi.yamam.domain.client.DTO;

import java.time.LocalDate;

import com.pi.yamam.domain.client.Gender;

public record UpdateClientDTO(String name, LocalDate birthDate, Gender gender,String password) {
    
}
