package com.pi.yamam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pi.yamam.domain.client.Client;
import com.pi.yamam.domain.client.Address.Address;
import com.pi.yamam.domain.client.Address.AddressDTO;
import com.pi.yamam.repositories.AddressRepository;
import com.pi.yamam.repositories.ClientRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ClientRepository clientRepository;

    public Address insertAddress(Long clientId, AddressDTO addressDTO) {
        Client client = clientRepository.findById(clientId).orElseThrow(() -> new RuntimeException("Client not found"));
        
        Address address = new Address(addressDTO.cep(), addressDTO.logradouro(),addressDTO.number(), 
        addressDTO.state(), addressDTO.uf(), addressDTO.typeAddress(), client
        );
        Address newAddress = addressRepository.save(address);

        return newAddress;
    }
}
