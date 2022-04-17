package ro.ubbcluj.backend.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import ro.ubbcluj.backend.domain.dto.CharityOrganizationDto;
import ro.ubbcluj.backend.service.CharityOrganizationService;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/charity-organizations")
public class CharityOrganizationController {
    private final CharityOrganizationService charityOrganizationService;
    private static final Logger logger = LoggerFactory.getLogger(CharityOrganizationController.class);

    @PostMapping
    public CharityOrganizationDto addCharityOrganization(@RequestBody CharityOrganizationDto charityOrganizationDto) {
        logger.trace("Add charityOrganization {}", charityOrganizationDto);
        return charityOrganizationService.add(charityOrganizationDto);
    }

    @GetMapping("/{id}")
    public CharityOrganizationDto findCharityOrganizationById(@PathVariable Long id) {
        logger.trace("Get charityOrganization with id {}", id);
        return charityOrganizationService.getById(id);
    }
}
