package com.pi.yamam.domain.client.Address;

import com.pi.yamam.domain.client.Client;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cep;

    private String logradouro;
    
    private int number;

    private String state;

    @Column(length = 3)
    private String uf;


    private TypeAddress typeAddress;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

}
