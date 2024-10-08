package com.pi.yamam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi.yamam.domain.client.Address.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
