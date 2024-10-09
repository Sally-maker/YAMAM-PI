package com.pi.yamam.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.pi.yamam.service.ClientService;

@RestController
@RequestMapping("client")
public class ClientController {

    @Autowired
    private ClientService clientService;



    @PostMapping
    public ResponseEntity createClient(@RequestBody ClientDTO clientDTO) {
        Client client = clientService.createClient(clientDTO);

        return ResponseEntity.ok(client);
    }
    @PostMapping("/login")
    public ResponseEntity loginClient(@RequestBody LoginRequestDTO loginRequestDTO){
        Client client = clientService.loginClient(loginRequestDTO);

        if(client != null){
            return ResponseEntity.ok("Usuário logado");

        }
        return ResponseEntity.badRequest().body("Login incorreto!");

    }

    @PutMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody UpdateClientDTO updateClientDTO){

        clientService.updateClient(id, updateClientDTO);
        return ResponseEntity.ok("Usuário atualizado");
    }
}
