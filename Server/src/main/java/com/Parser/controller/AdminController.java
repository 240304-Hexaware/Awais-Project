package com.Parser.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Parser.response.ResponseHandler;
import com.Parser.service.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String admin() {

        return "Admin Access";
    }

    @PostMapping("/promote/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Object> promoteAdmin(@PathVariable("id") String id) {
        return ResponseHandler.generateResponse("Admin Role Granted", HttpStatus.OK,
                this.userService.makeAdmin(id));
    }

    @PostMapping("/demote/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Object> demoteAdmin(@PathVariable("id") String id) {

        return ResponseHandler.generateResponse("Admin Role Revoked", HttpStatus.OK,
                this.userService.removeAdmin(id));
    }

    @PostMapping("/block/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Object> blockUser(@PathVariable("id") String id) {

        return ResponseHandler.generateResponse("User Blocked", HttpStatus.OK,
                this.userService.blockUser(id));
    }

    @PostMapping("/unblock/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Object> unblockUser(@PathVariable("id") String id) {

        return ResponseHandler.generateResponse("User Unblocked", HttpStatus.OK,
                this.userService.unblockUser(id));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Object> deleteUser(@PathVariable("id") String id) {
        return ResponseHandler.generateResponse("User Deleted!", HttpStatus.OK,
                this.userService.deleteUser(id));
    }

}
