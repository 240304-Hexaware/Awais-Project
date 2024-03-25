package com.Parser.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("users")
public class UserInfo {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String roles;
    private Boolean blocked;

    public Boolean isFieldBlank() {
        return this.name == null || this.email == null || this.password == null
                || this.roles == null | this.blocked == null;
    }

}
