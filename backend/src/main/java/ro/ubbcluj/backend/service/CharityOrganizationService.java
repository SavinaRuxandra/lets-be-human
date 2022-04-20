package ro.ubbcluj.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.ubbcluj.backend.converter.impl.CharityOrganizationConverter;
import ro.ubbcluj.backend.domain.dto.CharityOrganizationDto;
import ro.ubbcluj.backend.domain.model.CharityOrganization;
import ro.ubbcluj.backend.exception.CharityOrganizationNotFoundException;
import ro.ubbcluj.backend.repository.CharityOrganizationRepository;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class CharityOrganizationService {
    private final CharityOrganizationRepository charityOrganizationRepository;
    private final CharityOrganizationConverter charityOrganizationConverter;
    private final PasswordEncoder passwordEncoder;

    public Collection<CharityOrganizationDto> findAll() {
        return this.charityOrganizationConverter.convertModelsToDtos(this.charityOrganizationRepository.findAll());
    }

    public CharityOrganizationDto add(CharityOrganizationDto charityOrganizationDto) {
        CharityOrganization charityOrganization = charityOrganizationConverter.convertDtoToModel(charityOrganizationDto);
        charityOrganization.setPassword(passwordEncoder.encode(charityOrganization.getPassword()));
        return charityOrganizationConverter.convertModelToDto(
                charityOrganizationRepository.save(charityOrganization)
        );
    }

    public CharityOrganizationDto getById(Long id) {
        return charityOrganizationConverter.convertModelToDto(
                charityOrganizationRepository.findById(id)
                        .orElseThrow(() -> new CharityOrganizationNotFoundException(id))
        );
    }
}
