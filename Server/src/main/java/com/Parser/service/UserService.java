package com.Parser.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Parser.dto.UserDTO;
import com.Parser.entity.UserInfo;
import com.Parser.exceptions.MongoDbException;
import com.Parser.exceptions.UserExistException;
import com.Parser.exceptions.UserInvalidException;
import com.Parser.exceptions.UserNotFoundException;
import com.Parser.repository.UserInfoRepository;
import com.mongodb.MongoException;

@Service
public class UserService {

    // @Autowired
    private UserInfoRepository repository;

    // @Autowired
    private PasswordEncoder encoder;

    public UserService(UserInfoRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public Optional<List<UserDTO>> getAllMapFields() {
        return repository.findAllExcludePasswordField();
    }

    public Page<UserDTO> getAllByPage(Pageable pageable) {
        return repository.findUsersWithoutPassword(pageable);
    }

    public Object addUser(UserInfo userInfo) throws MongoDbException, UserExistException, UserInvalidException {

        try {

            if (userInfo.isFieldBlank()) {
                throw new UserInvalidException("Invalid Fields");
            }

            if (repository.findOneByEmail(userInfo.getEmail()).isPresent()) {
                throw new UserExistException("User: (" + userInfo.getEmail() + ") already exists.");
            }

            userInfo.setPassword(encoder.encode(userInfo.getPassword()));
            repository.save(userInfo);

            Map<String, String> data = new HashMap<String, String>();
            data.put("roles", userInfo.getRoles());
            data.put("email", userInfo.getEmail());
            data.put("name", userInfo.getName());
            data.put("_id", userInfo.getId());

            return data;
        } catch (MongoException e) {
            throw new MongoDbException(e.getMessage());
        }
    }

    public Object makeAdmin(String id) throws MongoDbException, UserNotFoundException, UserInvalidException {

        try {

            if (id.isEmpty()) {
                throw new UserInvalidException("User ID required!");
            }

            UserInfo userInfo = this.repository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException("User: (" + id + ") does not exist!"));

            userInfo.setRoles("ROLE_ADMIN");

            this.repository.save(userInfo);

            Map<String, String> data = new HashMap<String, String>();
            data.put("roles", userInfo.getRoles());
            data.put("email", userInfo.getEmail());
            data.put("name", userInfo.getName());
            data.put("_id", userInfo.getId());

            return data;
        } catch (MongoException e) {
            throw new MongoDbException(e.getMessage());
        }
    }

    public Object removeAdmin(String id) throws MongoDbException, UserNotFoundException, UserInvalidException {

        try {

            if (id.isEmpty()) {
                throw new UserInvalidException("User ID required!");
            }

            UserInfo userInfo = this.repository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException("User: (" + id + ") does not exist!"));

            userInfo.setRoles("ROLE_USER");

            this.repository.save(userInfo);

            Map<String, String> data = new HashMap<String, String>();
            data.put("roles", userInfo.getRoles());
            data.put("email", userInfo.getEmail());
            data.put("name", userInfo.getName());
            data.put("_id", userInfo.getId());

            return data;

        } catch (MongoException e) {
            throw new MongoDbException(e.getMessage());
        }
    }

    public Object blockUser(String id) throws MongoDbException, UserNotFoundException, UserInvalidException {

        try {

            if (id.isEmpty()) {
                throw new UserInvalidException("User ID required!");
            }

            UserInfo userInfo = this.repository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException("User: (" + id + ") does not exist!"));
            ;

            userInfo.setBlocked(true);

            this.repository.save(userInfo);

            Map<String, String> data = new HashMap<String, String>();
            data.put("roles", userInfo.getRoles());
            data.put("email", userInfo.getEmail());
            data.put("name", userInfo.getName());
            data.put("_id", userInfo.getId());

            return data;
        } catch (MongoException e) {
            throw new MongoDbException(e.getMessage());
        }
    }

    public Object unblockUser(String id) throws MongoDbException, UserNotFoundException, UserInvalidException {

        try {

            if (id.isEmpty()) {
                throw new UserInvalidException("User ID required!");
            }

            UserInfo userInfo = this.repository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException("User: (" + id + ") does not exist!"));
            ;

            userInfo.setBlocked(false);

            this.repository.save(userInfo);

            Map<String, String> data = new HashMap<String, String>();
            data.put("roles", userInfo.getRoles());
            data.put("email", userInfo.getEmail());
            data.put("name", userInfo.getName());
            data.put("_id", userInfo.getId());

            return data;
        } catch (MongoException e) {
            throw new MongoDbException(e.getMessage());
        }
    }

    public Object deleteUser(String id) throws MongoDbException, UserNotFoundException, UserInvalidException {

        try {

            if (id.isEmpty()) {
                throw new UserInvalidException("User ID required!");
            }

            this.repository.deleteById(id);

            Map<String, String> data = new HashMap<String, String>();
            data.put("_id", id);

            return data;

        } catch (MongoException e) {
            throw new MongoDbException(e.getMessage());
        }
    }

}
