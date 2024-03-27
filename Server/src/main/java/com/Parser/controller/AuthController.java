package com.Parser.controller;

import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.Parser.entity.AuthRequest;
import com.Parser.exceptions.UserUnauthorizedException;
import com.Parser.response.ResponseHandler;
import com.Parser.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    // @Autowired
    private JwtService jwtService;

    // @Autowired
    private AuthenticationManager authenticationManager;

    public AuthController(JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public @ResponseBody ResponseEntity<Object> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

            if (authentication.isAuthenticated()) {
                
                Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
                String token = jwtService.generateToken(authRequest.getEmail(), authorities);

                return ResponseHandler.tokenResponse(token);
            } else {
                throw new UserUnauthorizedException("Unauthorized!");
            }

        } catch (AuthenticationException e) {
            throw new UserUnauthorizedException(e.getMessage());
        }

    }
}
