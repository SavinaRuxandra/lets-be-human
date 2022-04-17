package ro.ubbcluj.backend.converter.impl;

import org.springframework.stereotype.Component;
import ro.ubbcluj.backend.converter.BaseConverter;
import ro.ubbcluj.backend.domain.dto.UserDto;
import ro.ubbcluj.backend.domain.model.User;

@Component
public class UserConverter implements BaseConverter<UserDto, User> {

    @Override
    public UserDto convertModelToDto(User model) {
        return UserDto.builder()
                .id(model.getId())
                .email(model.getEmail())
                .password(model.getPassword())
                .role(model.getRole())
                .build();
    }

    @Override
    public User convertDtoToModel(UserDto dto) {
        User user = User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .role(dto.getRole())
                .build();
        user.setId(dto.getId());
        return user;
    }
}
