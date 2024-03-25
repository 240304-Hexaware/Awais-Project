package com.Parser.entity;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "specifications")
public class Specification {

    @Id
    private String id;

    @Field("file_name")
    private String fileName;

    @Field("json")
    private String json;

    @Field("user")
    private String user;

    @Field("parse_files")
    private List<Map<String, String>> parseFiles;

}
