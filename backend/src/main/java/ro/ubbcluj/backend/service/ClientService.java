package ro.ubbcluj.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.ubbcluj.backend.converter.impl.ClientConverter;
import ro.ubbcluj.backend.dto.ClientDto;
import ro.ubbcluj.backend.model.Client;
import ro.ubbcluj.backend.repository.ClientRepository;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private final ClientConverter clientConverter;

    public Collection<ClientDto> findAll() {
        return clientRepository.findAll().stream()
                .map(clientConverter::convertModelToDto)
                .collect(Collectors.toList());
    }

    public ClientDto findById(Long clientId) {
        return clientConverter.convertModelToDto(clientRepository.findById(clientId).orElseThrow());
    }

    public ClientDto add(ClientDto clientDto) {
        return clientConverter.convertModelToDto(clientRepository.save(clientConverter.convertDtoToModel(clientDto)));
    }

    public void delete(Long clientId) {
        clientRepository.deleteById(clientId);
    }

    @Transactional
    public ClientDto update(ClientDto clientDto) {
        Client client = clientConverter.convertDtoToModel(clientDto);
        Optional<Client> clientOptionalInDb = clientRepository.findById(client.getId());

        clientOptionalInDb.ifPresent(
                newClient -> {
                    newClient.setEmail(client.getEmail());
                    newClient.setFirstName(client.getFirstName());
                    newClient.setLastName(client.getLastName());
                }
        );

        return clientConverter.convertModelToDto(clientOptionalInDb.orElseThrow());
    }

}
