package com.Parser.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.Parser.exceptions.UserInvalidException;
import com.Parser.exceptions.UserNotFoundException;
import com.Parser.repository.UserInfoRepository;

@Service
public class AuthenticationService implements UserDetailsService {

    // @Autowired
    private UserInfoRepository repository;

    public AuthenticationService(UserInfoRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UserNotFoundException, UserInvalidException {

        if (email.equals("NONE_PROVIDED")) {
            throw new UserInvalidException("Invalid Fields");
        }

        return repository.findOneByEmail(email).map((user) -> new UserInfoService(user))
                .orElseThrow(() -> new UserNotFoundException("User not found " + email));
    }
}
