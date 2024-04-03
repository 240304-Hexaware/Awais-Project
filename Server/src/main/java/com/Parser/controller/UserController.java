package com.Parser.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.Parser.entity.UserInfo;
import com.Parser.response.ResponseHandler;
import com.Parser.service.JwtService;
import com.Parser.service.UserService;

@RestController
public class UserController {

    // @Autowired
    private UserService userService;

    private JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping("/welcome")
    public @ResponseBody ResponseEntity<Object> welcome() {

        return ResponseHandler.generateMessage("Welcome this endpoint is not secure", HttpStatus.OK);

    }

    @PostMapping("user/register")
    public @ResponseBody ResponseEntity<Object> addNewUser(@RequestBody(required = true) UserInfo userInfo) {
        return ResponseHandler.generateResponse("User Added", HttpStatus.CREATED,
                userService.addUser(userInfo));
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public @ResponseBody ResponseEntity<Object> getAllUsers() {
        return ResponseHandler.getAll("All Users", HttpStatus.OK, userService.getAllMapFields());
    }

    @GetMapping("/user")
    public @ResponseBody ResponseEntity<Object> getUser(@RequestHeader("Authorization") String token) {

        return ResponseHandler.generateResponse("User Details", HttpStatus.OK,
                userService.getUser(jwtService.extractEmail(token.split(" ")[1])));
    }

    @PutMapping("/user/{id}")
    public @ResponseBody ResponseEntity<Object> updateUser(@PathVariable("id") String id,
            @RequestBody(required = true) UserInfo userInfo) {

        userInfo.setId(id);
        return ResponseHandler.generateResponse("User Updates", HttpStatus.OK,
                userService.updateUser(userInfo));
    }
    // @GetMapping("/users/page")
    // @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    // public @ResponseBody ResponseEntity<Object>
    // getAllUsersByPage(@RequestParam(defaultValue = "0") int page,
    // @RequestParam(defaultValue = "5") int size,
    // @RequestParam(defaultValue = "id") String sort,
    // @RequestParam(defaultValue = "DESC") Sort.Direction direction) {

    // Pageable pageable = PageRequest.of(page, size, direction, sort);
    // return ResponseEntity.ok().body(userService.getAllByPage(pageable));
    // }

    @GetMapping("/users/page")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public @ResponseBody ResponseEntity<Object> getAllUsersByPageExceptOne(@RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {

        Pageable pageable = PageRequest.of(page, size, direction, sort);
        return ResponseEntity.ok()
                .body(userService.getAllByPageExceptOne(jwtService.extractEmail(token.split(" ")[1]), pageable));
    }
}
