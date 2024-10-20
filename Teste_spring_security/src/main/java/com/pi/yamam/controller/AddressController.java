package com.pi.yamam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pi.yamam.domain.client.Address.Address;
import com.pi.yamam.domain.client.Address.AddressDTO;
import com.pi.yamam.service.AddressService;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping({"/{id}"})
    public ResponseEntity<Address> insertAddress(@PathVariable Long id, @RequestBody AddressDTO addressDTO) {
        Address address = addressService.insertAddress(id, addressDTO);

        return ResponseEntity.ok(address);
    }
    @GetMapping("/{id}")
    public List<Address> getAddresses(@PathVariable Long id){
        return addressService.getAddresses(id);
    }
}
