package ro.ubbcluj.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.ubbcluj.backend.converter.impl.UserConverter;
import ro.ubbcluj.backend.domain.dto.UserDto;
import ro.ubbcluj.backend.domain.model.User;
import ro.ubbcluj.backend.exception.InvalidCredentialsException;
import ro.ubbcluj.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserConverter userConverter;
    private final PasswordEncoder passwordEncoder;

    public UserDto login(UserDto userDto) {
        return userConverter.convertModelToDto(
                userRepository.findUserByEmail(userDto.getEmail())
                    .filter(user -> passwordEncoder.matches(userDto.getPassword(), user.getPassword()))
                    .orElseThrow(InvalidCredentialsException::new)
                );
    }

    public Boolean checkEmailUnique(String email) {
        return userRepository.findUserByEmail(email).isEmpty();
    }
}
