package com.pi.yamam.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pi.yamam.domain.client.Client;
import com.pi.yamam.domain.client.DTO.ClientDTO;
import com.pi.yamam.domain.client.DTO.LoginRequestDTO;
import com.pi.yamam.domain.client.DTO.UpdateClientDTO;
import com.pi.yamam.domain.user.DTO.LoginResponseDTO;
import com.pi.yamam.repositories.ClientRepository;
import com.pi.yamam.service.ClientService;

@RestController
@RequestMapping("client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientRepository clientRepository;


    @GetMapping("/{id}")
    public Client getclient(@PathVariable Long id){
        return clientRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Client not found"));
    
    }

    @PostMapping
    public ResponseEntity createClient(@RequestBody ClientDTO clientDTO) {
        Client client = clientService.createClient(clientDTO);

        return ResponseEntity.ok(client);
    }
    @PostMapping("/login")
    public ResponseEntity loginClient(@RequestBody LoginRequestDTO loginRequestDTO){
        Client client = clientService.loginClient(loginRequestDTO);

        if(client != null){
            return ResponseEntity.ok(client.getId());

        }
        return ResponseEntity.badRequest().body("Login incorreto!");

    }

    @PutMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody UpdateClientDTO updateClientDTO){

        clientService.updateClient(id, updateClientDTO);
        return ResponseEntity.ok("Usuário atualizado");
    }
}
