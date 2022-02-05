package ro.ubbcluj.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ro.ubbcluj.backend.dto.ClientDto;
import ro.ubbcluj.backend.service.ClientService;

import java.util.Collection;

@RestController
@CrossOrigin
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @GetMapping
    public Collection<ClientDto> findAllClients() {
        return clientService.findAll();
    }

    @GetMapping("/{clientId}")
    public ClientDto findClientById(@PathVariable Long clientId) {
        return clientService.findById(clientId);
    }

    @PostMapping
    public ClientDto addClient(@RequestBody ClientDto clientDto) {
        return clientService.add(clientDto);
    }

    @DeleteMapping("/{clientId}")
    public void deleteClient(@PathVariable Long clientId) {
        clientService.delete(clientId);
    }

    @PutMapping
    public ClientDto updateClient(@RequestBody ClientDto clientDto){
        return clientService.update(clientDto);
    }
}
