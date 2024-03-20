package com.Parser.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.Parser.entity.UserInfo;
import com.Parser.repository.UserInfoRepository;
import com.Parser.response.ResponseHandler;
import com.Parser.service.UserService;

@RestController
public class UserController {

    // @Autowired
    private UserService registrationService;
    private UserInfoRepository userInfoRepository;

    public UserController(UserService registrationService, UserInfoRepository userInfoRepository) {
        this.registrationService = registrationService;
        this.userInfoRepository = userInfoRepository;

    }

    @GetMapping("/welcome")
    public @ResponseBody ResponseEntity<String> welcome() {
        return ResponseEntity.ok().body("Welcome this endpoint is not secure");
    }

    @GetMapping("/users")
    public @ResponseBody ResponseEntity<Object> getAllUsers() {
        return ResponseHandler.getAll("All Users", HttpStatus.OK, userInfoRepository.findAllExcludePasswordField());
    }

    @GetMapping("/users/page")
    public @ResponseBody ResponseEntity<Object> getAllUsersByPage(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {

        Pageable pageable = PageRequest.of(page, size, direction, sort);
        return ResponseEntity.ok().body(userInfoRepository.findAll(pageable));
    }

    @PostMapping("user/register")
    public @ResponseBody ResponseEntity<Object> addNewUser(@RequestBody(required = true) UserInfo userInfo) {
        return ResponseHandler.generateResponse("User Added", HttpStatus.CREATED,
                registrationService.addUser(userInfo));
    }
}
