package ro.ubbcluj.backend.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import ro.ubbcluj.backend.domain.dto.UserDto;
import ro.ubbcluj.backend.service.UserService;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping(value = "/users")
public class UserController {
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/login")
    public final UserDto login(@RequestBody UserDto userDto) {
        logger.trace("Login user {}", userDto);
        return userService.login(userDto);
    }

    @GetMapping("/check-unique-email/{email}")
    public final Boolean checkUserEmailUnique(@PathVariable String email) {
        logger.trace("Chack user email unique for email {}", email);
        return userService.checkEmailUnique(email);
    }
}
