package com.pi.yamam.domain.client.DTO;

import java.time.LocalDate;
import java.util.List;

import com.pi.yamam.domain.client.Gender;
import com.pi.yamam.domain.client.Address.Address;

public record ClientDTO(String name, String cpf, String email,
        LocalDate birthDate, Gender gender, String password, List<Address> address
        
        ) {

}
