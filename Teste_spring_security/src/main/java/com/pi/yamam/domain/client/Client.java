package com.pi.yamam.domain.client;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import com.pi.yamam.domain.client.Address.Address;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "client")
@EqualsAndHashCode(of = "id")
@AllArgsConstructor
@NoArgsConstructor
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200)
    private String name;

    @Column(unique = true, length = 15)
    private String cpf;

    @Column(unique = true, length = 200)
    private String email;


    private LocalDate birthDate;


    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String password;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> address;
}
