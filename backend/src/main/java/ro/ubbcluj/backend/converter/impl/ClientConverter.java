package ro.ubbcluj.backend.converter.impl;

import org.springframework.stereotype.Component;
import ro.ubbcluj.backend.converter.BaseConverter;
import ro.ubbcluj.backend.dto.ClientDto;
import ro.ubbcluj.backend.model.Client;

@Component
public class ClientConverter implements BaseConverter<ClientDto, Client> {

    @Override
    public ClientDto convertModelToDto(Client model) {
        return ClientDto.builder()
                .id(model.getId())
                .email(model.getEmail())
                .firstName(model.getFirstName())
                .lastName(model.getLastName())
                .build();
    }

    @Override
    public Client convertDtoToModel(ClientDto dto) {
        Client client = Client.builder()
                .email(dto.getEmail())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .build();
        client.setId(dto.getId());
        return client;
    }
}
