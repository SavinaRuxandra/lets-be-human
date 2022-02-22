package ro.ubbcluj.backend.converter.impl;

import org.springframework.stereotype.Component;
import ro.ubbcluj.backend.converter.BaseConverter;
import ro.ubbcluj.backend.dto.AdminDto;
import ro.ubbcluj.backend.model.Admin;

@Component
public class ClientConverter implements BaseConverter<AdminDto, Admin> {

    @Override
    public AdminDto convertModelToDto(Admin model) {
        return AdminDto.builder()
                .id(model.getId())
                .email(model.getEmail())
                .userRole(model.getUserRole())
                .build();
    }

    @Override
    public Admin convertDtoToModel(AdminDto dto) {
        Admin admin = Admin.builder()
                .email(dto.getEmail())
                .userRole(dto.getUserRole())
                .build();
        admin.setId(dto.getId());
        return admin;
    }
}
