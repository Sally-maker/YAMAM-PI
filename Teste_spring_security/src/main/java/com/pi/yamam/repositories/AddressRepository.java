package com.pi.yamam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi.yamam.domain.client.Address.Address;
import com.pi.yamam.domain.client.Client;
import java.util.List;


public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByClient(Client client);
}
