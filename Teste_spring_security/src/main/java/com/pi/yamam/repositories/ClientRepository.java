package com.pi.yamam.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi.yamam.domain.client.Client;
import java.util.List;


public interface ClientRepository extends JpaRepository<Client, Long>{
    Optional<Client> findByEmail(String email);
}
