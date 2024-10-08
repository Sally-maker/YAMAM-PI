package com.pi.yamam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi.yamam.domain.client.Client;

public interface ClientRepository extends JpaRepository<Client, Long>{
    
}
