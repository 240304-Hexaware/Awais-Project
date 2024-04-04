package com.Parser.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.Parser.dto.UserDTO;
import com.Parser.entity.UserInfo;

@Repository
public interface UserInfoRepository extends MongoRepository<UserInfo, String> {
    Optional<UserInfo> findByName(String username);

    Optional<UserInfo> findOneByEmail(String email);

    @Query(value = "{email: ?0 }", fields = "{ 'password' : 0 }")
    Optional<UserDTO> findOneByEmailExcludePassword(String email);

    @Query(value = "{}", fields = "{ 'password' : 0 }")
    Optional<List<UserDTO>> findAllExcludePasswordField();

    @Query(value = "{}", fields = "{ 'password' : 0 }")
    Page<UserDTO> findUsersWithoutPassword(Pageable pageable);

    @Query(value = "{email: {$ne: ?0 }}", fields = "{ 'password' : 0 }")
    Page<UserDTO> findUsersWithoutPasswordExcludeOne(String email, Pageable pageable);
}
