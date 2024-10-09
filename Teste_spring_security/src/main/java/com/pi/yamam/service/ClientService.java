package com.pi.yamam.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pi.yamam.domain.client.Client;
import com.pi.yamam.domain.client.Address.Address;
import com.pi.yamam.domain.client.DTO.ClientDTO;
import com.pi.yamam.domain.client.DTO.LoginRequestDTO;
import com.pi.yamam.domain.client.DTO.UpdateClientDTO;
import com.pi.yamam.repositories.AddressRepository;
import com.pi.yamam.repositories.ClientRepository;

@Service
public class ClientService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private AddressRepository addressRepository;

    public Client createClient(ClientDTO clientDTO) {
        String passHash = passwordEncoder.encode(clientDTO.password());
        Client client = new Client(clientDTO.name(), clientDTO.cpf(),
                clientDTO.email(), clientDTO.birthDate(), clientDTO.gender(), passHash);
        client.setAddress(new ArrayList<>());

        Client newClient = clientRepository.save(client);
        for (Address addressDTO : clientDTO.address()) {
            addressDTO.setClient(newClient);
            addressRepository.save(addressDTO);
        }
        return newClient;
    }

    public Client loginClient(LoginRequestDTO loginRequestDTO) {
        Client client = clientRepository.findByEmail(loginRequestDTO.email())
                .orElseThrow(() -> new RuntimeException("User not found! "));

        if (passwordEncoder.matches(loginRequestDTO.password(), client.getPassword())) {
            return client;
        } else {
            return null;
        }
    }

    public void updateClient(Long id, UpdateClientDTO updateClientDTO) {
        Client client = clientRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        client.setName(updateClientDTO.name());
        client.setBirthDate(updateClientDTO.birthDate());
        client.setGender(updateClientDTO.gender());
        client.setPassword(passwordEncoder.encode(updateClientDTO.password()));

        clientRepository.save(client);
    }
}
