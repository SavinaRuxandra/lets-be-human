package ro.ubbcluj.backend.converter.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ro.ubbcluj.backend.converter.BaseConverter;
import ro.ubbcluj.backend.domain.UserRole;
import ro.ubbcluj.backend.domain.dto.CharityOrganizationDto;
import ro.ubbcluj.backend.domain.model.CharityOrganization;

@Component
@RequiredArgsConstructor
public class CharityOrganizationConverter implements BaseConverter<CharityOrganizationDto, CharityOrganization> {
    @Override
    public CharityOrganizationDto convertModelToDto(CharityOrganization model) {
        return CharityOrganizationDto.builder()
                .id(model.getId())
                .email(model.getEmail())
                .password(model.getPassword())
                .name(model.getName())
                .description(model.getDescription())
                .phoneNumber(model.getPhoneNumber())
                .accountAddress(model.getAccountAddress())
                .build();
    }

    @Override
    public CharityOrganization convertDtoToModel(CharityOrganizationDto dto) {
        return CharityOrganization.builder()
                .id(dto.getId())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .role(UserRole.CHARITY_ORGANIZATION)
                .name(dto.getName())
                .description(dto.getDescription())
                .phoneNumber(dto.getPhoneNumber())
                .accountAddress(dto.getAccountAddress())
                .build();
    }
}
